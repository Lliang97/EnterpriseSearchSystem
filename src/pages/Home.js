import React from 'react'
import {
  Link,
} from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>首页</h1>
        <Link to ="/search">跳转搜索</Link>
      </div>
    )
  }
}
