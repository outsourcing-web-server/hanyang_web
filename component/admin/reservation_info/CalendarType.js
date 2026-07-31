import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from "react-big-calendar";
import {Button, Form, Modal, Upload} from "antd";
import moment from 'moment'
import 'moment/locale/ko';
import qs from "query-string";
import Image from "next/image";
import {useRouter} from "next/router";
import {getRentalType} from "../../common/util/StatusUtil";

const localizer = momentLocalizer(moment)

const CalendarType = ({cx, scheduleList, pageChange, manageItem, setManageItem, saveStatus}) => {
    const router = useRouter();

    const [eventList, setEventList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailInfo, setDetailInfo] = useState(false);
    const [moreEvent, setMoreEvent] = useState({
        date: null,
        events: []
    });

    const [editStatus, setEditStatus] = useState({
        scheduleId:null,
        status:null
    });

    const getPlaceInfo = (schedule) => {
        let placeInfo = '';
        schedule.placeName != null ? placeInfo += schedule.placeName + " " : placeInfo += '';
        schedule.roomName != null ? placeInfo += `[${schedule.roomName}]` : placeInfo += '';

        if (placeInfo == '') {
            placeInfo = "정보 없음";
        }
        return placeInfo;
    }

    const handleDetail = (event) => {
        setShowDetail(true)
        setEditStatus({
            scheduleId:event.scheduleId,
            status:event.status
        })
        setDetailInfo(event)
    }

    const changeStatus = (value) =>{
        setEditStatus({
            ...editStatus,
            status:value
        })
    }

    useEffect(() => {
    }, [])

    useEffect(() => {
        if (scheduleList.list.length > 0) {
            const result = scheduleList.list.map((item) => {

                return {
                    ...item,
                    id: item.scheduleId,
                    title: getPlaceInfo(item),
                    start: item.rentalDate,
                    end: item.rentalDate,
                }
            })
            setEventList(result)
        }
    }, [scheduleList])

    const changeMonth = (date) => {
        const month = moment(date).format("YYYY-MM").toString()

        const {type} = router.query
        const data = {
            type: type,
            date: month
        }
        const queryString = qs.stringify(data);
        router.push(`${router.pathname}?${queryString}`)

    }


    let MyCustomHeader = ({label}) => (
        <div>
            <div className={cx("header")}>{label}</div>
        </div>
    )

    const CustomEvent = (event) => {
        const data = event.event != undefined ? event.event :event;
        return (
            <div onClick={() => handleDetail(data)} key={data.scheduleId}>
                {data.timeSlots && data.timeSlots.map((slot, i) => (
                    <p key={i}>{`${moment(slot.rentalStartTime,"HH:mm:ss").format("HH:mm")} ~ ${moment(slot.rentalEndTime,"HH:mm:ss").format("HH:mm")}`}</p>
                ))}
                <button className={cx("event_title")} >
                    {`${data.title}`}
                </button>
            </div>
        )
    }

    const YourCalendarDateHeader = ({label}) => {
        return (
            <p className={cx("date")}>{label}</p>
        )
    }

    const CustomToolbar = (toolbar) => {

        const goToBack = () => {

            toolbar.onNavigate('PREV');
        };

        const goToNext = () => {

            toolbar.onNavigate('NEXT');
        };

        const goToCurrent = () => {
            const now = new Date();
            toolbar.date.setMonth(now.getMonth());
            toolbar.date.setYear(now.getFullYear());
            toolbar.onNavigate('current');
        };

        const label = () => {
            const date = moment(toolbar.date);
            return (
                <span><b>{date.format('YYYY.MM')}</b></span>
            );
        };
        return (
            <div className={cx("calendar_top")}>
                <div className={cx("calendar_year")}>
                    <button type="button" onClick={goToBack}><Image src="/assets/image/calendar_prev.png" width={16}
                                                                    height={28} alt="photo_btn"/></button>
                    {label()}
                    <button type="button" onClick={goToNext}><Image src="/assets/image/calendar_next.png" width={16}
                                                                    height={28} alt="photo_btn"/></button>
                </div>

                {/*<ul className={cx("category")}>*/}
                {/*    <li><a href="#" onClick={() =>{changeCategory("")}} className={cx({on:router.query.categoryCodeId == null  || router.query.categoryCodeId == ""})}>전체</a></li>*/}
                {/*    {cateList.map((item) =>(*/}
                {/*        <li key={item.categoryCodeId}><a href="#" className={cx({on:router.query.categoryCodeId == item.categoryCodeId})} onClick={() =>{changeCategory(item.categoryCodeId)}}>{item.categoryCodeName}</a></li>*/}
                {/*    ))}*/}
                {/*</ul>*/}

                {/*<ul className={cx("type", "clfx")}>*/}
                {/*    <li className={cx("on")}>*/}
                {/*        <button type="button" className={cx("icon_calendar_type")} onClick={() => {*/}
                {/*            changeType("C")*/}
                {/*        }}>달력형*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <button type="button" className={cx("icon_list_type")} onClick={() => {*/}
                {/*            changeType("L")*/}
                {/*        }}>목록형*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        );
    };

    return (
        <div className={cx("calendar_type")}>
            <Calendar
                localizer={localizer}
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                style={{height: 1200}}
                onNavigate={changeMonth}
                popup={true}
                canRenderSlotEvent={2}
                onShowMore={(events, date) => {
                    setShowModal(true);
                    setMoreEvent({...moreEvent, date: date, events: events});
                }}
                components={{
                    month: {header: MyCustomHeader, dateHeader: YourCalendarDateHeader},
                    event: CustomEvent,
                    toolbar: CustomToolbar,
                }}
            />

            <Modal title={moment(moreEvent.date).format("YYYY년 MM월 DD일")} visible={showModal}
                   zIndex={5}
                   onCancel={() => {
                       setShowModal(false)
                   }}
                   footer={[
                       <Button key="back" onClick={() => {
                           setShowModal(false)
                       }}>
                           확인
                       </Button>,
                   ]}
            >
                {
                    moreEvent.events.map((event) =>
                        CustomEvent(event)
                    )
                }
            </Modal>
            <Modal title={getPlaceInfo(detailInfo)} visible={showDetail}
                   zIndex={10}
                   onCancel={() => {
                       setShowDetail(false)
                   }}
                   footer={[
                       <Button key="back" onClick={() => {
                           setShowDetail(false);saveStatus(editStatus);
                       }}>
                           저장
                       </Button>,
                       <Button key="close" onClick={() => {
                           setShowDetail(false);
                       }}>
                           닫기
                       </Button>,
                   ]}
            >
                <div className={cx("tb_style_2")}>
                    <table>
                        <colgroup>
                            {/*<col style={{width: 240}}/>*/}
                            {/*<col/>*/}
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">예약번호</th>
                            <td>{detailInfo.reservationNum}</td>
                        </tr>
                        <tr>
                            <th scope="row">장소</th>
                            <td>{detailInfo.placeName}</td>
                        </tr>
                        <tr>
                            <th scope="row">공간</th>
                            <td>{detailInfo.roomName}</td>
                        </tr>
                        <tr>
                            <th scope="row">예약자 정보</th>
                            <td>
                                {detailInfo.userName}&nbsp;&nbsp;{detailInfo.userId}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">인원</th>
                            <td>
                                {detailInfo.personCount}명
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">상태</th>
                            <td>
                                <select value={editStatus.status} onChange={(e) =>{changeStatus(e.target.value)}}>
                                    <option value="APPLY">{getRentalType("APPLY")}</option>
                                    <option value="RETURN">{getRentalType("RETURN")}</option>
                                    <option value="ACCEPT">{getRentalType("ACCEPT")}</option>
                                    <option value="CANCEL">{getRentalType("CANCEL")}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">사유</th>
                            <td>{detailInfo.purpose}</td>
                        </tr>
                        <tr>
                            <th scope="row">이용일</th>
                            <td>
                                {detailInfo.rentalDate}{' '}
                                {detailInfo.timeSlots && detailInfo.timeSlots.map((slot, i) => (
                                    <span key={i}>{`${moment(slot.rentalStartTime,"HH:mm:ss").format("HH:mm")} ~ ${moment(slot.rentalEndTime,"HH:mm:ss").format("HH:mm")}`}{i < detailInfo.timeSlots.length - 1 && ', '}</span>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">신청일</th>
                            <td>{moment(detailInfo.regDate).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
};

export default CalendarType;
