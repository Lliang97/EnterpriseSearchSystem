import React from 'react'
import {
  Link,
} from 'react-router';
import { Button } from 'antd';
import './Home.scss';
import "antd/dist/antd.css";


export default class Home extends React.Component {
  render() {
    return (
            <div >
              <div className="box_content">
                <h1>一站式为企业解决自主研发问题</h1>
                <h3>大数据汇集三千家川内企业</h3>
                <div className="btn_box">
                <Link to="/search">
                  <Button type="primary" shape="round" icon="search" size='large' className="btn_search">
                    公司搜索
                  </Button>
                </Link>
                <Link to="/search">
                  <Button type="primary" shape="round" icon="form" size='large' className="btn_release">
                    发布需求
                  </Button>
                </Link>
                </div>
              </div>
            </div>
    )
  }
}
