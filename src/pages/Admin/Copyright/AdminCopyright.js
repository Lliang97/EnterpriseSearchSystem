import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
    getEnterprise_copyrighttotal,
    getEnterprise_copyright,
    applychange_copyright,
    insert_copyright,
    delete_coyright
} from "../../../actions/getEnterpriseWorkCopyright";
import {
    Table,
    Input,
    Button,
    Form,
    Modal,
    Cascader,
    message
} from "antd";
import "./AdminCopyright.scss";
import { toQuery } from "../../../untils/utils";
import { error } from "util";

const FormItem = Form.Item;
const copyrightoption = [
    {
        value: 'softwareName',
        label: '著作权名称'
    },
    {
        value: 'releaseDate',
        label: '发布日期'
    },
    {
        value: 'registrationNumber',
        label: '注册号'
    },
    {
        value: 'softwareAbbreviation',
        label: '缩写'
    },
    {
        value: 'registrationApprovalDate',
        label: '批准时间'
    }
]
@connect(state => ({
    home: state.home
}))

export default class AdminCopright extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            visible6: false,
            pagination5: {},//著作权
            copyrightdata: [],
            selectedcopyrightEd: "",
            contentcopyrightEd: "",
            registrationNumber: "",
            releaseDate:"",
            softwareAbbreviation:"",
            registrationApprovalDate:""
        }
    }
    //copyright
    handleCancle6 = () => {
        this.setState({
            visible6: false
        })
    }
    handleClick6 = (record) => {
        this.setState({
            visible6: true,
            registrationNumber: record.registrationNumber
        })
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
        this.deletetrade(record.registrationNumber)
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
        this.props.dispatch(getEnterprise_copyright(toQuery(config))).then(() => {
            let data = this.props.home.EnCopyrightData.data;
            console.log(data);
            let all = data.map((item, index) => {
                item.id5 = index + 1;
                return item;
            })
            this.setState({
                copyrightdata: all,
            })
        })
    }
    fetch5 = (params = {}) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_copyrighttotal(toQuery(config))).then(() => {
            let data = this.props.home.copyrighttotal.data;
            if (data == 0) {
                message.warning("暂无著作权数据")
            }
            const pagination5 = { ...this.state.pagination5 };
            pagination5.total = data;
            this.setState({
                pagination5,
            })
        })
    }
    updatecopyright = () => {
        this.props.form.validateFields(['selectedcopyrightEd', 'contentcopyrightEd'], (errors, values) => {
            if (!!errors) {
                message.warning("请确认填写无误!")
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.selectedcopyrightEd != "" && values.contentcopyrightEd != "") {
                config['registrationNumber'] = this.state.registrationNumber;
                config[values.selectedcopyrightEd] = values.contentcopyrightEd;
                console.log(config)
                this.props.dispatch(applychange_copyright(config)).then(() => {
                    if (this.props.home.copyrightcode === 'success') {
                        message.success("操作成功");
                        this.handleCancle6();
                        this.fetch5();
                        this.getPage5();
                    }
                })
            }
        })
    }
    insertcopyright = () => {
        this.props.form.validateFields(['softwareName','releaseDate','registrationNumber','softwareAbbreviation','registrationApprovalDate'], (errors, values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.softwareName!= "" && values.releaseDate!= ""&&values.registrationNumber!=""&&values.softwareAbbreviation!=""&&values.registrationApprovalDate!="") {
                config['softwareName'] = values.softwareName;
                config['releaseDate'] = values.releaseDate;
                config['registrationNumber'] = values.registrationNumber;
                config['softwareAbbreviation'] = values.softwareAbbreviation;
                config['registrationApprovalDate'] = values.registrationApprovalDate;
                config['versionNumber'] = "V1.0";
                this.props.dispatch(insert_copyright(config)).then(() => {
                    console.log(this.props.home.insertcopyrightcode)
                    if(this.props.home.insertcopyrightcode == 'success'){

                        message.success('操作成功!')
                        this.handleCancle();
                        this.fetch5();
                        this.getPage5();
                    }
                })
            }
        })
    }
    deletetrade = (registrationNumber) => {
        let config = {
            companyName:this.props.location.query.companyName
        }
        config['registrationNumber'] = registrationNumber;
        console.log(config);
        this.props.dispatch(delete_coyright(toQuery(config))).then(() => {
            if(this.props.home.deletecopyrightcode === 'success'){
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
        const copyrightcolumns = [
            {
                title: "序号",
                key: "id5",
                dataIndex: "id5"
            },
            {
                title: "著作名称",
                key: "softwareName",
                dataIndex: "softwareName"
            },
            {
                title: "发布日期",
                key: "releaseDate",
                dataIndex: "releaseDate"
            },
            {
                title: "注册号",
                key: "registrationNumber",
                dataIndex: "registrationNumber",
            },
            {
                title: "缩写",
                key: "softwareAbbreviation",
                dataIndex: "softwareAbbreviation"
            },
            {
                title: "批准日期",
                key: "registrationApprovalDate",
                dataIndex: "registrationApprovalDate"
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
                    >添加著作权</Button>
                </div>
                <div className="adminCopyrightTable">
                <Table
                    columns={copyrightcolumns}
                    dataSource={this.state.copyrightdata}
                    pagination={this.state.pagination5}
                    onChange={this.handleTableChange5}
                    rowKey={record => record.id5}
                />
                </div>
                <Modal
                    title="修改著作权信息"
                    visible={this.state.visible6}
                    onOk={this.updatecopyright}
                    onCancel={this.handleCancle6}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectedcopyrightEd', {
                                rules: [{
                                    required: true,
                                    message: "修改选项不能为空"
                                }]
                            })(<Cascader
                                options={copyrightoption}
                                expandTrigger="hover"
                                placeholder="请选择修改选项"
                                style={{ width: "100%" }}
                            />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contentcopyrightEd', {
                                rules: [{
                                    required: true,
                                    message: '修改内容不能为空'
                                }]
                            })(<Input type="textarea" placeholder="请输入修改内容" style={{ width: "100%" }} />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加著作权"
                    visible={this.state.visible}
                    onOk={this.insertcopyright}
                    onCancel={this.handleCancle}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加著作权名称" hasFeedback>
                            {getFieldDecorator('softwareName', {
                                rules: [{
                                    required: true,
                                    message: '著作权名称不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入著作权名称" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加发布日期" hasFeedback>
                            {getFieldDecorator('releaseDate', {
                                rules: [{
                                    required: true,
                                    message: '发布日期不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入发布日期" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加注册号" hasFeedback>
                            {getFieldDecorator('registrationNumber', {
                                rules: [{
                                    required: true,
                                    message: '注册号不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入注册号" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加缩写" hasFeedback>
                            {getFieldDecorator('softwareAbbreviation', {
                                rules: [{
                                    required: true,
                                    message: '缩写不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入缩写" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="添加批准日期" hasFeedback>
                            {getFieldDecorator('registrationApprovalDate', {
                                rules: [{
                                    required: true,
                                    message: '批准日期不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入批准日期" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
AdminCopright= Form.create()(AdminCopright);