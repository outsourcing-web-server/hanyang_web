import React, {useEffect} from 'react';
import moment from "moment";
import {Form, Input} from "antd";
moment.lang('ko', {
    weekdays: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
    weekdaysShort: ["일","월","화","수","목","금","토"],
});

const RentalStep02 = ({cx,selectPlace,selectRoom ,selectDate ,selectTime ,setStep ,rentalInfo ,setRentalInfo,handleRentalApply}) => {

    const [form] = Form.useForm();

    useEffect(() =>{
        if (selectRoom == null || selectDate == null || selectTime.length === 0) {
            setStep(1)
        }

    },[])
    const changeInfo = (e) =>{
        const {name,value} = e.target
        setRentalInfo({
            ...rentalInfo,
            [name]: value
        })
    }

    return (
        <div className={cx("sssup_step2")}>
            <Form form={form} onFinish={(e) =>{handleRentalApply()}}>
            <div className={cx("building")}>
                <span className={cx("title")}>시설명</span>
                <span>{`${selectPlace.placeName} ${selectRoom.roomName}`}</span>
            </div>

            <div className={cx("rental_tb")}>
                <table>
                    <colgroup>
                        <col style={{width:'44.16%'}}/>
                        <col style={{width:'33.75%'}}/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">대관신청일시</th>
                        <th scope="col">행사시간</th>
                        <th scope="col">참석인원 <span>(최대 {selectRoom.capacity}명)</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td className={cx("start_time")}>
                        <div className={cx("top_th")}>대관신청일시</div>
                        {moment(selectDate).format("YYYY/MM/DD dddd")}
                    </td>
                    <td className={cx("event_time")}>
                        <div className={cx("top_th")}>시간</div>
                        <ul>
                            {selectTime.map((t, i) => (
                                <li key={i}>{t.startTime} ~ {t.endTime}</li>
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
							<Input type="number" max={selectRoom.capacity}  name="personCount" id="personCount" value={rentalInfo.personCount} onChange={changeInfo}/>
                            </Form.Item>
							{/*<label htmlFor="personCount">명</label>*/}
						</span>
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
                          onChange={(e) =>{changeInfo(e)}}
                          placeholder="최대 150자 입력하시기 바랍니다."></textarea>
                </Form.Item>
            </div>

            <div className={cx("btn_area")}>
                <button className={cx("basic-btn03","btn-black-bd")} onClick={() =>{setStep(1)}}>뒤로가기</button>
                <button type="submit" className={cx("basic-btn03","btn-blue-bd")}>예약하기</button>
            </div>
            </Form>
        </div>
    );
};

export default RentalStep02;
