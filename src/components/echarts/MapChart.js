import React from "react";
import { connect } from "react-redux";
import { getEnterprise_city } from "../../actions/enterprise_city";
import echarts from "echarts"; 
import { toQuery } from "../../untils/utils";
import configs from "../../constants/configs";
const json = configs.json;
var $ = require("jquery");

var sichuan = `${json}sichuan.json`;
var abazangzu = `${json}abazangzu.json`;
var bazhong = `${json}bazhong.json`;
var chengdou = `${json}chengdou.json`;
var dazhou = `${json}dazhou.json`;
var deyang = `${json}deyang.json`;
var ganzizangzu = `${json}ganzizangzu.json`;
var guangan = `${json}guangan.json`;
var guangyuan = `${json}guangyuan.json`;
var leshan = `${json}leshan.json`;
var liangshan = `${json}liangshan.json`;
var luzhou = `${json}luzhou.json`;
var meishan = `${json}meishan.json`;
var mianyang = `${json}mianyang.json`;
var nanchong = `${json}nanchong.json`;
var neijiang = `${json}neijiang.json`;
var panzhihua = `${json}panzhihua.json`;
var suining = `${json}suining.json`;
var yaan = `${json}yaan.json`;
var yibing = `${json}yibing.json`;
var zigong = `${json}zigong.json`;
var ziyang = `${json}ziyang.json`;

var cityMap = {
  成都市: chengdou,
  自贡市: zigong,
  攀枝花市: panzhihua,
  泸州市: luzhou,
  绵阳市: mianyang,
  德阳市: deyang,
  广元市: guangyuan,
  遂宁市: suining,
  乐山市: leshan,
  内江市: neijiang,
  南充市: nanchong,
  眉山市: meishan,
  宜宾市: yibing,
  广安市: guangan,
  达州市: dazhou,
  雅安市: yaan,
  巴中市: bazhong,
  资阳市: ziyang,
  阿坝藏族羌族自治州: abazangzu,
  甘孜藏族自治州: ganzizangzu,
  凉山彝族自治州: liangshan
};
var geoCoordMap = {
  '成都': [103.9526, 30.7617],
}
var chart;
@connect(state => ({
  home: state.home
}))
export default class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterprise_city_data: [],
    };
  }
  sortRule = (a,b) => {
    return b.value- a.value;
  }
  mapLoad = () => {
    this.props.dispatch(getEnterprise_city(toQuery())).then(() => {
      let data = this.props.home.EntCityData.data;
      data.sort(this.sortRule)
      // console.log(data);
      chart = echarts.init(document.getElementById("map"));
      var yData = [];
      var barData = [];
      let id = 0;
      for(let i in data){
        if(data[i].name=="成都市"||data[i].name=="德阳市"
        ||data[i].name=="乐山市"||data[i].name=="宜宾市"
        ||data[i].name=="内江市"||data[i].name=="绵阳市"
        ||data[i].name=="泸州市"||data[i].name=="眉山市"
        ||data[i].name=="自贡市"||data[i].name=="南充市"){
          barData.push(data[i]);
          yData.push(id + data[i].name);
          id++;
        }
        
      }
      $.getJSON(sichuan, function(geoJson) {
        echarts.registerMap("四川", geoJson);
        let option = {
          title: [{
            show: true,
            text: '分布排名情况',
            textStyle: {
                color: '#2D3E53',
                fontSize: 18
            },
            right: 220,
            top: 80
        }],
          tooltip: {
            // trigger: "item",
            formatter: "{b}<br/>分布企业数 ：{c}(个)"
          },
          visualMap: {
            type: 'continuous',
            orient: 'horizontal',
            min: 0,
            max: 3000,
            text: ["高", "低"],
            textStyle: {
              color: '#7B93A7'
            },
            left: 'left',
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#6FCF6A', '#FFFD64', '#FF5000']
            }
          },
          grid: {
            right: 30,
            top: 135,
            bottom: 100,
            width: '20%'
          },
          xAxis: {
            show: false
          },
          yAxis: {
            type: 'category',
            inverse: true,
            nameGap: 16,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisLabel: {
                interval: 0,
                margin: 85,
                textStyle: {
                    color: '#455A74',
                    align: 'left',
                    fontSize: 14
                },
                rich: {
                    a: {
                        color: '#fff',
                        backgroundColor: '#FAAA39',
                        width: 20,
                        height: 20,
                        align: 'center',
                        borderRadius: 2
                    },
                    b: {
                        color: '#fff',
                        backgroundColor: '#4197FD',
                        width: 20,
                        height: 20,
                        align: 'center',
                        borderRadius: 2
                    }
                },
                formatter: function(params) {
                    if (parseInt(params.slice(0, 1)) < 3) {
                        return [
                            '{a|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                        ].join('\n')
                    } else {
                        return [
                            '{b|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                        ].join('\n')
                    }
                }
            },
            data: yData
          },
          nameMap: {
            成都市: "成都市",
            雅安市: "雅安市"
          },
          series: [
            {
              type: "map",
              map: "四川",
              roam: false,
              left: '200',
              label: {
                normal: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  label: {
                    show: true
                  }
                }
              },
              emphasis: {
                borderWidth: 1,
                areaColor: "white",
                shadowColor: "rgba(0,0, 0, 0.5)",
                shadowBlur: 10,
                shadowOffsetX: 10,
                shadowOffsetY: 10,
                label: {
                  show: true
                }
              },
              data: data
            },
            {
              name: 'barSer',
              type: 'bar',
              roam: false,
              visualMap: false,
              zlevel: 2,
              barMaxWidth: 8,
              barGap: 0,
              itemStyle: {
                  normal: {
                      color: function(params) {
                          // build a color map as your need.
                          var colorList = [{
                                  colorStops: [{
                                      offset: 0,
                                      color: '#FFD119' // 0% 处的颜色
                                  }, {
                                      offset: 1,
                                      color: '#FFAC4C' // 100% 处的颜色
                                  }]
                              },
                              {
                                  colorStops: [{
                                      offset: 0,
                                      color: '#00C0FA' // 0% 处的颜色
                                  }, {
                                      offset: 1,
                                      color: '#2F95FA' // 100% 处的颜色
                                  }]
                              }
                          ];
                          if (params.dataIndex < 3) {
                              return colorList[0]
                          } else {
                              return colorList[1]
                          }
                      },
                      barBorderRadius: 15
                  }
              },
              data: barData
          }
          ]
        };
        chart.setOption(option);
      });
      chart.on("click", function(city) {
        let citysource = cityMap[city.name];
        $.getJSON(citysource, function(geoJson) {
          echarts.registerMap(citysource, geoJson);
          let option = {
            series: [
              {
                type: "map",
                map: citysource,
                roam: false,
                label: {
                  normal: {
                    show: true
                  }
                },
                data: data
              }
            ]
          };
          chart.setOption(option);
        });
      });
    });
  };
  onclick = () => {
    if (chart != null && chart != "" && chart != undefined) {
      chart.dispose();
      this.mapLoad();
    }
  };
  componentDidMount() {
    this.mapLoad();
  }
  render() {
    const mapreturn = () => {
      return (
        <a
          className="provincename"
          onClick={this.onclick}
          style={{
            fontSize: "20px",
            width: "140px",
            margin: "0 auto",
            display: "block"
          }}
        >
          创新企业分布
        </a>
      );
    };
    return (
      <div>
        <div>{mapreturn()}</div>
        <div
          id="map"
          style={{
            width: "100%",
            height: "460px",
            marginLeft: "4px"
          }}
        />
      </div>
    );
  }
}
