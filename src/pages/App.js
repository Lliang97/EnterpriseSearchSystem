import React from 'react';
import {
  Link,
} from 'react-router';
import './App.scss';
import { Layout, Menu ,Divider } from 'antd';
const { Header, Content, Footer } = Layout;
import "antd/dist/antd.css";
import Logo from '../images/EvaluateLogo.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config2: {}
    }
  }
  configChange(config) {
    this.setState({
      config2: config
    })
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
          
          <Content style={{ padding: '0px', marginTop: 64, background: '#fff', minHeight: 610 }}>
            {this.props.children}
            </Content>

          <Footer style={{ textAlign: 'center' }}>SWUST Enterprise Evaluate 1.0 <br />
            ©Copyright 2009-2019 西南科技大学 计算机科学与技术学院. All Rights Reserved.<br />
            Design & Develop： 数据与知识工程实验室
          </Footer>

        </Layout>
      </div>
    );
  }
}