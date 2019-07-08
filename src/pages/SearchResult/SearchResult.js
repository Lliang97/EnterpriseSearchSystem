import React from 'react'

import './SearchResult.scss';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { List, Avatar } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

@connect(state => ({
  home: state.home
}))
export default class SearchResult extends React.Component {//搜索结果页面
  constructor() {
    super();
    this.state = {
    }
  };

  render() {
    return (
        <div><List
        itemLayout="horizontal"
        bordered='true'
        dataSource={data}
        pagination='bottom'
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      /></div>
    )
  }
}
