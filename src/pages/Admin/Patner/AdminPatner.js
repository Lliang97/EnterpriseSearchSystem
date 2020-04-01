import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import classNames from "classnames";
import {
    getEnterprise_partnertotal,
    getEnterprise_partner,
    applychange_partner,
    insert_partner,
    delete_partner,
} from "../../../actions/getEnterprisePartner";
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
import "./AdminPatner.scss"
import { toQuery } from "../../../untils/utils";
import { error } from "util";
const Panel = Collapse.Panel;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const partneroption = [
    {
        value: 'partner_type',
        label: '股东身份',
    },
    {
        value: 'hole_ratio',
        label: '持股比例',
    },
    {
        value: 'sub_cap',
        label: '出资额',
    },
    {
        value: 'sub_date',
        label: '出资日期',
    }
]
@connect(state => ({
    home: state.home
}))
export default class AdminPartner extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible2:false,
            visible3: false, 
            pagination1: {},//股东
            partner_name: "",
            partnerdata: [],
            selectedpartnerEd: "",
            contentpartnerEd: "",
            //添加股东
            companyName1:"",
            partner_name1:"",
            partner_type1:"",
            hole_ratio1:"",
            sub_cap1:"",
            sub_date1:"",
        }
    }
    //partner
    handleClick3 = (record) => {
        this.setState({
            visible3: true,
            partner_name: record.partner_name
        })
    }
    handleCancle3 = () => {
        this.setState({
            visible3: false,
        })
    }
    //添加股东
    handleClick2 =() => {
        this.setState({
            visible2:true,
        })
    }
    handleCancle2 = () => {
        this.setState({
            visible2:false,
        })
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    //删除股东
    handleClick1 = (record) => {
        this.deletepartner(record.partner_name)
    }
    //获取股东信息
    handleTableChange1 = (pagination1) => {
        const paper = { ...this.state.pagination1 };
        paper.current = pagination1.current;
        this.setState({
            pagination1: paper,
        })
        let page = paper.current;
        this.getPage1(page);
    }
    getPage1 = (page = 1) => {
        let config = {};
        config.start = page;
        config.rows = 10;
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_partner(toQuery(config))).then(() => {
            let data = this.props.home.EnPartnerData.data;
            let all = data.map((item, index) => {
                item.id1 = index + 1;
                return item;
            })
            this.setState({
                partnerdata: all
            })
        })
    }
    fetch1 = (params = {}) => {
        let config = {}
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_partnertotal(toQuery(config))).then(() => {
            let data = this.props.home.partnertotal.data;
            if (data == 0) {
                message.warning("暂无股东数据");
            }
            const pagination1 = { ...this.state.pagination1 };
            pagination1.total = data;
            this.setState({
                pagination1,
            })
        })
    }
    updatepartner = () => {
        this.props.form.validateFields(['selectedpartnerEd', 'contentpartnerEd',], (errors, values) => {
            if (!!errors) {
                message.warning("请确认填写无误")
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.selectedpartnerEd != "" && values.contentpartnerEd != "") {
                config['partner_name'] = this.state.partner_name;
                config[values.selectedpartnerEd] = values.contentpartnerEd;
                this.props.dispatch(applychange_partner(config)).then(() => {
                    if (this.props.home.partnercode === 'success') {
                        message.success("操作成功");
                        this.handleCancle3();
                        this.fetch1();
                        this.getPage1();
                    } else {
                        message.error("操作失败")
                    }
                })
            }
        })
    }
    //添加股东
    insertpartner = () =>{
        this.props.form.validateFields(['partner_name1','partner_type1','hole_ratio1','sub_cap1','sub_date1'],(error,values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config={
                companyName:this.props.location.query.companyName
            }
            if(values.partner_name1!=undefined&&values.partner_type1!=undefined&&values.hole_ratio1!=undefined&&values.sub_cap1!=undefined&&values.sub_date1!=undefined){
                config['partner_name'] = values.partner_name1;
                config['partner_type'] = values.partner_type1;
                config['hole_ratio'] = values.hole_ratio1;
                config['sub_cap'] = values.sub_cap1;
                config['sub_date'] = values.sub_date1;
                console.log(config)
                this.props.dispatch(insert_partner(config)).then(() => {
                    console.log(this.props.home.insertpartnercode)
                    if(this.props.home.insertpartnercode === 'success'){
                        message.success('操作成功');
                        this.handleCancle2();
                        this.fetch1();
                        this.getPage1();
                    }
                })
            }
        })
    }
    //删除股东
    deletepartner = (partner_name) => {
        let config={
            companyName:this.props.location.query.companyName
        }
        config['partner_name'] = partner_name;
        this.props.dispatch(delete_partner(toQuery(config))).then(() => {
            if(this.props.home.deletepartnercode === 'success'){
                message.success('删除成功!')
                this.fetch1();
                this.getPage1();
            }
        })
    } 
    componentDidMount() {
        this.fetch1()//股东
        this.getPage1()
    }
    render() {
        const shareholders = [
            {
                title: "序号",
                dataIndex: "id1",
                key: "id1"
            },
            {
                title: "股东",
                dataIndex: "partner_name",
                key: "partner_name"
            },
            {
                title: "股东身份",
                dataIndex: "partner_type",
                key: "partner_type"
            },
            {
                title: "持股比例",
                dataIndex: "hole_ratio",
                key: "hole_ratio"
            },
            {
                title: "出资额(万元)",
                dataIndex: "sub_cap",
                key: "sub_cap"
            },
            {
                title: "出资日期",
                dataIndex: "sub_date",
                key: "sub_date"
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
                        />
                    );
                }
            },
            {
                title: "修改",
                dataIndex: "operation2",
                key: "operation2",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="edit"
                            onClick={this.handleClick3.bind(this, record)}
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
                        onClick={this.handleClick2}
                        style={{ marginLeft: "10px" }}
                        size="large"
                    >添加股东</Button>
                </div>
                <div className="adminpatnerTable">
                <Table
                    columns={shareholders}
                    // size='small'
                    dataSource={this.state.partnerdata}
                    pagination={this.state.pagination1}
                    onChange={this.handleTableChange1}
                    rowKey={record => record.id1}
                />
                </div>
                <Modal
                    title="修改股东信息"
                    visible={this.state.visible3}
                    onOk={this.updatepartner}
                    onCancel={this.handleCancle3}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectedpartnerEd',{
                                rules:[{
                                    required:true,
                                    message:"修改选项不能为空"
                                }]
                            })(<Cascader 
                                options={partneroption}
                                expandTrigger="hover"
                                placeholder="请选择修改选项" 
                                style={{width:"100%"}}
                            />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contentpartnerEd',{
                                rules:[{
                                    required:true,
                                    message:"修改内容不能为空",
                                }]
                            })(<Input type="textarea" placeholder="请输入修改内容" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加股东"
                    visible={this.state.visible2}
                    onOk={this.insertpartner}
                    onCancel={this.handleCancle2}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加股东" hasFeedback>
                            {getFieldDecorator('partner_name1', {
                                rules: [{
                                    required: true,
                                    message: '股东不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入股东" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加股东身份" hasFeedback>
                            {getFieldDecorator('partner_type1', {
                                rules: [{
                                    required: true,
                                    message: '股东身份不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入股东身份" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加持股比例" hasFeedback>
                            {getFieldDecorator('hole_ratio1', {
                                rules: [{
                                    required: true,
                                    message: '持股比例不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入持股比例" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加出资额" hasFeedback>
                            {getFieldDecorator('sub_cap1', {
                                rules: [{
                                    required: true,
                                    message: '出资额不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入出资额" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加出资日期" hasFeedback>
                            {getFieldDecorator('sub_date1', {
                                rules: [{
                                    required: true,
                                    message: '出资日期不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入出资日期" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
AdminPartner = Form.create()(AdminPartner);





