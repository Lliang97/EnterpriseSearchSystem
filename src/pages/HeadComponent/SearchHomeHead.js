import React from 'react'
import {
  Link,
} from 'react-router';
import { connect } from 'react-redux';
import { Layout ,Divider} from 'antd';
import Logo from '../../images/EvaluateLogo.png';
const { Header, Content, Footer } = Layout;
import './SearchHomeHead.scss';
@connect(state => ({
  home: state.home
}))
export default class SearchHomeHead extends React.Component {
  constructor() {
    super();
    this.state = {
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
