import React from 'react'
import {
  Link,
} from 'react-router';
import './Search2.scss';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { Icon, Row, Col } from 'antd';
import {
  getStaticData,
} from '../../actions/getEnterpriseInfo';//获取函数

@connect(state => ({
  home: state.home
}))
export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: '请输入企业名,进行搜索',
      inputValue: '',
      display: 'display',
      display2: 'none',
      display3: 'none',
      list: [['企业搜索', 'bank', '请输入公司名', 'companyName'],
      ['专利搜索', 'profile', '请输入专利关键字', 'patent'],
      ['文献搜索', 'switcher', '请输入论文关键字', 'literature'],
      ['著作权搜索', 'robot', '请输入著作权关键字', 'copyright'],
      ],
      current: '请输入公司名',
      list2: [['公司名搜索', 'bank', '请输入公司名', 'companyName'],
      ['公司法人搜索', 'delete', '请输入公司法人', 'legalPerson'],
      ['企业区域搜索', 'profile', '请输入公司区域', 'city'],
      ['行业领域搜索', 'usergroup-delete', '请输入行业关键字', 'industry']],
      list3: ['成都市', '绵阳市', '内江市', '乐山市', '德阳市', '宜宾市', '自贡市', '攀枝花市'
        , '泸州市', '广元市', '遂宁市', '南充市', '眉山市', '广安市', '达州市', '雅安市', '资阳市'],
      list4: ['制造业', '科学研究和技术服务业', '信息传输、软件和信息技术服务业', '金融业'],
      list5: ['建筑业', '批发和零售业', '住宿和餐饮业', '交通运输、仓库和邮政业'],
      list6: ['水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '租赁和商务服务业', '农、林、牧、渔业'],
      current2: '请输入公司名',
      current3: '',
      current4: '',
      datakey: 'companyName',//当前被选中的标签
      inputkey: '',//当前搜索框中的值
      buttonValue: '企业搜索',
      SystemStaticData: [],
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
      display: value === '请输入公司名' ? 'block' : 'none',//大类中是否显现子类搜索
      display2: value === '请输入公司区域' ? 'block' : 'none',//大类中是否显现子类搜索
      display3: value === '请输入行业关键字' ? 'block' : 'none',//大类中是否显现子类搜索
    });
    if(datakey=='companyName'){
      this.setState({
        buttonValue: '企业搜索'
      });
    }else if(datakey=='patent'){
      this.setState({
        buttonValue: '专利搜索'
      });
    }else if(datakey=='literature'){
      this.setState({
        buttonValue: '文献搜索'
      });
    }
    else if(datakey=='copyright'){
      this.setState({
        buttonValue: '著作权搜索'
      });
    }
    this.setState({
      current: value,//改变目前的current指向
      placeholder: value,//搜索框的提示
      datakey: datakey,//当前被选中的标签
      inputValue: ''
    });
    //console.log(datakey+value);
  }
  handleClickSearchType2 = (item) => {//子类搜索
    let value = item.target.getAttribute('value');
    let datakey = item.target.getAttribute('data-key');
    this.setState({
      display: value === '请输入公司名' ? 'block' : 'none',//大类中是否显现子类搜索
      display2: value === '请输入公司区域' ? 'block' : 'none',//大类中是否显现子类搜索
      display3: value === '请输入行业关键字' ? 'block' : 'none',//大类中是否显现子类搜索
    });
    this.setState({
      current2: value,
      placeholder: value,
      datakey: datakey
    });
  }
  handleClickSearchArea = (item) => {//子类搜索
    let value = item.target.getAttribute('value');
    this.context.router.push(`/result?city=${value}`);
    this.setState({
      current3: value,
    });
  }
  handleClickSearchIndustry = (item) => {//子类搜索
    let value = item.target.getAttribute('value');
    this.context.router.push(`/result?industry=${value}`);
    this.setState({
      current4: value,
    });
  }
  InputChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      inputkey: e.target.value,//搜索框改变的值
    });
  }
  handleClickSearchBtn = (e) => {//点击搜索按钮跳转
    //console.log(this.state.inputkey)
    if (this.state.inputkey === '') {
      return;//如果不为空才跳转
    } else if (this.state.datakey == 'patent') {
      this.context.router.push(`/patent?patentName=${this.state.inputkey}`);
    } else if (this.state.datakey == 'literature') {
      this.context.router.push(`/literature?literatureName=${this.state.inputkey}`);
    } else if (this.state.datakey == 'copyright') {
      this.context.router.push(`/copyright?copyrightName=${this.state.inputkey}`);
    } else {
      this.context.router.push(`/result?${this.state.datakey}=${this.state.inputkey}`);
    }
  }
  handleHotSearch = (e) => {
    this.context.router.push(`/company?companyName=${e.target.innerHTML}`);
  }
  getStaticData = () =>{//查询系统所有数据,包括公司数量，文献，专利，招聘，新闻
    this.props.dispatch(getStaticData(toQuery())).then(() => {
      let data = this.props.home.EnSystemStaticData.data[0];
      //console.log(data);
      if (this.mounted) {//判断组件是否装载完毕
        this.setState({
          SystemStaticData: data
        });
      }
    });
  }
  componentDidMount() {
    this.getStaticData();
  }

  componentWillUnmount() {
    //组件卸载时候，注销keypress事件
    // document.removeEventListener("keypress",this.handleKeyDown);
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }
  componentWillMount() {//装载完毕
    this.mounted = true;
  }

  render() {
    return (
      <div>

      <div className="search_form" style={{ padding: '100px 90px 0 150px' }}>
        {/* <span className="searchlogo" /> */}

        <div className="top_hd">

          <div className="search_type cli_types">
              <ul>
                {this.state.list.map(//通过读取list二重列表生成搜索的最上层
                  (item) => (
                    <li key={item[0]} value={item[2]} data-key={item[3]}
                      className={this.state.current === item[2] ? 'active' : ''}
                      onClick={this.handleClickSearchType.bind(this)}><Icon type={item[1]} />{item[0]}
                    </li>)
                )}
              </ul>
          </div>

          <div className="search_type search_type2" style={{ display: this.state.display }}>
            <ul>
              {this.state.list2.map(//通过读取list二重列表生成搜索的第二层（企业搜索）
                (item) => (
                  <li key={item[0]} value={item[2]} data-key={item[3]}
                    className={this.state.current2 === item[2] ? 'active' : ''}
                    onClick={this.handleClickSearchType2.bind(this)}><Icon type={item[1]} />{item[0]}
                  </li>)
              )}
            </ul>
          </div>


          <div className="search_type search_type2 search_type3" style={{ display: this.state.display2 }}>
            <ul>
              {this.state.list3.map(//通过读取list二重列表生成搜索的第二层(区域搜素)
                (item) => (
                  <li key={item} value={item} data-key={item}
                    className={this.state.current3 === item ? 'active' : ''}
                    onClick={this.handleClickSearchArea.bind(this)}>{item}
                  </li>)
              )}
            </ul>
          </div>

          <div className="search_type search_type2" style={{ display: this.state.display3 }}>
            <ul>
              {this.state.list4.map(//通过读取list二重列表生成搜索的第二层(行业领域搜素)
                (item) => (
                  <li key={item} value={item} data-key={item}
                    className={this.state.current4 === item ? 'active' : ''}
                    onClick={this.handleClickSearchIndustry.bind(this)}>{item}
                  </li>)
              )}
            </ul>
            <ul>
              {this.state.list5.map(//通过读取list二重列表生成搜索的第二层(行业领域搜素)
                (item) => (
                  <li key={item} value={item} data-key={item}
                    className={this.state.current4 === item ? 'active' : ''}
                    onClick={this.handleClickSearchIndustry.bind(this)}>{item}
                  </li>)
              )}
            </ul>
            <ul>
              {this.state.list6.map(//通过读取list二重列表生成搜索的第二层(行业领域搜素)
                (item) => (
                  <li key={item} value={item} data-key={item}
                    className={this.state.current4 === item ? 'active' : ''}
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
          <input type="submit" className="btn btn-primary sub_btn" value={this.state.buttonValue}
            onClick={this.handleClickSearchBtn}></input>
        </div>

        <div className="home_hot_key">
          <span className="home_hot_key">热搜：</span>
          <a onClick={this.handleHotSearch}>川开电气有限公司</a>
          <a onClick={this.handleHotSearch}>东方日立(成都)电控设备有限公司</a>
          <a onClick={this.handleHotSearch}>成都宝通天宇电子科技有限公司</a>
          <a onClick={this.handleHotSearch}>东方电气集团东方汽轮机有限公司</a>
        </div>

        </div>

        <div className="informationcontainer">
          <div className="innercontainer">
            
          <a href="" className="index-nav-item">
            <Icon type="user" className="Iconimg" /><span className="blf"><h2>企业</h2><p>{this.state.SystemStaticData.company}家</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="read" className="Iconimg" /><span className="blf"><h2>文献</h2><p>{this.state.SystemStaticData.literature}篇</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="tool" className="Iconimg" /><span className="blf"><h2>专利</h2><p>{this.state.SystemStaticData.patent}项</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="copyright" className="Iconimg" /><span className="blf"><h2>著作权</h2><p>{this.state.SystemStaticData.copyright}个</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="usergroup-add" className="Iconimg" /><span className="blf"><h2>招聘</h2><p>{this.state.SystemStaticData.recruit}条</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="notification" className="Iconimg" /><span className="blf"><h2>招投标</h2><p>{this.state.SystemStaticData.bid}个</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="trademark" className="Iconimg" /><span className="blf"><h2>商标</h2><p>{this.state.SystemStaticData.trade}个</p></span>
            </a>
          <a href="" className="index-nav-item">
            <Icon type="global" className="Iconimg" /><span className="blf"><h2>新闻</h2><p>{this.state.SystemStaticData.news}条</p></span>
            </a>
            </div>
        </div>

      </div>


    )
  }
}
