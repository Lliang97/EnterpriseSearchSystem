import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
    getEnterprise_tradetotal,
    getEnterprise_tradedata,
    applychange_trade,
    insert_trade,
    delete_trade
} from "../../../actions/getEnterpriseTrade";
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

import "./AdminTrade.scss";
import { toQuery } from "../../../untils/utils";
import { error } from "util";


const FormItem = Form.Item;
const tradeoption = [
    {
        value: 'agent_name',
        label: '代理商'
    },
    {
        value: 'trade_name',
        label: '贸易名称'
    },
    {
        value: 'status',
        label: '贸易状态'
    },
    {
        value: 'applicant_address',
        label: '申请地址'
    },
    {
        value: 'trade_type',
        label: '贸易类型'
    }
]
@connect(state => ({
    home: state.home
}))

export default class AdminTrade extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            visible6: false,
            pagination5: {},//贸易
            tradedata: [],
            selectedtradeEd: "",
            contenttradeEd: "",
            regist_num: "",
            //添加
            agent_name1:"",
            regist_num1:"",
            trade_name1:"",
            status1:"",
            applicant_address1:"",
            trade_type1:"",
            url1:"",
        }
    }
    //trade
    handleCancle6 = () => {
        this.setState({
            visible6: false
        })
    }
    handleClick6 = (record) => {
        this.setState({
            visible6: true,
            regist_num: record.regist_num
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
        this.deletetrade(record.regist_num)
    }
    //贸易
    handleTableChange5 = (pagination5) => {
        const paper = { ...this.state.pagination5 };
        paper.current = pagination5.current;
        this.setState({
            pagination5: paper
        })
        let page = paper.current;
        this.getPage5(page);
    }
    getPage5 = (page = 1) => {
        let config = {};
        config.start = page;
        config.rows = 10;
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_tradedata(toQuery(config))).then(() => {
            let data = this.props.home.tradedata.data;
            let all = data.map((item, index) => {
                item.id5 = index + 1;
                return item;
            })
            this.setState({
                tradedata: all,
            })
        })
    }
    fetch5 = (params = {}) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_tradetotal(toQuery(config))).then(() => {
            let data = this.props.home.tradetotal.data;
            if (data == 0) {
                message.warning("暂无商标数据")
            }
            const pagination5 = { ...this.state.pagination5 };
            pagination5.total = data;
            this.setState({
                pagination5,
            })
        })
    }
    updatetrade = () => {
        this.props.form.validateFields(['selectedtradeEd', 'contenttradeEd'], (errors, values) => {
            if (!!errors) {
                message.warning("请确认填写无误!")
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.selectedtradeEd != "" && values.contenttradeEd != "") {
                config['regist_num'] = this.state.regist_num;
                config[values.selectedtradeEd] = values.contenttradeEd;
                this.props.dispatch(applychange_trade(config)).then(() => {
                    if (this.props.home.tradecode === 'success') {
                        message.success("操作成功");
                        this.handleCancle6();
                        this.fetch5();
                        this.getPage5();
                    }
                })
            }
        })
    }
    inserttrade = () => {
        this.props.form.validateFields(['agent_name1','regist_num1','trade_name1','status1','applicant_address1','trade_type1','url1'], (errors, values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.agent_name1!= "" && values.regist_num1!= ""&&values.trade_name1!=""&&values.status1!=-""&&values.applicant_address1!=""&&values.trade_type1!=""&&values.url1!="") {
                config['agent_name'] = values.agent_name1;
                config['regist_num'] = values.regist_num1;
                config['trade_name'] = values.trade_name1;
                config['status'] = values.status1;
                config['applicant_address'] = values.applicant_address1;
                config['trade_type'] = values.trade_type1;
                config['url'] = values.url1;
                this.props.dispatch(insert_trade(config)).then(() => {
                    if(this.props.home.inserttradecode === 'success'){
                        message.success('操作成功!')
                        this.handleCancle();
                        this.fetch5();
                        this.getPage5();
                    }
                })
            }
        })
    }
    deletetrade = (regist_num) => {
        let config = {
            companyName:this.props.location.query.companyName
        }
        config['regist_num'] = regist_num;
        this.props.dispatch(delete_trade(toQuery(config))).then(() => {
            if(this.props.home.deletetradecode === 'success'){
                message.success('删除成功!');
                this.fetch5();
                this.getPage5();
            }
        })
    }
    componentDidMount() {
        this.fetch5()//贸易
        this.getPage5()
    }
    render() {
        const tradecolumns = [
            {
                title: "序号",
                key: "id5",
                dataIndex: "id5"
            },
            {
                title: "代理商",
                key: "agent_name",
                dataIndex: "agent_name"
            },
            {
                title: "注册号",
                key: "regist_num",
                dataIndex: "regist_num"
            },
            {
                title: "商标名称",
                key: "trade_name",
                dataIndex: "trade_name"
            },
            {
                title: "商标状态",
                key: "status",
                dataIndex: "status",
            },
            {
                title: "申请地址",
                key: "applicant_address",
                dataIndex: "applicant_address"
            },
            {
                title: "商标类型",
                key: "trade_type",
                dataIndex: "trade_type"
            },

            {
                title: "详情",
                key: "url",
                dataIndex: "url",
                record: record => (
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
                            onClick={this.handleClick2.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    )
                }
            },
            {
                title: "操作",
                dataIndex: "operation5",
                key: "operation5",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="edit"
                            onClick={this.handleClick6.bind(this, record)}
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
                <div style={{marginBottom: "5px" }}>
                    <Button
                        type="primary"
                        onClick={this.handleClick}
                        style={{ marginLeft: "10px" }}
                        size="large"
                    >添加商标</Button>
                </div>
                <div className="adminTradeTable">
                <Table
                    columns={tradecolumns}
                    dataSource={this.state.tradedata}
                    pagination={this.state.pagination5}
                    onChange={this.handleTableChange5}
                    rowKey={record => record.id5}
                />
                </div>
                <Modal
                    title="修改贸易信息"
                    visible={this.state.visible6}
                    onOk={this.updatetrade}
                    onCancel={this.handleCancle6}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectedtradeEd', {
                                rules: [{
                                    required: true,
                                    message: "修改选项不能为空"
                                }]
                            })(<Cascader
                                options={tradeoption}
                                expandTrigger="hover"
                                placeholder="请选择修改选项"
                                style={{ width: "100%" }}
                            />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contenttradeEd', {
                                rules: [{
                                    required: true,
                                    message: '修改内容不能为空'
                                }]
                            })(<Input type="textarea" placeholder="请输入修改内容" style={{ width: "100%" }} />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加商标"
                    visible={this.state.visible}
                    onOk={this.inserttrade}
                    onCancel={this.handleCancle}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加代理商" hasFeedback>
                            {getFieldDecorator('agent_name1', {
                                rules: [{
                                    required: true,
                                    message: '代理商不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入代理商" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加注册号" hasFeedback>
                            {getFieldDecorator('regist_num1', {
                                rules: [{
                                    required: true,
                                    message: '注册号不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入注册号" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加商标名称" hasFeedback>
                            {getFieldDecorator('trade_name1', {
                                rules: [{
                                    required: true,
                                    message: '商标名称不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入商标名称" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加商标状态" hasFeedback>
                            {getFieldDecorator('status1', {
                                rules: [{
                                    required: true,
                                    message: '商标状态不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入商标状态" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加申请地址" hasFeedback>
                            {getFieldDecorator('applicant_address1', {
                                rules: [{
                                    required: true,
                                    message: '申请地址不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入申请地址" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加商标类型" hasFeedback>
                            {getFieldDecorator('trade_type1', {
                                rules: [{
                                    required: true,
                                    message: '商标类型不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入商标类型" style={{width:"100%"}}/>)}
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
AdminTrade = Form.create()(AdminTrade);