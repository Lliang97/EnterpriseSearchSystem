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
export default class PartnerBar extends React.Component {
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
        let myChart = echarts.init(this.refs.PartnerBar);
        let option = this.setPieOption(topicName, opinionNum);
        myChart.setOption(option);
        window.onresize = myChart.resize;
    }
    setPieOption = (topicName, opinionNum) => {
        return {
            title: {
                subtext: '股东出资总额（万元）'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                show : false,
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                data: topicName
            },
            series: [
                {
                    name: '股东出资总额',
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle:{  
                        normal:{  
                          color:'#128bed',
                          label:{
                            show: true,   //显示文本
                            position: 'right',  //数据值位置
                            textStyle: {
                                color: 'black'
                           }
                        }

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
		echarts.dispose(this.refs.PartnerBar);
		this.initPie();
	}
    render() {
        return (
            <div>
                <div ref="PartnerBar"  style={{width: "100%", height: 250   ,top: 10}}></div> 
            </div>
        );
    }
}
