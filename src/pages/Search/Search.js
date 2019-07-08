import React from 'react'
import {
  Link,
} from 'react-router';
import './Search.scss';
import { connect } from 'react-redux';
import Logo from '../../images/logo.jpg';
import { Icon  } from 'antd';

@connect(state => ({
  home: state.home
}))
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: '请输入企业名,进行搜索',
      display: 'block',
      list: [['公司搜索','bank','请输入公司名','companyName'],
      ['专利搜索','profile','请输入专利关键字','patent'],
      ['论文搜索','switcher','请输入论文关键字','paper'],
      ['新闻搜索','switcher','请输入新闻关键字','news'],
      ['著作搜索','robot','请输入著作权关键字','write'],
      ['招聘搜索','usergroup-delete','请输入招聘关键字','recruit'],
      ['行业领域搜索','usergroup-delete','请输入行业关键字','area']],
      current: '请输入公司名',
      list2: [['公司名搜索','bank','请输入公司名','companyName'],
      ['公司地址搜索','profile','请输入公司地址','city'],
      ['公司法人搜索','delete','请输入公司法人','legalPerson']],
      current2: '请输入公司名',
      datakey: 'companyName',//当前被选中的标签
      inputkey: '',//当前搜索框中的值
    }
  };
  static childContextTypes = {
    location: React.PropTypes.object,
    route: React.PropTypes.object
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleClickSearchType = (item) => {//第一个大类搜索
    let value = item.target.getAttribute('value');
    let datakey = item.target.getAttribute('data-key');
    this.setState({
      display: value === '请输入公司名'?'block': 'none'//大类中是否显现子类搜索
     });
    this.setState({
      current: value,//改变目前的current指向
      placeholder: value,//搜索框的提示
      datakey: datakey//当前被选中的标签
    });
  }
  handleClickSearchType2 = (item) =>{//子类搜索
    let value = item.target.getAttribute('value');
    let datakey = item.target.getAttribute('data-key');
    this.setState({
      current2: value,
      placeholder: value,
      datakey: datakey
     });
  }
  InputChange = (e) =>{
    this.setState({
      inputkey: e.target.value,//搜索框改变的值
     });
  }
  handleClickSearchBtn = (e) =>{//点击搜索按钮跳转
    console.log
    if(this.state.inputkey === '')
    {
      return ;//如果不为空才跳转
    }
    else{
      this.context.router.push(`/search/result?${this.state.datakey}=${this.state.inputkey}`);
    }
  }
  handleKeyDown = (e) =>{//键盘Enter事件
    if(e.keyCode === 13){ //主要区别就是这里，可以直接获取到keyCode的值
      this.handleClickSearchBtn()}
  }
  componentDidMount(){
    //加载组件后，注册keypress事件
    document.addEventListener('keypress',this.handleKeyDown)
  }

  componentWillUmount(){
    //组件卸载时候，注销keypress事件
    document.removeEventListener("keypress",this.handleKeyDown)
  }

  render() {
    return (
          <div className="search_form" style={{ padding: '0px 250px'}}>
            <Link to="/"><img alt className="searchlogo" src={Logo}/></Link>

            <div className="top_hd">
              <div className="search_type cli_types">
                <ul>
                    {this.state.list.map(//通过读取list二重列表生成搜索的最上层
                    (item)=>(
                    <li key={item[0]} value={item[2]} data-key={item[3]}
                    className={this.state.current === item[2] ? 'active':''} 
                    onClick={this.handleClickSearchType.bind(this)}><Icon type={item[1]} />{item[0]}
                    </li>)
                    )}
                </ul> 
              </div>

              <div className="search_type search_type2" style={{display: this.state.display}}>
                <ul>
                  {this.state.list2.map(//通过读取list二重列表生成搜索的第二层
                    (item)=>(
                    <li key={item[0]} value={item[2]} data-key={item[3]}
                    className={this.state.current2 === item[2] ? 'active':''} 
                    onClick={this.handleClickSearchType2.bind(this)}><Icon type={item[1]} />{item[0]}
                    </li>)
                    )}
                </ul> 
             </div>
            </div>

            <div className="forms_in">
              <input className="form-control key_name" type="text" id="keywordId" 
              autoComplete="off" placeholder={this.state.placeholder}
              onChange={this.InputChange}></input>
              <input type="submit" className="btn btn-primary sub_btn" value="企业搜索" 
              onClick={this.handleClickSearchBtn}></input>
            </div> 

            <div className="hot_key">
              <span>热搜：</span>
              <a href="">小米</a>
              <a href="">华为</a>
              <a href="">苹果</a>
              <a href="">魅族</a>
              <a href="">oppo</a>
              <a href="">vivo</a>
            </div>
          </div>


    )
  }
}
