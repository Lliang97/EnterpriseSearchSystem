import React from 'react';
import {
    Link,
  } from 'react-router';
import './App.scss';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import "antd/dist/antd.css";
import Logo from '../images/logo.jpg';
import Swust from '../images/swust.png';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route
        }
    }
    render() {
        return (
        <div className="Dcontainer">
          <Layout>
            
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="headbar">
              <div className="headflefttbar">
                <Link to="/"><img alt className="homelogo" src={Logo}/></Link>
                <Menu
                  mode="horizontal"
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">关于我们</Menu.Item>
                  <Menu.Item key="2">企业资源</Menu.Item>
                  <Menu.Item key="3">项目需求</Menu.Item>
                  <Menu.Item key="4"><Link to="/search">企业搜索</Link></Menu.Item>
                  <Menu.Item key="5">企业成果</Menu.Item>
                </Menu>
              </div>
              <a className="corpration" href="http://www.swust.edu.cn/" target="_blank" alt="西南科技大学知识工程实验室">
                <img  className="swustlogo" src={Swust}/>
              <span>战略合作</span>
              </a>
              <Menu
                  mode="horizontal"
                  className="register"
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">登录</Menu.Item>
                  <Menu.Item key="2">注册</Menu.Item>
                </Menu>
            </div>
          </Header>

          <Content style={{ padding: '0px', marginTop: 64,background: '#fff', minHeight: 610}}>{this.props.children}</Content>

          <Footer style={{ textAlign: 'center' }}>SWUST Enterprise Search 1.0 <br/>
          ©Copyright 2009-2019 西南科技大学 计算机科学与技术学院. All Rights Reserved.<br/>
          Design & Develop： 数据与知识工程实验室
          </Footer>

          </Layout>
          </div>
          );
    }
}