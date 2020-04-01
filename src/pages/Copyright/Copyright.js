import React from 'react';
import {
    Link
} from 'react-router';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { List, Descriptions, Spin, Badge, Row, Col, Breadcrumb, Modal, Affix } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import SearchPropertyHead from '../HeadComponent/SearchPropertyHead.js';
import {
    getEnterprise_copyrightSpecificInfo,
    getEnterprise_softWareQueryByKeyWord
} from '../../actions/getEnterpriseWorkCopyright';
import "antd/dist/antd.css";
import './Copyright.scss';
import { createHashHistory } from 'history'; //做返回
const history = createHashHistory();
@connect(state => ({
    home: state.home
}))

export default class Copyright extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copyrightSpecificData: {},
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
        let keywords = data.softwareName;
        //console.log(keywords)
        let regex = /,/;
        let splitArray = new Array();
        splitArray = ["减肥", "药物", "开发", "信息", "辅助", "系统"]
        // splitArray = keywords.split(regex);
        // splitArray.pop();//删除最后一个元素,
        let config = {};
        let totaldata = []
        for (let keyword in splitArray) {
            config.keyword = splitArray[keyword];
            config.start = 1;
            config.rows = 10;//数量为10个
            //console.log(config)
            this.props.dispatch(getEnterprise_softWareQueryByKeyWord(toQuery(config))).then(() => {
                let data = this.props.home.EnSoftWareByKeyWordData.data;
                totaldata.push(...data);
                this.setState({
                    relativeData: totaldata,
                    relativeLength: totaldata.length
                });
            });
        }
    }
    get_CopyrightSpecificData = (config) => {
        config.start = 1;
        config.rows = 1;
        this.props.dispatch(getEnterprise_copyrightSpecificInfo(toQuery(config))).then(() => {
            let data = this.props.home.EnCopyrightSpecificData.data[0];
            this.splitKeywords(data);
            //console.log(data.patent_name);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    copyrightSpecificData: data,
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
        inputvalue = inputvalue.replace("\\+", "%20");
        let config = {}//要传入到接口的参数
        config['softwareName'] = inputvalue;//将tpye以变量的方式存进config对象中
        localStorage.softwareName = inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue,
                config: config,
            });
        }
        this.get_CopyrightSpecificData(config);
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
        let companyNameId = document.getElementsByClassName("ant-badge-status-text");
        let companyName = companyNameId[0].innerText;
        this.context.router.push(`/company?companyName=${companyName}`);
        localStorage.Linkfromstage = '知识产权';
    }
    componentWillReceiveProps(nextProps) {
        let url = this.props.location.search;//获得目前路由的后缀，比如，?key=小米
        url = decodeURIComponent(url);//url解码
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
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
                                                    <span>著作权详情</span>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                    <div className="left_header_copyright">{/*左边下半部分*/}
                                        <Descriptions  bordered>
                                            <Descriptions.Item label="公司名" span={3}>
                                                <Badge id='copyrightskip' style={{ color: '#0F63A8', cursor: 'pointer' }} onClick={this.skipToCompany} status="processing" text={this.state.copyrightSpecificData.companyName} />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="著作权名称" span={3}>
                                                <Badge status="processing" text={this.state.copyrightSpecificData.softwareName} />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="版本号" span={3}>
                                                <Badge status="processing" text="-" />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="发布时间" span={3}>
                                                <Badge status="processing" text={this.state.copyrightSpecificData.releaseDate} />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="注册号" span={3}>
                                                <Badge status="processing" text={this.state.copyrightSpecificData.registrationNumber} />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="软件缩写" span={3}>
                                                <Badge status="processing" text={this.state.copyrightSpecificData.softwareAbbreviation} />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="注册批准日期" span={3}>
                                                <Badge status="processing" text={this.state.copyrightSpecificData.registrationApprovalDate} />
                                            </Descriptions.Item>
                                        </Descriptions>,
                                    </div>
                                </Col>
                                <Col span={10}>{/* 页面右边 */}
                                    <div>
                                        <div>
                                            <div className="relativetitle"><p >相关著作权</p></div>
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
                                                                this.context.router.push(`/copyright?key=${item.softwareName}`);
                                                            }} >{/*根据选择的公司名跳转 */}
                                                                <List.Item>
                                                                    <List.Item.Meta

                                                                    />
                                                                    {item.softwareName}
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

            </div>
        )
    }
}
