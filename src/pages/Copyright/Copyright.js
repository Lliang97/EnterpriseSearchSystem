import React from 'react'
import { List, Table, Pagination, Icon, Row, Col } from 'antd';
import Radar from '../../components/echarts/radar.js';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import "antd/dist/antd.css";
import CopyrightPie from '../../components/echarts/CopyrightPie.js';
const data = [
    {
        title: '软件著作权1',
    },
    {
        title: '软件著作权2',
    },
    {
        title: '软件著作权3',
    },
    {
        title: '软件著作权4',
    },
    {
        title: '软件著作权5',
    },
    {
        title: '软件著作权6',
    },
    {
        title: '软件著作权7',
    },
];
const columns = [
    {
        title: '公司名',
        dataIndex: 'companyName',
    },
    {
        title: '软著数量',
        dataIndex: 'pantentNumber',
    },
];
const data2 = [
    {
        key: '1',
        companyName: '川开电气有限公司',
        pantentNumber: 32,
    },
    {
        key: '2',
        companyName: '东方日立(成都)电控设备有限公司',
        pantentNumber: 42,
    },
    {
        key: '3',
        companyName: '成都宝通天宇电子科技有限公司',
        pantentNumber: 20,
    },
    {
        key: '4',
        companyName: '东方电气集团东方汽轮机有限公司',
        pantentNumber: 10,
    },
    {
        key: '5',
        companyName: '西南科技大学',
        pantentNumber: 10,
    },
];

export default class Copyright extends React.Component {
    render() {
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Table columns={columns} dataSource={data2} size="middle" />
                        <CopyrightPie/>
                    </Col>
                </Row>
            </div>
        )
    }
}
