import React from 'react'
import {
  Link 
} from 'react-router';
import './SearchResult.scss';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import {getEnterprise_search,
  getEnterprise_number} from '../../actions/getEnterpriseSearch';//获取函数
import { List ,Pagination ,Icon} from 'antd';
import Logo from '../../images/logo.jpg';


@connect(state => ({
  home: state.home
}))
export default class SearchResult extends React.Component {//搜索结果页面
  constructor() {
    super();
    this.state = {
      enterprise_search_data: [],//数据
      total: 0,//页数
      config: "",//参数
      placeholder: '请输入企业名,进行搜索',
      display: 'block', 
      list: [['公司搜索','bank','请输入公司名','companyName'],
      ['公司区域搜索','profile','请输入公司区域','legalPerson'],
      ['行业领域搜索','usergroup-delete','请输入行业关键字','area'],
      ['专利搜索','profile','请输入专利关键字','patent'],
      ['论文搜索','switcher','请输入论文关键字','paper'],
      ['著作权搜索','robot','请输入著作权关键字','write'],
      // ['新闻搜索','switcher','请输入新闻关键字','news'],
      // ['招聘搜索','usergroup-delete','请输入招聘关键字','recruit']
    ],
      current: '请输入公司名',
      list2: [['公司名搜索','bank','请输入公司名','companyName'],
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
  if(this.mounted){//判断组件是否装载完毕
    this.setState({
      display: value === '请输入公司名'?'block': 'none'//大类中是否显现子类搜索
    });
    this.setState({
      current: value,//改变目前的current指向
      placeholder: value,//搜索框的提示
      datakey: datakey//当前被选中的标签
    });
  }
  }
  handleClickSearchType2 = (item) =>{//子类搜索
  let value = item.target.getAttribute('value');
  let datakey = item.target.getAttribute('data-key');
  if(this.mounted){//判断组件是否装载完毕
    this.setState({
        current2: value,
        placeholder: value,
        datakey: datakey
        });
    }
  }
  InputChange = (e) =>{
  if(this.mounted){//判断组件是否装载完毕
  this.setState({
      inputkey: e.target.value,//搜索框改变的值
      });
  }
  }
  handleClickSearchBtn = (e) =>{//点击搜索按钮跳转
  // if(this.state.inputkey === '')
  // {
  //   return ;//如果不为空才跳转
  // }
  this.context.router.push(`/result?${this.state.datakey}=${this.state.inputkey}`);
  // let datakey = this.state.datakey;
  // let inputkey = this.state.inputkey;
  let url = this.props.location.search;//获得目前路由的后缀，比如，?companyName=小米
  url = decodeURIComponent(url);//解码
  //console.log(url);
  let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
  let inputvalue = url.substring(url.indexOf("=")+1);//输入的查询值，比如，小米
  let config = {}//要传入到接口的参数
  config[type] = inputvalue;//将tpye以变量的方式存进config对象中

  if(this.mounted){//判断组件是否装载完毕
    this.setState({//更新config
    config: config
    });
  }
  
  this.fetch(config);//获取页数
  this.getEnterpriseData(1, config);//获取公司数据
  }
  handleKeyDown = (e) =>{//键盘Enter事件
      if(e.keyCode === 13){ //主要区别就是这里，可以直接获取到keyCode的值
        this.handleClickSearchBtn()}
  }
  componentDidMount(){
    this.getUrl();
    //组件装载后时候，注册keypress事件
    document.addEventListener('keypress',this.handleKeyDown)
  }
  componentWillUnmount(){
    //组件卸载时候，注销keypress事件
    document.removeEventListener("keypress",this.handleKeyDown);
    this.mounted = false;
    this.setState = (state,callback)=>{
      return;
    };
  }
  componentWillMount(){//装载完毕
    this.mounted = true;
  }
  getUrl = () =>{//获取当前浏览器路由
    let url = this.props.location.search;//获得目前路由的后缀，比如，?companyName=小米
    url = decodeURIComponent(url);//解码
    let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
    let inputvalue = url.substring(url.indexOf("=")+1);//输入的查询值，比如，小米
    let config = {}//要传入到接口的参数
    config[type] = inputvalue;//将tpye以变量的方式存进config对象中
    console.log(config)

    if(this.mounted){//判断组件是否装载完毕
      this.setState({//更新config
      config: config
      });
    }
    this.fetch(config);//获取页数
    this.getEnterpriseData(1, config);//获取公司数据
  }
  getEnterpriseData = (page = 1, config) => {//获取公司数据
  config.start = page;//第几页
  config.rows = 5;//数量为10个
  this.props.dispatch(getEnterprise_search(toQuery(config))).then(() => {
  let data = this.props.home.EnSearchData.data;
  if(this.mounted){//判断组件是否装载完毕
    this.setState({
    enterprise_search_data: data
    });
  }
  });

  };
  fetch = (config) => {//获取公司数量并赋值页数
    this.props.dispatch(getEnterprise_number(toQuery(config))).then(() => {
      let data = this.props.home.EnNumberData.data;
      if(this.mounted)//判断组件是否装载完毕
      this.setState({
        total: data
      });
    });
  };
  onChange = (pageNumber) =>{//监听当前分页，点击后回调
    this.getEnterpriseData(pageNumber,this.state.config);//改变后获取调用获取公司信息函数
  }

  render() {
    return (
      <div className="container-fluid">

      <div className="search_form2" /*style={{ padding: '20px 50px'}}*/>


      <div className="top_hd">
      <div className="search_forms2">
        <Link to="/"><img alt className="logo" src={Logo}/></Link>
      </div>

      <div className="forms_in2">
      <input className="form-control2 key_name" type="text" id="keywordId" 
      autoComplete="off" placeholder={this.state.placeholder}
      onChange={this.InputChange}></input>
      <input type="submit" className="btn btn-primary sub_btn" value="企业搜索" 
      onClick={this.handleClickSearchBtn}></input>
      </div> 


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
        <List
        itemLayout="horizontal"
        bordered='true'
        dataSource={this.state.enterprise_search_data}
        // pagination= 
        renderItem={item => (
        <Link to={{ pathname: '/company', query: { companyName: item.companyName } }}>{/*根据选择的公司名跳转 */}
          <List.Item>
            <List.Item.Meta
              title={item.companyName}
              description={item.businessScope}
            />
          </List.Item>
        </Link>
        )}
      />
      <Pagination
      showQuickJumper 
      onChange={this.onChange}//监听改变，回调函数
      defaultCurrent={1}//默认在第一页
      total={this.state.total}//总条数
      />
      </div>

      </div>
    )
  }
}
