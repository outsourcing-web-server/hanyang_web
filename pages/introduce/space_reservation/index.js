import React, {useEffect, useState} from 'react';
import Link from 'next/link'

import styles from '../../../public/assets/styles/rental/rental.module.css';
import classnames from "classnames/bind"
import {useDispatch, useSelector} from "react-redux";
import wrapper from "../../../store/configureStore";
import client from "../../../lib/api/client";
import {
    addRentalSchedule,
    getAvailableRoomTimeList,
    getSpaceRentalInfoAll,
    initialize
} from "../../../store/spaceRental/spaceRental";
import {END} from "redux-saga";
import moment from "moment";

moment.lang('ko', {
    weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
});

import DatePicker from "react-datepicker";
import {Empty,Modal} from 'antd';
import RentalStep02 from "../../../component/rental/RentalStep02";

const cx = classnames.bind(styles);
const MAX_TIME_SLOTS = 3;

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//
//     const cookie = context.req && context.req.headers.cookie ? context.req.headers.cookie : '';
//     client.defaults.headers.Cookie = cookie;
//
//     context.store.dispatch(getSpaceRentalInfoAll());
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
// })

const SpaceReservation = () => {

    const dispatch = useDispatch();
    const [space, setSpace] = useState({
        place: null,
        room: null,
        time: null,
    })

    const [showResultModal, setShowResultModal] = useState(false);
    const [selectPlace, setSelectPlace] = useState(null);
    const [selectRoom, setSelectRoom] = useState(null);
    const [selectDate, setSelectDate] = useState(null);
    const [selectTime, setSelectTime] = useState([]);
    const [step, setStep] = useState(1);
    const [rentalInfo, setRentalInfo] = useState({
        personCount: 0,
        purpose: "",
    })
    // const [personCount, setPersonCount] = useState(null);
    // const [purpose, setPurpose] = useState(null);

    const [applyActive, setApplyActive] = useState(false);


    const {spaceInfo, addSchedule, spaceInfoLoading, user, timeListLoading, addScheduleLoading} = useSelector(({
                                                                                                                   auth,
                                                                                                                   spaceRental,
                                                                                                                   loading
                                                                                                               }) => ({
        spaceInfo: spaceRental.spaceInfo,
        addSchedule: spaceRental.addSchedule,
        user: auth.user,
        spaceInfoLoading: loading['popup/GET_SPACE_RENTAL_INFO_ALL'],
        timeListLoading: loading['popup/GET_AVAILABLE_ROOM_TIME_LIST'],
        addScheduleLoading: loading['popup/ADD_RENTAL_SCHEDULE']
    }))

    useEffect(() => {
        dispatch(getSpaceRentalInfoAll());

        return () => {
            dispatch(initialize());
        }

    }, [])

    useEffect(() => {
        if (selectPlace != null && selectRoom != null && selectDate != null && selectTime.length > 0) {
            setApplyActive(true);
        } else {
            setApplyActive(false);
        }
    }, [selectPlace, selectRoom, selectDate, selectTime])

    useEffect(() => {
    }, [space])

    useEffect(() => {
        if (!spaceInfoLoading) {
            setSpace({
                ...space,
                place: spaceInfo.place,
                time: spaceInfo.time
            })
        }
    }, [spaceInfo, spaceInfoLoading])

    const handleSelectPlace = (place) => {
        setSpace({
            ...space,
            room: spaceInfo.room.filter(room => room.placeId == place.placeId),
            time: null
        })
        setSelectPlace(place);
        setSelectRoom(null);
        setSelectTime([])
    }

    const handleSelectRoom = (room) => {
        setSelectRoom(room);
        setSelectTime([])
        setSpace({
            ...space,
            time: null
        })
        const today = moment().format("YYYY-MM-DD").toString()
        dispatch(getAvailableRoomTimeList(room.roomId, today));
    }

    const handleDateChange = (date) => {
        setSelectDate(date)

        const changeDate = moment(date).format("YYYY-MM-DD").toString();
        dispatch(getAvailableRoomTimeList(selectRoom.roomId, changeDate));

    }

    const handleTimeChange = (time) => {
        const alreadySelected = selectTime.some(t => t.timeId === time.timeId)
        if (alreadySelected) {
            setSelectTime(selectTime.filter(t => t.timeId !== time.timeId))
        } else {
            if (selectTime.length >= MAX_TIME_SLOTS) {
                Modal.warning({
                    title: `최대 ${MAX_TIME_SLOTS}개의 시간만 선택할 수 있습니다`,
                })
                return
            }
            setSelectTime([...selectTime, {
                startTime: moment(time.startTime, "HH:mm:ss").format("HH:mm").toString(),
                endTime: moment(time.endTime, "HH:mm:ss").format("HH:mm").toString(),
                timeId: time.timeId
            }])
        }
    }

    const handleRentalApply = () => {
        if (!user.login) {
            Modal.warning({
                title: '공간 예약을 하기 위해서는 로그인이 필요합니다',
            });
        }
        const data = {
            roomId: selectRoom.roomId,
            rentalDate: moment(selectDate).format("YYYY-MM-DD").toString(),
            timeSlots: selectTime.map(t => ({
                rentalStartTime: t.startTime,
                rentalEndTime: t.endTime
            })),
            ...rentalInfo
        }
        dispatch(addRentalSchedule(data));
    }
    useEffect(() => {
        if (!addScheduleLoading && addSchedule.result && addSchedule.error == null) {
            // setShowResultModal(true)
            Modal.success({
                title: '예약이 완료되었습니다',
            });
            setSpace({
                ...space,
                room: null,
                time: null,
            })
            setSelectPlace(null)
            setSelectRoom(null)
            setSelectDate(new Date());
            setSelectTime([])
            dispatch(getSpaceRentalInfoAll());
        } else if (!addScheduleLoading && !addSchedule.result && addSchedule.code == 409) {
            alert("중복된 일정입니다")
            const today = moment().format("YYYY-MM-DD").toString()
            dispatch(getAvailableRoomTimeList(selectRoom.roomId, today));
        }

        setStep(1)

    }, [addSchedule, addScheduleLoading])

    const isWeekday = date => {
        let isActive;
        const day = moment(date).day();
        const possibleDay = selectRoom.possibleDay.split(";");
        isActive = possibleDay.some(item => {
            if (day === parseInt(item)) {
                return day === parseInt(item);
            }
        })
        if (!selectRoom.isHoliday) {
            isActive = day !== 0 && day !== 6;
        }
        return isActive;
    };


    const nextStep = () => {
        // roomId: selectRoom.roomId,
        //     rentalDate: moment(selectDate).format("YYYY-MM-DD").toString(),
        //     rentalStartTime: selectTime.time,
        //     rentalEndTime: selectTime.endTime,
        //     personCount: personCount,
        //     purpose: purpose

        if (selectRoom == null || selectDate == null || selectTime.length === 0) {
            // alert("입력부족")
        } else if (!user.login) {
            Modal.warning({
                title: '공간 예약을 하기 위해서는 로그인이 필요합니다',
            });
        } else {
            setStep(2)
        }


    }


    return (
        <>
            <section className={cx("container")}>
                <div className={`${cx("sub_container", "sssup")} `}>
                    <h1 className={cx("sub_top_title")}>공간 예약 시스템</h1>
                    <div className={`${cx("tab_style_2")} mb_30`}>
                        <ul>
                            <li className={cx("on")}><Link
                                href="/introduce/space_reservation"><a><span>공간 신청하기</span></a></Link></li>
                            <li><Link href="/introduce/space_reservation/check"><a><span> 확인/ 취소하기</span></a></Link>
                            </li>
                        </ul>
                    </div>
                    {step == 1 && (
                        <>
                            <h2 className={`${cx("title_style_2")} mb_10 `}>공간리스트</h2>
                            <div className={cx("infrastructure_btm")}>
                                <div className={"clfx"}>
                                    <div className={cx("left_area")}>
                                        <h2>HIT - B233 회의실</h2>
                                        <ul>
                                            <li>
                                                <img src="/assets/image/place01.jpg" alt="infra_town_1"/>
                                            </li>
                                            <li>
                                                <img src="/assets/image/place02.jpg" alt="infra_town_1"/>
                                            </li>
                                        </ul>
                                        <span className={cx("txt")}>최대 10인</span>
                                    </div>
                                    <div className={cx("right_area")}>
                                        <h2>코맥스 스타트업 타운 - 데카콘룸</h2>
                                        <ul>
                                            <li>
                                                <img src="/assets/image/place03.jpg" alt="데카콘룸"/>
                                            </li>
                                            <li>
                                                <img src="/assets/image/place04.jpg" alt="데카콘룸" />
                                            </li>
                                        </ul>
                                        <span className={cx("txt")}>최대 30인</span>
                                    </div>
                                    <div className={cx("left_area")}>
                                        <h2>양민용라운지 - Action1</h2>
                                        <ul>
                                            <li>
                                                <img src="/assets/image/place05.jpg" alt="양민용라운지-Action"/>
                                            </li>
                                        </ul>
                                        <span className={cx("txt")}>최대 4인</span>
                                    </div>
                                    <div className={cx("right_area")}>
                                        <h2>양민용라운지 - Action2</h2>
                                        <ul>
                                            <li>
                                                <img src="/assets/image/place06.jpg" alt="양민용라운지-Action"/>
                                            </li>
                                        </ul>
                                        <span className={cx("txt")}>최대 4인</span>
                                    </div>
                                    <div className={cx("left_area")}>
                                        <h2>양민용라운지 - Design1</h2>
                                        <ul>
                                            <li>
                                                <img src="/assets/image/place07.jpg" alt="양민용라운지-Design"/>
                                            </li>
                                        </ul>
                                        <span className={cx("txt")}>최대 6인</span>
                                    </div>
                                    <div className={cx("right_area")}>
                                        <h2>양민용라운지 - Design2</h2>
                                        <ul>
                                            <li>
                                                <img src="/assets/image/place08.jpg" alt="양민용라운지-Design" />
                                            </li>
                                        </ul>
                                        <span className={cx("txt")}>최대 6인</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`${cx("top_area")} clfx mb_20`}>
                                <p className={cx("left_txt")}>*본 공간은 한양대학교 학생 및 구성원, 창업중심대, 캠퍼스타운, 창업동아리를 대상으로 운영하는 회의실입니다. (외부인 신청불가)</p>
                                <p className={cx("left_txt")}>*일 최대 3시간까지 예약이 가능하며, 기타문의 사항은 창업지원단(02-2220-3000)으로 연락바랍니다.</p>
                            </div>
                            <div className={cx("apply_hd")}>
                                <div className={cx("w_1")}>공간설명</div>
                                <div className={cx("w_2")}>위치</div>
                                {/*<div className={cx("w_3")}>수용인원</div>*/}
                                <div className={cx("w_4")}>날짜</div>
                                <div className={cx("w_5")}>시간</div>
                            </div>
                            <div className={cx("scroll_wrap")}>
                                <div className={cx("apply_tb", "scroll_tb")}>
                                    {/*<div className={cx("box")}>*/}
                                    <div className={cx("box_inner", "w_1")}>
                                        <ul>
                                            {space.place != null && space.place.map((place) =>
                                                <li key={place.placeId}
                                                    className={cx({select: selectPlace != null && place.placeId == selectPlace.placeId})}>
                                                    <button onClick={() => {
                                                        handleSelectPlace(place)
                                                    }}>{place.placeName}</button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className={cx("box_inner", "w_2")}>
                                        <ul>
                                            {space.room != null && space.room.map((room) =>
                                                <li key={room.roomId}
                                                    className={cx({select: selectRoom != null && room.roomId == selectRoom.roomId})}>
                                                    <button onClick={() => {
                                                        handleSelectRoom(room)
                                                    }}>{room.roomName}</button>
                                                </li>
                                            )}
                                            {selectPlace != null && space.room != null && space.room.length == 0 &&
                                            <Empty className={cx("no-data")} image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                   description={"예약 가능한 장소가 없습니다"}/>}
                                        </ul>
                                    </div>
                                    <div className={cx("box_inner", "date_picker", "w_4")}>
                                        {selectRoom != null && (
                                            <DatePicker
                                                locale="ko"
                                                minDate={new Date()}
                                                popperModifiers={{preventOverflow: {enabled: true}}}
                                                dayClassName={date => moment(date).day() === 0 ? "saturday" : moment(date).day() === 6 ? "sunday" : undefined}
                                                filterDate={isWeekday}
                                                selected={selectDate}
                                                onChange={date => handleDateChange(date)}
                                                onMonthChange={date => handleDateChange(date)}
                                                inline
                                                disabledKeyboardNavigation
                                            />
                                        )}
                                    </div>
                                    <div className={cx("box_inner", "w_5", "time_list")}>
                                        <ul>
                                            {space.time != null && space.time.map((time) =>
                                                <li key={time.timeId}>
                                                    <a
                                                        className={cx(!time.duplicate && selectTime.some(t => t.timeId === time.timeId) ? "on" : !time.duplicate ? 'active' : "disable")}
                                                        disabled={time.duplicate} onClick={() => {
                                                        handleTimeChange(time)
                                                    }}>
                                                        {moment(time.startTime, "hh:mm:ss").format("H:mm").toString()}
                                                        ~
                                                        {moment(time.endTime, "hh:mm:ss").format("H:mm").toString()}
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                        {space.time == null || space.time.length == 0 &&
                                        <Empty className={cx("no-data")} image={Empty.PRESENTED_IMAGE_SIMPLE}
                                               description={"예약 가능한 일정이 없습니다"}/>}
                                    </div>
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className={cx("txt_c")}>
                                <button className={cx("basic-btn03", "btn-blue-bd")} onClick={(e) => {
                                    nextStep();
                                }} disabled={selectRoom == null || selectDate == null || selectTime.length === 0}>다음단계
                                </button>
                            </div>
                        </>
                    )}
                    {step == 2 && (
                        <RentalStep02 cx={cx} selectPlace={selectPlace} selectRoom={selectRoom} selectDate={selectDate}
                                      selectTime={selectTime} setStep={setStep} rentalInfo={rentalInfo}
                                      setRentalInfo={setRentalInfo} handleRentalApply={handleRentalApply}/>
                    )}

                </div>

                {/*<Modal visible={showResultModal} closable={true} maskClosable={true} onClose={() => {*/}
                {/*    setShowResultModal(false);*/}
                {/*}} cx={cx} className={"rental_popup"}>*/}
                {/*    <h2 className={cx("popup_title")}>예약이 완료되었습니다</h2>*/}
                {/*    <div className={cx("btn_box")}>*/}
                {/*        <button className={cx("basic-btn01", "btn-gray-bg")} onClick={() => {*/}
                {/*            setShowResultModal(false);*/}
                {/*        }}>확인*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</Modal>*/}
            </section>
        </>
    );
};

export default SpaceReservation;
