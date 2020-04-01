import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import classNames from "classnames";
import {
    getEnterprise_literaturenumber,
    getEnterprise_literature,
    applychange_literature,
    insert_literature,
    delete_literature,
} from "../../../actions/getEnterpriseLiterature";
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
import "./AdminLiterature.scss"
import { toQuery } from "../../../untils/utils";
import { error } from "util";
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const literatureoption = [
    {
        value: 'author',
        label: '作者'
    },
    {
        value: 'keyword',
        label: '关键词',
    },
    {
        value: 'public_time',
        label: '发表时间',
    }
];
@connect(state => ({
    home: state.home
}))
export default class AdminLiterature extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible1:false,
            visible2: false,
            pagination3: {},//论文
            literaturedata: [],
            document_name: "",
            selectedliteratureEd: "",
            contentliteratureEd: "",
            //添加
            document_name1:"",
            author1:"",
            keyword1:"",
            public_time1:"",
        }
    }
    //literature
    handleClick2 = (record) => {
        this.setState({
            visible2: true,
            document_name: record.document_name
        })
    }
    handleCancle2 = () => {
        this.setState({
            visible2: false
        })
    }
    //添加
    handleCancle1 = () => {
        this.setState({
            visible1: false,
        });
    }
    handleClick1 = () => {
        this.setState({
            visible1: true,
        })
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    //删除
    handleClick3 = (record) => {
        this.deleteliterature(record.document_name)
    }
    //论文
    handleTableChange3 = (pagination3) => {
        const paper = { ...this.state.pagination3 };
        paper.current = pagination3.current;
        this.setState({
            pagination3: paper,
        })
        let page = paper.current;
        this.getPage3(page);
    }
    getPage3 = (page = 1) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        config.start = page;
        config.rows = 10;
        this.props.dispatch(getEnterprise_literature(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureData.data;
            let all = data.map((item, index) => {
                item.id3 = index + 1;
                return item;
            })
            this.setState({
                literaturedata: all
            })
        })
    }
    fetch3 = (params = {}) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_literaturenumber(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureNumberData.data;
            if (data == 0) {
                message.warning("暂无文献数据")
            }
            const pagination3 = { ...this.state.pagination3 };
            pagination3.total = data;
            this.setState({
                pagination3,
            })
        })
    }
    updateliterature = () => {
        this.props.form.validateFields(['selectedliteratureEd', 'contentliteratureEd'], (errors, values) => {
            if (!!errors) {
                message.warning("请确认填写无误！")
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.selectedliteratureEd != "" && values.contentliteratureEd != "") {
                config['document_name'] = this.state.document_name;
                config[values.selectedliteratureEd] = values.contentliteratureEd;
                this.props.dispatch(applychange_literature(config)).then(() => {
                    if (this.props.home.literaturecode === 'success') {
                        message.success("操作成功");
                        this.handleCancle2();
                        this.fetch3();
                        this.getPage3();
                    } else {
                        message.error("操作失败");
                    }
                })
            }
        })
    }
    insertliterature = () => {
        this.props.form.validateFields(['document_name1','author1','keyword1','public_time1'],(error,values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if(values.document_name1!=""&&values.author1!=""&&values.keyword1!=""&&values.public_time1!=""){
                config['document_name'] = values.document_name1;
                config['author'] = values.author1;
                config['keyword'] = values.keyword1;
                config['public_time'] = values.public_time1;
                this.props.dispatch(insert_literature(config)).then(() => {
                    if(this.props.home.insertliteraturecode === 'success'){
                        message.success('操作成功');
                        this.handleCancle1();
                        this.fetch3();
                        this.getPage3();
                    }
                })
            }
        })
    }
    deleteliterature = (document_name) => {
        let config = {
            companyName: this.props.location.query.companyName,
            document_name:document_name,
        }
        this.props.dispatch(delete_literature(toQuery(config))).then(() =>{
            if(this.props.home.deleteliteraturecode === 'success'){
                message.success('删除成功!')
                this.fetch3();
                this.getPage3();
            }
        })
    }
    componentDidMount() {
        this.fetch3()//论文
        this.getPage3()
    }
    render() {
        const literatures = [
            {
                title: "序号",
                key: "id3",
                dataIndex: "id3",
            },
            {
                title: "论文名称",
                key: "document_name",
                dataIndex: "document_name"
            },
            {
                title: "作者",
                key: "author",
                dataIndex: "author"
            },
            // {
            //     title: "关键词",
            //     key: "keyword",
            //     dataIndex: "keyword"
            // },
            {
                title: "发表时间",
                key: "public_time",
                dataIndex: "public_time"
            },
            {
                title: "删除",
                dataIndex: "delete",
                key: "delete",
                render:(text,record) => {
                    return(
                        <Button
                            type="primary"
                            shape="circle"
                            icon="delete"
                            onClick={this.handleClick3.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    )
                }
            },
            {
                title: "修改",
                dataIndex: "operation1",
                key: "operation1",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="edit"
                            onClick={this.handleClick2.bind(this, record)}
                            // style={{ 'marginLeft': '5px' }}
                        />
                    );
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
                        onClick={this.handleClick1}
                        style={{ marginLeft: "10px" }}
                        size="large"
                    >添加论文</Button>
                </div>
                <div className="adminliteratureTable">
                <Table
                    columns={literatures}
                    rowKey={record => record.document_name}
                    dataSource={this.state.literaturedata}
                    pagination={this.state.pagination3}
                    onChange={this.handleTableChange3}
                />
                </div>
                <Modal
                    title="修改论文信息"
                    visible={this.state.visible2}
                    onOk={this.updateliterature}
                    onCancel={this.handleCancle2}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectedliteratureEd',{
                                rules:[{
                                    required: true,
                                    message: '修改选项不能为空'
                                }],
                            })(<Cascader
                                options={literatureoption}
                                expandTrigger="hover"
                                displayRender={this.displayRender}
                                placeholder="请选择修改项"
                                style={{width:"100%"}}
                                />)}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contentliteratureEd', {
                                rules: [{
                                    required: true,
                                    message: '修改内容不能为空'
                                }],
                            })(<Input type="textarea" placeholder="修改内容不能为空" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加论文信息"
                    visible={this.state.visible1}
                    onOk={this.insertliterature}
                    onCancel={this.handleCancle1}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加论文名称" hasFeedback>
                            {getFieldDecorator('document_name1',{
                                rules:[{
                                    required: true,
                                    message: '论文名称不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入论文名称" style={{width:"100%"}}
                                />)}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="添加作者" hasFeedback>
                            {getFieldDecorator('author1', {
                                rules: [{
                                    required: true,
                                    message: '作者不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入作者" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="添加关键词" hasFeedback>
                            {getFieldDecorator('keyword1', {
                                rules: [{
                                    required: true,
                                    message: '关键词不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入关键词" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="添加时间" hasFeedback>
                            {getFieldDecorator('public_time1', {
                                rules: [{
                                    required: true,
                                    message: '时间不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入时间" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
AdminLiterature = Form.create()(AdminLiterature);