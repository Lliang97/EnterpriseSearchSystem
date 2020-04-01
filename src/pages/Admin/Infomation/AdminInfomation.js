import React from "react";
import 'antd/dist/antd.css';
import './AdminInfomation.scss';
import { connect } from "react-redux";
import {
  getEnterprise_adinfo, getEnterprise_adinfodata
} from '../../../actions/enterprise_adinfo'
import {
  Table,
  Input,
  Button,
  Form,
  Select,
  message,
  Modal,
  List
} from "antd";
import { Link } from "react-router";
import { toQuery } from "../../../untils/utils";
const Option = Select.Option;
const data = [
  {
    title: '工商信息修改',
  },
  {
    title: '专利修改',
  },
  {
    title: '著作权修改',
  },
  {
    title: '文献修改',
  },
  {
    title: '新闻修改',
  },
];
@connect(state => ({
  home: state.home
}))
export default class AdminInformation extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor() {
    super();
    this.state = {
      total: "",
      pagination: {},
      entadinfodata: [],
      inputcompanyname: '',
      selectcity: '',
      paperconfig: {},
      // visible: false,
    };
  }
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };
  // handleOk = e => {
  //   this.setState({
  //     visible: false,
  //   });
  // };
  // handleCancel = e => {
  //   this.setState({
  //     visible: false,
  //   });
  // };
  handleTableChange = (pagination) => {
    const paper = { ...this.state.pagination };
    paper.current = pagination.current;
    this.setState({
      pagination: paper,
    });
    let page = paper.current
    this.getPage(page, this.state.paperconfig);
  }
  getPage = (page = 1, config = {}) => {
    config.start = page;
    config.rows = 10;
    this.props.dispatch(getEnterprise_adinfodata(toQuery(config))).then(() => {
      let data = this.props.home.Entadinfodata.data;
      let all = data.map((item, index) => {
        item.number = index + 1;
        return item;
      })
      this.setState({
        entadinfodata: all
      })
    })
  }
  fetch = (params = {}, config) => {
    this.props.dispatch(getEnterprise_adinfo(toQuery(config))).then(() => {
      let data = this.props.home.Entadinfototal.data;
      if (data == 0) {
        message.warning("未获取到信息")
      }
      const pagination = { ...this.state.pagination };
      pagination.total = data;
      this.setState({
        pagination,
      })
    })
  }
  //查询
  handleTitle = (e) => {
    if (e.target.value != "") {
      this.setState({
        inputcompanyname: e.target.value,
      })
    }
    else {
      this.setState({
        inputcompanyname: ''
      })
    }
  }
  handleSense2 = (e) => {
    if (e == 2) {
      this.setState({
        selectcity: '',
        paperconfig: {}
      })
    }
    else if (e == 0) {
      this.setState({
        selectcity: "成都市",
      })
    }
    else if (e == 1) {
      this.setState({
        selectcity: "遂宁市",
      })
    }
    else if (e == 3) {
      this.setState({
        selectcity: "德阳市",
      })
    }
    else if (e == 4) {
      this.setState({
        selectcity: "广元市",
      })
    }
    else if (e == 5) {
      this.setState({
        selectcity: "巴中市",
      })
    }
    else if (e == 6) {
      this.setState({
        selectcity: "南充市",
      })
    }
    else if (e == 7) {
      this.setState({
        selectcity: "达州市",
      })
    }
    else if (e == 8) {
      this.setState({
        selectcity: "广安市",
      })
    }
    else if (e == 9) {
      this.setState({
        selectcity: "资阳市",
      })
    }
    else if (e == 10) {
      this.setState({
        selectcity: "眉山市",
      })
    }
    else if (e == 11) {
      this.setState({
        selectcity: "内江市",
      })
    }
    else if (e == 12) {
      this.setState({
        selectcity: "乐山市",
      })
    }
    else if (e == 13) {
      this.setState({
        selectcity: "自贡市",
      })
    }
    else if (e == 14) {
      this.setState({
        selectcity: "宜宾市",
      })
    }
    else if (e == 15) {
      this.setState({
        selectcity: "泸州市",
      })
    }
    else if (e == 16) {
      this.setState({
        selectcity: "雅安市",
      })
    }
    else if (e == 17) {
      this.setState({
        selectcity: "绵阳市",
      })
    }
    else if (e == 18) {
      this.setState({
        selectcity: "攀枝花市",
      })
    }
    else if (e == 19) {
      this.setState({
        selectcity: "凉山彝族自治州",
      })
    }
    else if (e == 20) {
      this.setState({
        selectcity: "甘孜藏族自治州",
      })
    }
    else if (e == 21) {
      this.setState({
        selectcity: "阿坝藏族羌族自治州",
      })
    }
  }
  handlesearch = () => {
    if (!!this.state.inputcompanyname) {
      this.state.paperconfig.companyName = this.state.inputcompanyname;
    }
    if (this.state.selectcity == "成都市" || this.state.selectcity == "遂宁市"
      || this.state.selectcity == "德阳市" || this.state.selectcity == "广元市"
      || this.state.selectcity == "巴中市" || this.state.selectcity == "南充市"
      || this.state.selectcity == "达州市" || this.state.selectcity == "广安市"
      || this.state.selectcity == "资阳市" || this.state.selectcity == "眉山市"
      || this.state.selectcity == "内江市" || this.state.selectcity == "乐山市"
      || this.state.selectcity == "自贡市" || this.state.selectcity == "宜宾市"
      || this.state.selectcity == "泸州市" || this.state.selectcity == "雅安市"
      || this.state.selectcity == "绵阳市" || this.state.selectcity == "攀枝花市"
      || this.state.selectcity == "凉山彝族自治州" || this.state.selectcity == "甘孜藏族自治州"
      || this.state.selectcity == "阿坝藏族羌族自治州") {
      this.state.paperconfig.city = this.state.selectcity
    }
    this.fetch({}, this.state.paperconfig)
    this.getPage(1, this.state.paperconfig)
  }
  componentDidMount() {
    this.fetch()
    this.getPage()
  }
  render() {
    const Columns = [
      {
        title: "序号",
        dataIndex: "number",
        key: "number",
        width: "5%",
        render: text => <p style={{ color: "black" }}>{text}</p>
      },
      {
        title: "公司名",
        dataIndex: "companyName",
        key: "companyName",
        width: "20%",
        render: text => <p style={{ color: "black" }}>{text}</p>
      },
      {
        title: "法人",
        dataIndex: "legalPerson",
        key: "legalPerson",
        width: "10%",
        render: text => <p style={{ color: "black" }}>{text}</p>
      },
      {
        title: "公司类型",
        dataIndex: "companyType",
        key: "companyType",
        width: "24%",
        render: text => <p style={{ color: "black" }}>{text}</p>
      },
      {
        title: "所属行业",
        dataIndex: "industry",
        key: "industry",
        width: "18%",
        render: text => <p style={{ color: "black" }}>{text}</p>
      },
      {
        title: "所属城市",
        dataIndex: "city",
        key: "city",
        width: "18%",
        render: text => <p style={{ color: "black" }}>{text}</p>
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        width: "5%",
        render: (text, record) => {
          let companyName = record.companyName
          let url=`admin/reset?companyName=${companyName}`
          return (
            <div>
              <Link to={url}>
                <Button
                  type="primary"
                  shape="circle"
                  icon="edit"
                />
              </Link>
            </div>
          );
        }
      }
    ];
    return (
      <div className="all">
        <div className="dataselect">
          <span><Input type="text" placeholder="公司名称" className="antinput" onChange={this.handleTitle} /></span>
          <span style={{ marginRight: "1%" }}>
            <Select styleName="select" defaultValue="2" onChange={this.handleSense2} style={{ width: "100px" }}>
              <Option value="2">全部城市</Option>
              <Option value="0">成都市</Option>
              <Option value="1">遂宁市</Option>
              <Option value="3">德阳市</Option>
              <Option value="4">广元市</Option>
              <Option value="5">巴中市</Option>
              <Option value="6">南充市</Option>
              <Option value="7">达州市</Option>
              <Option value="8">广安市</Option>
              <Option value="9">资阳市</Option>
              <Option value="10">眉山市</Option>
              <Option value="11">内江市</Option>
              <Option value="12">乐山市</Option>
              <Option value="13">自贡市</Option>
              <Option value="14">宜宾市</Option>
              <Option value="15">泸州市</Option>
              <Option value="16">雅安市</Option>
              <Option value="17">绵阳市</Option>
              <Option value="18">攀枝花市</Option>
              <Option value="19">凉山彝族自治州</Option>
              <Option value="20">甘孜藏族自治州</Option>
              <Option value="21">阿坝藏族羌族自治州</Option>
            </Select>
          </span>
          <span><Button className="ant-btn ant-btn-primary" onClick={this.handlesearch}>查询</Button></span>
        </div>
        <div className="admin-table">
          <Table
            columns={Columns}
            pagination={this.state.pagination}
            dataSource={this.state.entadinfodata}
            rowKey={record => record.companyName}
            onChange={this.handleTableChange}
            size="middle"
          />
        </div>
        {/* <div className="admin-list">
        <Modal
          title="信息管理"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <Link to={}>
              <List.Item
                actions={[<a key="list-loadmore-edit">edit</a>]}>
                <List.Item.Meta
                  title={<p >{item.title}</p>}
                />
              </List.Item>
              </Link>
            )}
          />,
        </Modal>
        </div> */}
      </div>
    );
  }
}
AdminInformation = Form.create()(AdminInformation);