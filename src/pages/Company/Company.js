import React from 'react'
import {
  Link
} from 'react-router';
import './Company.scss';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { getEnterprise_search } from '../../actions/getEnterpriseSearch';
import {
  getEnterprise_literature,
  getEnterprise_literaturenumber
} from '../../actions/getEnterpriseLiterature';
import {
  getEnterprise_news,
  getEnterprise_newsnumber
} from '../../actions/getEnterpriseNews';
import {
  getEnterprise_patent,
  getEnterprise_patentnumber
} from '../../actions/getEnterprisePatent';
import {
  getEnterprise_recruit,
  getEnterprise_recruitnumber
} from '../../actions/getEnterpriseRecruit';
import { getRelationship } from '../../actions/getEnterpriseInfo';
import { getEnterprise_copyright } from '../../actions/getEnterpriseWorkCopyright';
import { List, Menu, Pagination, Icon, Row, Col } from 'antd';
import Radar from '../../components/echarts/radar.js';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import Logo from '../../images/logo.jpg';


@connect(state => ({
  home: state.home
}))
export default class Company extends React.Component {//搜索结果页面
  constructor() {
    super();
    this.state = {
      enterprise_search_data: [],//数据
      total: 0,//页数
      config: "",//参数
      placeholder: '请输入企业名,进行搜索',
      display: 'block',
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
      list4: ['制造业', '信息传输、软件和信息技术服务业'],
      current2: '请输入公司名',
      current5: '',
      current4: '',
      datakey: 'companyName',//当前被选中的标签
      inputkey: '',//当前搜索框中的值
      current3: 'patent',//当前选中的公司信息
      allinfo_data: [],
      companyName: ""//公司名
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
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({
        display: value === '请输入公司名' ? 'block' : 'none',//大类中是否显现子类搜索
        display2: value === '请输入公司区域' ? 'block' : 'none',//大类中是否显现子类搜索
        display3: value === '请输入行业关键字' ? 'block' : 'none',//大类中是否显现子类搜索
      });
      this.setState({
        current: value,//改变目前的current指向
        placeholder: value,//搜索框的提示
        datakey: datakey,//当前被选中的标签
        inputValue: ''
      });
    }
  }
  handleClickSearchType2 = (item) => {//子类搜索
    let value = item.target.getAttribute('value');
    let datakey = item.target.getAttribute('data-key');
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({
        display: value === '请输入公司名' ? 'block' : 'none',//大类中是否显现子类搜索
        display2: value === '请输入公司区域' ? 'block' : 'none',//大类中是否显现子类搜索
        display3: value === '请输入行业关键字' ? 'block' : 'none',//大类中是否显现子类搜索
      });
    }
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({
        current2: value,
        placeholder: value,
        datakey: datakey
      });
    }
  }
  handleClickSearchArea = (item) => {//子类搜索
    let value = item.target.getAttribute('value');
    this.context.router.push(`/result?city=${value}`);
    let config = {}//要传入到接口的参数
    config['city'] = value;//将tpye以变量的方式存进config对象中
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({//更新config
        config: config
      });
    }
    this.setState({
      current5: value,
    });
    this.fetch(config);//获取页数
    this.getEnterpriseData(1, config);//获取公司数据
  }
  handleClickSearchIndustry = (item) => {//子类搜索
    let value = item.target.getAttribute('value');
    this.context.router.push(`/result?industry=${value}`);
    let config = {}//要传入到接口的参数
    config['industry'] = value;//将tpye以变量的方式存进config对象中
    if (this.mounted) {//判断组件是否装载完毕
      this.setState({//更新config
        config: config
      });
    }
    this.setState({
      current4: value,
    });
    this.fetch(config);//获取页数
    this.getEnterpriseData(1, config);//获取公司数据
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
  handleKeyDown = (e) => {//键盘Enter事件
    if (e.keyCode === 13) { //主要区别就是这里，可以直接获取到keyCode的值
      this.handleClickSearchBtn()
    }
  }
  handleClickCompanyMessge = (e) => {//点击查看公司的科技文献等
    this.setState({
      current3: e.key,//更新当前选中的公司信息(科技文献or软件著作权)
    });
    this.fetch(e.key);//获取页数
    this.getALLInfo(1, e.key, this.state.config);//调用获取参数
  }
  getALLInfo = (page = 1, key, config = {}) => {
    config.start = page;
    config.rows = 5;//数量为10个
    //console.log(config)
    if (key === 'copyright') {//请求著作权
      this.props.dispatch(getEnterprise_copyright(toQuery(config))).then(() => {
        let data = this.props.home.EnCopyrightData.data;
        if (this.mounted) {//判断组件是否装载完毕
          this.setState({
            allinfo_data: data
          });
        }
      });
    }
    if (key === 'literature') {//请求文献
      this.props.dispatch(getEnterprise_literature(toQuery(config))).then(() => {
        let data = this.props.home.EnLiteratureData.data;
        if (this.mounted) {//判断组件是否装载完毕
          this.setState({
            allinfo_data: data
          });
        }
      });
    }
    if (key === 'patent') {//请求专利
      this.props.dispatch(getEnterprise_patent(toQuery(config))).then(() => {
        let data = this.props.home.EnPatentData.data;
        if (this.mounted) {//判断组件是否装载完毕
          this.setState({
            allinfo_data: data
          });
        }
      });
    }
    if (key === 'news') {//请求新闻
      this.props.dispatch(getEnterprise_news(toQuery(config))).then(() => {
        let data = this.props.home.EnNewsData.data;
        if (this.mounted) {//判断组件是否装载完毕
          this.setState({
            allinfo_data: data
          });
        }
      });
    }
    if (key === 'recruit') {//请求招聘
      this.props.dispatch(getEnterprise_recruit(toQuery(config))).then(() => {
        let data = this.props.home.EnRecruitData.data;
        if (this.mounted) {//判断组件是否装载完毕
          this.setState({
            allinfo_data: data
          });
        }
      });
    }
  }
  relationship = () => {
    var myChart = echarts.init(document.getElementById('relationship'));
    let config = {
      companyName: localStorage.companyName
    }
    let secondarray = []
    let thirdarray = []
    var nodes = []
    this.props.dispatch(getRelationship(toQuery(config))).then(() => {
      let data = this.props.home.EnRelationshipData.data;
      for (var i in data) {
        secondarray.push(i)
        for (var j in data[i]) {
          thirdarray.push(data[i][j])
        }
      }
      var webkitDep = {
        "type": "force",
        "categories": [
          {
            "name": "当前公司",
            "base": "当前公司"
          },
          {
            "name": "当前公司2",
            "base": "当前公司2"
          },
          {
            "name": "当前公司3",
            "base": "当前公司3"
          }
        ],
      };
      nodes[0] = {
        name: localStorage.companyName,
        category: 0
      }
      let length = thirdarray.length;
      for (var i = 0; i < secondarray.length; i++) {
        nodes[i + 1] = {
          name: secondarray[i],
          category: 1,
        }
      }
      var index = secondarray.length + 1;
      for (var i = 0; i < thirdarray.length; i++) {
        nodes[i + index] = {
          name: thirdarray[i],
          category: 2
        }
      }
      var links = []
      for (var i = 0; i < secondarray.length; i++) {
        links[i] = {
          source: 0,
          target: i + 1
        }
      }
      index = secondarray.length;
      for (var i = 0; i < thirdarray.length; i++) {
        for (var j = 0; j < secondarray.length; j++) {
          links[index + i] = {
            source: j + 1,
            target: i + 1 + index
          }
        }
      }
      var option = {
        title: { text: '投资图谱' },
        legend: {
          data: ['当前公司'],//此处的数据必须和关系网类别中name相对应
          left: 'right'
        },
        series: [{
          type: 'graph',
          layout: 'force',
          animation: false,
          label: {
            normal: {
              show: true,
              position: 'right'
            }
          },
          edgeSymbolSize: 10,
          edgeSymbol: ['none', 'arrow'],
          symbolSize: 25,
          draggable: true,
          data: nodes.map(function (node, idx) {
            node.id = idx;
            return node;
          }),
          categories: webkitDep.categories,
          force: {
            edgeLength: 150,
            repulsion: 100,
          },
          edges: links
        }]
      };
      myChart.setOption(option);
    })
  }
  componentDidMount() {
    //初始化调用
    this.getUrl();
    let url = this.props.location.search;//获得目前路由的后缀，比如，?companyName=小米
    url = decodeURIComponent(url);//解码
    let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
    let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
    let config = {}//要传入到接口的参数
    config[type] = inputvalue;//将tpye以变量的方式存进config对象中
    this.getALLInfo(1, 'patent', config);
    this.fetch('patent');
    //组件装载后时候，注册keypress事件
    document.addEventListener('keypress', this.handleKeyDown);
    localStorage.companyName = inputvalue;
    this.relationship();
  }
  componentWillUnmount() {
    //组件卸载时候，注销keypress事件
    document.removeEventListener("keypress", this.handleKeyDown);
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }
  componentWillMount() {//装载完毕
    this.mounted = true;
  }
  getUrl = () => {//获取当前浏览器路由
    let url = this.props.location.search;//获得目前路由的后缀，比如，?companyName=小米
    url = decodeURIComponent(url);//解码
    let type = url.substring(1, url.indexOf("="));//获得查询条件，比如，companyName
    let inputvalue = url.substring(url.indexOf("=") + 1);//输入的查询值，比如，小米
    let config = {}//要传入到接口的参数
    config[type] = inputvalue;//将tpye以变量的方式存进config对象中

    if (this.mounted) {//判断组件是否装载完毕
      this.setState({//更新config
        config: config
      });
    }
    // this.fetch(config);//获取页数
    this.getEnterpriseData(1, config);//获取公司数据
  }
  getEnterpriseData = (page = 1, config) => {//获取公司数据
    config.start = page;//第几页
    config.rows = 5;//数量为10个
    this.props.dispatch(getEnterprise_search(toQuery(config))).then(() => {
      let data = this.props.home.EnSearchData.data[0];
      if (this.mounted) {//判断组件是否装载完毕
        this.setState({
          enterprise_search_data: data
        });
      }
    });
  };
  onChange = (pageNumber) => {//监听当前分页，点击后回调
    this.getALLInfo(pageNumber, this.state.current3, this.state.config);//改变后获取调用获取公司信息函数
  }
  fetch = (current3) => {//获取页数
    let config = this.state.config;
    if (current3 === 'literature') {
      this.props.dispatch(getEnterprise_literaturenumber(toQuery(config))).then(() => {
        let data = this.props.home.EnLiteratureNumberData.data;
        if (this.mounted)//判断组件是否装载完毕
          this.setState({
            total: data
          });
      });
    }
    if (current3 === 'patent') {
      this.props.dispatch(getEnterprise_patentnumber(toQuery(config))).then(() => {
        let data = this.props.home.EnPatentNumberData.data;
        if (this.mounted)//判断组件是否装载完毕
          this.setState({
            total: data
          });
      });
    }
    if (current3 === 'news') {
      this.props.dispatch(getEnterprise_newsnumber(toQuery(config))).then(() => {
        let data = this.props.home.EnNewsNumberData.data;
        if (this.mounted)//判断组件是否装载完毕
          this.setState({
            total: data
          });
      });
    }
    if (current3 === 'recruit') {
      this.props.dispatch(getEnterprise_recruitnumber(toQuery(config))).then(() => {
        let data = this.props.home.EnRecruitNumberData.data;
        if (this.mounted)//判断组件是否装载完毕
          this.setState({
            total: data
          });
      });
    }
    if (current3 === 'copyright') {
      if (this.mounted)//判断组件是否装载完毕
        this.setState({
          total: 0
        });
    }
  };

  render() {
    const current3 = this.state.current3;//判断目前是在哪一块
    const Info = () => {
      if (current3 === 'literature') {
        return (
          <div className="left_body">{/*左边下半部分*/}
            <List
              itemLayout="horizontal"
              bordered='true'
              dataSource={this.state.allinfo_data}
              // pagination= 
              renderItem={item => (

                <List.Item>
                  <List.Item.Meta
                    title={item.document_name} />
                  {item.author} - 《{item.source}》
           </List.Item>
              )}
            />
            <Pagination
              showQuickJumper
              onChange={this.onChange}//监听改变，回调函数
              defaultCurrent={1}//默认在第一页
              total={this.state.total}//总条数
            />
          </div>
        );
      }
      else if (current3 === 'copyright') {
        return (
          <div className="left_body">{/*左边下半部分*/}
            <List
              itemLayout="horizontal"
              bordered='true'
              dataSource={this.state.allinfo_data}
              // pagination= 
              renderItem={item => (

                <List.Item>
                  <List.Item.Meta
                    title={item.workName}
                  />
                  申请时间: {item.firstPublishedDate}
                </List.Item>
              )}
            />
            <Pagination
              showQuickJumper
              onChange={this.onChange}//监听改变，回调函数
              defaultCurrent={1}//默认在第一页
              total={this.state.total}//总条数
            />
          </div>
        );
      }
      else if (current3 === 'patent') {
        return (
          <div className="left_body">{/*左边下半部分*/}
            <List
              itemLayout="horizontal"
              bordered='true'
              dataSource={this.state.allinfo_data}
              // pagination= 
              renderItem={item => (

                <List.Item>
                  <List.Item.Meta
                    title={item.patent_name}
                  />
                  专利号：{item.appli_num}
                </List.Item>
              )}
            />
            <Pagination
              showQuickJumper
              onChange={this.onChange}//监听改变，回调函数
              defaultCurrent={1}//默认在第一页
              total={this.state.total}//总条数
            />
          </div>
        );
      }
      else if (current3 === 'news') {
        return (
          <div className="left_body">{/*左边下半部分*/}
            <List
              itemLayout="horizontal"
              bordered='true'
              dataSource={this.state.allinfo_data}
              // pagination= 
              renderItem={item => (

                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                  />
                  来源：{item.source}

                </List.Item>
              )}
            />
            <Pagination
              showQuickJumper
              onChange={this.onChange}//监听改变，回调函数
              defaultCurrent={1}//默认在第一页
              total={this.state.total}//总条数
            />
          </div>
        );
      }
      else if (current3 === 'recruit') {
        return (
          <div className="left_body">{/*左边下半部分*/}
            <List
              itemLayout="horizontal"
              bordered='true'
              dataSource={this.state.allinfo_data}
              // pagination= 
              renderItem={item => (

                <List.Item>
                  <List.Item.Meta
                    title={item.position}
                  />
                  <div style={{ float: 'left' }}>
                    <span style={{ marginRight: '15px' }}>要求：{item.require}</span>
                    <span style={{ marginRight: '15px' }}>薪水：{item.salary}</span>
                    {/* <span style={{marginRight: '15px'}}>发布时间：{item.hiring_time}</span> */}
                  </div>
                </List.Item>
              )}
            />
            <Pagination
              showQuickJumper
              onChange={this.onChange}//监听改变，回调函数
              defaultCurrent={1}//默认在第一页
              total={this.state.total}//总条数
            />
          </div>
        );
      }
    }
    return (
      <div className="container-fluid" style={{ minHeight: '800px' }}>

        <div className="search_form2" /*style={{ padding: '20px 50px'}}*/>


          <div className="top_hd">

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
                {this.state.list2.map(//通过读取list二重列表生成搜索的第二层
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
                      className={this.state.current5 === item ? 'active' : ''}
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
            </div>

          </div>

          <div>
            <Row>
              <Col span={12}>{/* 页面左边 */}
                <div className="company_top_left">{/*左边上半部分*/}
                  <div className="company_infos">
                    <em className="f_img">{this.state.enterprise_search_data.companyName}</em>
                    <span className="blo">公司名：{this.state.enterprise_search_data.companyName}</span>
                    <span className="blo">法人：{this.state.enterprise_search_data.legalPerson}</span>
                    <span className="blo">领域：{this.state.enterprise_search_data.industry}</span>
                    <span className="blo">公司地址：{this.state.enterprise_search_data.address}</span>
                  </div>
                </div>
                <div className="left_header">{/*左边下半部分*/}
                  <Menu
                    onClick={this.handleClickCompanyMessge}
                    selectedKeys={[this.state.current3]}
                    mode="horizontal">
                    <Menu.Item key="patent">
                      <Icon type="book" />
                      专利
          </Menu.Item>
                    <Menu.Item key="literature">
                      <Icon type="switcher" />
                      科技文献
          </Menu.Item>
                    <Menu.Item key="copyright">
                      <Icon type="edit" />
                      软件著作权
          </Menu.Item>
                    <Menu.Item key="news">
                      <Icon type="message" />
                      新闻
          </Menu.Item>
                    <Menu.Item key="recruit">
                      <Icon type="usergroup-add" />
                      招聘
          </Menu.Item>
                    <Menu.Item key="bid">
                      <Icon type="trademark" />
                      招投标
          </Menu.Item>
                  </Menu>
                </div>
                {Info()}
              </Col>
              <Col span={12}>{/* 页面右边 */}
                <div>
                  <Radar />
                  <div id="relationship" style={{ width: '100%', height: 300 }}></div>
                </div>
              </Col>
            </Row>
          </div>

        </div>
      </div>
    )
  }
}
