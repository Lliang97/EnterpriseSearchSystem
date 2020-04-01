import React from 'react';
import {
  Link,
} from 'react-router';
import {
  connect
} from 'react-redux';
import {
  Layout,
  Menu,
  Dropdown,
  Icon,
  DatePicker,
  Breadcrumb,
  Row,
  Col,
  Avatar,
} from 'antd';
import 'antd/dist/antd.css';
import './Admin.scss';
import classNames from "classnames";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
@connect(state => ({
  home: state.home
}))
export default class Admin extends React.Component {
  static childContextTypes = {
    location: React.PropTypes.object,
    route: React.PropTypes.object
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapse: false,//整体层叠
    };
  }
  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };
  logout = () => {
    localStorage.username = '',
      localStorage.userId = '',
      localStorage.roleId = 5,
      localStorage.removeItem('token')
  }
  componentDidMount() {
  }
  skiptoPage = (item) => {
    this.context.router.push(`/admin/${item.key}`);
  }
  BreadcrumbClick = (item) => {
    console.log(item)
  }
  render() {
    const isActive = this.context.router.isActive;
    const curSelect = classNames({
      home: isActive('/admin/home'),
      user: isActive('/admin/user'),
      information: isActive('/admin/information'),
    });
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={'/'} onClick={this.logout}>登出</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={'/'}>返回首页</Link>
        </Menu.Item>
        <Menu.Item>
          <a>重置密码</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="Adminlogo" >数据服务</div>
          <Menu theme="dark" defaultSelectedKeys={[curSelect]} mode="inline" onClick={this.skiptoPage}>
            <Menu.Item key="home">
              <Icon type="user" />
              <span>首页</span>
            </Menu.Item>
            <Menu.Item key="information">
              <Icon type="exception" /> 
              <span>企业信息服务</span>
            </Menu.Item>
            {/* <SubMenu
              key="informationAll"
              title={
                <span>
                  <Icon type="exception" />
                  <span>企业信息服务</span>
                </span>
              }
            >
              <Menu.Item key="information">企业检索</Menu.Item>
              <Menu.Item key="basic">工商信息</Menu.Item>
              <Menu.Item key="patent">专利信息</Menu.Item>
              <Menu.Item key="literature">文献信息</Menu.Item>
              <Menu.Item key="copyright">著作权信息</Menu.Item>
              <Menu.Item key="news">新闻信息</Menu.Item>
              <Menu.Item key="patner">股东信息</Menu.Item>
              <Menu.Item key="recruit">招聘信息</Menu.Item> 
              <Menu.Item key="trade">贸易信息</Menu.Item>
            </SubMenu> */}
            <Menu.Item key="user">
              <Icon type="team" />
              <span>用户服务</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <Row>
              <Col span={21}>
                <Breadcrumb style={{ margin: '16px 0', fontSize: '24px' }}>
                  <Breadcrumb.Item> <Link to="/"><Icon type="arrow-left" style={{ fontSize: '20px' }} />&nbsp;&nbsp;首页</Link></Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={3}>
                <div style={{ margin: '16px 0', fontSize: '20px' }}>
                  <Dropdown overlay={menu}>
                    <a>
                      <Avatar style={{ backgroundColor: '#0F63A8', marginRight: '10px' }} icon="user" />{localStorage.username}&nbsp;<Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              </Col>
            </Row>
            <div style={{ padding: 10, background: '#fff', minHeight: 580 }}> {this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Data Service Design ©2020 Created by LL</Footer>
        </Layout>
      </Layout>
    );
  }
}