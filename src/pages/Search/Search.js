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
      inputValue:'',
      display: 'block',
      display2: 'none',
      display3: 'none',
      list: [['公司搜索','bank','请输入公司名','companyName'],
      ['公司区域搜索','profile','请输入公司区域','city'],
      ['行业领域搜索','usergroup-delete','请输入行业关键字','industry'],
      ['专利搜索','profile','请输入专利关键字','patent'],
      ['论文搜索','switcher','请输入论文关键字','paper'],
      ['著作权搜索','robot','请输入著作权关键字','write'],
    ],
      current: '请输入公司名',
      list2: [['公司名搜索','bank','请输入公司名','companyName'],
      ['公司法人搜索','delete','请输入公司法人','legalPerson']],
      list3: ['成都市','绵阳市','内江市','乐山市','德阳市','宜宾市','自贡市','攀枝花市'
      ,'泸州市','广元市','遂宁市','南充市','眉山市','广安市','达州市','雅安市','资阳市','其他'],
      list4: ['制造业','信息传输、软件和信息技术服务业'],
      current2: '请输入公司名',
      current3: '成都市',
      current4: '制造业',
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
      display: value === '请输入公司名'?'block': 'none',//大类中是否显现子类搜索
      display2: value === '请输入公司区域'?'block': 'none',//大类中是否显现子类搜索
      display3: value === '请输入行业关键字'?'block': 'none'//大类中是否显现子类搜索
     });
    this.setState({
      current: value,//改变目前的current指向
      placeholder: value,//搜索框的提示
      datakey: datakey,//当前被选中的标签
      inputValue:''
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
  handleClickSearchArea = (item) =>{//子类搜索
    let value = item.target.getAttribute('value');
    this.context.router.push(`/result?city=${value}`);
    this.setState({
      current3: value,
     });
  }
  handleClickSearchIndustry = (item) =>{//子类搜索
    let value = item.target.getAttribute('value');
    this.context.router.push(`/result?industry=${value}`);
    this.setState({
      current4: value,
     });
  }
  InputChange = (e) =>{
    this.setState({
      inputkey: e.target.value,//搜索框改变的值
     });
  }
  handleClickSearchBtn = (e) =>{//点击搜索按钮跳转
    if(this.state.inputkey === '')
    {
      return ;//如果不为空才跳转
    }
    else{
      this.context.router.push(`/result?${this.state.datakey}=${this.state.inputkey}`);
    }
  }
  handleHotSearch = (e) =>{
    this.context.router.push(`/company?companyName=${e.target.innerHTML}`);
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
                  {this.state.list2.map(//通过读取list二重列表生成搜索的第二层（企业搜索）
                    (item)=>(
                    <li key={item[0]} value={item[2]} data-key={item[3]}
                    className={this.state.current2 === item[2] ? 'active':''} 
                    onClick={this.handleClickSearchType2.bind(this)}><Icon type={item[1]} />{item[0]}
                    </li>)
                    )}
                </ul> 
             </div>

             <div className="search_type search_type2 search_type3" style={{display: this.state.display2}}>
                <ul>
                  {this.state.list3.map(//通过读取list二重列表生成搜索的第二层(区域搜素)
                    (item)=>(
                    <li key={item} value={item} data-key={item}
                    className={this.state.current3 === item ? 'active':''} 
                    onClick={this.handleClickSearchArea.bind(this)}>{item}
                    </li>)
                    )}
                </ul> 
             </div>

             <div className="search_type search_type2" style={{display: this.state.display3}}>
                <ul>
                  {this.state.list4.map(//通过读取list二重列表生成搜索的第二层(行业领域搜素)
                    (item)=>(
                    <li key={item} value={item} data-key={item}
                    className={this.state.current4 === item ? 'active':''} 
                    onClick={this.handleClickSearchIndustry.bind(this)}>{item}
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
              <a onClick={this.handleHotSearch}>川开电气有限公司</a>
              <a onClick={this.handleHotSearch}>东方日立(成都)电控设备有限公司</a>
              <a onClick={this.handleHotSearch}>成都宝通天宇电子科技有限公司</a>
              <a onClick={this.handleHotSearch}>东方电气集团东方汽轮机有限公司</a>
            </div>
          </div>


    )
  }
}
