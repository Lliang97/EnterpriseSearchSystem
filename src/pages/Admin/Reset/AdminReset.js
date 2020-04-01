import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router";
import './AdminReset.scss';
import "antd/dist/antd.css";
const { Header, Content } = Layout;
export default class AdminReset extends React.Component {
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            current: 'basic',
        };
    }
    handleClick = e => {
        this.setState({
        current: e.key,
        });
        if(e.key == 'basic'){
            this.context.router.push(`/admin/reset?companyName=${this.props.location.query.companyName}`);
        }else{
            this.context.router.push(`/admin/reset/${e.key}?companyName=${this.props.location.query.companyName}`);
        }
        
    };
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <div>
                            <div className="resetBack">
                                <Link to="admin/information">
                                    <p style={{ color: '#1890ff', width: '10%', fontWeight: 'bold', fontSize: '16px',float: 'left' }}>
                                        <Icon type="left" />返回上一级
                                    </p>
                                </Link>
                            </div>
                            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="light">
                                <Menu.Item key="basic">
                                    <Icon type="appstore" />
                                    工商信息
                                </Menu.Item>
                                <Menu.Item key="patent">
                                    <Icon type="trophy" />
                                    专利信息
                                </Menu.Item>
                                <Menu.Item key="literature">
                                    <Icon type="copy" />
                                    文献信息
                                </Menu.Item>
                                <Menu.Item key="copyright">
                                    <Icon type="edit" />
                                    著作权信息
                                </Menu.Item>
                                <Menu.Item key="news">
                                    <Icon type="global" />
                                    新闻信息
                                </Menu.Item>
                                <Menu.Item key="patner">
                                    <Icon type="user" />
                                    股东信息
                                </Menu.Item>   
                                <Menu.Item key="recruit">
                                    <Icon type="usergroup-add" />
                                    招聘信息
                                </Menu.Item> 
                                <Menu.Item key="trade">
                                    <Icon type="trademark" />
                                    商标信息
                                </Menu.Item>                                 
                            </Menu>
                        </div>
                    </Header>
                    <Content>{this.props.children}</Content>
                </Layout>
            </div>
        )
    }
}
