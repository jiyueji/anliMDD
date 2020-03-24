import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboBarTwoEcharts extends Component {
    constructor() {
        super();
        this.state = {
            middle19:[],
            middle20:[],
            abo19:[],
            abo20:[],
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Monthly Income by PIN level</div>
                <div id="aboBarTwoEcharts" style={{ width: "100%", height: "200px" }}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        var middle19 = [1782,943,646]
        var middle20 = [1794,1072,690]
        var abo19 = ['14', '16']
        var abo20 = ['12', '14']
        this.setState({
            middle19,middle20,abo19,abo20,
        }, () => {
            this.aboBarTwoEchartsHandle()
        })

    }
    aboBarTwoEchartsHandle() {
        //页面自适应
        var aboBarTwoEchartsWidth = document.getElementById('aboBarTwoEcharts')
        aboBarTwoEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var aboBarTwoEcharts = echarts.init(document.getElementById('aboBarTwoEcharts'));
        window.addEventListener('resize', function () {
            aboBarTwoEcharts.resize()
        });
        aboBarTwoEcharts.setOption({
            tooltip: {
                // trigger: 'axis',
                // confine: false,
                show: true,
                textStyle: {
                    fontSize: 8
                }, //提示标签字体颜色
                // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                // },
                formatter: (data) => {
                    // console.log(data.componentIndex)
                    if (data.componentIndex == 0 || data.componentIndex == 2 || data.componentIndex == 3) {
                        var b = parseInt(this.state.middle20[data.dataIndex]).toString();
                    } else {
                        var b = parseInt(this.state.middle19[data.dataIndex]).toString();
                    }
                    var len = b.length;
                    var number;
                    if (len <= 3) { number = b; }
                    var r = len % 3;
                    r > 0 ? number = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : number = b.slice(r, len).match(/\d{3}/g).join(",");
                    return '<div style="color:#ffa441">' + 'Median income:$' + number + '</div>'
                }
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '5%',
                top: '16%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['DD', 'GP', 'SP'],
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#425873'

                    }
                },
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        fontFamily: 'Microsoft YaHei',
                        color: "#ffffff",
                        fontSize: 16,
                    }
                },
                axisTick: {
                    show: false
                }
            },
            /*隐藏一个不显示的横坐标，用作横线的位置*/
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: []
            }],
            yAxis: {
                type: 'value',

                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#757575'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    name: 'PF 20 avg income',
                    legendHoverLink: false,
                    type: 'bar',
                    barWidth: '40',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#3bedcd',

                            }, {
                                offset: 1,
                                color: '#028971'
                            }]),
                        },
                        // emphasis:{
                        //     label:{
                        //         show:false
                        //     }
                        // }

                    },
                    label: {
                        show: true,
                        // position: 'top',
                        position: ['1', '-20'],
                        formatter: function (params) {
                            var b = parseInt(params.data).toString();
                            var len = b.length;
                            if (len <= 3) { return '$' + b; }
                            var r = len % 3;
                            return r > 0 ? '$' + b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : '$' + b.slice(r, len).match(/\d{3}/g).join(",");
                            // return Math.round((params.data || 0) / 1) + ""
                        },
                        backgroundColor: 'rgba(38,38,39,0.36)',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 10,
                            color: '#ffffff',
                        }
                    },
                    data: [1949, 1140, 740]
                },
                {
                    name: 'PF 19 avg income',
                    type: 'bar',
                    barWidth: '40',
                    barGap: 0.3,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#75b2ff'
                            }, {
                                offset: 1,
                                color: '#0159ee'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        // position: 'top',
                        position: ['1', '-20'],
                        formatter: function (params) {
                            var b = parseInt(params.data).toString();
                            var len = b.length;
                            if (len <= 3) { return '$' + b; }
                            var r = len % 3;
                            return r > 0 ? '$' + b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : '$' + b.slice(r, len).match(/\d{3}/g).join(",");
                        },
                        backgroundColor: 'rgba(38,38,39,0.36)',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 10,
                            color: '#ffffff',
                        }
                    },
                    data: [1895, 993, 713]
                },
                // 上边第二个图
                {
                    name: 'Median income',
                    zlevel: 9,
                    type: 'bar',
                    stack: 'aaa',
                    barWidth: '40',
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                        }

                    },
                    data: [1794, 1072, 690]
                },
                {
                    /*这个bar是横线的显示*/
                    name: "Median income",
                    zlevel: 9,
                    stack: 'aaa',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
                    type: 'bar',
                    xAxisIndex: 1,
                    barGap: "0.3",
                    itemStyle: {
                        normal: {
                            color: '#ffa441',
                            barBorderColor: '#ffa441',
                            barBorderWidth: 2,
                            barBorderRadius: 10,
                            borderType: "dotted"
                        }
                    },
                    data: [20, 20, 20],
                },               // 上边第er个柱子/去年
                {
                    name: 'Median income',
                    type: 'bar',
                    zlevel: 9,
                    stack: 'breakevenEleGroup',
                    barWidth: '40',
                    animationDuration: 2000,
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                        }

                    },

                    data: [1782, 943, 646]
                },
                {
                    /*这个bar是横线的显示*/
                    name: "Median income",
                    stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
                    type: 'bar',
                    zlevel: 9,
                    xAxisIndex: 1,
                    animationDuration: 2000,
                    // barGap: 0.3,
                    itemStyle: {
                        normal: {
                            color: '#ffa441',
                            barBorderColor: '#ffa441',
                            barBorderWidth: 2,
                            barBorderRadius: 10,
                            borderType: "dotted"
                        }
                    },
                    data: [20, 20, 20],
                }]
        })
    }
}