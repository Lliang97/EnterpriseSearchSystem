import React from 'react'
import {
    Link
  } from 'react-router';
  import { List, Pagination} from 'antd';
import {
    getEnterprise_patentlist,
} from '../../actions/getEnterprisePatent';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
export default class Property extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patentlist_data: [],
            keywrod: '',
            patentlisttotal: 0,
            config: {},
            urlkey: '',
            total: 0,//总数
        }
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    onChangePatentList = (pageNumber) => {
        this.getPatentList(pageNumber, this.state.config);
    }
    getPatentList = (page = 1, config = {}) => {
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
        // let url = this.props.location.search;//获得目前路由的后缀，比如，?patentName=小米
        // url = decodeURIComponent(url);//解码
        // let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，patentName
        // let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，电力
        // console.log("patent"+inputvalue);
        console.log(this.props.keyword)
        let inputvalue = this.props.keyword;
        let config = {}//要传入到接口的参数
        config['keyword'] = inputvalue;//将tpye以变量的方式存进config对象中
        //console.log(inputvalue);
        localStorage.patentName = inputvalue;
        if (this.mounted) {//判断组件是否装载完毕
            this.setState({
                keyword: inputvalue,
                config: config,
                urlkey: inputvalue
            });
        }
        this.getPatentList(1, config);
    }
    render(){
        return (
            <div>
            <List
                            itemLayout="horizontal"
                            bordered='true'
                            dataSource={this.state.patentlist_data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.patent_name}
                                    />
                                    {item.companyName}
                                    <span style={{ float: 'right' }}>{item.public_time}</span>
                                </List.Item>
                            )}
                        />
                        <Pagination
                            showQuickJumper
                            onChange={this.onChangePatentList}//监听改变，回调函数
                            defaultCurrent={1}//默认在第一页
                            total={this.state.patentlisttotal}//总条数
                        />
            </div>
        )
    }
}