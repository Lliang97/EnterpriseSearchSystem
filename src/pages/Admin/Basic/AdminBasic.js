import React from 'react';
import "antd/dist/antd.css";
import { Cascader, Icon, Form, Descriptions, Badge, message, Button, Input, Modal, Select } from 'antd';
import { Link } from "react-router";
import { connect } from "react-redux";
import { toQuery } from "../../../untils/utils";
import {
    applychange_companyinformation,
    getEnterprise_adinfodata,
} from "../../../actions/enterprise_adinfo";
import './AdminBasic.scss';
const FormItem = Form.Item;
const { TextArea } = Input;
const options = [{
    value: '公司法人  注册资本  公司简介 实缴资本',
    label: '公司法人  注册资本  公司简介 实缴资本',
    children: [
        {
            value: 'legalPerson',
            label: '公司法人',
        }, {
            value: 'registeredCapital',
            label: '注册资本',
        }, {
            value: 'companyProfile',
            label: '公司简介',
        }, {
            value: 'paidCapital',
            label: '实缴资本',
        }
    ],
}, {
    value: '经营状态 建立时间 公司类型 所属行业',
    label: '经营状态 建立时间 公司类型 所属行业',
    children: [
        {
            value: 'businessStatus',
            label: '经营状态',
        }, {
            value: 'establishDate',
            label: '建立时间',
        }, {
            value: 'companyType',
            label: '公司类型',
        }, {
            value: 'industry',
            label: '所属行业',
        }
    ],
}, {
    value: '企业地址 登记机关 员工规模 核准日期',
    label: '企业地址 登记机关 员工规模 核准日期',
    children: [
        {
            value: 'address',
            label: '企业地址',
        }, {
            value: 'registrationAuth',
            label: '登记机关',
        }, {
            value: 'staffSize',
            label: '员工规模',
        }, {
            value: 'approvalDate',
            label: '核准日期',
        }
    ]
}, {
    value: '社会信用代码 纳税人识别号 注册号',
    label: '社会信用代码 纳税人识别号 注册号',
    children: [
        {
            value: 'creditCode',
            label: '社会信用代码',
        }, {
            value: 'taxpayerNum',
            label: '纳税人识别号',
        }, {
            value: 'registrationNum',
            label: '注册号'
        }
    ]
}, {
    value: '组织机构代码 曾用名 经营时间',
    label: '组织机构代码 曾用名 经营时间',
    children: [
        {
            value: 'organizationCode',
            label: '组织机构代码',
        }, {
            value: 'usedName',
            label: '曾用名',
        }, {
            value: 'operatingPeriod',
            label: '经营时间'
        }
    ]
}, {
    value: '经营范围 所属城市 所属县区',
    label: '经营范围 所属城市 所属县区',
    children: [
        {
            value: 'businessScope',
            label: '经营范围',
        }, {
            value: 'city',
            label: '所属城市',
        }, {
            value: 'county',
            label: '所属县区',
        }
    ]
}
];
@connect(state => ({
    home: state.home
}))
export default class AdminBasic extends React.Component {
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            enterprise_search_baseinfodata: [],//企业基本信息
            visible: false,
            selectedEd: '',
            contentEd: '',
        };
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    handleCancle = () => {
        this.setState({
            visible: false,
        });
    }
    handleClick = () => {
        this.setState({
            visible: true
        })
    }
    componentWillUnmount() {
        //组件卸载时候，注销keypress事件
        // document.removeEventListener("keypress", this.handleKeyDown);
        this.mounted = false;
        this.setState = (state, callback) => {
            return;
        };
    }
    componentWillMount() {//装载完毕
        this.mounted = true;
    }
    componentDidMount() {
        this.getEnterpriseBaseInfoData();
    }
    getEnterpriseBaseInfoData = () => {
        let companyName = this.props.location.query.companyName;
        let config = {
            companyName: companyName
        }
        this.props.dispatch(getEnterprise_adinfodata(toQuery(config))).then(() => {
            let data = this.props.home.Entadinfodata.data[0];
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    enterprise_search_baseinfodata: data
                });
            }
        });
    }
    handleForm = () => {
        this.props.form.validateFields(['selectedEd', 'contentEd',], (errors, values) => {
            if (!!errors) {
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName: this.props.location.query.companyName,
            }
            if (values.selectedEd[1] != "" && values.contentEd != "") {
                config[values.selectedEd[1]] = values.contentEd;
                this.props.dispatch(applychange_companyinformation(config)).then(() => {
                    if (this.props.home.code === 'success') {
                        message.success('操作成功');
                        this.handleCancle();
                        this.getEnterpriseBaseInfoData();
                    } else {
                        message.error('操作失败');
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
                    >
                        修改信息
                    </Button>
                </div>
                <div className="baseinfo">
                    <Descriptions bordered>
                        <Descriptions.Item label="企业名">{this.state.enterprise_search_baseinfodata.companyName}</Descriptions.Item>
                        <Descriptions.Item label="法定代表人">{this.state.enterprise_search_baseinfodata.legalPerson}</Descriptions.Item>
                        <Descriptions.Item label="经营状况"><Badge status="processing" text={this.state.enterprise_search_baseinfodata.businessStatus} /></Descriptions.Item>
                        <Descriptions.Item label="成立日期">{this.state.enterprise_search_baseinfodata.establishDate}</Descriptions.Item>
                        <Descriptions.Item label="注册资本">{this.state.enterprise_search_baseinfodata.registeredCapital}</Descriptions.Item>
                        <Descriptions.Item label="实缴资本" >{this.state.enterprise_search_baseinfodata.paidCapital}
                        </Descriptions.Item>
                        <Descriptions.Item label="统一社会信用代码" >{this.state.enterprise_search_baseinfodata.taxpayerNum}
                        </Descriptions.Item>
                        <Descriptions.Item label="组织机构代码">{this.state.enterprise_search_baseinfodata.organizationCode}
                        </Descriptions.Item>
                        <Descriptions.Item label="工商注册号">{this.state.enterprise_search_baseinfodata.registrationNum}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业类型">{this.state.enterprise_search_baseinfodata.companyType}
                        </Descriptions.Item>
                        <Descriptions.Item label="所属行业">{this.state.enterprise_search_baseinfodata.industry}
                        </Descriptions.Item>
                        <Descriptions.Item label="登记机关">{this.state.enterprise_search_baseinfodata.registrationAuth}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业地址" span={3}>{this.state.enterprise_search_baseinfodata.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="经营范围" >{this.state.enterprise_search_baseinfodata.businessScope}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div>
                    <Modal
                        title="修改工商信息"
                        visible={this.state.visible}
                        onOk={this.handleForm}
                        onCancel={this.handleCancle}
                        okText="修改"
                    >
                        <Form>
                            <FormItem  {...formItemLayout} label="修改选项" hasFeedback>
                                {getFieldDecorator('selectedEd', {
                                    rules: [{
                                        required: true,
                                        message: '选择修改项不能为空',
                                    }],
                                    initialValue: this.state.selectedEd
                                })(<Cascader
                                    options={options}
                                    expandTrigger="hover"
                                    displayRender={this.displayRender}
                                    placeholder="请选择修改项"
                                />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="修改内容" hasFeedback>
                                {getFieldDecorator('contentEd', {
                                    rules: [{
                                        required: true,
                                        message: '修改内容不能为空',
                                    }],
                                    initialValue: this.state.contentEd
                                })(<TextArea rows={4} placeholder="请输入修改内容"  />)}
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}
AdminBasic = Form.create()(AdminBasic);