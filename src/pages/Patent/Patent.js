import React from 'react'
import { List, Table, Pagination, Icon, Row, Col, Result } from 'antd';
import "antd/dist/antd.css";
import PatentPie from '../../components/echarts/PatentPie.js';
import { getEnterprise_patentlist,
    getEnterprise_patentcompanynumber } from '../../actions/getEnterprisePatent';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数

const columns = [
    {
        title: '公司名',
        dataIndex: 'companyName',
    },
    {
        title: '专利数量',
        dataIndex: 'pantentNumber',
    },
];

@connect(state => ({
    home: state.home
}))
export default class Patent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patentlist_data: [],
            patentcompanynumber_data: [],
            keywrod:''
        }
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    getPatentList = (page = 1, config = {}) => {
        config.start = page;
        config.rows = 10;//数量为10个
        //console.log(config)
        this.props.dispatch(getEnterprise_patentlist(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentListData.data;
            //console.log(data);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    patentlist_data: data
                });
            }
        });
    }
    sortPantentNumber = (a,b)=>{
        return b.pantentNumber-a.pantentNumber
    }
    get_PatentCompanyNumber = (page = 1, config = {}) =>{
        config.start = page;
        config.rows = 6;//数量为5个
        //console.log(config)
        this.props.dispatch(getEnterprise_patentcompanynumber(toQuery(config))).then(() => {
            let data = this.props.home.EnPatentCompanyNumberData.data;  
            let result=[];
            let key=1;
            for(let item in data){
                let jsondata={}
                jsondata.key=key;
                jsondata.companyName=item;
                jsondata.pantentNumber=data[item];
                key++;
                result.push(jsondata);
            }
            result.sort(this.sortPantentNumber);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    patentcompanynumber_data: result
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
        localStorage.patentName=inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue
            });
        }
        this.getPatentList(1, config);
        this.get_PatentCompanyNumber(1,config); 
    }
    render() {
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.patentlist_data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.patent_name}
                                    />
                                    {item.companyName}
                                    <span style={{float:'right'}}>{item.public_time}</span>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Table columns={columns} dataSource={this.state.patentcompanynumber_data} size="middle" />
                        <PatentPie />
                    </Col>

                </Row>
            </div>
        )
    }
}
