import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import { getEnterprise_literaturetypenumber } from '../../actions/getEnterpriseLiterature';

import { connect } from 'react-redux';
import { toQuery } from "../../untils/utils";//封装的请求函数

@connect(state => ({
    home: state.home
}))
export default class LiteraturePie extends React.Component {
    constructor() {
        super();
        this.state = {
            literaturetypenumber_data: [],
            liteatureKey: []
        }
    }
    get_LiteraturePieData = () => {
        let config = {};
        config['keyword']=localStorage.literatureName;

        this.props.dispatch(getEnterprise_literaturetypenumber(toQuery(config))).then(() => {
            let data = this.props.home.EnLiteratureTypeNumberData.data;
            let key = [];
            let namevalue = [];
            for(let item in data){
                key.push(item);
            }
            //console.log(key)
            for(let item in data){
                let jsondata = {}
                jsondata.name = item;
                jsondata.value = data[item];
                namevalue.push(jsondata);
            }
            this.LiteraturePie(key,namevalue);
        });
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

    LiteraturePie = (key,namevalue) =>{
        var myChart = echarts.init(document.getElementById('literaturepie'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: key
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
                    data: namevalue
                }
            ]   
        });
    }
    componentDidMount() {
        // 初始化
        this.get_LiteraturePieData();
    }
    render() {
        return (
            <div>
                <div id="literaturepie" style={{ width: '100%', height: 300 }}></div>
            </div>
        );
    }
}
