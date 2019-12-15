import React from 'react'
import { List, Table, Pagination, Icon, Row, Col, Result } from 'antd';
import "antd/dist/antd.css";
import LiteraturePie from '../../components/echarts/LiteraturePie.js';
import {
    getEnterprise_literatureQueryByKeyword,
    getEnterprise_literatureCompanyNumber
} from '../../actions/getEnterpriseLiterature';
import { getEnterprise_literaturetypenumber } from '../../actions/getEnterpriseLiterature';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数

const columns = [
    {
        title: '文献机构',
        dataIndex: 'companyName',
    },
    {
        title: '文献数量',
        dataIndex: 'literatureNumber',
    },
];

@connect(state => ({
    home: state.home
}))
export default class Literature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            literaturelist_data: [],
            literaturecompanynumber_data: [],
            keywrod: '',
            literaturelisttotal: 0,
            literaturecompanytotal: 0,
            config: {},
            PieData: [],
        }
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    get_LiteraturePieData = () => {
        let config = {};
        config['keyword']=localStorage.patentName;

        this.props.dispatch(getEnterprise_literaturetypenumber(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureTypeNumberData.data;
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    PieData: data,
                });
            }
        });
    }
    onChangeLiteratureList = (pageNumber) => {
        this.getLiteratureList(pageNumber, this.state.config);
    }
    onChangeCompany = (pageNumber) => {
        this.get_LiteratureCompanyNumber(pageNumber, this.state.config);
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
    sortLiteratureNumber = (a, b) => {
        return b.literatureNumber - a.literatureNumber
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
        let url = this.props.location.search;//获得目前路由的后缀，比如，?patentName=小米
        url = decodeURIComponent(url);//解码
        let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，patentName
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，电力
        let config = {}//要传入到接口的参数
        config['keyword'] = inputvalue;//将tpye以变量的方式存进config对象中
        localStorage.literatureName = inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue,
                config: config
            });
        }
        this.getLiteratureList(1, config);
        this.get_LiteratureCompanyNumber(1, config);
        this.get_LiteraturePieData();
    }
    render() {
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <List
                            itemLayout="horizontal"
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
                    </Col>
                    <Col span={12}>
                        <Table columns={columns} dataSource={this.state.literaturecompanynumber_data} size="middle" pagination={false} />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangeCompany}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.literaturecompanytotal}//总条数
                        />
                        <LiteraturePie PieData={this.state.PieData}/>
                    </Col>

                </Row>
            </div>
        )
    }
}
