import React from 'react';
import echarts from "echarts"; //必须
// require("echarts/lib/chart/bar");
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title")
//require("echarts-wordcloud");

// require("../../resources/echarts-wordcloud.min.js");
require("../../resources/echarts-wordcloud.js")
// require("echarts-wordcloud/dist/echarts-wordcloud.min.js")
export default class CompanyPatentWorldCloud extends React.Component {
    constructor() {
        super();
    }
    initWorCloud = () => {
        const topicName = [], opinionNum = [];
        // this.convert(topicName,opinionNum);
        const data = this.props.wordclouddata;
        let myChart = echarts.init(this.refs.CompanyPatentWorldCloud);
        let option = this.setPieOption(data);

        if(option && typeof option === 'object'){
            myChart.setOption(option,true);
        }
        window.onresize = myChart.resize;
    }
    setPieOption = (data) => {
        return {
            title: {
                text: '词云',
                left: "left"
            },
            // backgroundColor: '#F7F7F7',
            tooltip: {
                show: true
            },
            series: [{
                name: '词云',
                type: 'wordCloud',
                sizeRange: [12, 66],
                rotationRange: [-45, 90],
                shape: 'pentagone',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: data,
            }],
        };
    };
    convert(topicName, opinionNum) {
        const data = this.props.wordclouddata;
        topicName = data
        console.log(topicName);
        // for(let item in data){
        //     topicName.push(item);
        // }
        // for(let item in data){
        //     let jsondata = {}
        //     jsondata.name = item;
        //     jsondata.value = data[item];
        //     opinionNum.push(jsondata);
        // }
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
        this.initWorCloud();
    }
    componentDidUpdate() {
        echarts.dispose(this.refs.CompanyPatentWorldCloud);
        this.initWorCloud();
    }
    render() {
        return (
            <div>
                <div ref="CompanyPatentWorldCloud" style={{ width: '100%', height: 250 }}></div>
            </div>
        );
    }
}