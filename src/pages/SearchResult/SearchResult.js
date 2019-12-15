import React from 'react'
import {
  Link
} from 'react-router';
import './SearchResult.scss';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import {
  getEnterprise_search,
  getEnterprise_number,
  getEnterprise_searchIndustryDistribution,
  getEnterprise_searchCityDistribution,
} from '../../actions/getEnterpriseSearch';//获取函数
import { List, Pagination, Card, Row, Col, Divider, Radio, Tabs, Breadcrumb } from 'antd';
import IndustryDistributionPie from '../../components/echarts/IndustryDistributionPie.js';
import CityDistributionPie from '../../components/echarts/CityDistributionPie.js';
import SearchResultHead from '../HeadComponent/SearchResultHead.js';
const { TabPane } = Tabs;

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
      placeholder: '请输入企业名、法人',
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
      list3: ['成都市', '绵阳市', '内江市', '乐山市', '德阳市', '宜宾市', '自贡市', '资阳市'
        , '泸州市', '广元市', '遂宁市', '南充市', '眉山市', '广安市', '达州市', '雅安市', '攀枝花市', '全部'],
      list4: ['制造业', '科学研究和技术服务业', '信息传输、软件和信息技术服务业',
        '金融业', '建筑业', '批发和零售业', '住宿和餐饮业', '交通运输、仓库和邮政业',
        '水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '租赁和商务服务业', '农、林、牧、渔业', '全部'],
      datakey: 'companyName',//当前被选中的标签
      inputkey: '',//当前搜索框中的值
      urlkey: '',//路由key值
      buttonValue: '企业搜索',
      industrykey: '',
      areakey: '',
      IndustryDistributionPieData: [],
      CityDistributionPieData: [],
    }
  };
  static childContextTypes = {
    location: React.PropTypes.object,
    route: React.PropTypes.object
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  getEnterprise_searchIndustryDistributionData = (config) => {
    this.props.dispatch(getEnterprise_searchIndustryDistribution(toQuery(config))).then(() => {
      let data = this.props.home.EnIndustryDistriButionData.data;
      //console.log(data);
      if (this.mounted) {//判断组件是否装载完毕
        this.setState({
          IndustryDistributionPieData: data
        });
      }
    });
  }
  getEnterprise_searchCityDistributionData = (config) => {
    this.props.dispatch(getEnterprise_searchCityDistribution(toQuery(config))).then(() => {
      let data = this.props.home.EnCityDistributionData.data;
      //console.log(data);
      if (this.mounted) {//判断组件是否装载完毕
        this.setState({
          CityDistributionPieData: data
        });
      }
    });
  }
  handleClickSearchType = (item) => {//第一个大类搜索
    let value = item.target.getAttribute('value');
    let datakey = item.target.getAttribute('data-key');
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({
        current: value,//改变目前的current指向
        placeholder: value,//搜索框的提示
        datakey: datakey,//当前被选中的标签
        inputValue: ''
      });
    }
    if (datakey == 'companyName') {
      this.setState({
        buttonValue: '企业评估'
      });
    } else if (datakey == 'patent') {
      this.setState({
        buttonValue: '专利搜索'
      });
    } else if (datakey == 'literature') {
      this.setState({
        buttonValue: '文献搜索'
      });
    }
    else if (datakey == 'copyright') {
      this.setState({
        buttonValue: '著作权搜索'
      });
    }
  }
  InputChange = (e) => {
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({
        inputkey: e.target.value,//搜索框改变的值
      });
    }
  }
  handleClickSearchBtn = (e) => {//点击搜索按钮跳转
    if (this.state.inputkey === '') {
      return;//如果不为空才跳转
    }
    this.context.router.push(`/result?key=${this.state.inputkey}`);
    //let url = this.props.location.search;//获得目前路由的后缀，比如，?companyName=小米
    //url = decodeURIComponent(url);//解码
    //let type = localStorage.SearchType;
    let config = {}//要传入到接口的参数
    config['condition'] = this.state.inputkey;//将tpye以变量的方式存进config对象中
    // console.log(config);
    this.fetch(config);//获取页数
    this.getEnterpriseData(1, config);//获取公司数据
    this.getEnterprise_searchIndustryDistributionData({'industry':'制造业'});
    this.getEnterprise_searchCityDistributionData({'city':'成都市'});
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({//更新config
        config: config
      });
    }
  }
  componentDidMount() {
    this.getUrl();
  }
  componentWillReceiveProps(nextProps) {
      // const id = nextProps.match.params.id;
      // 一些操作
    let url = this.props.location.search;//获得目前路由的后缀，比如，?key=小米
    url = decodeURIComponent(url);//url解码
    let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
    //let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
    if(inputvalue!=this.state.urlkey){
      let config = {}//要传入到接口的参数
      config['condition'] = inputvalue;//将tpye以变量的方式存进config对象中
      // console.log(config)
      this.setState({//更新config
          config: config,
          urlkey: inputvalue
      })
      this.fetch(config);//获取页数
      this.getEnterpriseData(1, config);//获取公司数据
      this.getEnterprise_searchIndustryDistributionData(config);
      this.getEnterprise_searchCityDistributionData(config);
    }
   //   this.getEnterprise_searchIndustryDistributionData(config);
   //   this.getEnterprise_searchCityDistributionData(config);
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
  getUrl = () => {//获取当前浏览器路由
    let url = this.props.location.search;//获得目前路由的后缀，比如，?key=小米
    url = decodeURIComponent(url);//url解码
    //let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
    let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
    let config = {}//要传入到接口的参数
    config['condition'] = inputvalue;//将tpye以变量的方式存进config对象中
    //consoleconsole.log(inputvalue)
    //localStorage.SearchType = type;
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({//更新config
        config: config,
        urlkey: inputvalue
      });
    }
    this.fetch(config);//获取页数
    this.getEnterpriseData(1, config);//获取公司数据
    this.getEnterprise_searchIndustryDistributionData(config);
    this.getEnterprise_searchCityDistributionData(config);
  }
  getEnterpriseData = (page = 1, config) => {//获取公司数据
    config.start = page;//第几页
    config.rows = 10;//数量为10个
    //console.log(config);
    this.props.dispatch(getEnterprise_search(toQuery(config))).then(() => {
      let data = this.props.home.EnSearchData.data;
      //console.log(data);
      if (this.mounted) {//判断组件是否装载完毕
        this.setState({
          enterprise_search_data: data
        });
      }
    });

  };
  fetch = (config) => {//获取公司数量并赋值页数
    this.props.dispatch(getEnterprise_number(toQuery(config))).then(() => {
      let data = this.props.home.EnNumberData.data;
      if (this.mounted)//判断组件是否装载完毕
        this.setState({
          total: data
        });
    });
  };
  onChange = (pageNumber) => {//监听当前分页，点击后回调
    this.getEnterpriseData(pageNumber, this.state.config);//改变后获取调用获取公司信息函数
  }
  handleAreaClick = (e) => {
    if (e.target.value == '全部') {
      let orginConfig = this.state.config;
      delete orginConfig.city;
      if (this.mounted)//判断组件是否装载完毕
      this.setState({
        areakey: ''
      });
      this.fetch(orginConfig);//获取页数
      this.getEnterpriseData(1, orginConfig);//改变后获取调用获取公司信息函数
      this.getEnterprise_searchIndustryDistributionData(orginConfig);
      this.getEnterprise_searchCityDistributionData(orginConfig);
    }
    else {
      let addConfig = this.state.config;
      addConfig['city'] = e.target.value;
      if (this.mounted)//判断组件是否装载完毕
      this.setState({
        areakey: e.target.value
      });
      this.fetch(addConfig);//获取页数
      this.getEnterpriseData(1, addConfig);//改变后获取调用获取公司信息函数
      this.getEnterprise_searchIndustryDistributionData(addConfig);
      this.getEnterprise_searchCityDistributionData(addConfig);
    }
  }
  handleIndustryClick = (e) => {
    if (e.target.value == '全部') {
      let orginConfig = this.state.config;
      delete orginConfig.industry;
      if (this.mounted)//判断组件是否装载完毕
      this.setState({
        industrykey: ''
      });
      this.fetch(orginConfig);//获取页数
      this.getEnterpriseData(1, orginConfig);//改变后获取调用获取公司信息函数
      this.getEnterprise_searchIndustryDistributionData(orginConfig);
      this.getEnterprise_searchCityDistributionData(orginConfig);
    }
    else {
      let addConfig = this.state.config;
      addConfig['industry'] = e.target.value;
      if (this.mounted)//判断组件是否装载完毕
      this.setState({
        industrykey: e.target.value
      });
      this.fetch(addConfig);//获取页数
      this.getEnterpriseData(1, addConfig);//改变后获取调用获取公司信息函数
      this.getEnterprise_searchIndustryDistributionData(addConfig);
      this.getEnterprise_searchCityDistributionData(addConfig);
    }
  }
  render() {
    return (
      <div>
      <SearchResultHead/>
      <div className="container-fluid">

        <div className="search_form2" >

          <Row gutter={16}>
            <Col span={12}>
              <div className="Result_page_left_header">{/*左边下半部分*/}
                <div className="jumpbar">
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                      <Link to='/'>首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link to={{ pathname: '/result', query: { key: this.state.urlkey } }}>企业评估</Link>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <Tabs defaultActiveKey="1" size="large">
                  <TabPane tab="企业区域" key="1">
                    <div>
                      <Radio.Group defaultValue="全部" buttonStyle="solid">
                        {
                          this.state.list3.map(
                            (item) => (
                              <Radio.Button key={item} value={item} onClick={this.handleAreaClick}>{item}</Radio.Button>)
                          )
                        }
                      </Radio.Group>
                    </div>
                  </TabPane>
                  <TabPane tab="行业领域" key="2">
                    <div>
                      <Radio.Group defaultValue="全部" buttonStyle="solid">
                        {
                          this.state.list4.map(
                            (item) => (
                              <Radio.Button key={item} value={item} onClick={this.handleIndustryClick}>{item}</Radio.Button>)
                          )
                        }
                      </Radio.Group>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
              <List
                itemLayout="horizontal"
                bordered='true'
                dataSource={this.state.enterprise_search_data}
                // pagination= 
                renderItem={item => (
                  <div className='companyListStyle'>
                    <Link to={{ pathname: '/company', query: { companyName: item.companyName } }}>{/*根据选择的公司名跳转 */}
                      <List.Item>
                        <List.Item.Meta
                          title={item.companyName}
                          avatar={<div className="cardStyle">
                            <Card title={item.value} >
                              <p>创新能力值</p>
                            </Card>
                          </div>}
                          description=
                          {<div>
                            <span className="">企业法人：{item.legalPerson}</span>
                            <span className="fundStlye">注册资本：{item.registeredCapital}万</span>
                            <span className="areaStlye">行业领域：{item.industry}</span>
                          </div>}
                        />
                      </List.Item>
                    </Link>
                  </div>
                )}
              />
              <Pagination
                showQuickJumper
                onChange={this.onChange}//监听改变，回调函数
                defaultCurrent={1}//默认在第一页
                total={this.state.total}//总条数
              />
            </Col>
            <Col span={12}>
              <div className="bottomRight">
                <div className="hint_text">
                  <span className="nums_text">已为您找到“
                  <span className="keyword">{this.state.urlkey}</span>
                  <span className="keyword">{this.state.areakey==''?'':' '+this.state.areakey}</span>
                  <span className="keyword">{this.state.industrykey==''?'':' '+this.state.industrykey}</span>
                  ”相关企业{this.state.total}家
                  </span>
                </div>
                <Divider />
                <div className="areaDistribution">
                  {/* <span className="title">行业分布</span> */}
                  <IndustryDistributionPie PieData={this.state.IndustryDistributionPieData} />
                </div>
                <div className="aboutWords">
                  {/* <span className="title">地区分布</span> */}
                  <CityDistributionPie PieData={this.state.CityDistributionPieData} />
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </div>
      </div>
    )
  }
}
