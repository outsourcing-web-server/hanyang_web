import React, {useState} from 'react';

import Link from 'next/link';
import styles from '../../public/assets/styles/introduce/introduce.module.css';
import classnames from "classnames/bind"
import PageNavigation from "../../component/layout/PageNavigation";
import Head from "next/head";

const cx = classnames.bind(styles);

const Introduce = () => {

    const [showTable, setShowTable] = useState(false)
    return (
        <>
            <Head>
                <title>한양대학교 창업지원단 -기관소개</title>
            </Head>
            <PageNavigation/>
            <section className={cx("container")}>
                <div className={cx("introduction")}>
                    <div className={cx("sub_cont")}>
                        <h1 className={cx("sub_top_title")}>기관소개</h1>
                        <p className={cx("sub_top_txt")}>한양대학교 창업지원단은 학생, 동문, 교원, 일반인 (예비)창업자를 대상으로<br/> 창업교육부터 창업아이템 발굴
                            및 사업화, 투자유치 등 창업기업의 성장을 지원합니다
                        </p>

                        <div className={"clfx"}>
                            <h2>인사말</h2>
                            <div className={cx("ceo_info")}>
                                <div className={cx("ceo_img")}>
                                    <img src="/assets/image/ceo.jpg" alt="ceo"/>
                                </div>
                                {/*<div className={cx("info")}>
                                <span className={cx("name")}>류 창 완</span>
                                <ul>
                                    <li>창업지원단장</li>
                                    <li>산업융합학부 교수</li>
                                    <li>대학원 창업융합학과 주임교수</li>
                                    <li>한양사이버대학교 창업지원단장</li>
                                </ul>
                                <p>
                                    “벤처기업을 창업하여 투자유치, 코스닥상장, <br/>
                                    인수합병 등 다양한 실전경험을 쌓았습니다. <br/>
                                    20년간 현장에서 체득한 지혜가 청년들의 <br/>
                                    기업가정신으로 여물기를 바라며 후학들을 <br/>
                                    지도하고 있습니다.”
                                </p>
                                <div className={cx("btn_area")}>
                                    <a href="https://brunch.co.kr/@bidulgi2dbs#articles" target="_blank">류창완 교수의 브런치
                                        바로가기</a>
                                </div>
    </div>*/}
                            </div>
                            <div className={cx("ceo_txt")}>
                                <p>
                                    실용인재를 육성해 우리나라 경제 발전의 큰 축을 담당해 온 한양대학교는 국내에서 창업기업가를 가장 많이 양성하는 대학입니다. 창업지원단은 창직과 창업을
                                    통한 산업구조 고도화라는 시대적 요구에 부응하고, CEO 양성 사관학교로서 우리 대학의 전통을 능동적으로 계승, 발전시키기 위해 2009년 국내 대학
                                    최초로 설립되었습니다.

                                </p>
                                <p>
                                    창업지원단은 예비 창업기업가가 갖추어야 할 기업가적 소양과 역량 교육, 현장 중심의 실전 훈련을 통해 창업 성공률을 높이고 성공한 동문 기업가들의
                                    지혜와 실전 경험을 전수해 혁신 기술 창업인 양성에 힘쓰고 있습니다.
                                </p>
                                <p>
                                    한양대학교는 창업지원단 설립 이래 국내 대학 창업교육의 롤 모델을 구축하고 청년 창업 문화를 선도하고 있으며, 창업교육 최우수 대학, 벤처기업가 배출
                                    1위 대학, 학생 창업자 배출 1위 대학으로 선정되는 등 CEO 사관학교의 지위를 확고히 하고 있습니다. 특히, 우리 대학은 창업교육 · 창업훈련 ·
                                    네트워킹 · 창업보육 · 투자유치 · 글로벌 진출까지 한국형 창업교육 시스템을 구축하고, 연간 500여개의 창업 강좌를 개설해 매년 12,000명
                                    이상의 수강생을 배출하고 있습니다.

                                </p>
                                <p>
                                    또한, 학부와 일반대학원에 창업융합학과를 설치해 창업 단계별 맞춤형 교육체계를 정립했으며, 미국 실리콘밸리 · 뉴욕, 중국 상하이 · 베이징, 베트남
                                    하노이 등에 글로벌 창업센터를 개소하고 스타트업 기업의 해외 시장 진출도 적극 지원하고 있습니다.

                                </p>
                                <p>
                                    평생 직장도, 평생 직업도 없는 21세기에는 누구나 한 번 이상은 창업의 기회를 마주하게 될 것입니다. 아이디어나 기술만으로도 창업에 도전할 수
                                    있지만, 지속 가능한 성공을 위해서는 체계적인 교육과 훈련이 필요합니다. 다양한 분야의 전문 지식을 알아야 하고, 실전 경험을 통해 촉을 체득해야
                                    합니다.

                                </p>
                                <p>
                                    창업지원단을 통해 많은 학생들이 120세 시대를 사는 지혜를 터득하고 역량 있는 기업가로 성장하여 국가발전의 주역이 되기를 기원합니다.
                                    <br/>감사합니다.
                                </p>
                            </div>
                        </div>

                        <div className={cx("ceo_name")}>
                            <img src="/assets/image/ceo_name.png" alt="ceo_name"/>
                        </div>

                    </div>

                    <div className={cx("history")}>
                        <div className={cx("sub_cont")}>
                            <h2>연혁</h2>
                            <div className={`${cx("history_list")} clfx `}>
                                <ul>
                                    <li>
                                        <span className={cx("year")}>2009</span>
                                        <ul>
                                            <li>기업가센터 설립준비위원회 발족</li>
                                            <li>기업가센터 설립기금(10억원) 기부약정식 개최</li>
                                            <li className={cx("c-blue")}>글로벌기업가센터 설립(국내대학최초)</li>
                                            <li>기업가 양성교육 학부교양 운영</li>
                                            <li>기업가포럼 운영</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2010</span>
                                        <ul>
                                            <li>기업가캠프 운영</li>
                                            <li>YES 리더 기업가정신 대회 공동주관</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2011</span>
                                        <ul>
                                            <li>전국대학(원)생 기술사업화 경진대회 개최</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2012</span>
                                        <ul>
                                            <li className={cx("c-blue")}>한양 스타트업아카데미 운영</li>
                                            <li>창업보육센터 조직통합</li>
                                            <li>서울시 캠퍼스CEO 양성사업 주관기관 선정</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2013</span>
                                        <ul>
                                            <li>일반인, 대학생 창업아카데미사업 주관기관 동시 선정</li>
                                            <li>글로벌 시장형 창업R&D 지원사업 BI 협력기관 선정</li>
                                            <li>글로벌 창업교육 프로그램 주관기관 선정</li>
                                            <li>2013 산학협력EXPO 인력양성부문 우수상 수상</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2014</span>
                                        <ul>
                                            <li>대학 기업가센터사업 주관기관 선정</li>
                                            <li>스마트창작터사업 주관기관 선정</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2015</span>
                                        <ul>
                                            <li className={cx("c-blue")}>실리콘밸리, 뉴욕, 상하이 해외기업가센터 사무소 설립</li>
                                            <li className={cx("c-blue")}>창업융합전공 신설 및 운영</li>
                                            <li>아이디어 팩토리 사업 주관기관 선정</li>
                                            <li>창업 맞춤형 사업화 지원사업 주관기관 선정</li>
                                            <li>동문후원 창업센터 개소</li>
                                            <li>창업교육 최우수대학 선정(교육부장관상수상)</li>
                                            <li>SK 청년비상 프로그램 주관기관 선정</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2016</span>
                                        <ul>
                                            <li className={cx("c-blue")}>CES 2016 한양스타트업관 운영</li>
                                            <li>업사이클링 3D프린팅 디자인어워드 개최</li>
                                            <li>창업지원부문 전국대학 1위 선정(한경 2016 이공계 대학평가)</li>
                                            <li>학생 창업자 배출 전국대학 1위 선정(2016 대학정보공시)</li>
                                            <li>청년 드림 베스트프랙티스 창업부문 최우수 대학 선정</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2017</span>
                                        <ul>
                                            <li>CES 2017 한양스타트업관 운영</li>
                                            <li>창업 선도대학 육성사업 주관기관 선정</li>
                                            <li className={cx("c-blue")}>글로벌기업가센터, 대학본부산하 창업지원단으로 확대개편</li>
                                            <li>교원 창업포럼 개최</li>
                                            <li>학생 창업자 배출 전국대학1위 선정(2017 대학정보공시)</li>
                                            <li className={cx("c-blue")}>미국 실리콘밸리 글로벌 스타트업 멘토단 1기 위촉</li>
                                            <li className={cx("c-blue")}>대학원 창업융합학과 신설 및 운영</li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <span className={cx("year")}>2018</span>
                                        <ul>
                                            <li>CES 2018 한양스타트업관 운영</li>
                                            <li>코맥스 스타트업타운 준공</li>
                                            <li className={cx("c-blue")}>창업 기숙사 247 스타트업 돔 개관</li>
                                            <li>학생 창업자 배출 전국대학 1위 선정(2018 대학정보공시)</li>
                                            <li>실험실 특화형 창업 선도대학 지원사업 선정</li>
                                            <li>미국 실리콘밸리 글로벌 스타트업 멘토단 2기 위촉</li>
                                            <li className={cx("c-blue")}>베트남 하노이 아세안 진출지원 거점 사무소 개소</li>
                                            <li>글로벌 액셀러레이터(34개사)와 업무협약 체결</li>
                                            <li>2018 벤처창업진흥유공 국무총리표창 수상</li>
                                            <li>청년 드림 베스트프랙티스 창업지원분야 고용노동부장관상 수상</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2019</span>
                                        <ul>
                                            <li>예비창업패키지 사업 주관기관 선정</li>
                                            <li>캠퍼스CEO 육성사업 주관기관 선정</li>
                                            <li>실전창업교육 주관기관 선정</li>
                                            <li>개교 80주년 기념 글로벌액셀러레이터 & 스타트업피치 개최</li>
                                            <li>4년 연속 학생 창업자 배출 전국대학 1위 선정(2019 대학정보공시)</li>
                                            <li>한양 스타트업아카데미 13기, 14기 수료</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2020</span>
                                        <ul>
                                            <li>한양 글로벌 스타트업 챌린지 운영</li>
                                            <li className={cx("c-blue")}>중국 상하이, 베트남 하노이, 호치민 글로벌 스타트업 멘토단 위촉</li>
                                            <li>서울시 캠퍼스타운 조성사업 주관기관 선정</li>
                                            <li>초기창업패키지 주관기관 선정</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2021</span>
                                        <ul>
                                            <li>창업도약패키지 사업 주관기관 선정</li>
                                            <li>예비창업패키지 사업 주관기관 선정</li>
                                            <li>실전창업교육 주관기관 선정</li>
                                            <li className={cx("c-blue")}>초기창업패키지 사업 최우수 주관기관 선정(2년 연속, '19~'20)</li>
                                            <li>서울시 캠퍼스타운 단위형 주관기관 선정</li>
                                            <li className={cx("c-blue")}>창업교육 최우수대학 선정(교육부장관상수상)</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2022</span>
                                        <ul>
                                            <li>창업중심대학 사업주관기관 선정(2022~2026)</li>
                                            <li>서울시 캠퍼스타운 종합형 주관기관 선정(2023~2026)</li>
                                            <li>혁신창업스쿨 주관기관 선정</li>
                                            <li>서울시 새싹(SeSAC)클래스 인 캠퍼스 주관기관 선정</li>
                                            <li className={cx("c-blue")}>2021 창업도약패키지 사업 최우수 주관기관 선정</li>
                                            <li className={cx("c-blue")}>2021 예비창업패키지 사업 최우수 주관기관 선정</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2023</span>
                                        <ul>
                                            <li>2023 특화형 창업중심대학 주관기관 선정</li>
                                            <li>혁신창업스쿨 주관기관 선정(2023)</li>
                                            <li>서울시 새싹(SeSAC)인캠퍼스 주관기관 선정</li>
                                            <li className={cx("c-blue")}>혁신창업스쿨 주관기관 중소벤처기업부 장관상 수상</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2024</span>
                                        <ul>
                                            <li>중소벤처기업부 2024 창업중심대학사업 성과평가 최우수 대학 선정(S등급)</li>
                                            <li>서울시 캠퍼스타운사업 우수 대학 선정(A+등급)</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className={cx("year")}>2025</span>
                                        <ul>
                                            <li>실험실 특화형 창업선도대학 선정</li>
                                            <li>VivaTech 2025 참가 및 한국관 운영</li>
                                            <li>서울시 RISE ‘글로벌 산학협력 선도(본글로벌 창업), 서울캠퍼스타운’ 사업 선정</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            {/*<div className={cx("btn_area")}>*/}
                            {/*    <button type="button"><span>접기</span></button>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    <div className={cx("briefing")}>
                        <div className={`${cx("sub_cont")} clfx `}>
                            <div className={cx("left_area")}>
                                <h2>스타트업 한양 <br/>브리핑</h2>
                                <div className={cx("video_area")}>
                                    <iframe width="425" height="233" src="https://www.youtube.com/embed/ojWuGZAVjV0"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen></iframe>

                                    {/*<img src="/assets/image/briefing_img.jpg" alt="briefing_img"/>*/}
                                </div>
                            </div>
                            <ul className={cx("briefing_list")}>
                                <li className={cx("icon_1")}>
                                    <h3><strong className={cx("c-sky")}>창업기업</strong> 배출실적</h3>
                                    <ul>
                                        <li>
                                            학생창업기업 배출 국내대학 1위 {/*<span className={cx("sky")}>4년 연속</span>*/}<br/>
                                            <span className={cx("c-gray")}>20년 55개, 21년 60개, 22년 62개, 23년 69개, 24년 67개</span>
                                        </li>
                                        <li>
                                            7년 미만 초기 창업기업 배출 국내대학 1위<br/>
                                            <span
                                                className={cx("c-gray")}>창업기업 2,948개사  6개 주요 대학 대비 평균 1.6배 (한국평가데이터, ‘22.12월)</span>
                                        </li>
                                        <li>
                                            동문 CEO 기업 배출 국내대학 1위<br/>
                                            <span
                                                className={cx("c-gray")}>기업 수 13,636개, 매출 약 462조원 (한국평가데이터, ‘24.12월)</span>
                                        </li>
                                    </ul>
                                </li>
                                <li className={cx("icon_2")}>
                                    <h3>국내 최고의 <strong className={cx("c-sky")}>창업교육</strong> 역량</h3>
                                    <ul>
                                        <li>국내 대학 최초 창업기업 양성을 위한 글로벌기업가센터 설립 <br/><span
                                            className={cx("c-gray")}>(2009년)</span>
                                        </li>
                                        <li>교육부, 창업교육 최우수 대학 <span className={cx("c-gray")}>(‘15, ‘21)</span></li>
                                        <li>연간 502개 창업교과 운영 11,866명 이수 <span className={cx("c-gray")}>(‘25 대학정보공시)</span>
                                        </li>
                                    </ul>
                                </li>
                                <li className={cx("icon_3")}>
                                    <h3>국내 최고의 <strong className={cx("c-sky")}>산학협력 및 기술사업화</strong> 역량</h3>
                                    <ul>
                                        <li>국내 사립대 최초의 산학협력단 설립<span className={cx("c-gray")}>(2003년)</span></li>
                                        <li>국내 대학 최초 대학기술지주회사 설립 <span className={cx("c-gray")}>(2008년)</span></li>
                                        <li>TIPS운영사 지위확보, 대학창업펀드 등 투자펀드(83억) 조성 <span
                                            className={cx("c-gray")}>(2018년)</span></li>
                                        <li>
                                            기술이전 및 기술 사업화 역량<br/>
                                            <span className={cx("c-gray f-16")}>기술이전(‘22~24, 최근3년) : 178건 / 394억원</span><br/>
                                            <span className={cx("c-gray f-16")}>실험실 창업 : 39개 (’22~’24)</span>
                                        </li>
                                    </ul>
                                </li>
                                <li className={cx("icon_4")}>
                                    <h3><strong className={cx("c-sky")}>우수한 글로벌 창업지원</strong> 역량</h3>
                                    <ul>
                                        <li>글로벌 창업거점센터(미국,중국,베트남), 글로벌 스타트업 멘토단 구축운영</li>
                                        <li>
                                            50개 글로벌 파트너사 업무 협력, 액셀러레이팅 프로그램 운영 <br/>
                                            {/*<span className={cx("c-gray f-16")}>87개사 대상 엑셀러레이팅 계약 35건, 14개사 해외진출 및 투자유치 등 성과창출 (2019년)</span>*/}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx("vision")}>
                        <div className={cx("sub_cont")}>
                            <h2>비전 &amp; 목표</h2>
                            <div className={cx("img_area")}>
                                <img src="/assets/image/mission_img.jpg" alt="mission_img"/>
                            </div>
                            <span className={cx("txt_1")}>설립목적</span>
                            <ul className={cx("vision_list")}>
                                <li className={cx("icon_1")}>
                                    창업기업가가 갖추어야 할 소양, 태도 <br/>
                                    및 역량을 체계적으로 교육함으로써 <br/>
                                    <strong className={cx("c-sky")}>“준비된 기술창업인” 양성</strong>
                                </li>
                                <li className={cx("icon_2")}>
                                    실용인재 육성을 통해 국가발전의 큰 <br/>
                                    축을 담당해 온 한양대학교의 <strong className={cx("c-sky")}>실용학풍과 <br/>
                                    건학이념을 지속적 계승.발전</strong>
                                </li>
                                <li className={cx("icon_3")}>
                                    지식 전달만이 아닌<strong className={cx("c-sky")}> 현장 중심의 실질적<br/>
                                    교육.훈련</strong>을 통해 창업 성공률 제고 및 <br/>
                                    지속 경영능력 배양
                                </li>
                                <li className={cx("icon_4")}>
                                    기업가정신(Entrepreneurship) 부활 및 <br/>
                                    창업 마인드 고취를 통한 <strong className={cx("c-sky")}>일자리 창출과 <br/>
                                    산업구조 고도화에 기여</strong>
                                </li>
                                <li className={cx("icon_5")}>
                                    지우수한 예비창업자를 발굴하여 창업을 <br/>
                                    지원하고, <strong className={cx("c-sky")}>동문 인프라 연계를 통한 <br/>
                                    체계적 육성</strong>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx("organization")}>
                        <div className={cx("sub_cont")}>
                            <h2>조직도</h2>
                            <div className={cx("img_area")}>
                                <img src="/assets/image/organization.jpg" alt="mission_img"/>
                            </div>
                            <table>
                                <colgroup>
                                    <col style={{width: "30%"}}/>
                                    <col/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>전화번호</th>
                                    <th>담당업무</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>02-2220-2861</td>
                                    <td>창업지원단 총괄</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2230</td>
                                    <td rowSpan="2">학생창업(창업동아리, 창업경진대회 등)</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2863</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2858</td>
                                    <td>교원창업, 실험실창업</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2984</td>
                                    <td rowSpan="2">동문창업(한양스타트업아카데미, 한양 스타트업포럼 등)</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2867</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2870</td>
                                    <td rowSpan="2">원스톱창업상담실</td>
                                </tr>
                                <tr>
                                    <td>02-2220-1978</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2868</td>
                                    <td>창업멘토링</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2871</td>
                                    <td>투자유치, 오픈이노베이션, 글로벌 창업지원</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2984</td>
                                    <td>창업강좌, 창업융합전공, 창업학사제도</td>
                                </tr>
                                <tr>
                                    <td>02-2220-1565</td>
                                    <td>247 스타트업 돔</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2862</td>
                                    <td>창업중심대학</td>
                                </tr>
                                <tr>
                                    <td>02-2220-1565</td>
                                    <td>캠퍼스타운</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2866</td>
                                    <td>RISE사업(본글로벌, 서울캠퍼스타운)</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2982</td>
                                    <td>창업보육센터(BI센터)</td>
                                </tr>
                                <tr>
                                    <td>02-2220-2857</td>
                                    <td>모두의 창업</td>
                                </tr>
                                </tbody>
                            </table>
                            <p style={{fontSize: "16px", fontWeight: 500, textAlign: "right", marginBottom: "20px"}}>대표 이메일 : startup@hanyang.ac.kr</p>

                            <h2>IAB 자문교수</h2>
                            <table>
                                <colgroup>
                                    <col style={{width: "34%"}}/>
                                    <col style={{width: "32.5%"}}/>
                                    <col/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>성함</th>
                                    <th>소속</th>
                                    <th>직위</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>류창완</td>
                                    <td>산업융합학부</td>
                                    <td>창업지원단장</td>
                                </tr>
                                <tr>
                                    <td>김은섭</td>
                                    <td>아이디벤처스</td>
                                    <td>대표</td>
                                </tr>
                                <tr>
                                    <td>김종헌</td>
                                    <td>프롤로그벤처스㈜</td>
                                    <td>본부장</td>
                                </tr>
                                <tr>
                                    <td>김주희</td>
                                    <td>동덕여자대학교</td>
                                    <td>교수</td>
                                </tr>
                                {
                                    showTable && (
                                        <>
                                            <tr>
                                                <td>김태훈</td>
                                                <td>넥세드㈜</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>명승은</td>
                                                <td>벤처스퀘어</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>박찬용</td>
                                                <td>우용인베스트㈜</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>서정욱</td>
                                                <td>Bracco Medical Technology</td>
                                                <td>Manager/Sr. Principal Engineer</td>
                                            </tr>
                                            <tr>
                                                <td>송용준</td>
                                                <td>스마트스터디벤처스</td>
                                                <td>센터장</td>
                                            </tr>
                                            <tr>
                                                <td>신기영</td>
                                                <td>디자이노블</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>신진오</td>
                                                <td>와이앤아처㈜</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>이근식</td>
                                                <td>LKSA건축사사무소</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>이옥근</td>
                                                <td>Stanford University</td>
                                                <td>Post doc</td>
                                            </tr>
                                            <tr>
                                                <td>이종수</td>
                                                <td>서울대학교 공과대학 SNU공학컨설팅센터</td>
                                                <td>교수</td>
                                            </tr>
                                            <tr>
                                                <td>이종훈</td>
                                                <td>엑스플로인베스트먼트㈜</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>이희우</td>
                                                <td>한림대학교 기술지주회사</td>
                                                <td>대표</td>
                                            </tr>
                                            <tr>
                                                <td>정혁훈</td>
                                                <td>매일경제신문</td>
                                                <td>부국장</td>
                                            </tr>
                                            <tr>
                                                <td>한인석</td>
                                                <td>K-바이오랩허브 사업추진단</td>
                                                <td>단장</td>
                                            </tr>
                                        </>
                                    )


                                }
                                </tbody>
                            </table>

                            <div className={cx("btn_area")}>
                                <button type="button" onClick={() => {
                                    setShowTable(!showTable)
                                }}><span>{showTable ? "접기" : "더보기"}</span></button>
                                {/*<button type="button" onClick={() =>{setShowTable(!showTable)}}><Link href="/assets/pdf/IAB-member.xlsx" download><a><span>더보기</span></a></Link></button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Introduce;
