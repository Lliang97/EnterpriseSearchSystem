import React from 'react'
import {
    Link
} from 'react-router';
import { List, Table, Pagination, Divider, Row, Col, Result, Tabs, Breadcrumb } from 'antd';
import "antd/dist/antd.css";
import "./property.scss";
import PatentPie from '../../components/echarts/PatentPie.js';
import LiteraturePie from '../../components/echarts/LiteraturePie.js';
import CopyrightPie from '../../components/echarts/CopyrightPie.js';
import {
    getEnterprise_patentlist,
    getEnterprise_patentcompanynumber,
    getEnterprise_patenttypenumber
} from '../../actions/getEnterprisePatent';
import {
    getEnterprise_literatureQueryByKeyword,
    getEnterprise_literatureCompanyNumber,
    getEnterprise_literaturetypenumber
} from '../../actions/getEnterpriseLiterature';
import {
    getEnterprise_softWareQueryByKeyWord,
    getEnterprise_softWareCompanyNumber,
    getEnterprise_softWareTypeNumber
} from '../../actions/getEnterpriseWorkCopyright';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import SearchPropertyHead from '../HeadComponent/SearchPropertyHead.js';
import {createHashHistory} from 'history'; //做返回
const history = createHashHistory();
//history.goBack();
const { TabPane } = Tabs;
const Patentcolumns = [
    {
        title: '专利机构',
        dataIndex: 'companyName',
    },
    {
        title: '专利数量',
        dataIndex: 'pantentNumber',
    },
];
const Literaturecolumns = [
    {
        title: '文献机构',
        dataIndex: 'companyName',
    },
    {
        title: '文献数量',
        dataIndex: 'literatureNumber',
    },
];
const Copyrightcolumns = [
    {
        title: '著作权机构',
        dataIndex: 'companyName',
    },
    {
        title: '著作权数量',
        dataIndex: 'copyrightNumber',
    },
];

