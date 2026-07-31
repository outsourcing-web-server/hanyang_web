import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import styles from '../../public/assets/styles/startup_info/startup_info.module.css';
import classnames from "classnames/bind"
import BoardSkinSelector from "../../component/skin/board/BoardSkinSelector";
import {useRouter} from "next/router";
import qs from 'query-string';
import {useDispatch, useSelector} from "react-redux";
import {getStartupCalendarList} from "../../store/startupCalendar/startupCalendar";
import {getRentalScheduleList} from "../../store/spaceRental/spaceRental";
import PageNavigation from "../../component/layout/PageNavigation";
import {Button, Modal} from "antd";
import Head from "next/head";
import {isMobile} from "react-device-detect";

const cx = classnames.bind(styles);

const StartupEvent = () => {

    const router = useRouter();
    const dispatch = useDispatch();


    const [searchInfo, setSearchInfo] = useState({
        type: "",
        categoryCodeId: "",
        page: ""
    })

    const [showContent,setShowContent] = useState(null);
    const [events, setEvents] = useState([]);

    const {startupCalendar, scheduleList, user} = useSelector(({startupCalendar, spaceRental, auth, loading}) => ({
        startupCalendar: startupCalendar.startupCalendar,
        scheduleList: spaceRental.getRentalScheduleList,
        user: auth.user
    }))

    useEffect(() => {

        const {type = "L"} = router.query
        setSearchInfo(searchInfo => ({
            ...searchInfo,
            type: isMobile ? "L" : type
        }))

        const {page = 1, date = "", categoryCodeId = null, searchValue = null, searchField = null} = router.query

        const data = {
            page: page,
            categoryCodeId: categoryCodeId,
            searchValue: searchValue,
            searchField: searchField,
            date: date,
            showCalendar:true
        }

        dispatch(getStartupCalendarList(data))

    }, [router.query])

    useEffect(() => {
        if(user.login){
            dispatch(getRentalScheduleList({page:1, size: 1000}))
        }
    }, [user.login])

    useEffect(() => {
        let newEvents = [...startupCalendar.list];
        if (scheduleList && scheduleList.list) {
            const rentalEvents = scheduleList.list
                .filter(item => item.status !== 'CANCEL' && item.status !== 'RETURN')
                .map(item => ({
                id: `rental-${item.scheduleId}`,
                title: `[공간예약] ${item.roomName || item.placeName}`,
                content: `
                    <div>
                        <p><strong>장소:</strong> ${item.placeName} ${item.roomName}</p>
                        <p><strong>일시:</strong> ${item.rentalDate} ${item.rentalStartTime} ~ ${item.rentalEndTime}</p>
                        <p><strong>목적:</strong> ${item.purpose}</p>
                    </div>
                `,
                start: new Date(`${item.rentalDate}T${item.rentalStartTime}`),
                end: new Date(`${item.rentalDate}T${item.rentalEndTime}`),
                isRental: true,
                startupCalendarId: `rental-${item.scheduleId}`,
            }));
            newEvents = [...newEvents, ...rentalEvents];
        }
        setEvents(newEvents);
    }, [startupCalendar.list, scheduleList.list])


    const changeCategory = useCallback((e) => {
        const {type} = router.query
        const data = {
            type: type,
            page: 1,
            categoryCodeId: e
        }
        const queryString = qs.stringify(data);
        router.push(`${router.pathname}?${queryString}`)
    }, [router.query])

    const changeType = useCallback((e) => {
        const {type = "C", page = 1, categoryCodeId = ""} = router.query
        const data = {
            type: e,
            page: page,
            categoryCodeId: categoryCodeId
        }
        const queryString = qs.stringify(data);
        router.push(`${router.pathname}?${queryString}`)
    }, [])

    const pageChange = useCallback((page) => {
        const {type = "C", categoryCodeId = ""} = router.query
        const data = {
            type: type,
            page: page,
            categoryCodeId: categoryCodeId
        }
        const queryString = qs.stringify(data);
        router.push(`${router.pathname}?${queryString}`)
    }, [router.query])


    const handleShowContent = (item)=>{
        setShowContent(item)
    }
    return (
        <>

            <Head>
                <title>한양대학교 창업지원단 -창업캘린더</title>
            </Head>
            <PageNavigation/>
            <section className={cx("container")}>
                <div className={cx("sub_container", "calendar")}>
                    <h1 className={cx("sub_top_title")}>창업캘린더</h1>
                    <p className={cx("sub_top_txt")}>(예비)창업자를 위한 유익한 창업지원 소식을 제공합니다.</p>
                    {searchInfo.type == "C" && (
                        <BoardSkinSelector skinName={'Calendar01'} events={events} cateList={startupCalendar.cate}
                                           changeCategory={changeCategory} changeType={changeType} handleShowContent={handleShowContent}/>

                    )}
                    {searchInfo.type == "L" && (
                        <BoardSkinSelector skinName={'EventListType01'} list={startupCalendar.list} cateList={startupCalendar.cate}
                                           page={startupCalendar.page} pageChange={pageChange} changeCategory={changeCategory}
                                           changeType={changeType} handleShowContent={handleShowContent}/>
                    )}
                </div>
                {showContent != null && (
                    <Modal title={showContent.title} visible={showContent != null}
                           onCancel={() =>{setShowContent(null)}}
                           footer={[
                               <Button key="back" onClick={() =>{setShowContent(null)}}>
                                   확인
                               </Button>,
                           ]}
                    >
                        {
                            <div dangerouslySetInnerHTML={{__html: showContent.content != null ? showContent.content : '<div></div>'}}/>
                        }
                    </Modal>
                )}
            </section>
        </>

    );
};

export default StartupEvent;
