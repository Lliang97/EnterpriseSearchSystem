import React from 'react'
import { List, Table, Pagination, Icon, Row, Col } from 'antd';
import "antd/dist/antd.css";
import PatentPie from '../../components/echarts/PatentPie.js';
const data = [
    {
        title: '专利1',
    },
    {
        title: '专利2',
    },
    {
        title: '专利3',
    },
    {
        title: '专利4',
    },
    {
        title: '专利5',
    },
    {
        title: '专利6',
    },
    {
        title: '专利7',
    },
];
const columns = [
    {
        title: '公司名',
        dataIndex: 'companyName',
    },
    {
        title: '专利数量',
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
        companyName: '东方日立(成都)电控设备有限公司',
        pantentNumber: 20,
    },
    {
        key: '4',
        companyName: '东方日立(成都)电控设备有限公司',
        pantentNumber: 10,
    },
];

export default class Patent extends React.Component {
    constructor() {
        super();
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
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
                        <PatentPie/>
                    </Col>

                </Row>
            </div>
        )
    }
}
