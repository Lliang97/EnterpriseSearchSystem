import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';


export default class CopyrightPie extends React.Component {
  componentDidMount() {
    // 初始化
    var myChart = echarts.init(document.getElementById('patentpie'));
    // 绘制图表
    myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['工程设计图','建筑','文字','其他']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
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
                data:[
                    {value:10, name:'工程设计图'},
                    {value:1, name:'建筑'},
                    {value:3, name:'文字'},
                    {value:3, name:'其他'},
                ]
            }
        ]
    });
    }
    render() {
        return (
            <div id="patentpie" style={{ width: '100%', height: 300 }}></div>
        );
    }
}
