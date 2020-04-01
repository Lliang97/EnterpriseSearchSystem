import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import classNames from "classnames";
import {
    getEnterprise_recruitnumber,
    getEnterprise_recruit,
    applychange_recruit,
    insert_recruit,
    delete_recruit
} from "../../../actions/getEnterpriseRecruit";
import {
    Layout,
    Menu,
    Breadcrumb,
    Row,
    Col,
    Table,
    Pagination,
    Icon,
    List,
    DatePicker,
    Input,
    Button,
    Form,
    Modal,
    Radio,
    Cascader,
    Select,
    Collapse,
    message
} from "antd";
import moment from "moment";
import { Link, hashHistory, browserHistory } from "react-router";
import echarts from "echarts"; //必须
import "./AdminRecruit.scss";
import { toQuery } from "../../../untils/utils";
import { error } from "util";

const Panel = Collapse.Panel;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const recruitoption = [
    {
        value: 'address',
        label: "地址"
    },
    {
        value: 'posi_type',
        label: '职位类型'
    },
    {
        value: 'require',
        label: '学历要求'
    },
    {
        value: 'scale',
        label: '招聘人数'
    },
    {
        value: 'salary',
        label: '工资范围'
    }
]
@connect(state => ({
    home: state.home
}))

export default class AdminRecruit extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            visible:false,
            visible5: false,
            pagination4: {},//招聘
            recruitdata: [],
            selectedrecruitEd: "",
            contentrecruitEd: "",
            hiring_time: "",
            //添加
            address1:"",
            posi_type1:"",
            require1:"",
            scale1:"",
            salary1:"",
            hiring_time1:"",
            url1:"",
        }
    }
    //recruit
    handleCancle5 = () => {
        this.setState({
            visible5: false
        })
    }
    handleClick5 = (record) => {
        this.setState({
            visible5: true,
            hiring_time: record.hiring_time
        })
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    //添加
    handleClick = () => {
        this.setState({
            visible:true,
        })
    }
    handleCancle = () => {
        this.setState({
            visible:false,
        })
    }
    //删除
    handleClick2 = (record) => {
        this.deleterecruit(record.hiring_time)
    }
    //招聘
    handleTableChange4 = (pagination4) => {
        const paper = { ...this.state.pagination4 };
        paper.current = pagination4.current;
        this.setState({
            pagination4: paper,
        })
        let page = paper.current
        this.getPage4(page)
    }
    getPage4 = (page = 1) => {
        let config = {}
        config.companyName = this.props.location.query.companyName;
        config.start = page;
        config.rows = 10;
        this.props.dispatch(getEnterprise_recruit(toQuery(config))).then(() => {
            let data = this.props.home.EnRecruitData.data;
            let all = data.map((item, index) => {
                item.id5 = index + 1;
                return item;
            })
            this.setState({
                recruitdata: all
            })
        })
    }
    fetch4 = (params = {}) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_recruitnumber(toQuery(config))).then(() => {
            let data = this.props.home.EnRecruitNumberData.data;
            if (data == 0) {
                message.warning("暂无招聘数据")
            }
            const pagination4 = { ...this.state.pagination4 };
            pagination4.total = data;
            this.setState({
                pagination4,
            })
        })
    }
    updaterecruit = () => {
        this.props.form.validateFields(['selectedrecruitEd', 'contentrecruitEd'], (errors, values) => {
            if (!!errors) {
                message.warning("请确认填写无误!")
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.selectedrecruitEd != "" && values.contentrecruitEd != "") {
                config['hiring_time'] = this.state.hiring_time;
                config[values.selectedrecruitEd] = values.contentrecruitEd;
                this.props.dispatch(applychange_recruit(config)).then(() => {
                    if (this.props.home.recruitcode === 'success') {
                        message.success("操作成功");
                        this.handleCancle5();
                        this.fetch4();
                        this.getPage4();
                    }
                })
            }
        })
    }
    insertrecruit = () => {
        this.props.form.validateFields(['address1','posi_type1','require1','scale1','salary1','hiring_time1','url1'],(error,values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName:this.props.location.query.companyName
            }
            if(values.address1!=""&&values.posi_type1!=""&&values.require1!=""&&values.scale1!=""&&values.salary!=""&&values.hiring_time1!=""&&values.url1!=""){
                config['address'] = values.address1;
                config['posi_type'] = values.posi_type1;
                config['require'] = values.require1;
                config['scale'] = values.scale1;
                config['salary'] = values.salary1;
                config['hiring_time'] = values.hiring_time1;
                config['url'] = values.url1;
                this.props.dispatch(insert_recruit(config)).then(() => {
                    if(this.props.home.insertrecruitcode === 'success'){
                        message.success('操作成功!');
                        this.handleCancle();
                        this.fetch4();
                        this.getPage4();
                    }
                })
            }
        })
    }
    deleterecruit = (hiring_time) => {
        let config = {
            companyName: this.props.location.query.companyName,
        }
        config['hiring_time'] = hiring_time;
        this.props.dispatch(delete_recruit(toQuery(config))).then(() =>{
            if(this.props.home.deleterecruitcode === 'success'){
                message.success('删除成功!')
                this.fetch4();
                this.getPage4();
            }
        })
    }
    componentDidMount() {
        this.fetch4()//招聘
        this.getPage4()
    }
    render() {
        const recruitcolumns = [
            {
                title: "序号",
                key: "id5",
                dataIndex: "id5"
            },
            {
                title: "招聘地址",
                key: "address",
                dataIndex: "address"
            },
            {
                title: "职位类型",
                key: "posi_type",
                dataIndex: "posi_type"
            },
            {
                title: "学历要求",
                key: "require",
                dataIndex: "require"
            },
            {
                title: "招聘人数",
                key: "scale",
                dataIndex: "scale"
            },
            {
                title: "工资范围",
                key: "salary",
                dataIndex: "salary"
            },
            {
                title: "发布时间",
                key: "hiring_time",
                dataIndex: "hiring_time"
            },
            {
                title: "网站详情",
                key: "url",
                dataIndex: "url",
                render: record => (
                    <a href={record} target="_blank">
                        查看详情
                    </a>
                )
            },
            {
                title: "删除",
                dataIndex: "delete1",
                key: "delete1",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="delete"
                            onClick={this.handleClick2.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    )
                }
            },
            {
                title: "操作",
                dataIndex: "operation4",
                key: "operation4",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="edit"
                            onClick={this.handleClick5.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    )
                }
            }
        ]
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };
        return (
            <div>
                <div style={{ marginBottom: "5px" }}>
                    <Button
                        type="primary"
                        onClick={this.handleClick}
                        style={{ marginLeft: "10px" }}
                        size="large"
                    >添加招聘</Button>
                </div>
                <div className="adminRecruitTable">
                <Table
                    columns={recruitcolumns}
                    rowKey={record => record.id5}
                    dataSource={this.state.recruitdata}
                    pagination={this.state.pagination4}
                    onChange={this.handleTableChange4}
                />
                </div>
                <Modal
                    title="修改招聘信息"
                    visible={this.state.visible5}
                    onOk={this.updaterecruit}
                    onCancel={this.handleCancle5}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectedrecruitEd', {
                                rules: [{
                                    required: true,
                                    message: "修改选项不能为空"
                                }]
                            })(<Cascader
                                options={recruitoption}
                                expandTrigger="hover"
                                placeholder="请选择修改选项"
                                style={{ width: "100%" }}
                            />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contentrecruitEd', {
                                rules: [{
                                    required: true,
                                    message: '修改内容不能为空'
                                }]
                            })(<Input type="textarea" placeholder="请输入修改内容" style={{ width: "100%" }} />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加招聘信息"
                    visible={this.state.visible}
                    onOk={this.insertrecruit}
                    onCancel={this.handleCancle}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加招聘地址" hasFeedback>
                            {getFieldDecorator('address1', {
                                rules: [{
                                    required: true,
                                    message: '招聘地址不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入招聘地址" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加职位类型" hasFeedback>
                            {getFieldDecorator('posi_type1', {
                                rules: [{
                                    required: true,
                                    message: '职位类型不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入职位类型" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加学历要求" hasFeedback>
                            {getFieldDecorator('require1', {
                                rules: [{
                                    required: true,
                                    message: '学历要求不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入学历要求" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加招聘人数" hasFeedback>
                            {getFieldDecorator('scale1', {
                                rules: [{
                                    required: true,
                                    message: '招聘人数不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入招聘人数" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加工资范围" hasFeedback>
                            {getFieldDecorator('salary1', {
                                rules: [{
                                    required: true,
                                    message: '工资范围不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入工资范围" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加发布时间" hasFeedback>
                            {getFieldDecorator('hiring_time1', {
                                rules: [{
                                    required: true,
                                    message: '发布时间不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入发布时间" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加详情链接" hasFeedback>
                            {getFieldDecorator('url1', {
                                rules: [{
                                    required: true,
                                    message: '详情链接不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入详情链接" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
AdminRecruit = Form.create()(AdminRecruit);