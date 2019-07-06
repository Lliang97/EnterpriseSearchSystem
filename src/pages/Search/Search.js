import React from 'react'
import {
  Link,
} from 'react-router';
import './Search.scss';
import Logo from '../../images/logo.jpg';
import { Icon , Row , Col } from 'antd';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: '请输入企业名,进行搜索',
      display: 'block',
      list: [['公司搜索','bank'],['专利搜索','profile'],['论文搜索','switcher'],['新闻搜索','switcher'],['著作搜索','robot'],['招聘搜索','usergroup-delete'],['行业领域搜索','usergroup-delete']],
      current: '公司搜索',
      list2:[['公司名搜索','bank'],['公司地址搜索','profile'],['公司法人搜索','delete']],
      current2: '公司名搜索'
    }
  };
  handleClickSearchType() {//是否显现子类搜索

  }
  handleClickSearchType(item) {//第一个大类搜索
    this.setState({
      display: item === '公司搜索'?'block': 'none'
     });
    this.setState({
     current: item,
    });
  }
  handleClickSearchType2(item){//子类搜索
    this.setState({
      current2: item
     });
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
                    <li key={item[0]} className={this.state.current === item[0] ? 'active':''} 
                    onClick={this.handleClickSearchType.bind(this, item[0])}><Icon type={item[1]} />{item[0]}
                    </li>)
                    )}
                </ul> 
              </div>

              <div className="search_type search_type2" style={{display: this.state.display}}>
                <ul>
                  {this.state.list2.map(//通过读取list二重列表生成搜索的最上层
                    (item)=>(
                    <li key={item[0]} className={this.state.current2 === item[0] ? 'active':''} 
                    onClick={this.handleClickSearchType2.bind(this, item[0])}><Icon type={item[1]} />{item[0]}
                    </li>)
                    )}
                </ul> 
             </div>
            </div>

            <div className="forms_in">
              <input className="form-control key_name" type="text" id="keywordId" autoComplete="off" placeholder={this.state.placeholder}></input>
              <input type="submit" className="btn btn-primary sub_btn" value="企业搜索"></input>
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
