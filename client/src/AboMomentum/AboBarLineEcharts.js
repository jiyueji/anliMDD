import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboBarLineEcharts extends Component {
    constructor() {
        super();
        this.state = {
            nowColorAbo: false,
            clickShow: true,
        }
    }
    render() {
        var { clickShow } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 3%', top: '4%', fontSize: '14px', fontWeight: '600' }}>CSI</div>
                <div className="salesButt" onClick={this.AboBarLineEchartshandleClick.bind(this)}>
                    <span className="salesButt-ytd">Monthly</span>
                    <span className="salesButt-Monthly">YTD</span>
                </div>
                {
                    clickShow ? <div style={{ position: "absolute", width: "100%", }}>
                    <div style={{ position: "absolute", left: ' 3%', top: '10%', fontSize: '14px', color: "#333" }}>Mthly Trend</div>
                    <div style={{ width: "100%", height: "400px", display: 'flex' }}>
                        <div id="aboBarLineEcharts" style={{ width: "80%", height: "400px" }}></div>
                        <div id="aboBarLineEcharts2" style={{ width: "20%", height: "400px" }}></div>
                    </div>
                </div> : ""
                }
            </Fragment>
        )
    }
    AboBarLineEchartshandleClick(e) {
        var { nowColorAbo, clickShow } = this.state
        if (nowColorAbo !== e.target && nowColorAbo) {
            clickShow = !clickShow
        } else if (!nowColorAbo) {
            clickShow = false
        }
        if (nowColorAbo) {
            nowColorAbo.style.background = "#f7f8fa";
            nowColorAbo.style.color = "#333"
        } else {
            if (e.target.innerHTML === "YTD") {
                e.target.previousSibling.style.background = "#f7f8fa";
                e.target.previousSibling.style.color = "#333";
            }
        }
        nowColorAbo = e.target
        nowColorAbo.style.background = "#5198ee";
        nowColorAbo.style.color = "#ffffff"
        this.setState({
            nowColorAbo, clickShow
        })
    }
    componentDidMount() {
        var data = this.props.data;

        this.setState({

        }, () => {
            this.aboBarLineEchartsHandle()
            this.aboBarLineEchartsHandle2()
        })

    }
    aboBarLineEchartsHandle() {
        //页面自适应
        var aboBarLineEchartsWidth = document.getElementById('aboBarLineEcharts')
        aboBarLineEchartsWidth.style.width = (window.innerWidth * 0.35) + "px"

        var aboBarLineEcharts = echarts.init(document.getElementById('aboBarLineEcharts'));
        window.addEventListener('resize', function () {
            aboBarLineEcharts.resize()
        });
        aboBarLineEcharts.setOption({
            grid: {
                top: '18%',
                left: '4%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    }
                },
                // boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    // show:false,
                    interval: 0,  //x轴文字全部显示
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    // formatter: function (params) {
                    //     return params.split(' ')[0]
                    // }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#333"
                        },
                        formatter: function (params) {
                            return params / 1
                        }
                    },
                    axisLine: {//隐藏X轴
                        show: false
                    },
                    nameGap: 10,
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    splitLine: {//Y轴的样式虚线
                        lineStyle: {
                            type: 'dashed',
                            color: '#e5e9ee'
                        }
                    }
                }
            ],
            legend: {
                type: "plain",
                left: 'center',
                bottom: 16,
                // icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 30,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    { name: 'CSI per Earner', icon: 'rect' },
                    { name: 'CSI earner % of total eligible earner', icon: "line" }
                ],
            },
            series: [
                {
                    name: 'CSI per Earner',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#99c8ff'
                            }, {
                                offset: 1,
                                color: '#559bf1'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        // formatter: (val) => {
                        //     // console.log(val)
                        //     var value = Math.round((val.data / 1000))
                        //     var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        //     return valueShow + "k"
                        // },
                        textStyle: {
                            fontSize: 8,
                            color: '#ffffff',
                        }
                    },
                    data: [14, 35, 53, 37, 27, 59, 52, 37, 24, 35, 57, 66]
                },
                {
                    name: 'CSI earner % of total eligible earner',
                    data: [20, 22, 14, 23, 24, 23, 15, 26, 24, 14, 18, 30],
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['-10', '-20'],
                        formatter: function (params) {
                            return params.data + "%"
                        },
                        // backgroundColor: '#ec5453',
                        // borderRadius: 5,
                        // padding: 4,
                        textStyle: {
                            fontSize: 8,
                            color: '#ec5453',
                        }
                    },
                    // stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#ec5453"//折现颜色
                            },
                            borderColor: '#ec5453',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
    aboBarLineEchartsHandle2() {
        //页面自适应
        var aboBarLineEcharts2Width = document.getElementById('aboBarLineEcharts2')
        aboBarLineEcharts2Width.style.width = (window.innerWidth * 0.12) + "px"

        var aboBarLineEcharts2 = echarts.init(document.getElementById('aboBarLineEcharts2'));
        window.addEventListener('resize', function () {
            aboBarLineEcharts2.resize()
        });
        aboBarLineEcharts2.setOption({
            grid: {
                top: '18%',
                left: '4%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['PF20 YTD Mthly Avg'],
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    }
                },
                // boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    // show:false,
                    interval: 0,  //x轴文字全部显示
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    // formatter: function (params) {
                    //     return params.split(' ')[0]
                    // }
                }
            },
            yAxis: {
                show: false,
                axisLine: {       //y轴
                    show: false
                },
                axisTick: {       //y轴刻度线
                    show: false
                },
                splitLine: {     //网格线
                    show: false
                }
            },
            series: [
                {
                    name: 'CSI per Earner',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ffa441'
                            }, {
                                offset: 1,
                                color: '#ffa441'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        // formatter: (val) => {
                        //     // console.log(val)
                        //     var value = Math.round((val.data / 1000))
                        //     var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        //     return valueShow + "k"
                        // },
                        textStyle: {
                            fontSize: 8,
                            color: '#ffffff',
                        }
                    },
                    data: [41]
                },
                {
                    name: 'CSI earner % of total eligible earner',
                    data: [41],
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 1, //折线点的大小
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['-10', '-20'],
                        formatter: function (params) {
                            return params.data + "%"
                        },
                        backgroundColor: '#ffa441',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 8,
                            color: '#ffffff',
                        }
                    },
                    // stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#ffa441"//折现颜色
                            },
                            borderColor: '#ffa441',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
}