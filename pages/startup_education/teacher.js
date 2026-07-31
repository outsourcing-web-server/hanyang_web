import React from 'react';
import PageNavigation from "../../component/layout/PageNavigation";
import Link from 'next/link'
import Image from "next/image";
import styles from '../../public/assets/styles/startup_education/startup_education.module.css';
import classnames from "classnames/bind"
import Head from "next/head";


const cx = classnames.bind(styles);

const Teacher = () => {
    return (
        <>
            <Head>
                <title>한양대학교 창업지원단 -교원 창업</title>
            </Head>
            <PageNavigation/>
            <section className={cx("container","teacherCont")}>
                <div className={cx("sub_cont","sub_cont_top")}>
                    <h1 className={cx("sub_top_title")}>교원 창업</h1>
                    <p className={cx("sub_top_txt")}>대학(원) 실험실 기술 중 창업 적합성 및 가능성이 우수하고, <br />1년 내 실제 창업이 가능한 기술을 선정해 실험실 창업 지원</p>
                </div>

                <div className={cx("gray_bg")}>
                    <div className={cx("sub_cont")}>
                        <div className={cx("txt_style_1")}>
                            <div className={cx("left_title")}>
                                <h1 className={cx("title_style_2")}>교원창업 가이드북</h1>
                            </div>
                            <div className={cx("txtArea")}>
                                <Link href="/assets/download/한양대학교서울_교원창업_가이드북_25년12월_1.pdf">
                                    <a download target="_blank">
                                        <p className={cx("txt_1")}>
                                            교원창업 가이드북(ver. 2025.12) 다운받기
                                        </p>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("sub_cont")}>
                    <div className={cx("txt_style_1")}>
                        <div className={cx("left_title")}>
                            <h1 className={cx("title_style_2")}>교원창업 목적</h1>
                        </div>
                        <div className={cx("txtArea")}>
                            <p className={cx("txt_1")}>
                                대학 내 교수 및 연구실의 실험실 연구성과를 창업아이템으로 하여 기술력과 일정조건을 갖춘 교수 및 연구실에 대해 벤처기업으로의 창업을 허가함으로써 대학의 기술지주회사 제도와 함께 성공적 기술사업화를 통한 실용학풍의 구현 및 대학과 산업발전에 이바지함을 목적으로 한다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={cx("sub_cont")}>
                    <div className={cx("txt_style_1")}>
                        <div className={cx("left_title")}>
                            <h1 className={cx("title_style_2")}>교원창업 개념</h1>
                        </div>
                        <div className={cx("txtArea")}>
                            <p className={cx("txt_1")}>대학으로부터 일정조건을 갖추어 휴직 또는 겸직이 허용되는 전임교수가 실험실 및 연구공간과 인프라를 활용하여 벤처 기업을 설립하고, 보유하고 있는 연구성과를 사업화함을 말한다.</p>
                            <div className={cx("info_tb")}>
                                <table>
                                    <colgroup>
                                        <col style={{width: "30%"}}/>
                                        <col style={{width: "70%"}}/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th scope="col">구분</th>
                                        <th scope="col">실험실창업</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{borderLeft: 0}}>지분구조</td>
                                        <td style={{borderRight: 0}}>창업자인 교수 또는 연구자의 지분으로 구성</td>
                                    </tr>
                                    <tr>
                                        <td style={{borderLeft: 0}}>대학기술투자 참여방법</td>
                                        <td style={{borderRight: 0}}>지재권은 산학협력단이 보우, 필요할 경우 창업기업과 라이센싱 혹은 양도계약 체결</td>
                                    </tr>
                                    <tr>
                                        <td style={{borderLeft: 0}}>기타</td>
                                        <td style={{borderRight: 0}}>교수 또는 연구자의 직접운영</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("gray_bg")}>
                    <div className={cx("sub_cont")}>
                        <div className={cx("txt_style_1")}>
                            <div className={cx("left_title")}>
                                <h1 className={cx("title_style_2")}>교원창업 절차도</h1>
                            </div>
                            <div className={cx("txtArea")}>
                                <img src="/assets/image/teacher_process.png" alt="process"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("sub_cont")}>
                    <div className={cx("txt_style_1")}>
                        <div className={cx("left_title")}>
                            <h1 className={cx("title_style_2")}>교원창업 교내 <br/>제출서류 안내</h1>
                        </div>
                        <div className={cx("txtArea")}>
                            <div className={cx("info_box")}>
                                <div className={cx("title")}>
                                    <h3>실험실창업 허가 신청</h3>
                                    <ul>
                                        <li>
                                            <em>처리:</em> 창업지원단(내선 2858)
                                        </li>
                                        <li>
                                            <em>규정:</em> 실험실창업 관리내규
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx("info_cont")}>
                                    <ul>
                                        <li>
                                            <Link href="/assets/download/실험실창업_허가신청서.hwp">
                                                <a download>
                                                    - 서식2 실험실창업 허가신청서
                                                    <img src="/assets/image/icon_download.gif" alt="download"/>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/assets/download/실험실창업_사업계획서.hwp">
                                                <a download>
                                                    - 서식3 실험실창업 사업계획서
                                                    <img src="/assets/image/icon_download.gif" alt="download"/>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/assets/download/실험실창업_대상기술리스트.hwp">
                                                <a download>
                                                    - 서식4 실험실창업 대상기술리스트
                                                    <img src="/assets/image/icon_download.gif" alt="download"/>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx("info_box")}>
                                <div className={cx("title")}>
                                    <h3>교원 겸직신청</h3>
                                    <ul>
                                        <li>
                                            <em>처리:</em> 소속 단과대학
                                        </li>
                                        <li>
                                            <em>규정:</em> 교원겸직 허가지침
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx("info_cont")}>
                                    <ul>
                                        <li>- 단과대학 &gt;&gt; 교무팀 공문 신청</li>
                                        <li>
                                            <Link href="/assets/download/겸직허가신청서.hwpx">
                                                <a download>
                                                    - 별표 제 2호 겸직허가 신청서
                                                    <img src="/assets/image/icon_download.gif" alt="download"/>
                                                </a>
                                            </Link>
                                            <br/>
                                            (실제 창업 행정 절차 진행 시 신청)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx("info_box")}>
                                <div className={cx("title")}>
                                    <h3>(사업장소재지 확인 후)무상임대계약서 발급</h3>
                                    <ul>
                                        <li>
                                            <em>처리:</em> 창업지원단(내선 2858)
                                        </li>
                                        <li>
                                            <em>규정:</em> 관재처 관재팀
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx("info_cont")}>
                                    <ul>
                                        <li>- 무상임대차계약서 초안 작성 후 기술사업화센터로 송부</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx("info_box")}>
                                <div className={cx("title")}>
                                    <h3>창업자(교원) 법인설립 및 사업자등록</h3>
                                    <ul>
                                        <li>
                                            <em>처리:</em> 창업자(교원) 직접 등록
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx("info_cont")}>
                                    <ul>
                                        <li>- <strong>법인설립:</strong> 법인사업체 소재지 관할 등기소</li>
                                        <li>- <strong>사업자등록:</strong> 관할세무소 민원봉사실</li>
                                        <li>- <strong>벤처기업확인 신청:</strong> 기술보증기금 or 중소기업진흥공단</li>
                                        <li>
                                            - <strong>공간사용 확인서</strong> <Link href="/assets/download/공간사용_확인서.hwp"><a download>(파일 다운로드)</a></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("sub_cont")}>
                    <div className={cx("txt_style_1")}>
                        <div className={cx("left_title")}>
                            <h1 className={cx("title_style_2")}>문의</h1>
                        </div>
                        <div className={cx("txtArea")}>
                            <p className={cx("txt_1")}>
                                Tel. 02-2220-2858 <br/>
                                Mail. wooli44@hanyang.ac.kr
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Teacher;
