import React from 'react';
import {
    Link
} from 'react-router';
import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数
import { List, Menu, Pagination, Icon, Row, Col, Breadcrumb } from 'antd';
import SearchHomeHead from '../HeadComponent/SearchHomeHead.js';
import "./Patent.scss";
import { createHashHistory } from 'history'; //做返回
const history = createHashHistory();
const data = [
    {
        title: '一种多坐标系下的三电平空间矢量调制方法',
    },
    {
        title: '一种多坐标系下的三电平空间矢量调制方法',
    },
    {
        title: '一种多坐标系下的三电平空间矢量调制方法',
    },
    {
        title: '一种多坐标系下的三电平空间矢量调制方法',
    },
    {
        title: '一种多坐标系下的三电平空间矢量调制方法',
    }
];
@connect(state => ({
    home: state.home
}))
export default class Patent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    gobackbrowser = () => {
        history.goBack();
    }
    render() {
        return (
            <div>
                <SearchHomeHead />
                <div className="container-fluid" style={{ minHeight: '600px' }}>

                    <div className="search_form2" /*style={{ padding: '20px 50px'}}*/>

                        <div>
                            <Row>
                                <Col span={16}>{/* 页面左边 */}
                                    <div className="company_top_left patent_top_left">{/*左边上半部分*/}
                                        <div className="companyjumpbar patentjumpbar">
                                            <Breadcrumb separator=">">
                                                <Breadcrumb.Item>
                                                    <Link to='/'><span>首页</span></Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={this.gobackbrowser}>
                                                    <span>知识产权</span>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <span>专利详情</span>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                    <div className="left_header">{/*左边下半部分*/}
                                        <div className="zx-content">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>专利名称</td>
                                                        <td colSpan="3">一种多坐标系下的三电平空间矢量调制方法</td>
                                                    </tr>
                                                    <tr>
                                                        <td>申请号</td>
                                                        <td>CN201110440542.7</td>
                                                        <td>申请日期</td>
                                                        <td>2011-12-26</td>
                                                    </tr>
                                                    <tr>
                                                        <td>公开号</td>
                                                        <td>CN102647101A</td>
                                                        <td>公开公告日期</td>
                                                        <td>2012-08-22</td>
                                                    </tr>
                                                    <tr>
                                                        <td>发明人</td>
                                                        <td>荣先亮</td>
                                                        <td>专利申请人</td>
                                                        <td>东方日立(成都)电控设备有限公司</td>
                                                    </tr>
                                                    <tr>
                                                        <td>专利代理人</td>
                                                        <td>-</td>
                                                        <td>专利代理机构</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>专利类型</td>
                                                        <td>发明发布</td>
                                                        <td>主分类号</td>
                                                        <td>H02M7/483</td>
                                                    </tr>
                                                    <tr>
                                                        <td>住所</td>
                                                        <td colSpan="3">610000 四川省成都市成都高新技术产业开发区西区天朗路2号</td>
                                                    </tr>
                                                    <tr>
                                                        <td>法律状态</td>
                                                        <td colSpan="3">有效</td>
                                                    </tr>
                                                    <tr>
                                                        <td>摘要</td>
                                                        <td colSpan="3">一种多坐标系下的三电平空间矢量调制方法，它涉及一种应用于中高压变频器和光伏逆变器的三电平空间矢量调制方法及其控制系统。它的系统组成为：电网接口、升压装置、带中性点的母线电容、组成三相桥臂的功率开关器件、箝位二极管、主控制系统、驱动系统和三相负载，它的具体操作步骤为：a、以一个开关周期内中性点电流的平均值为零为前提，虚拟三电平空间矢量的中矢量；b、分别计算出包括虚拟中矢量在内的基本矢量在30°、60°、90°、120°和150°坐标系中的坐标；c、根据参考电压空间矢量在各个坐标系中的特点判断其所在的扇区；它计算量小，可简单方便地实现三电平中性点电位平衡，并且适用于三电平以上的多电平空间矢量调试。
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>{/* 页面右边 */}
                                    <div ><p style={{fontSize:'18px'}}>相关专利</p></div>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={data}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                    description="东方日立(成都)电控设备有限公司"
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
