import React, {useCallback, useEffect, useState} from 'react';
import {getRentalType} from "../../common/util/StatusUtil";
import moment from "moment";
import {Modal} from "antd";

const ListTypeItem = ({schedule,manageItem,setManageItem,saveStatus}) => {

    useEffect(() =>{
        setManageItem(null)
        if(schedule != null){
            setEditStatus({
                scheduleId: schedule.scheduleId,
                status: schedule.status,
            })
        }
    },[schedule])

    const [editStatus, setEditStatus] = useState({
        scheduleId:null,
        status:null
    });

    const getPlaceInfo = (schedule)=>{
        let placeInfo = '';
        schedule.placeName != null ? placeInfo += schedule.placeName+" " : placeInfo += '';
        schedule.roomName != null ? placeInfo += schedule.roomName : placeInfo += '';

        if(placeInfo == ''){
            placeInfo = "정보 없음";
        }
        return placeInfo;
    }

    const changeStatus = (value) =>{
        setEditStatus({
            ...editStatus,
            status:value
        })
    }


    const selectSchedule = (scheduleId) =>{
        setManageItem(scheduleId)
    }

    const showDetail = (item) =>{
        Modal.info({
            title: item.userName,
            content:<div>
                <p>이름:{item.userName}</p>
                <p>소속:{item.userCompany}</p>
                <p>전화번호:{item.userPhoneNum}</p>
            </div>,
            mask:false,
        });

    }

    const cancelManage = () =>{
        selectSchedule(null)
        setEditStatus({
            ...editStatus,
            status:schedule.status
        })

    }


    return (
        <tr>
            <td>{schedule.rownum}</td>
            <td onClick={(e) =>{showDetail(schedule)}} style={{cursor:"pointer"}}>{schedule.reservationNum}</td>
            <td>{getPlaceInfo(schedule)}</td>
            <td>
                <p>{schedule.userName}</p>
                <p>{schedule.userId}</p>
            </td>
            <td>
                {manageItem == schedule.scheduleId ? (
                        <select value={editStatus.status} onChange={(e) =>{changeStatus(e.target.value)}}>
                            {/*<option value="APPLY">{getRentalType("APPLY")}</option>*/}
                            <option value="RETURN">{getRentalType("RETURN")}</option>
                            <option value="ACCEPT">{getRentalType("ACCEPT")}</option>
                            <option value="CANCEL">{getRentalType("CANCEL")}</option>
                        </select>

                ):(
                    getRentalType(editStatus.status)
                )}</td>
            <td>{schedule.purpose}</td>
            <td>{schedule.rentalDate}</td>
            <td>
                {schedule.timeSlots && schedule.timeSlots.map((slot, i) => (
                    <p key={i}>{moment(slot.rentalStartTime,"HH:mm:ss").format("HH:mm")} ~ {moment(slot.rentalEndTime,"HH:mm:ss").format("HH:mm")}</p>
                ))}
            </td>
            <td>{moment(schedule.regDate).format("YYYY-MM-DD HH:mm:ss")}</td>
            <td>
                {manageItem == schedule.scheduleId ? (
                    <>
                        <button onClick={() =>{saveStatus(editStatus);}}>저장</button>
                        <button onClick={() =>{cancelManage()}}>취소</button>
                    </>

                ):(
                    <button onClick={(e) =>{e.preventDefault();selectSchedule(schedule.scheduleId);}}>관리</button>
                )}
            </td>
        </tr>
    );
};

export default React.memo(ListTypeItem);
