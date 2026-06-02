import React, {useEffect, useState} from 'react';
import PageNavigation from "../../component/layout/PageNavigation";
import Link from 'next/link'
import styles from '../../public/assets/styles/mentor/mentor.module.css';
import classnames from "classnames/bind"
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import client,{baseUrl} from "../../lib/api/client";
import {getBestMentor} from "../../store/mentoring/mentoring";
import Slider from "react-slick";
import {Modal} from "antd";
import {useRouter} from "next/router";
import Head from "next/head";
const cx = classnames.bind(styles);


const mentorSliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed:3000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const CounselApply = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const {bestMentor,user} = useSelector(({auth,mentoring, loading}) => ({
        user: auth.user,
        bestMentor:mentoring.bestMentor
    }))

    const [image, setImage] = useState(null)
    const [mentorInfo, setMentorInfo] = useState(null)

    useEffect(() => {
        dispatch(getBestMentor())
    }, [])

    useEffect(() => {
        if(bestMentor != null){
            setMentorInfo({...mentorInfo,...bestMentor})
            setImage(bestMentor.filePath != null ? `${baseUrl}/resource${bestMentor.filePath}/${bestMentor.fileName+bestMentor.fileExtension}` : null)
        }

    }, [bestMentor])

    const moveCounselApply = () =>{
        // Modal.warning({
        //     title: (
        //         <div>
        //             원스톱창업상담은 현재 일시 중단이 되었고 <br/>
        //             프로그램 재개 시 홈페이지 공지됩니다.(2026.03.예정)
        //         </div>
        //     ),
        // });
        /*if(user.login == false || (user.role == "ROLE_MT") ){
            Modal.warning({
                title: (
                    <div>
                        원스톱창업상담은 현재 일시 중단이 되었고 <br/>
                        프로그램 재개 시 홈페이지 공지됩니다.(2026.03.예정)
                    </div>
                ),
            });
        }else{
            router.push("/startup_counsel/counsel_apply")
        }*/
    }

    const moveMentorApply = () =>{
        Modal.warning({
            title: '창업지원단(02-2220-3000)으로 문의바랍니다',
            content:''
        });
        // router.push("/startup_counsel/mentor_apply")
        // if(user.login == false ||  user.role != "ROLE_ADMIN" ){
        //     Modal.warning({
        //         title: '맨토신청은 당해년 05월 01일 부터 05월 31일까지 진행 합니다.',
        //         content:'멘토신청을 원하시면 멘토로 회원가입 및 인증 후 신청 가능 합니다.'
        //     });
        // }else{
        //     router.push("/startup_counsel/mentor_apply")
        // }
    }


    return (
        <>
            <Head>
                <title>한양대학교 창업지원단 -창업상담</title>
            </Head>
            <PageNavigation/>
            <section className={cx("sub_container","consultation")}>
                <h1 className={cx("sub_top_title")}>창업상담</h1>
                <p className={cx("sub_top_txt")}>
                    (예비)창업자의 기술·경영 애로사항을 해결하기 위해<br/>
                    온·오프라인 창업상담 프로그램을 운영합니다.
                </p>
                <div className={cx("txt_c")}>
                    <Link href={"/startup_counsel/mentor_introduce"}><a className={`${cx("basic-btn03","btn-blue-bg2")} mr_20`}>멘토찾기</a></Link>
                    <Link href={"/startup_counsel/counsel_apply"}><a className={cx("basic-btn03","btn-blue-bd")} onClick={() =>{moveCounselApply()}}>창업상담 신청하기</a></Link>
                </div>


                <div className={`${cx("mentor_month")} clfx`}>
                {bestMentor.length  != 0 &&
                    <Slider className="mentor_slider" {...mentorSliderSettings}>
                        {
                            bestMentor.map((item,j) =>(
                                <div key={j}>
                                        <div className={cx("title")}>
                                            <h2>우수 멘토</h2>
                                            <p>
                                                멘티로부터 추천받은 <br/>우수 멘토
                                            </p>
                                        </div>
                                        <div className={cx("photoArea")}>
                                            <div className={cx("photo")}>
                                                <img src={item.filePath != null ? `${baseUrl}/resource${item.filePath}/${item.fileName+item.fileExtension}`: '/assets/image/mentor_photo.jpg'} width={198} height={198} alt="mentor_photo"/>
                                            </div>
                                            <span className={cx("name")}>{item.mentorName}</span>
                                            <span className={cx("job")}>{item.mentorPosition}</span>
                                        </div>
                                        <div className={cx("txt_area")}>
                                            <div className={cx("tag")}>
                                                {item.mentorKeyword.map((keyword)=>(`#${keyword} `))}
                                            </div>
                                            <ul>
                                                {item.mentorCareer.map((career,i)=>(
                                                    i < 2 && <li key={i}>{career}</li>
                                                ))}
                                            </ul>
                                            <p>
                                                {item.mentorIntroduction}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </Slider>
                }
                </div>

                <div className={cx("before_counseling","txt_style_1")}>
                    <div className={cx("left_title")}>
                        <h2 className={cx("title_style_3")}>상담하기 전에 <br/>이것부터 보고가세요!</h2>
                        <div>
                            <Link href="/board/faq/list"><a className={cx("basic-btn03")}>자주 묻는 질문</a></Link>
                        </div>
                    </div>
                    <div className={cx("txtArea")}>
                        <ul className={`${cx("icon_list")} clfx`}>
                            <li className={cx("icon_1")}>
                                <Link href="/board/online_content/list?categoryCodeId=22">
                                <a>
                                    세무, 회계 <br/>기본지식 알고가기
                                </a>
                                </Link>
                            </li>
                            <li className={cx("icon_2")}>
                                <Link href="/board/online_content/list?categoryCodeId=20">
                                <a>
                                    사업계획서<br/>작성방법
                                </a>
                                </Link>
                            </li>
                            <li className={cx("icon_3")}>
                                <Link href="/board/online_content/list?categoryCodeId=24">
                                <a>
                                    스타트업 <br/>투자유치 A to Z
                                </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx("consultation_csCenter")}>
                    <div className={cx("txt_style_1")}>
                        <div className={cx("left_title")}>
                            <h2 className={cx("title_style_3")}>창업이 <br/>궁금할땐?</h2>
                        </div>
                        <div className={cx("txtArea")}>
                            <ul>
                                <li>
                                    <h3>창업상담 대표번호</h3>
                                    02-2220-3000
                                </li>
                                <li className={cx("kakao")}>
                                    카카오톡채널. 한양스타트업톡톡
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={cx("counselingBtnArea")}>
                    {/*<Link href={"/startup_counsel/mentor_apply"}><a>멘토지원하기</a></Link>*/}
                    <Link href={"#"} ><a onClick={() =>{moveMentorApply()}}>멘토지원하기</a></Link>
                </div>

                <div className={cx("step")}>
                    <div className={cx("txt_style_1")}>
                        <div className={cx("left_title")}>
                            <h2 className={cx("title_style_3")}>상담절차</h2>
                            <p>
                                온·오프라인 창업상담을 <br/>지원하고 있습니다.
                            </p>
                        </div>
                        <div className={cx("txtArea")}>
                            <ol>
                                <li>
                                    <span className={cx("number")}><strong>01.</strong> 상담신청</span>
                                    <ul>
                                        <li><span>상담대상: </span>한양대 창업지원단 창업지원사업 및 프로그램 수혜자, 한양대학교(원) 재(휴)학생 및 동문,
                                            수도권 내 대학 재(휴)학생, 수도권 소재 창업기업 대표, 수도권 거주자
                                        </li>
                                        <li><span>상담분야: </span>세무,회계 / 법률법무 / 지식재산권 / 마케팅판로 / 노무 / 투자 / 초기 창업자금 조달 /
                                            비즈니스모델링 / 시제품개발 /<br/>글로벌진출 / 스케일업(코스닥 CEO등) / 민간 기술자문(대기업 임직원) / 또래CEO
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span className={cx("number")}><strong>02.</strong> 멘토 배정</span>
                                    <p>
                                        멘토 배정에는 최대 일주일의 시간이 소요됩니다.
                                    </p>
                                </li>
                                <li>
                                    <span className={cx("number")}><strong>03.</strong> 상담일정조율</span>
                                    <p>
                                        최종 배정된 멘토가 멘티에게 연락하여 상담일, 시간, 장소, 멘토링 방법 등을 조율합니다.
                                    </p>
                                </li>
                                <li>
                                    <span className={cx("number")}><strong>04.</strong> 멘토링 진행</span>
                                    <p>
                                        온라인(화상) 또는 오프라인으로 상담을 진행할 수 있습니다.
                                    </p>
                                </li>
                                <li>
                                    <span className={cx("number")}><strong>05.</strong> 만족도 조사</span>
                                    <p>
                                        양질의 멘토링 서비스 제공을 위해 멘토링 만족도를 조사합니다.<br/>
                                        만족도 조사 후에 멘토의 종합의견을 열람할 수 있습니다.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

            </section>

        </>
    );
};

export default CounselApply;
