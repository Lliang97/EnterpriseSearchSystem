import CopyrightPie from '../../components/echarts/CopyrightPie.js';
import React from 'react'
import { List, Table, Pagination, Icon, Row, Col, Result } from 'antd';
import "antd/dist/antd.css";
import {
    getEnterprise_softWareQueryByKeyWord,
    getEnterprise_softWareCompanyNumber
} from '../../actions/getEnterpriseWorkCopyright';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数

const columns = [
    {
        title: '公司名',
        dataIndex: 'companyName',
    },
    {
        title: '文献数量',
        dataIndex: 'copyrightNumber',
    },
];

@connect(state => ({
    home: state.home
}))
export default class Copyright extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copyrightlist_data: [],
            copyrightcompanynumber_data: [],
            keywrod: '',
            copyrightlisttotal: 0,
            copyrightcompanytotal: 0,
            config: {},
        }
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    onChangeCopyrightList = (pageNumber) => {
        this.getCopyrightList(pageNumber, this.state.config);
    }
    onChangeCompany = (pageNumber) => {
        this.get_CopyrihtCompanyNumber(pageNumber, this.state.config);
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
    sortCopyrihtNumber = (a, b) => {
        return b.copyrightNumber - a.copyrightNumber
    }
    get_CopyrihtCompanyNumber = (page = 1, config = {}) => {
        config.start = page;
        config.rows = 6;//数量为5个
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
        let url = this.props.location.search;//获得目前路由的后缀，比如，?patentName=小米
        url = decodeURIComponent(url);//解码
        let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，patentName
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，电力
        let config = {}//要传入到接口的参数
        config['keyword'] = inputvalue;//将tpye以变量的方式存进config对象中
        localStorage.copyrightName = inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue,
                config: config
            });
        }
        this.getCopyrightList(1, config);
        this.get_CopyrihtCompanyNumber(1, config);
    }
    render() {
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <List
                            itemLayout="horizontal"
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
                    </Col>
                    <Col span={12}>
                        <Table columns={columns} dataSource={this.state.copyrightcompanynumber_data} size="middle" pagination={false} />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangeCompany}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.copyrightcompanytotal}//总条数
                        />
                        <CopyrightPie />
                    </Col>

                </Row>
            </div>
        )
    }
}
