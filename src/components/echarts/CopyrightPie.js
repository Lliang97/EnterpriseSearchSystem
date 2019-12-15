import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数

@connect(state => ({
    home: state.home
}))
export default class CopyrightPie extends React.Component {
    constructor() {
        super();
        this.state = {
            copyrighttypenumber_data: [],
            copyrightKey: []
        }
    }
    initPie = () => {
		const topicName=[],opinionNum=[];
		this.convert(topicName,opinionNum);
		let myChart = echarts.init(this.refs.COPYRIGHTPIE);
		let option=this.setPieOption(topicName,opinionNum);
		myChart.setOption(option);
		window.onresize = myChart.resize;
    }
    setPieOption = (topicName,opinionNum) =>{
        return  {
            title: {
                text: '著作权分布'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                top: '10%',
                data: topicName
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['60%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: opinionNum
                }
            ]   
        };
    };
    convert(topicName,opinionNum){
        const data=this.props.PieData;
        for(let item in data){
            topicName.push(item);
        }
        for(let item in data){
            let jsondata = {}
            jsondata.name = item;
            jsondata.value = data[item];
            opinionNum.push(jsondata);
        }
    }
    
    componentWillUnmount() {
        //组件卸载时候，注销keypress事件
        this.mounted = false;
        this.setState = (state, callback) => {
            return;
        };
    }
    componentWillMount() {//装载完毕
        this.mounted = true;
    }

    componentDidMount() {
        // 初始化
        this.initPie();
    }
    componentDidUpdate(){
		echarts.dispose(this.refs.COPYRIGHTPIE);
		this.initPie();
	}
    render() {
        return (
            <div>
                <div ref="COPYRIGHTPIE"  style={{width: "100%", height: 400}}></div>
            </div>
        );
    }
}
