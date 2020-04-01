import React from 'react';
import {
    Link
} from 'react-router';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { List, message, Spin, Icon, Row, Col, Breadcrumb, Modal, Affix } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import SearchPropertyHead from '../HeadComponent/SearchPropertyHead.js';
import {
    getEnterprise_patentlist,
    getEnterprise_patentSpecificInfo
} from '../../actions/getEnterprisePatent';
import "antd/dist/antd.css";
import './Patent.scss';
import { createHashHistory } from 'history'; //做返回
const history = createHashHistory();
@connect(state => ({
    home: state.home
}))
export default class Patent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patentSpecificData: {},
            keyword: '',
            visible: false,
            relativeData: [],
            relativeLength: 0,
            relativeLoading: false,
            relativeHasMore: true,
            config: {},
        }
    }
    splitKeywords = (data) => {//拆分关键字
        let keywords = data.keywords;
        let regex = /,/;
        let splitArray = new Array();
        splitArray = keywords.split(regex);
        splitArray.pop();//删除最后一个元素,
        let config = {};
        let totaldata = []
        for (let keyword in splitArray) {
            config.keyword = splitArray[keyword];
            config.start = 1;
            config.rows = 10;//数量为10个
            //console.log(config)
            this.props.dispatch(getEnterprise_patentlist(toQuery(config))).then(() => {
                let data = this.props.home.EnPatentListData.data;
                totaldata.push(...data);
                this.setState({
                    relativeData: totaldata,
                    relativeLength: totaldata.length
                });
            });
        }
    }
    get_PatentSpecificData = (config) => {
        config.start = 1;
        config.rows = 1;
        this.props.dispatch(getEnterprise_patentSpecificInfo(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentSpecificData.data[0];
            this.splitKeywords(data);
            //console.log(data.patent_name);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    patentSpecificData: data,
                });
            }
        });
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleModalOk = e => {

        this.setState({
            visible: false,
        });
    };
    handleModalCancel = e => {
        //console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleInfiniteOnLoad = () => {
        let { data } = this.state.relativeData;
        this.setState({
            loading: true,
        });
    };
    gobackbrowser = () => {
        history.goBack();
    }
    InitFunction = () => {
        let url = this.props.location.search;//获得目前路由的后缀，比如，?patentName=小米
        url = decodeURIComponent(url);//解码
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，电力
        let config = {}//要传入到接口的参数
        config['patent_name'] = inputvalue;//将tpye以变量的方式存进config对象中
        localStorage.patentName = inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue,
                config: config,
            });
        }
        this.get_PatentSpecificData(config);
    }
    componentWillUnmount() {
        //组件卸载时候，注销keypress事件
        this.mounted = false;
        this.setState = (state, callback) => {
            return;
        };
    }
    componentWillMount() {//装载完毕
        this.mounted = true;
    }
    componentDidMount() {
        this.InitFunction();
    }
    skipToCompany = (e) => {
        let companyNameId = document.getElementById("skip");
        let companyName = companyNameId.innerHTML;
        this.context.router.push(`/company?companyName=${companyName}`);
        localStorage.Linkfromstage = '知识产权';
    }
    componentWillReceiveProps(nextProps) {
        let url = this.props.location.search;//获得目前路由的后缀，比如，?key=小米
        url = decodeURIComponent(url);//url解码
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
        //console.log(inputvalue)
        if (inputvalue != this.state.keyword) {
            this.setState({//更新config
                keyword: inputvalue
            })
            this.InitFunction();
        }
    }
    render() {
        return (
            <div>
                <SearchPropertyHead />
                <div className="container-fluid" style={{ minHeight: '600px' }}>

                    <div className="search_form2" /*style={{ padding: '20px 50px'}}*/>

                        <div>
                            <Row>
                                <Col span={14}>{/* 页面左边 */}
                                    <div className="company_top_left patent_top_left">{/*左边上半部分*/}
                                        <div className="companyjumpbar patentjumpbar">
                                            <Breadcrumb separator=">">
                                                <Breadcrumb.Item>
                                                    <Link to='/'><span>首页</span></Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={this.gobackbrowser}>
                                                    <span style={{ cursor: 'pointer' }}>知识产权</span>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <span>专利详情</span>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                    <div className="left_header">{/*左边下半部分*/}
                                        <div className="zx-content">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>专利名称</td>
                                                        <td colSpan="3"><span>{this.state.patentSpecificData.patent_name}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>申请号</td>
                                                        <td>{this.state.patentSpecificData.appli_num}</td>
                                                        <td>申请日期</td>
                                                        <td>{this.state.patentSpecificData.appli_time}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>公开号</td>
                                                        <td>{this.state.patentSpecificData.patent_num}</td>
                                                        <td>公开公告日期</td>
                                                        <td>{this.state.patentSpecificData.public_time}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>发明人</td>
                                                        <td>{this.state.patentSpecificData.inventor}</td>
                                                        <td>专利申请人</td>
                                                        <td id='skip' onClick={this.skipToCompany} style={{ color: '#0F63A8', cursor: 'pointer' }}>{this.state.patentSpecificData.applicent}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>专利代理人</td>
                                                        <td>-</td>
                                                        <td>专利代理机构</td>
                                                        <td>-</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>专利类型</td>
                                                        <td>发明发布</td>
                                                        <td>主分类号</td>
                                                        <td>H02M7/483</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>住所</td>
                                                        <td colSpan="3">{this.state.patentSpecificData.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>法律状态</td>
                                                        <td colSpan="3">{this.state.patentSpecificData.status}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>摘要</td>
                                                        <td colSpan="3" >
                                                            <div className="hindText">{this.state.patentSpecificData.instructions}</div>
                                                            <a className="patentDetail" onClick={this.showModal}>详情</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={10}>{/* 页面右边 */}
                                    <div>
                                        <div>
                                            <div className="relativetitle"><p >相关专利</p></div>
                                            <div className="demo-infinite-container">
                                                <InfiniteScroll
                                                    initialLoad={false}
                                                    pageStart={0}
                                                    loadMore={this.handleInfiniteOnLoad}
                                                    hasMore={!this.state.relativeLoading && this.state.relativeHasMore}
                                                    useWindow={false}
                                                >
                                                    <List
                                                        itemLayout="horizontal"
                                                        // bordered='true'
                                                        dataSource={this.state.relativeData}
                                                        renderItem={item => (
                                                            <Link onClick={event => {
                                                                this.context.router.push(`/patent?key=${item.patent_name}`);
                                                            }} >{/*根据选择的公司名跳转 */}
                                                                <List.Item>
                                                                    <List.Item.Meta
                                                                        
                                                                    />
                                                                    {item.patent_name}
                                                                </List.Item>
                                                            </Link>
                                                        )}
                                                    >
                                                        {this.state.relativeLoading && this.state.relativeHasMore && (
                                                            <div className="demo-loading-container">
                                                                <Spin />
                                                            </div>
                                                        )}
                                                    </List>
                                                </InfiniteScroll>
                                            </div>


                                            <div className="relativetitle"><p>您可能感兴趣的企业</p></div>
                                            <div className="demo-infinite-container">
                                                <InfiniteScroll
                                                    initialLoad={false}
                                                    pageStart={0}
                                                    loadMore={this.handleInfiniteOnLoad}
                                                    hasMore={!this.state.relativeLoading && this.state.relativeHasMore}
                                                    useWindow={false}
                                                >
                                                    <List
                                                        itemLayout="horizontal"
                                                        // bordered='true'
                                                        dataSource={this.state.relativeData}
                                                        renderItem={item => (
                                                            <Link onClick={event => {
                                                                this.context.router.push(`/company?companyName=${item.companyName}`);
                                                            }} >{/*根据选择的公司名跳转 */}
                                                                <List.Item>
                                                                    <List.Item.Meta
                                                                    />
                                                                    {item.companyName}
                                                                </List.Item>
                                                            </Link>
                                                        )}
                                                    >
                                                        {this.state.relativeLoading && this.state.relativeHasMore && (
                                                            <div className="demo-loading-container">
                                                                <Spin />
                                                            </div>
                                                        )}
                                                    </List>
                                                </InfiniteScroll>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </div>

                </div>
                <div className="patentModel">
                    <Modal
                        title={this.state.patentSpecificData.patent_name}
                        visible={this.state.visible}
                        onOk={this.handleModalOk}
                        onCancel={this.handleModalCancel}
                    >
                        <p>{this.state.patentSpecificData.instructions}</p>
                    </Modal>
                </div>

            </div>
        )
    }
}
