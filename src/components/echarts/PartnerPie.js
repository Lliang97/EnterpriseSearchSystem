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
export default class PartnerPie extends React.Component {
    constructor() {
        super();
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
    initPie = () => {
        const topicName = [], opinionNum = [];
        this.convert(topicName, opinionNum);
        console.log(opinionNum)
        let myChart = echarts.init(this.refs.PartnerPie);
        let option = this.setPieOption(topicName, opinionNum);
        myChart.setOption(option);
        window.onresize = myChart.resize;
    }
    setPieOption = (topicName, opinionNum) => {
        return {
            title: {
                subtext: '股东持股比列（%）',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                top: '30%',
                data: topicName
            },
            series: [
                {
                    name: '股东持股比列',
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
                                fontSize: '25',
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
        //console.log(data);
        for(let item in data){
            topicName.push(data[item].name);
        }
        for(let item in data){
            let jsondata = {}
            jsondata.name = data[item].name;
            jsondata.value = data[item].value;
            opinionNum.push(jsondata);
        }
        // console.log(opinionNum);
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
		echarts.dispose(this.refs.PartnerPie);
		this.initPie();
	}
    render() {
        return (
            <div>
                <div ref="PartnerPie"  style={{width: "100%", height: 250   ,top: 10}}></div> 
            </div>
        );
    }
}
