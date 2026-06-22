import React, {useCallback, useEffect, useState} from 'react';


import styles from '../../public/assets/styles/startup_info/startup_info.module.css';
import classnames from "classnames/bind"
import {Checkbox, Form, Input, Modal, Typography, Upload} from "antd";
const cx = classnames.bind(styles);
import { DatePicker, Space } from 'antd';
import locale from "antd/lib/date-picker/locale/ko_KR";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {addStudentReport, initialize} from "../../store/studentReport/studentReport";
import PageNavigation from "../../component/layout/PageNavigation";
import moment from "moment";
import Head from "next/head";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import client from "../../lib/api/client";
const StudentReportPage = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [reportForm, setReportForm] = useState({
        studentName: "",
        studentAttach:"",
        studentClassYear:"",
        studentPhoneNum: "",
        studentEmail: "",
        companyNum:"",
        companyName:"",
        companyOwner:"",
        companyKind:"",
        createDate:"",
        businessItem:"",
        sales:0,
        staffNum:0,
        isAgree: false,

        uploadResultList: [],
        oldUploadResultList: [],
        removeFiles: []

    })

    const {add} = useSelector(({studentReport, loading}) => ({
        add: studentReport.addStudentReport,
    }))

    useEffect(() =>{
        return () =>{
            dispatch(initialize())
        }

    },[])


    const changeReportFormValue = useCallback((e) =>{
        const {name, value} = e.target

        if (name == 'isAgree') {
            setReportForm(reportForm =>({
                ...reportForm,
                isAgree: e.target.checked,

            }))
            return;
        }

        setReportForm(reportForm =>({
            ...reportForm,
            [name]: value,

        }))

    },[])

    const submitApply = (e) => {

        console.log("reportForm", reportForm);


        const data = {
            ...reportForm,
            createDate:reportForm.createDate.format("YYYY-MM-DD").toString(),
            uploadResultList: reportForm.uploadResultList.map((item) => {
                return item.fileId
            }),
            removeFiles:[]

        }

        dispatch(addStudentReport(data))
    }

    useEffect(() =>{

        if(add.result != null){
            if(add.result && add.error == null){
                Modal.success({
                    title: '작성이 완료되었습니다',
                    onOk:() =>{
                        setReportForm({
                            studentName: "",
                            studentAttach:"",
                            studentClassYear:"",
                            studentPhoneNum: "",
                            studentEmail: "",
                            companyNum:"",
                            companyName:"",
                            companyOwner:"",
                            companyKind:"",
                            createDate:"",
                            businessItem:"",
                            sales:0,
                            staffNum:0,
                            isAgree: false,

                            uploadResultList: [],
                            oldUploadResultList: [],
                            removeFiles: []

                        });
                        form.resetFields();
                        window.scrollTo(0, 0);
                    }
                });
            }else{
                Modal.warning({
                    title: '작성 중 에러가 발생하였습니다'
                });
            }
        }
    },[add])

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }


    const handleChangeUploadFile = ({fileList}) => {
        setReportForm({
            ...reportForm,
            uploadResultList: fileList
        })
    }

    const uploadFile = async options => {
        const {onSuccess, onError, file, onProgress} = options;
        setLoading(true)

        const fmData = new FormData();
        const config = {
            headers: {"content-type": "multipart/form-data"},
            onUploadProgress: event => {
                onProgress({percent: (event.loaded / event.total) * 100});
            }
        };
        fmData.append("file", file);
        try {
            const res = await client.post(
                "/resource/attach_file/STUDENT_ATTACH",
                fmData,
                config
            );
            onSuccess("Ok");

            console.log("res.data.fileId", res.data.fileId);
            // const uploadResultList = [...reportForm.uploadResultList, res.data.fileId]
            setReportForm({
                ...reportForm,
                uploadResultList: reportForm.uploadResultList.concat(res.data)

            })
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError("업로드 중 에러가 발생하였습니다");
            setLoading(false)
            onError({err});
        }
    };

    return (
        <>
            <Head>
                <title>한양대학교 창업지원단 -학생창업자 신고</title>
            </Head>
            {/*<PageNavigation/>*/}
            <section className={cx("container")}>
                <Form form={form} onFinish={(e) =>{submitApply(e)}} onFinishFailed={(e) =>{}}>
                <div className={cx("sub_container","mentor_group_write","student_report")}>
                    <h1 className={cx("sub_top_title")}>학생창업자 신고</h1>
                    <p className={cx("sub_top_txt")}>
                        한양대학교 창업지원단에서는 창의적인 아이디어와 꿈을 향한 열정으로 홀로 창업하고 있는 학생창업자를 찾고 있습니다 <br/>
                        학생창업자에게는 다양한 혜택을 제공하고 있으니 , 아래 내용을 작성하여 신청해주시기 바랍니다<br/>
                        (※신청자 대상으로 안내 메일이 발송됩니다.)
                    </p>

                    <h2>학생창업자혜택</h2>
                    <div className={cx("list_style_4")}>
                        <ul>
                            <li>창업장학금(희망사다리장학금)(~400만원/1년)</li>
                            <li>사업화지원금(예비창업패키지, 초기창업패키지, 캠퍼스타운)</li>
                            <li>법인설립지원, 지식재산권 출원 지원 등</li>
                            <li>창업기숙사 247 스타트업 돔(최대 2년)</li>
                            <li>창업현장실습-장기(15학점) / 단기(3학점)</li>
                            <li>창업동아리 활동비(~500만원/1년)</li>
                            <li>창업휴학(최대 2년)</li>
                            <li>그 외 학생창업자에게 필요한 사항 등</li>
                        </ul>
                    </div>

                    <h2>개인정보</h2>
                    <div className={cx("mentoring_applicants")}>
                        <ul className={`${cx("w_3")} clfx `}>
                            <li>
                                <label htmlFor="mentoring_applicants_info1">이름</label>
                                <Form.Item
                                    name="studentName"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '이름은 필수 입니다.',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"이름"} name="studentName" value={reportForm.studentName}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info2">소속</label>
                                <Form.Item
                                    name="studentAttach"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: false,
                                            // message: '이름은 필수 입니다.',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"소속"} name="studentAttach" value={reportForm.studentAttach}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info3">학번</label>
                                <Form.Item
                                    name="studentClassYear"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '학번은 필수 입니다.',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"학번"} name="studentClassYear" value={reportForm.studentClassYear}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info4">연락처</label>
                                <Form.Item
                                    name="studentPhoneNum"
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
                                    <Input placeholder={"연락처"} name="studentPhoneNum" value={reportForm.studentPhoneNum}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li className={cx("w_60")}>
                                <label htmlFor="mentoring_applicants_info5">E-mail </label>
                                <div className={cx("email")}>
                                    <Form.Item
                                        name="studentEmail"
                                        className={(cx("antd_input"))}
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message: 'E-MAIL은 필수 입니다.',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={"E-MAIL"} name="studentEmail" value={reportForm.studentEmail}
                                               onChange={(e) => {
                                                   changeReportFormValue(e)
                                               }}/>
                                    </Form.Item>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <h2>기업정보</h2>
                    <div className={`${cx("mentoring_applicants")} mb_0 mentoring_applicants `}>
                        <ul className={`${cx("w_3")} clfx `}>
                            <li>
                                <label htmlFor="mentoring_applicants_info1">사업자등록번호</label>
                                <Form.Item
                                    name="companyNum"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '사업자등록번호는 필수 입니다.',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"사업자등록번호"} name="companyNum" value={reportForm.companyNum}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info2">기업명 </label>
                                <Form.Item
                                    name="companyName"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '기업명은 필수 입니다.',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"기업명"} name="companyName" value={reportForm.companyName}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info3">대표자명</label>
                                <Form.Item
                                    name="companyOwner"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '대표자명은 필수 입니다.',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"대표자명"} name="companyOwner" value={reportForm.companyOwner}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info4">사업자 유형</label>
                                <Form.Item
                                    name="companyKind"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '사업자 유형을 선택해주세요',
                                        },
                                    ]}
                                >
                                    <select name="companyKind" id="" value={reportForm.companyKind} onChange={(e) => {
                                        changeReportFormValue(e)
                                    }}>
                                        <option value="">선택</option>
                                        <option value="법인">법인</option>
                                        <option value="개인">개인</option>
                                    </select>
                                </Form.Item>
                            </li>
                            <li>
                                <label htmlFor="mentoring_applicants_info4">창업일</label>
                                <Form.Item
                                    name="createDate"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: "필수입력 입니다",
                                        },
                                    ]}
                                >
                                    <DatePicker disabledDate={disabledDate} locale={locale} format={"YYYY-MM-DD"} value={reportForm.createDate} onChange={(v) =>{setReportForm({...reportForm,createDate:v})}}/>
                                </Form.Item>
                            </li>
                            <li className={cx("w_100")}>
                                <label htmlFor="">사업아이템 및 설명(150내 이내)</label>
                                <Form.Item
                                    name="businessItem"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: true,
                                            message: '사업아이템을 입력해주세요',
                                        },
                                    ]}
                                >
                                    <Input.TextArea placeholder={"사업아이템"} rows={5} name="businessItem" value={reportForm.businessItem}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                        </ul>
                        <ul className={`${cx("w_2")} clfx `}>
                            <li>
                                <label htmlFor="">당해 연도 매출액(해당하는 경우에만 입력, 단위:원)</label>
                                <Form.Item
                                    name="sales"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: false,
                                            pattern: new RegExp(
                                                /^-?\d*(\.\d*)?$/
                                            ),
                                            message: "숫자만 입력 가능합니다",
                                        },
                                    ]}
                                >
                                    <Input placeholder={"당해 연도 매출액(해당하는 경우에만 입력, 단위:원)"} name="sales" value={reportForm.sales}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>

                            <li>
                                <label htmlFor="">당해 연도 고용인원(해당하는 경우에만 입력)</label>
                                <Form.Item
                                    name="staffNum"
                                    className={(cx("antd_input"))}
                                    rules={[
                                        {
                                            required: false,
                                            pattern: new RegExp(
                                                /^-?\d*(\.\d*)?$/
                                            ),
                                            message: "숫자만 입력 가능합니다",
                                        },
                                    ]}
                                >
                                    <Input placeholder={"당해 연도 고용인원(해당하는 경우에만 입력)"} name="staffNum" value={reportForm.staffNum}
                                           onChange={(e) => {
                                               changeReportFormValue(e)
                                           }}/>
                                </Form.Item>
                            </li>
                        </ul>


                        <ul className={`${cx("w_3")} clfx `}>
                            <li>
                                <span className={cx("title")}>첨부파일 (10MB 미만)</span>
                                <div className={`clfx `}>
                                    <Upload
                                        customRequest={(e) => {
                                            uploadFile(e)
                                        }}
                                        listType="picture-card"
                                        fileList={reportForm.uploadResultList}
                                        onChange={(e) => {
                                            handleChangeUploadFile(e)
                                        }}
                                    >
                                        {reportForm.uploadResultList?.length >= 3 ? null : (
                                            <div>
                                                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                                                <div style={{marginTop: 8}}>Upload</div>
                                            </div>
                                        )}
                                    </Upload>
                                    <Typography.Text type="danger">{error}</Typography.Text>
                                </div>
                                <p className={cx("help_txt01")}>※ 입력해주신 사업자등록증을 첨부해 주세요.</p>
                            </li>
                        </ul>
                    </div>

                    <div className={cx("termsArea")}>
                        <h3>개인정보처리방침</h3>
                        <div className={cx("terms_box")}>
<pre>
한양대학교 창업지원단 개인정보 처리방침
한양대학교 창업지원단은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립·공개합니다.

제1조(개인정보의 처리목적)
한양대학교 창업지원단은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다

 가. 한양대학교 창업지원단 홈페이지에서 제공하는 회원제 서비스(창업상담, 아이디어제안, 사업모델평가) 이용에 따른 서비스를 제공하기 위해 개인정보(신청자 성명, e-mail, 전화번호)를 처리합니다.
</pre>
                        </div>
                        <div className={cx("agree")}>
                            <Form.Item
                                name="isAgree"
                                rules={[
                                    {
                                        required: !reportForm.isAgree,
                                        message: '개인정보 처라방침 동의는 필수 입니다.',
                                    },
                                ]}
                            >
                                <Checkbox name="isAgree" checked={reportForm.isAgree} onChange={changeReportFormValue}>개인정보처리방침안내
                                    내용에 동의 합니다</Checkbox>
                            </Form.Item>
                        </div>
                    </div>

                    <div className={"txt_c"}>
                        <input type="submit" value="신청하기" className={cx("basic-btn03", "btn-blue-bg2")}/>
                    </div>


                </div>
                </Form>
            </section>
        </>
    );
};

export default StudentReportPage;
