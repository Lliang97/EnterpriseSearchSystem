import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import classNames from "classnames";
import {
    getEnterprise_newsnumber,
    getEnterprise_news,
    applychange_news,
    insert_news,
    delete_news
} from "../../../actions/getEnterpriseNews";
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
import "./AdminNews.scss"
import { toQuery } from "../../../untils/utils";
import { error } from "util";
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const newsoption = [
    {
        value: 'publish_time',
        label: '发布时间'
    },
    {
        value: 'source',
        label: '论文来源'
    }
]
@connect(state => ({
    home: state.home
}))
export default class AdminNews extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            visible2:false,
            pagination: {},//新闻
            newsdata: [],
            total: "",
            selectednewsEd: "",
            contentnewsEd: "",
            title: "",
            //添加新闻
            title1:"",
            publish_time1:"",
            source1:"",
            url1:"",
        }
    }
    //news
    handleCancle1 = () => {
        this.setState({
            visible1: false,
        });
    }
    handleClick1 = (record) => {
        this.setState({
            visible1: true,
            title: record.title
        })
    }
    //删除新闻
    handleClick3 = (record) => {
        this.deletenews(record.title);
    }
    //添加新闻
    handleCancle2 = () => {
        this.setState({
            visible2:false,
        })
    }
    handleClick2 = () => {
        this.setState({
            visible2: true,
        })
    }
    displayRender(label) {
        return label[label.length - 1];
    }
    //获取新闻
    handleTableChange = (pagination) => {
        const paper = { ...this.state.pagination };
        paper.current = pagination.current;
        this.setState({
            pagination: paper,
        });
        let page = paper.current
        this.getPage(page);
    }
    getPage = (page = 1) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        config.start = page;
        config.rows = 10;
        this.props.dispatch(getEnterprise_news(toQuery(config))).then(() => {
            let data = this.props.home.EnNewsData.data;
            let all = data.map((item, index) => {
                item.id = index + 1;
                return item;
            })
            this.setState({
                newsdata: all
            })
        })
    }
    fetch = (params = {}) => {
        let config = {};
        config.companyName = this.props.location.query.companyName;
        this.props.dispatch(getEnterprise_newsnumber(toQuery(config))).then(() => {
            let data = this.props.home.EnNewsNumberData.data;
            if (data == 0) {
                message.warning("暂无新闻数据")
            }
            const pagination = { ...this.state.pagination };
            pagination.total = data;
            this.setState({
                pagination,
            })
        })
    }
    //修改新闻
    updatenews = () => {
        this.props.form.validateFields(['selectednewsEd', 'contentnewsEd'], (errors, values) => {
            if (!!errors) {
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if (values.selectednewsEd != "" && values.contentnewsEd != "") {
                config['title'] = this.state.title;
                config[values.selectednewsEd] = values.contentnewsEd;
                this.props.dispatch(applychange_news(config)).then(() => {
                    if (this.props.home.newscode === 'success') {
                        message.success('操作成功');
                        this.handleCancle1();
                        this.fetch();
                        this.getPage();
                    } else {
                        message.error('操作失败');
                    }
                })
            }
        })
    }
    //添加新闻
    insertnews = () =>{
        this.props.form.validateFields(['title1','publish_time1','source1','url1'],(error,values) => {
            if(!!error){
                message.warning('请确认填写无误!')
            }
            let config = {
                companyName: this.props.location.query.companyName
            }
            if(values.title1!=""&&values.publish_time1!=""&&values.source1!=""&&values.url1!=""){
                config['title'] = values.title1;
                config['publish_time'] = values.publish_time1;
                config['source'] = values.source1;
                config['url'] = values.url1;
                this.props.dispatch(insert_news(config)).then(() => {
                    if(this.props.home.insertnewscode === 'success'){
                        message.success('操作成功');
                        this.handleCancle2();
                        this.fetch();
                        this.getPage();
                    }
                })
            }
        })
    }
    //删除新闻
    deletenews = (title) => {
        let config = {
            companyName: this.props.location.query.companyName,
        }
        config['title'] = title;
        this.props.dispatch(delete_news(toQuery(config))).then(() =>{
            if(this.props.home.deletenewscode === 'success'){
                message.success('删除成功!')
                this.fetch();
                this.getPage();
            }
        })
    }
    componentDidMount() {
        this.fetch()//新闻
        this.getPage()
    }
    render() {
        const newscolumns = [
            {
                title: "序号",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "主题",
                dataIndex: "title",
                key: "title",
                render: (text) => <span className="col-sql">{text}</span>,
            },
            {
                title: "发布时间",
                dataIndex: "publish_time",
                key: "publish_time"
            },
            {
                title: "来源",
                dataIndex: "source",
                key: "source"
            },
            {
                title: "详情",
                dataIndex: "url",
                key: "url",
                render: record => (
                    <a href={record} target="_blank">
                        详情
                </a>
                )
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
                            style={{ 'marginLeft': '5px' }}
                        />
                    )
                }
            },
            {
                title: "修改",
                dataIndex: "operation",
                key: "operation",
                render: (text, record) => {
                    return (
                        <Button
                            type="primary"
                            shape="circle"
                            icon="edit"
                            onClick={this.handleClick1.bind(this, record)}
                            style={{ 'marginLeft': '5px' }}
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
                    >添加新闻</Button>
                </div>
                <div className="adminnewsTable">
                <Table
                    dataSource={this.state.newsdata}
                    pagination={this.state.pagination}
                    columns={newscolumns}
                    rowKey={record => record.title}
                    onChange={this.handleTableChange}
                />
                </div>
                <Modal
                    title="修改新闻信息"
                    visible={this.state.visible1}
                    onOk={this.updatenews}
                    onCancel={this.handleCancle1}
                    okText="修改"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="修改选项" hasFeedback>
                            {getFieldDecorator('selectednewsEd', {
                                rules: [{
                                    required: true,
                                    message: '选择修改项不能为空'
                                }],
                        })(<Cascader
                            options={newsoption}
                            expandTrigger="hover"
                            displayRender={this.displayRender}
                            placeholder="请选择修改项"
                            style={{width:"100%"}}
                           />)}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="修改内容" hasFeedback>
                            {getFieldDecorator('contentnewsEd', {
                                rules: [{
                                    required: true,
                                    message: '修改内容不能为空'
                                }],
                            })(<Input type="textarea" placeholder="请输入当前修改的内容" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="添加新闻"
                    visible={this.state.visible2}
                    onOk={this.insertnews}
                    onCancel={this.handleCancle2}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="添加主题" hasFeedback>
                            {getFieldDecorator('title1', {
                                rules: [{
                                    required: true,
                                    message: '新闻主题不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入新闻主题" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="发布时间" hasFeedback>
                            {getFieldDecorator('publish_time1', {
                                rules: [{
                                    required: true,
                                    message: '发布时间不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入发布时间" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新闻来源" hasFeedback>
                            {getFieldDecorator('source1', {
                                rules: [{
                                    required: true,
                                    message: '新闻来源不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入新闻来源" style={{width:"100%"}}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新闻详情" hasFeedback>
                            {getFieldDecorator('url1', {
                                rules: [{
                                    required: true,
                                    message: '新闻详情不能为空'
                                }],
                            })(<Input type="text" placeholder="请输入新闻详情" style={{width:"100%"}}/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
AdminNews = Form.create()(AdminNews);










