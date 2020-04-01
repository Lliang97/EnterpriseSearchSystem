import React from 'react'
import {
  Link,
} from 'react-router';
import './Search2.scss';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { Icon, Layout  ,Dropdown,Menu,Button} from 'antd';
import {
  getStaticData,
} from '../../actions/getEnterpriseInfo';//获取函数
import SearchHomeHead from '../HeadComponent/SearchHomeHead.js'
const { Header, Content, Footer } = Layout;
@connect(state => ({
  home: state.home
}))
export default class Search2 extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: '请输入企业名、法定代表人、股东或高管姓名',
      list: [['企业评估' , '请输入企业名、法定代表人、股东或高管姓名', 'companySearch'],
      ['知识产权', '请输入知识产权关键字', 'propertySearch']],
      current: '请输入企业名、法定代表人、股东或高管姓名',
      datakey: 'companySearch',//当前被选中的标签
      inputkey: '',//当前搜索框中的值
      buttonValue: '企业评估',//按钮值
      SystemStaticData: [],
      enterpriseHotSearch: ['川开电气有限公司','成都安朗电气自控设备有限公司', '东方日立(成都)电控设备有限公司', '成都宝通天宇电子科技有限公司', '东方电气集团东方汽轮机有限公司'],
      patentHotSearch: ['一种','方法','装置','系统','自动','多晶硅'],
      literatureHotSearch: ['多晶硅','设计','质量控制','管理','水利水电工程'],
      copyrightHotSearch: ['软件','智能','平台','管理系统','系统软件'],
      // propertySearchKey: 'patent',
    }
  };
  static childContextTypes = {
    location: React.PropTypes.object,
    route: React.PropTypes.object
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleClickSearchType = (item) => {//按钮列表点击事件，企业评估和知识产权搜索
    let value = item.target.getAttribute('value');
    let datakey = item.target.getAttribute('data-key');
    if(datakey=='companySearch'){
      this.setState({
        buttonValue: '企业评估'
      });
    }else if(datakey=='propertySearch'){
      this.setState({
        buttonValue: '知识产权'
      });
    }
    this.setState({
      current: value,//改变目前的current指向
      placeholder: value,//搜索框的提示
      datakey: datakey,//当前被选中的标签
    });

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
    if (this.state.datakey == 'companySearch'){
      this.context.router.push(`/result?key=${this.state.inputkey}`);
    }
    else if (this.state.datakey == 'propertySearch') {
      this.context.router.push(`/property?key=${this.state.inputkey}`);
    }
    // else if (this.state.propertySearchKey == 'literature') {
    //   this.context.router.push(`/literature?literature=${this.state.inputkey}`);
    // }
    // else if (this.state.propertySearchKey == 'copyright') {
    //   this.context.router.push(`/copyright?copyright=${this.state.inputkey}`);
    // }
  }
  propertySearchKeyhandleHotSearch = (e) => {//企业评估热搜跳转
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
  // handlePropertyMenuClick = (e) =>{//点击
  //   if (this.mounted) {//判断组件是否装载完毕
  //     this.setState({
  //       propertySearchKey: e.key
  //     });
  //   }
  // }
  handleHotSearch = (e) => {
    if(this.state.datakey == 'companySearch')
      this.context.router.push(`/result?key=${e.target.innerHTML}`);
    else if(this.state.datakey == 'propertySearch')
      this.context.router.push(`/property?key=${e.target.innerHTML}`);
    // else if(this.state.propertySearchKey == 'literature')
    //   this.context.router.push(`/literature?literature=${e.target.innerHTML}`);
    // else if(this.state.propertySearchKey == 'copyright')
    //   this.context.router.push(`/copyright?copyright=${e.target.innerHTML}`);
  }
  componentDidMount() {
    this.getStaticData();
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
  render() {
    // const propertymenu = (
    //   <Menu onClick={this.handlePropertyMenuClick}>
    //     <Menu.Item key="patent">
    //       <Icon type="tool" />
    //       专利搜索
    //     </Menu.Item>
    //     <Menu.Item key="literature">
    //       <Icon type="read" />
    //       文献搜索
    //     </Menu.Item>
    //     <Menu.Item key="copyright">
    //       <Icon type="copyright" />
    //       著作权搜索
    //     </Menu.Item>
    //   </Menu>
    // );
    const HotSearchComponent = () => { 
      if(this.state.datakey=='companySearch'){
        return (
          this.state.enterpriseHotSearch.map(//企业评估热搜
            (item) => (
              <a key={item} onClick={this.handleHotSearch}>{item}</a>)
          )
        )
      }
      else if(this.state.datakey=='propertySearch'){
        return (
          this.state.patentHotSearch.map(//知识产权热搜
            (item) => (
              <a key={item} onClick={this.handleHotSearch}>{item}</a>)
          )
        )
      }
      // else if(this.state.propertySearchKey=='literature'){
      //   return (
      //     this.state.literatureHotSearch.map(//文献热搜
      //       (item) => (
      //         <a key={item} onClick={this.handleHotSearch}>{item}</a>)
      //     )
      //   )
      // }
      // else if(this.state.propertySearchKey=='copyright'){
      //   return (
      //     this.state.copyrightHotSearch.map(//著作权热搜
      //       (item) => (
      //         <a key={item} onClick={this.handleHotSearch}>{item}</a>)
      //     )
      //   )
      // }
    }
    const SearchInput = () =>{
      if(this.state.datakey=='companySearch'){
        return (
          <div className="forms_in">
          <input className="form-control" type="text" id="keywordId"
            autoComplete="off" placeholder={this.state.placeholder}
            onChange={this.InputChange}></input>
          <input type="submit" className="btn btn-primary sub_btn" value={this.state.buttonValue}
            onClick={this.handleClickSearchBtn}></input>
        </div>
        )
      }
      else if(this.state.datakey=='propertySearch'){
        return (
          <div className="forms_in">
          <input className="property_form-control" type="text" id="keywordId"
            autoComplete="off" placeholder={this.state.placeholder}
            onChange={this.InputChange}></input>
            {/* <Dropdown overlay={propertymenu}>
              <Button>
                专利搜索 <Icon type="down" />
              </Button>
            </Dropdown> */}
          <input type="submit" className="btn btn-primary sub_btn" value={this.state.buttonValue}
            onClick={this.handleClickSearchBtn}></input>
        </div>
        )
      }
    }
    return (
      <div>
        <SearchHomeHead {...this.props}/>
      <div className="search_form" style={{ padding: '100px 90px 0 150px' }}>

        <div className="top_hd">

          <div className="search_type cli_types">
          <ul>
            {this.state.list.map(//通过读取list二重列表生成搜索的最上层
              (item) => (
                <li key={item[0]} value={item[1]} data-key={item[2]}
                  className={this.state.current === item[1] ? 'active' : ''}
                  onClick={this.handleClickSearchType.bind(this)}>{item[0]}
                </li>)
            )}
          </ul>
          </div>

        </div>


          {SearchInput()}

        <div className="home_hot_key">
          <span className="home_hot_key">热搜：</span>
          {HotSearchComponent()}
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
