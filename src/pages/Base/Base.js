import React from 'react';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import SearchResultHead from '../HeadComponent/SearchResultHead.js'
import { getEnterprise_search } from '../../actions/getEnterpriseSearch';
import { getEnterprise_partner } from '../../actions/getEnterprisePartner';
import { getEnterprise_member } from '../../actions/getEnterpriseMember';
import PartnerPie from '../../components/echarts/PartnerPie';
import PartnerBar from '../../components/echarts/PartnerBar';
import { Descriptions, Badge, Table ,Row, Col} from 'antd';
import './Base.scss';
import "antd/dist/antd.css";
const membercolumns = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: "25%"
    },
    {
        title: "公司名",
        dataIndex: "companyName",
        key: "companyName",
        width: "25%"
    },
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "25%"
    },
    {
        title: "职务",
        dataIndex: "job",
        key: "job",
        width: "25%"
    }
]
const partnercolumns = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: "7%"
    },
    {
        title: "企业名",
        dataIndex: "companyName",
        key: "companyName",
        width: "20%"
    },
    {
        title: "股东",
        dataIndex: "partner_name",
        key: "partner_name",
        width: "21%"
    },
    {
        title: "认缴出资日期",
        dataIndex: "sub_date",
        key: "sub_date",
        width: "16%"
    },
    {
        title: "持股比例",
        dataIndex: "hole_ratio",
        key: "hole_ratio",
        width: "12%"
    },
    {
        title: "认缴出资额(万元)",
        dataIndex: "sub_cap",
        key: "sub_cap",
        width: "16%"
    },
    {
        title: "股东类型",
        dataIndex: "partner_type",
        key: "partner_type",
        width: "8%"
    },
]
@connect(state => ({
    home: state.home
}))

export default class Radar extends React.Component {
    constructor() {
        super();
        this.state = {
            enterprise_search_baseinfodata: [],//企业基本信息
            enterprise_search_partnerdata: [],//企业股东数据
            enterprise_search_memberdata: [],//企业主要成员数据
            partnertotal: 0,//股东总数
            membertotal: 0,//成员总数
            partnerPieData: [],//股东出资数据
        }
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    getEnterpriseMemberData = (config) => {
        this.props.dispatch(getEnterprise_member(toQuery(config))).then(() => {
            let data = this.props.home.EnMemberData.data;
            //console.log(data);
            data.map((item, index) => {
                item.index = index + 1;
                return item;
            })
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    enterprise_search_memberdata: data,
                    membertotal: data.length
                });
            }
        });
    }
    getEnterprisepartnerData = (config) => {
        this.props.dispatch(getEnterprise_partner(toQuery(config))).then(() => {
            let data = this.props.home.EnPartnerData.data;
            //console.log(data);
            data.map((item, index) => {
                item.index = index + 1;
                return item;
            })
            let partnerPieData = new Array();
            for(let i in data){
                let array = {};
                array.name = data[i].partner_name;
                if(data[i].sub_cap == "-"){
                    array.value = 1;
                }
                else{
                    array.value =  data[i].sub_cap;
                }
                partnerPieData.push(array)
            }
            //console.log(partnerPieData)
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    enterprise_search_partnerdata: data,
                    partnertotal: data.length,
                    partnerPieData: partnerPieData
                });
            }
        });
    }
    getEnterpriseBaseInfoData = (config) => {
        this.props.dispatch(getEnterprise_search(toQuery(config))).then(() => {
            let data = this.props.home.EnSearchData.data[0];
            //console.log(data);
            if (this.mounted) {//判断组件是否装载完毕
                this.setState({
                    enterprise_search_baseinfodata: data
                });
            }
        });
    }
    getUrl = () => {//获取当前浏览器路由
        let url = this.props.location.search;//获得目前路由的后缀，比如，?companyName=小米
        url = decodeURIComponent(url);//解码
        let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
        let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
        let config = {}//要传入到接口的参数
        config[type] = inputvalue;//将tpye以变量的方式存进config对象中
        this.getEnterpriseBaseInfoData(config);//获取公司数据
        this.getEnterprisepartnerData(config);//获取股东数据
        this.getEnterpriseMemberData(config);//获取成员数据
    }
    componentDidMount() {
        // 初始化
        this.getUrl();
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
    render() {
        return (
            <div>
                <SearchResultHead />
                <div className="container-fluid" style={{ minHeight: '600px' }}>
                    <div className="baseinfo">
                        <Descriptions title="工商信息" bordered>
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
                    <div className="mainmember">
                        <div className="mainmembertitle">主要成员</div>
                        <div className="mainmembertable">
                            <Table
                                scroll={{ y: 160 }}
                                columns={membercolumns}
                                rowKey={record => record.index}
                                dataSource={this.state.enterprise_search_memberdata}
                                pagination={false}
                            // onChange={this.handleTableChange3}
                            />
                        </div>
                    </div>
                    <div className="partner">
                        <div className="partnertitle">股东出资</div>
                        <div className="partnertable">
                            <Table
                                scroll={{ y: 160 }}
                                columns={partnercolumns}
                                rowKey={record => record.index}
                                dataSource={this.state.enterprise_search_partnerdata}
                                pagination={false}
                            // onChange={this.handleTableChange3}
                            />
                        </div>
                    </div>
                    <div className="partnerPieandBar">
                        <div className="partnertitle">股东统计分析</div>
                        <Row>
                            <Col span={11}>
                                <div className="PartnerPie">
                                    <PartnerPie PieData={this.state.partnerPieData}/>
                                </div>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <div className="PartnerBar">
                                    <PartnerBar PieData={this.state.partnerPieData}/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
