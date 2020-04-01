import React from 'react';
import 'antd/dist/antd.css';
import './AdminUser.scss';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Form,
  Modal,
  message,
  Radio
} from 'antd';
import { Input } from 'antd';
import {
  getEnterprise_user,
  insert_newuser,
  get_alluser,
  delete_user
} from "../../../actions/enterprise_admin.js";
import { toQuery,encodePS } from '../../../untils/utils';
const FormItem = Form.Item;
@connect(state => ({
  home:state.home
}))

export default class AdminUser extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor() {
    super();
    this.state = {
      visible: false,
      visible2: false,
      key1: '1',
      key2: '2',
      isCreate: false,
      usernum:"",
      idEd:"",
      usernameEd:"",
      realnameEd:"",
      pwordEd:"",
      phoneEd:"",
      emailEd:"",
      alluser:[]
    }
  };
  createUser() {
    this.setState({
      visible: true,
    })
  }
  handleCancel = () =>{
    this.setState({
      visible: false,
    });
  }
  getusernum = () => {
    this.props.dispatch(getEnterprise_user(toQuery())).then(() => {
      let data = this.props.home.usernum.data;
      if (this.mounted) {//判断组件是否装载完毕
        this.setState({
          usernum: data
        });
      }
    });
  }
  get_alluser = () => {
    this.props.dispatch(get_alluser(toQuery())).then(() => {
      let data = this.props.home.alluser.data;
      this.setState({
        alluser:data
      })
    })
  }
  insertnewuser = () => {
    this.props.form.validateFields(['usernameEd','realnameEd','pwordEd','phoneEd','emailEd'],(error,values) =>{
      if(!!error){
        message.warning("请确认填写无误!")
      }
      let config = {}
      if(values.usernameEd!=""&&values.realnameEd!=""&&values.pwordEd!=""&&phoneEd!=""&&emailEd!=""){
        config["username"] = values.usernameEd;
        config["realname"] = values.realnameEd;
        config["password"] = encodePS(values.pwordEd);
        config["phone"] = values.phoneEd;
        config["mailbox"] = values.emailEd;
        config["roleId"] = 1
        this.props.dispatch(insert_newuser(config)).then(() => {
          let data = this.props.home.insert_user_code;
          if(this.props.home.insert_user_code === 'success'){
            message.success("新建用户成功");
            this.handleCancel();
            this.get_alluser();
          }
        })
      }
    })
  }
  handleClick3 = (record) => {
    this.deleteuser(record.id);
  }
  deleteuser = (id) => {
    let config = {
      id:id
    }
    this.props.dispatch(delete_user(toQuery(config))).then(() => {
      if(this.props.home.deleteusercode === 'success'){
        message.success("删除成功");
        this.get_alluser();
      }
    })
  }
  componentDidMount() {
    this.getusernum()
    this.get_alluser()
  }
  componentWillUnmount() {
    //组件卸载时候，注销keypress事件
    // document.removeEventListener("keypress", this.handleKeyDown);
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }
  componentWillMount() {//装载完毕
    this.mounted = true;
  }
  render() {
    const {
      getFieldDecorator
  } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 12
      },
    };
    const Molumns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: text => <p style={{ color: "black" }}>{text}</p>
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: text => <p style={{ color: "black" }}>{text}</p>
    },
    {
      title: '真名',
      dataIndex: 'realname',
      key: 'realname',
      render: text => <p style={{ color: "black" }}>{text}</p>
    }, {
      title: 'email',
      dataIndex: 'mailbox',
      key: 'mailbox',
      render: text => <p style={{ color: "black" }}>{text}</p>
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      render: text => <p style={{ color: "black" }}>{text}</p>
    }, {
      title: "删除",
      dataIndex: "delete",
      key: "delete",
      render:(text,record) => {
          return(
              <div className="del_user">
                <Button 
                    type="primary"
                    shape="circle"
                    icon="delete"
                    onClick={this.handleClick3.bind(this, record)}
                    style={{ 'marginLeft': '5px' }}
                />
              </div>
          )
      }
  },]
    return (
      <div>
        <div className="data_button">
          <Button type="primary" icon="plus-circle-o" onClick={this.createUser.bind(this)}>新建用户</Button>
          <span className="message">您是机构用户，可以新建<span className="message_number">20</span>个普通用户，现已新建<span className="message_number">{this.state.usernum}</span>个，还可以新建<span className="message_number">{20-this.state.usernum}</span>个</span>
        </div>
        <div>
          <Table
            columns={Molumns}
            dataSource={this.state.alluser}
            size="middle"
            rowKey={record => record.username}
          />
          <Modal
            title="新建普通用户"
            visible={this.state.visible}
            onOk={this.insertnewuser}
            onCancel={this.handleCancel}
            okText="新建"
            cancelText="取消"
            key={this.state.key1}
            
          >
            <Form >
              <FormItem {...formItemLayout} label="用户名" hasFeedback>
                {getFieldDecorator('usernameEd', {
                  rules: [{
                    required: true,
                    message: '用户名不能为空'
                  }, {
                    min: 3,
                    message: '用户名不少于3个字符'
                  }, {
                    max: 15,
                    message: '用户名不多于15个字符'
                  }],
                })(<Input placeholder="请输入您的用户名" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="真实姓名" hasFeedback>
                {getFieldDecorator('realnameEd', {
                  rules: [{
                    required: true,
                    message: '真实姓名不能为空',
                  }, {
                    min: 2,
                    message: '真实姓名至少为2位',
                  }, {
                    max: 10,
                    message: '真实姓名至多为10位'
                  }],
                })(<Input placeholder="请输入您的真实姓名" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="密码" hasFeedback>
                {getFieldDecorator('pwordEd', {
                  rules: [{
                    required: true,
                    message: '密码不能为空',
                  }, {
                    min: 3,
                    message: '密码至少为3位',
                  }, {
                    max: 11,
                    message: '密码至多为11位'
                  }, {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
                    message: '密码必须由3-11位数字、字母组合'
                  }],
                })(<Input type="password" placeholder="请输入您的密码" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="联系方式" hasFeedback>
                {getFieldDecorator('phoneEd', {
                  rules: [{
                    required: true,
                    message: '联系方式不能为空',
                  }],
                })(<Input placeholder="请输入您的联系方式" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="电子邮件" hasFeedback>
                {getFieldDecorator('emailEd', {
                  rules: [{
                    required: true,
                    message: '电子邮件不能为空',
                  }, {
                    pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
                    message: '请输入有效的电子邮件地址'
                  }],
                })(<Input placeholder="请输入您的电子邮件地址" />)}
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}
AdminUser = Form.create()(AdminUser);