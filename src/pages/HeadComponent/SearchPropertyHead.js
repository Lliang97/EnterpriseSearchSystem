import React from 'react'
import {
  Link,
} from 'react-router';
import { connect } from 'react-redux';
import { Layout ,Divider} from 'antd';
import Logo from '../../images/EvaluateLogo.png';
const { Header, Content, Footer } = Layout;
import './SearchResultHead.scss';
@connect(state => ({
  home: state.home
}))
export default class SearchPropertyHead extends React.Component {
  constructor() {
    super();
    this.state = {
        inputkey: ''
    }
  };
  static childContextTypes = {
    location: React.PropTypes.object,
    route: React.PropTypes.object
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentDidMount() {
  }
  componentWillUnmount() {
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }
  componentWillMount() {//装载完毕
    this.mounted = true;
  }
  InputChange = (e) => {
    this.setState({
      inputkey: e.target.value,//搜索框改变的值
    });
  }
  handleClickSearchBtn = (e) => {//点击搜索按钮跳转
    if (this.state.inputkey === '') {
      return;//如果不为空才跳转
    } 
    this.context.router.push(`/property?key=${this.state.inputkey}`);
  }
  render(){
    return (
    <div>
        <Header style={{  zIndex: 1, width: '100%' }}>
        <div className="headbar">

            <div className="headflefttbar">
                <Link to="/">
                    <img className="evaluatelogo" src={Logo} />
                    <span className="homelogo" > 企业创新能力评估系统</span>
                </Link>
            </div>

            <div className="input_group">
                <input className="result_input" type="text"
                    autoComplete="off" placeholder="请输入知识产权关键字"
                    onChange={this.InputChange}></input>
                <input type="submit" className="result_btn" value='知识产权'
                    onClick={this.handleClickSearchBtn}></input>
            </div>

            <div className="corpration" >
                <span>数据服务</span>
            </div>

            <Divider/>

        </div>
        </Header>
    </div>
    )
    }
}
