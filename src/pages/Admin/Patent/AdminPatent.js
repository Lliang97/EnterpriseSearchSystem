import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
    getEnterprise_patentnumber,
    getEnterprise_patent,
    applychange_patent,
    insert_patent,
    delete_patent
} from "../../../actions/getEnterprisePatent";
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
import { Link, hashHistory, browserHistory } from "react-router";
import "./AdminPatent.scss";
import { toQuery } from "../../../untils/utils";

const Panel = Collapse.Panel;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const patentoption = [
    {
        value: 'agent',
        label: '代理人'
    },
    {
        value: 'agent_company',
        label: '代理公司'
    },
    {
        value: 'appli_time',
        label: '申请时间'
    }
]
@connect(state => ({
    home: state.home
}))
export default class AdminPatent extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            visible4: false,
            pagination2: {},//专利
            patentdata: [],
            selectedpatentEd: "",
            contentpatentEd: "",
            patent_name: "",
            //添加
            patent_name1:"",
            agent1:"",
            agent_company1:"",
            appli_time1:"",
            url1:""
        }
    }
    //添加
    handleCancle = () => {
        this.setState({
            visible:false,
        })
    }
    handleClick = () => {
        this.setState({
            visible:true,
        })
    }
    //删除
    handleClick1 = (record) => {
        this.deletepatent(record.patent_name);
    }
    //patent
    handleCancle4 = () => {
        this.setState({
            visible4: false
        })
    }
    handleClick4 = (record) => {
        this.setState({
            visible4: true,
            patent_name: record.patent_name
        })
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    //获取专利
    handleTableChange2 = (pagination2) => {
        const paper = { ...this.state.pagination2 };
        paper.current = pagination2.current;
        this.setState({
            pagination2: paper
        })
        let page = paper.current;
        this.getPage2(page);
    }
    getPage2 = (page = 1) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        config.start = page;
        config.rows = 10;
        this.props.dispatch(getEnterprise_patent(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentData.data;
            let all = data.map((item, index) => {
                item.index = index + 1;
                return item;
            })
            this.setState({
                patentdata: all
            })
        })
    }
    fetch2 = (params = {}) => {
        let config = {}
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_patentnumber(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentNumberData.data;
            if (data == 0) {
                message.warning("暂无专利数据")
            }
            const pagination2 = { ...this.state.pagination2 }
            pagination2.total = data;
            this.setState({
                pagination2,
            })
        })
    }
    updatepatent = () => {
        this.props.form.validateFields(['selectedpatentEd', 'contentpatentEd'], (error, values) => {
            if (!!error) {
                message.warning("请确认填写无误")
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            // console.log(values.selectedpatentEd)
            if (values.selectedpatentEd != undefined && values.contentpatentEd != undefined) {
                config['patent_name'] = this.state.patent_name;
                config[values.selectedpatentEd] = values.contentpatentEd;
                this.props.dispatch(applychange_patent(config)).then(() => {
                    //console.log()
                    if (this.props.home.patentcode === 'success') {
                        message.success("操作成功")
                        this.handleCancle4();
                        this.fetch2();
                        this.getPage2();
                    } else {
                        message.error("修改失败")
                    }
                })
            }
        })
    }
    insertpatent = () => {
        this.props.form.validateFields(['patent_name1','agent1','agent_company1','appli_time1','url1'],(error,values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName:this.props.location.query.companyName
            }
            if(values.patent_name1!=undefined&&values.agent1!=undefined&&values.agent_company1!=undefined&&values.appli_time1!=undefined&&values.url1){
                config['patent_name'] = values.patent_name1;
                config['agent'] = values.agent1;
                config['agent_company'] = values.agent_company1;
                config['appli_time'] = values.appli_time1;
                config['url'] = values.url1;
                this.props.dispatch(insert_patent(config)).then(() => {
                    //console.log(this.props.home.insertpatentcode)
                    if(this.props.home.insertpatentcode === 'success'){
                        message.success('操作成功');
                        this.handleCancle();
                        this.fetch2();
                        this.getPage2();
                    }
                })
            }
        })
    }
    deletepatent = (patent_name) => {
        let config = {
            companyName:this.props.location.query.companyName
        }
        config['patent_name'] = patent_name;
        this.props.dispatch(delete_patent(toQuery(config))).then(() => {
            if(this.props.home.deletepatentcode === 'success'){
                message.success('删除成功!')
                this.fetch2();
                this.getPage2();
            }
        })
    }
    componentDidMount() {
        this.fetch2()//专利
        this.getPage2()
    }
    render() {
        const patentcolumns = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index"
            },
            {
                title: "专利名称",
                dataIndex: "patent_name",
                key: "patent_name"
            },
            {
                title: "代理人",
                dataIndex: "agent",
                key: "agent"
            },
            {
                title: "代理公司名",
                dataIndex: "agent_company",
                key: "agent_company"
            },
            {
                title: "申请时间",
                dataIndex: "appli_time",
                key: "appli_time"
            },
            {
                title: "详情",
                dataIndex: "url",
                key: "url",
                render: record => (
                    <a href={record} target="_blank">
                        查看详情
                    </a>
                ) 
            },
            {
                title: "删除",
                dataIndex: "delete",
                key: "delete",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="delete"
                            onClick={this.handleClick1.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    );
                }
            },
            {
                title: "修改",
                dataIndex: "operation3",
                key: "operation3",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="edit"
                            onClick={this.handleClick4.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    );
                }
            }
        ];
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
                    >添加专利</Button>
                </div>
                <div className="adminPatentTable">
                <Table
                    columns={patentcolumns}
                    dataSource={this.state.patentdata}
                    pagination={this.state.pagination2}
                    onChange={this.handleTableChange2}
                    rowKey={record => record.index}
                // size='small'
                />
                </div>
                <Modal
                    title="修改专利信息"
                    visible={this.state.visible4}
                    onOk={this.updatepatent}
                    onCancel={this.handleCancle4}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectedpatentEd', {
                                rules: [{
                                    required: true,
                                    message: "修改选项不能为空"
                                }]
                            })(<Cascader
                                options={patentoption}
                                expandTrigger="hover"
                                placeholder="请选择修改选项"
                                style={{ width: "100%" }}
                            />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contentpatentEd', {
                                rules: [{
                                    required: true,
                                    message: "修改内容不能为空"
                                }]
                            })(<Input type="textarea" placeholder="请输入修改内容" style={{ width: "100%" }} />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加专利"
                    visible={this.state.visible}
                    onOk={this.insertpatent}
                    onCancel={this.handleCancle}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加专利名称" hasFeedback>
                            {getFieldDecorator('patent_name1', {
                                rules: [{
                                    required: true,
                                    message: '专利名称不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入专利名称" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加代理人" hasFeedback>
                            {getFieldDecorator('agent1', {
                                rules: [{
                                    required: true,
                                    message: '代理人不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入代理人" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加代理公司" hasFeedback>
                            {getFieldDecorator('agent_company1', {
                                rules: [{
                                    required: true,
                                    message: '代理公司不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入代理公司" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加申请时间" hasFeedback>
                            {getFieldDecorator('appli_time1', {
                                rules: [{
                                    required: true,
                                    message: '申请时间不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入申请时间" style={{width:"100%"}}/>)}
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
AdminPatent = Form.create()(AdminPatent);