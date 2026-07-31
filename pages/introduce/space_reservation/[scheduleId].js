import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../../public/assets/styles/rental/rental.module.css';
import classnames from "classnames/bind"
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Link from "next/link";
import {Empty, Form, Input} from "antd";
import DatePicker from "react-datepicker";
import moment from "moment";
import RentalStep02 from "../../../component/rental/RentalStep02";
import {getRentalSchedule, initialize, updateRentalSchedule} from "../../../store/spaceRental/spaceRental";
import {initializeForm} from "../../../store/mentoring/mentoring";
import Modal from "../../../component/common/Modal";

const cx = classnames.bind(styles);

const ScheduleDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();

    const [showCancelModal, setShowCancelModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false)
    const {schedule,update} = useSelector(({spaceRental}) => ({
        schedule: spaceRental.getRentalSchedule,
        update:spaceRental.updateSchedule
    }))

    const [rentalInfo, setRentalInfo] = useState({
        personCount:0,
        purpose:"",
    })

    useEffect(() => {
        dispatch(getRentalSchedule(router.query.scheduleId))

        return () =>{
            dispatch(initialize())
        }
    }, [])


    useEffect(() => {
        if(schedule != null){
            setRentalInfo(schedule)
        }

    },[schedule])

    const changeInfo = (e) =>{
        const {name,value} = e.target
        setRentalInfo({
            ...rentalInfo,
            [name]: value
        })
    }


    const editSchedule = () =>{
        const data = {
            scheduleId:rentalInfo.scheduleId,
            purpose:rentalInfo.purpose,
            personCount:rentalInfo.personCount,
        }
        dispatch(updateRentalSchedule(data));

    }
    const cancelSchedule = () =>{
        const data = {
            scheduleId:rentalInfo.scheduleId,
            status:"CANCEL"
        }
        dispatch(updateRentalSchedule(data));
    }

    //예약취소, 수정 완료
    useEffect(() =>{
        if(update.result && update.error == null){
            setShowResultModal(true)
        }
    },[update])

    return (
        <>
            {schedule != null && (
                <section className={cx("container")}>
                    <div className={`${cx("sub_container", "sssup")} `}>
                        <h1 className={cx("sub_top_title")}>공간 예약 시스템</h1>
                        <div className={`${cx("tab_style_2")} mb_30`}>
                            <ul>
                                <li><Link href="/introduce/space_reservation"><a><span>공간 신청하기</span></a></Link></li>
                                <li className={cx("on")}><Link
                                    href="/introduce/space_reservation/check"><a><span> 확인/ 취소하기</span></a></Link></li>
                            </ul>
                        </div>
                        <div className={cx("sssup_step2")}>
                            <Form form={form} onFinish={(e) => {
                                setShowEditModal(true)
                            }}
                                  initialValues={{
                                      purpose: schedule.purpose,
                                      personCount: schedule.personCount,
                                      userName: schedule.userName,
                                      userCompany: schedule.userCompany,
                                      userPhoneNum: schedule.userPhoneNum,
                                  }}
                            >
                                <div className={cx("building")}>
                                    <span className={cx("title")}>시설명</span>
                                    <span>{`${schedule.placeName} ${schedule.roomName}`}</span>
                                </div>

                                <div className={cx("rental_tb")}>
                                    <table>
                                        <colgroup>
                                            <col style={{width: '35%'}}/>
                                            <col style={{width: '35%'}}/>
                                            <col style={{width: '20%'}}/>
                                            <col style={{width: '10%'}}/>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th scope="col">대관신청일시</th>
                                            <th scope="col">행사시간</th>
                                            <th scope="col">참석인원 <span>(최대 {schedule.capacity}명)</span></th>
                                            <th scope="col">관리</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className={cx("start_time")}>
                                                <div className={cx("top_th")}>대관신청일시</div>
                                                {moment(schedule.rentalDate).format("YYYY/MM/DD dddd")}
                                            </td>
                                            <td className={cx("event_time")}>
                                                <div className={cx("top_th")}>시간</div>
                                                <ul>
                                                    {schedule.timeSlots && schedule.timeSlots.map((slot, i) => (
                                                        <li key={i}>{moment(slot.rentalStartTime,"HH:mm:ss").format("HH시 mm분").toString()} ~ {moment(slot.rentalEndTime,"HH:mm:ss").format("HH시 mm분").toString()}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                        <span className={cx("personnel_wrap")}>
                            <Form.Item
                                name="personCount"
                                className={(cx("antd_input"))}
                                rules={[
                                    {
                                        required: true,
                                        message: '참석인원을 입력해주세요',
                                    },
                                ]}
                            >
							<Input type="number" max={schedule.capacity} name="personCount" id="personCount"
                                   value={rentalInfo.personCount} onChange={changeInfo} readOnly={rentalInfo.status != "APPLY"}/>
                            </Form.Item>
                            {/*<label htmlFor="personCount">명</label>*/}
						</span>
                                            </td>
                                            <td>
                                                {rentalInfo.status == "APPLY" ? (
                                                    <button type="button"onClick={() =>{setShowCancelModal(true)}}>예약 취소</button>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className={cx("rental_tb","purpose")}>
                                    <label htmlFor="purpose" className={cx("title")}>예약자 정보</label>
                                    <table>
                                        <colgroup>
                                            {/*<col style={{width:'44.16%'}}/>*/}
                                            {/*<col style={{width:'33.75%'}}/>*/}
                                            {/*<col/>*/}
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th scope="col">성명</th>
                                            <th scope="col">소속</th>
                                            <th scope="col">전화번호</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className={cx("start_time")}>
                                                <Form.Item
                                                    className={(cx("antd_input"))}
                                                    name="userName"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '이름은 필수 입니다.',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder={"이름"} name="userName"
                                                           value={rentalInfo.userName} onChange={changeInfo}/>
                                                </Form.Item>
                                            </td>
                                            <td className={cx("event_time")}>
                                                <Form.Item
                                                    className={(cx("antd_input"))}
                                                    name="userCompany"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '소속은 필수 입니다.',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder={"소속"} name="userCompany"
                                                           value={rentalInfo.userCompany} onChange={changeInfo}/>
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item
                                                    name="userPhoneNum"
                                                    className={(cx("antd_input"))}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            pattern: new RegExp(
                                                                /^-?\d*(\.\d*)?$/
                                                            ),
                                                            message: "'-' 없이 숫자만 입력 가능합니다",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder={"연락처"} name="userPhoneNum" value={rentalInfo.userPhoneNum}
                                                           onChange={changeInfo}/>
                                                </Form.Item>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className={cx("purpose")}>
                                    <label htmlFor="purpose" className={cx("title")}>사용목적</label>
                                    <Form.Item
                                        name="purpose"
                                        className={(cx("antd_input"))}
                                        rules={[
                                            {
                                                required: true,
                                                message: '사용목적을 입력해주세요',
                                            },
                                        ]}
                                    >
                <textarea name="purpose" id="" cols="30" rows="10" id="purpose"
                          value={rentalInfo.purpose}
                          onChange={(e) => {
                              changeInfo(e)
                          }}
                          readOnly={rentalInfo.status != "APPLY"}
                          placeholder="최대 150자 입력하시기 바랍니다."></textarea>
                                    </Form.Item>
                                </div>

                                <div className={cx("btn_area")}>
                                    <button type="button" className={cx("basic-btn03", "btn-black-bd")} onClick={() => {
                                        router.back();
                                    }}>뒤로가기
                                    </button>
                                    {rentalInfo.status == "APPLY" && (
                                    <button type="submit" className={cx("basic-btn03", "btn-blue-bd")}>수정</button>
                                    )}
                                </div>
                            </Form>
                        </div>

                    </div>
                </section>
            )}
            <Modal visible={showCancelModal} closable={true} maskClosable={true} onClose={() => {
                setShowCancelModal(false);
            }} cx={cx} className={cx("schedule_cancel_popup")}>
                <h2>예약을 취소하시겠습니까?</h2>
                <p className={cx("warning")}>예약 취소 후 예약 정보를 변경 할 수 없습니다</p>
                <div className={cx("btn_box")}>
                    <button className={cx("cancel_btn")} onClick={() =>{cancelSchedule()}}>예약 취소</button>
                    <Modal visible={showResultModal} closable={true} maskClosable={true} onClose={() => {
                        setShowResultModal(false);router.push("/introduce/space_reservation/check");
                    }} cx={cx} className={cx("schedule_cancel_popup")}>
                        <h2>수정이 완료되었습니다</h2>
                        <div className={cx("btn_box")}>
                            <button className={cx("close_btn")} onClick={() =>{setShowResultModal(false);router.push("/introduce/space_reservation/check")}}>확인</button>
                        </div>
                    </Modal>
                </div>
            </Modal>

            <Modal visible={showEditModal} closable={true} maskClosable={true} onClose={() => {
                setShowEditModal(false);
            }} cx={cx} className={cx("schedule_cancel_popup")}>
                <h2>예약정보를 수정하시겠습니까?</h2>
                <div className={cx("btn_box")}>
                    <button className={cx("update_btn")} onClick={() =>{editSchedule()}}>수정</button>
                    <Modal visible={showResultModal} closable={true} maskClosable={true} onClose={() => {
                        setShowResultModal(false);router.push("/introduce/space_reservation/check");
                    }} cx={cx} className={cx("schedule_cancel_popup")}>
                        <h2>수정이 완료되었습니다</h2>
                        <div className={cx("btn_box")}>
                            <button className={cx("close_btn")} onClick={() =>{setShowResultModal(false);router.push("/introduce/space_reservation/check")}}>확인</button>
                        </div>
                    </Modal>
                </div>
            </Modal>
        </>
    );
};

export default ScheduleDetail;