@connect(state => ({
    home: state.home
}))
export default class Property extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patentlist_data: [],
            patentcompanynumber_data: [],
            literaturelist_data: [],
            literaturecompanynumber_data: [],
            copyrightlist_data: [],
            copyrightcompanynumber_data: [],
            keyword: '',
            patentlisttotal: 0,
            patentcompanytotal: 0,
            literaturelisttotal: 0,
            literaturecompanytotal: 0,
            copyrightlisttotal: 0,
            copyrightcompanytotal: 0,
            config: {},
            patentPieData: [],
            literaturePieData: [],
            copyrightPieData: [],
            currentstate: 'patent'
        }
    }
    get_PatentPieData = () => {//专利分布饼图数据
        let config = {};
        config['keyword'] = localStorage.patentName;
        this.props.dispatch(getEnterprise_patenttypenumber(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentTypeNumberData.data;
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    patentPieData: data,
                });
            }
        });
    }
    get_LiteraturePieData = () => {//文献分布饼图数据
        let config = {};
        config['keyword'] = localStorage.patentName;
        this.props.dispatch(getEnterprise_literaturetypenumber(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureTypeNumberData.data;
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    literaturePieData: data,
                });
            }
        });
    }
    get_CopyrightPieData = () => {//著作权饼图数据
        let config = {};
        config['keyword'] = localStorage.copyrightName;
        this.props.dispatch(getEnterprise_softWareTypeNumber(toQuery(config))).then(() => {
            let data = this.props.home.EnSoftWareTypeNumberData.data;
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    copyrightPieData: data,
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
    onChangePatentList = (pageNumber) => {//专利列表分页
        this.getPatentList(pageNumber, this.state.config);
    }
    onChangeLiteratureList = (pageNumber) => {
        this.getLiteratureList(pageNumber, this.state.config);
    }
    onChangeCopyrightList = (pageNumber) => {
        this.getCopyrightList(pageNumber, this.state.config);
    }
    onChangePatentCompany = (pageNumber) => {//专利表格分页
        this.get_PatentCompanyNumber(pageNumber, this.state.config);
    }
    onChangeLiteratureCompany = (pageNumber) => {
        this.get_LiteratureCompanyNumber(pageNumber, this.state.config);
    }
    onChangeCopyrightCompany = (pageNumber) => {
        this.get_CopyrihtCompanyNumber(pageNumber, this.state.config);
    }
    getPatentList = (page = 1, config = {}) => {//专利列表数据
        config.start = page;
        config.rows = 10;//数量为10个
        //console.log(config)
        this.props.dispatch(getEnterprise_patentlist(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentListData.data;
            let total = this.props.home.EnPatentListData.total;
            //console.log(data);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    patentlist_data: data,
                    patentlisttotal: total
                });
            }
        });
    }
    getLiteratureList = (page = 1, config = {}) => {
        config.start = page;
        config.rows = 10;//数量为10个
        //console.log(config)
        this.props.dispatch(getEnterprise_literatureQueryByKeyword(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureQueryByKeyWordData.data;
            let total = this.props.home.EnLiteratureQueryByKeyWordData.total;
            // console.log(data);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    literaturelist_data: data,
                    literaturelisttotal: total
                });
            }
        });
    }
    getCopyrightList = (page = 1, config = {}) => {
        config.start = page;
        config.rows = 10;//数量为10个
        //console.log(config)
        this.props.dispatch(getEnterprise_softWareQueryByKeyWord(toQuery(config))).then(() => {
            let data = this.props.home.EnSoftWareByKeyWordData.data;
            let total = this.props.home.EnSoftWareByKeyWordData.total;
            // console.log(data);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    copyrightlist_data: data,
                    copyrightlisttotal: total
                });
            }
        });
    }
    sortPantentNumber = (a, b) => {//对数量进行排序
        return b.pantentNumber - a.pantentNumber
    }
    sortLiteratureNumber = (a, b) => {
        return b.literatureNumber - a.literatureNumber
    }
    sortCopyrihtNumber = (a, b) => {
        return b.copyrightNumber - a.copyrightNumber
    }
    get_PatentCompanyNumber = (page = 1, config = {}) => {//专利表格数据
        config.start = page;
        config.rows = 5;//数量为5个
        //console.log(config)
        this.props.dispatch(getEnterprise_patentcompanynumber(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentCompanyNumberData.data;
            let total = this.props.home.EnPatentCompanyNumberData.total;
            let result = [];
            let key = 1;
            for (let item in data) {
                let jsondata = {}
                jsondata.key = key;
                jsondata.companyName = item;
                jsondata.pantentNumber = data[item];
                key++;
                result.push(jsondata);
            }
            result.sort(this.sortPantentNumber);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    patentcompanynumber_data: result,
                    patentcompanytotal: total
                });
            }
        });
    }
    get_LiteratureCompanyNumber = (page = 1, config = {}) => {
        config.start = page;
        config.rows = 5;//数量为5个
        // console.log(config)
        this.props.dispatch(getEnterprise_literatureCompanyNumber(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureCompanyNumberData.data;
            let total = this.props.home.EnLiteratureCompanyNumberData.total;
            let result = [];
            let key = 1;
            for (let item in data) {
                let jsondata = {}
                jsondata.key = key;
                jsondata.companyName = item;
                jsondata.literatureNumber = data[item];
                key++;
                result.push(jsondata);
            }
            result.sort(this.sortLiteratureNumber);
            //console.log(result)
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    literaturecompanynumber_data: result,
                    literaturecompanytotal: total
                });
            }
        });
    }
    get_CopyrihtCompanyNumber = (page = 1, config = {}) => {
        config.start = page;
        config.rows = 5;//数量为5个
        //console.log(config)
        this.props.dispatch(getEnterprise_softWareCompanyNumber(toQuery(config))).then(() => {
            let data = this.props.home.EnSoftWareCompanyNumberData.data;
            let total = this.props.home.EnSoftWareCompanyNumberData.total;
            let result = [];
            let key = 1;
            for (let item in data) {
                let jsondata = {}
                jsondata.key = key;
                jsondata.companyName = item;
                jsondata.copyrightNumber = data[item];
                key++;
                result.push(jsondata);
            }
            result.sort(this.sortCopyrihtNumber);
            //console.log(result)
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    copyrightcompanynumber_data: result,
                    copyrightcompanytotal: total
                });
            }
        });
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
        this.Initfunction();
    }
    Initfunction = () => {
        let url = this.props.location.search;//获得目前路由的后缀，比如，?patentName=小米
        url = decodeURIComponent(url);//解码
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，电力
        let config = {}//要传入到接口的参数
        config['keyword'] = inputvalue;//将tpye以变量的方式存进config对象中
        localStorage.patentName = inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue,
                config: config,
            });
        }
        this.getPatentList(1, config);
        this.get_PatentCompanyNumber(1, config);
        this.get_PatentPieData();
        this.getLiteratureList(1, config);
        this.get_LiteratureCompanyNumber(1, config);
        this.get_LiteraturePieData();
        this.getCopyrightList(1, config);
        this.get_CopyrihtCompanyNumber(1, config);
        this.get_CopyrightPieData();
    }
    OnClickTab = (e) => {
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                currentstate: e
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        let url = this.props.location.search;//获得目前路由的后缀，比如，?key=小米
        url = decodeURIComponent(url);//url解码
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
        if (inputvalue != this.state.keyword) {
            this.Initfunction();
        }
    }
    render() {
        const PropertyList = () => {
            if (this.state.currentstate == 'patent') {
                return (
                    <div>
                        
                        <List
                            itemLayout="horizontal"
                            bordered='true'
                            dataSource={this.state.patentlist_data}
                            renderItem={item => (
                                <Link to={{ pathname: '/patent', query: { key: item.patent_name } }}>{/*根据选择的公司名跳转 */}
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.patent_name}
                                    />
                                    {item.companyName}
                                    <span style={{ float: 'right' }}>{item.public_time}</span>
                                </List.Item>
                                </Link>
                            )}
                        />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangePatentList}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.patentlisttotal}//总条数
                        />
                    </div>
                );
            }
            else if (this.state.currentstate == 'literature') {
                return (
                    <div>
                        <List
                            itemLayout="horizontal"
                            bordered='true'
                            dataSource={this.state.literaturelist_data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    />
                                    <div>
                                        《{item.document_name}》
                                    </div>
                                    {item.companyName}
                                    <span style={{ float: 'right' }}>{item.public_time}</span>
                                </List.Item>
                            )}
                        />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangeLiteratureList}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.literaturelisttotal}//总条数
                        />
                    </div>
                );
            }
            else if (this.state.currentstate == 'copyright') {
                return (
                    <div>
                        <List
                            itemLayout="horizontal"
                            bordered='true'
                            dataSource={this.state.copyrightlist_data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.softwareName}
                                    />
                                    {item.companyName}
                                    <span style={{ float: 'right' }}>{item.registrationApprovalDate}</span>
                                </List.Item>
                            )}
                        />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangeCopyrightList}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.copyrightlisttotal}//总条数
                        />
                    </div>
                )
            }
        }
        const TableAndPie = () => {
            if (this.state.currentstate == 'patent') {
                return (
                    <div>
                        <Table columns={Patentcolumns} dataSource={this.state.patentcompanynumber_data} size="middle" pagination={false} 
                        onRow={record => {return {
                            onClick: event => {
                                this.context.router.push(`/company?companyName=${record.companyName}`);}, // 点击行
                          };
                        }}/>
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangePatentCompany}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.patentcompanytotal}//总条数
                        />
                        <PatentPie PieData={this.state.patentPieData} />
                    </div>
                );
            }
            else if (this.state.currentstate == 'literature') {
                return (
                    <div>
                        <Table columns={Literaturecolumns} dataSource={this.state.literaturecompanynumber_data} size="middle" pagination={false} />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangeLiteratureCompany}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.literaturecompanytotal}//总条数
                        />
                        <LiteraturePie PieData={this.state.literaturePieData} />
                    </div>
                );
            }
            else if (this.state.currentstate == 'copyright') {
                return (
                    <div>
                        <Table columns={Copyrightcolumns} dataSource={this.state.copyrightcompanynumber_data} size="middle" pagination={false} />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangeCopyrightCompany}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.copyrightcompanytotal}//总条数
                        />
                        <CopyrightPie PieData={this.state.copyrightPieData} />
                    </div>
                );
            }
        }
        const PropertyHint = () =>{
            if (this.state.currentstate == 'patent') {
                return (
                    <div className="hint_text">
                    <span className="nums_text">已为您找到“
                    <span className="keyword">{this.state.keyword}
                    </span>”
                    相关专利{this.state.patentlisttotal}条
                    </span>
                </div>
                );
            }
            else if (this.state.currentstate == 'literature') {
                return (
                    <div className="hint_text">
                    <span className="nums_text">已为您找到“
                    <span className="keyword">{this.state.keyword}
                    </span>”
                    相关文献{this.state.literaturelisttotal}条
                    </span>
                </div>
                );
            }
            else if (this.state.currentstate == 'copyright') {
                return (
                    <div className="hint_text">
                    <span className="nums_text">已为您找到“
                    <span className="keyword">{this.state.keyword}
                    </span>”
                    相关著作权{this.state.copyrightlisttotal}条
                    </span>
                </div>
                );
            }
        }
        return (
            <div>
                <SearchPropertyHead />
                <div className="container-fluid">

                    <div className="search_form2" >

                        <Row gutter={16}>
                            <Col span={12}>
                                <div className="Result_page_left_header">{/*左边下半部分*/}
                                    <div className="jumpbar">
                                        <Breadcrumb separator=">">
                                            <Breadcrumb.Item>
                                                <Link to='/'>首页</Link>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <Link to={{ pathname: '/property', query: { key: this.state.keyword } }}>知识产权</Link>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                    <Tabs defaultActiveKey="patent" size="large" onTabClick={this.OnClickTab}>
                                        <TabPane tab="专利" key="patent">
                                        </TabPane>
                                        <TabPane tab="著作权" key="copyright">
                                        </TabPane>
                                        <TabPane tab="文献" key="literature">
                                        </TabPane>
                                    </Tabs>
                                </div>
                                {PropertyList()}
                            </Col>
                            <Col span={12}>
                                <div className="bottomRight propertybottomRight">
                                    {PropertyHint()}
                                    <Divider />
                                    {TableAndPie()}
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        )
    }
}
