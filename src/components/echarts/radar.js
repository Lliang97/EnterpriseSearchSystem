import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';


export default class Radar extends React.Component {
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
    initRader = () => {
        const opinionNum = [];
        let maxValue;
        this.convert(maxValue, opinionNum);
        let myChart = echarts.init(this.refs.radar);
        let option = this.setPieOption(maxValue, opinionNum);
        myChart.setOption(option);
        window.onresize = myChart.resize;
    }
    convert(maxValue,opinionNum){//数据处理
        const literaturedata=this.props.literaturedata;
        const copyrightdata=this.props.copyrightdata;
        const patentdata=this.props.patentdata;
        const newsdata=this.props.newsdata;
        const recruitdata=this.props.recruitdata;
        const biddata=this.props.biddata;
        opinionNum.push(literaturedata,copyrightdata,patentdata,newsdata,recruitdata,biddata);
        maxValue = Math.max(...opinionNum);
    }
    setPieOption = (maxValue, opinionNum) => {
        return {
            title: {
                text: '创新能力数据'
            },
            tooltip: {},
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 2,
                        padding: [3, 5]
                   }
                },
                indicator: [
                   { name: '科技文献', max: opinionNum[0] + 20},
                   { name: '软件著作权', max: opinionNum[1] + 20},
                   { name: '专利', max: opinionNum[2] + 20},
                   { name: '新闻', max: opinionNum[3] + 20},
                   { name: '招聘', max: opinionNum[4] + 20},
                   { name: '招投标',max: opinionNum[5] + 20}
                ]
            },
            series: [{
                name: '创新能力数据',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : opinionNum,
                        name : '创新能力数据'
                    }
                ]
            }]
        }
    };
    componentDidUpdate(){
		echarts.dispose(this.refs.radar);
		this.initRader();
	}
    componentDidMount() {
        this.initRader();
        // 初始化
    }
    render() {
        return (
            <div ref="radar" style={{ width: '100%', height: 250 }}></div>
        );
    }
}
