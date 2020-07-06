import React, { Component, Fragment } from 'react'
import echarts from 'echarts';
// import * as hlp from './Helper'
require('./styleAll.css')

export default class Sustainability extends Component {
    constructor() {
        super();
        this.state = {
            maxCalendarYear: "",
            chartData: {},
            sustainData: [],
            ytdShowFont: 0,
            ballYtd: 0,
            ytd: 0,
            targetLine: 0,
            targetFont: 0,
            sustainDataNumber: 0,
            kpiflagShow1: false,
        }
    }
    // style={{ top: ballYtd }}
    // style={{ position: 'absolute', left: '267px', top: ytd, display: 'none' }}
    render() {
        var { maxCalendarYear, ytdShowFont, ballYtd, ytd, targetLine, targetFont, sustainDataNumber, kpiflagShow1 } = this.state
        return (
            <Fragment>
                <div style={{ position: 'relative' }}>
                    <div className="sustainabilityTitleAll">
                        <div className="sustainabilityTitle">High PPV % of Sales</div>
                        <div className="kpitanShow" onClick={this.kpiflagShowhandle1.bind(this)}></div>
                    </div>
                    {
                        kpiflagShow1 ? <div className="kpiAgpDisplayFlag">
                            <div className="rightClose" onClick={this.kpiflagShowhandle1.bind(this)}>X</div>
                            <h5>High PPV % of Sales Definition</h5>
                            <p>Sum of High PPV buyers total month sales / total month sales. Values are calculated monthly and expressed as a percent of monthly sales. Period is calendar year. Annual rate is reflected as a total High PPV Sales rate for the year.</p>
                        </div> : ""
                    }
                    <div style={{ width: "100%", height: "383px", display: 'flex' }}>
                        <div id="salesHomeEchartsPpv" className="salesHomePpv"></div>
                    </div>
                    <div className="redball redball-flicker">
                        <div className="ballDiv" style={{ top: ballYtd, left: sustainDataNumber }}>
                            <div className="redBallShow"></div>
                            <div className="remark">
                                <div style={{ color: '#3a7796', fontSize: '16px' }}>YTD Actual: {ytdShowFont}%</div>
                            </div>
                        </div>
                        <div className="remarkTarget" style={{ position: 'absolute', right: '10%', top: targetFont, display: 'none' }}>
                            <div style={{ color: 'rgb(244,159,68)', fontSize: '16px', fontWeight: '600' }}>{maxCalendarYear} Target: {targetLine}%</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    kpiflagShowhandle1() {
        var { kpiflagShow1 } = this.state
        kpiflagShow1 = !kpiflagShow1
        this.setState({
            kpiflagShow1,
        })
    }
    componentWillReceiveProps(nextProps) {
        var { data } = nextProps
        this.dateUpdateHandle(data)
    }
    componentDidMount() {
        var chartData = this.props.data || {}
        this.dateUpdateHandle(chartData)
    }
    dateUpdateHandle(chartData) {
        // 延迟加载
        var redball = document.getElementsByClassName("redball")
        setTimeout(() => {
            redball[0].style.display = "block"
        }, 2000);
        // 延迟加载
        var remark = document.getElementsByClassName("remark")
        setTimeout(() => {
            remark[0].style.display = "block"
        }, 2000);
        // 延迟加载
        var remarkTarget = document.getElementsByClassName("remarkTarget")
        setTimeout(() => {
            remarkTarget[0] ? remarkTarget[0].style.display = "block" : ""
        }, 1000);

        var maxCalendarYear = chartData.maxCalendarYear
        var sustainData = []
        chartData.high_ppv_pct_of_sales_actual_data ? chartData.high_ppv_pct_of_sales_actual_data.map((item, index) => {
            sustainData.push(Math.round(item.y * 100))
        }) : ""

        var ytd = chartData.last_ytd_highppv_pct || 0
        var ytdShowFont = (ytd * 100).toFixed(1)
        var ballYtd = Math.round((((1 - ((ytd * 100) / 20)) * 100))) + 1 + "%"
        ytd = Math.round(((1 - ((ytd * 100) / 20)) * 100)) + "%"

        var targetLine = chartData.last_target_high_ppv_pct || 0
        var targetFont = ((((1 - ((targetLine * 100) / 20)) * 100))).toFixed(1) - 4 + "%"
        targetLine = (targetLine * 100).toFixed(1)
        // console.log(targetLine)

        var sustainDataNumber = sustainData.length || 0
        if (sustainDataNumber >= 9) {
            remark[0].style.marginLeft = "-115px"
        } else {
            remark[0].style.marginLeft = "0"
        }
        sustainDataNumber = ((sustainDataNumber - 1) / 11) * 100 + "%"

        this.setState({
            maxCalendarYear,
            chartData,
            sustainData,
            ytdShowFont,
            ballYtd,
            ytd,
            targetLine,
            targetFont,
            sustainDataNumber,
        }, () => {
            this.echartsStart()
        })
    }
    echartsStart() {
        //页面自适应
        var salesHomeEchartsPpvWidth = document.getElementById('salesHomeEchartsPpv')
        salesHomeEchartsPpvWidth.style.width = (window.innerWidth * 0.48) + "px"

        var salesHomeEchartsPpv = echarts.init(salesHomeEchartsPpvWidth);
        window.addEventListener('resize', function () {
            salesHomeEchartsPpv.resize();
        });
        salesHomeEchartsPpv.setOption({
            animationDuration: 2000,
            tooltip: {//鼠标移入
                trigger: 'axis',
                confine: true,
                formatter: (data) => {
                    // console.log(data,123)
                    var thisData = data[0] || {}
                    return thisData.name + ":" + thisData.value + "%"
                }
            },
            grid: {
                top: '5%',
                left: '10',
                right: '10',
                bottom: '5%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: false,
                },
                boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    formatter: function (params) {
                        return params.split(' ')[0]
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    // data: monthShow,
                    max: "20",
                    min: "0",
                    // boundaryGap: [0, '150%'],
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#333"
                        },
                        formatter: function (params) {
                            return params / 1 + "%"
                        }
                    },
                    axisLine: {//隐藏X轴
                        show: false
                    },
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    splitLine: {//Y轴的样式虚线
                        lineStyle: {
                            type: 'dashed',
                            color: '#757575'
                        }
                    }
                }
            ],
            series: [
                {
                    name: this.state.maxCalendarYear,
                    data: this.state.sustainData,
                    // data: [9, 10,9, 10,9, 10,9, 10,9, 10,9, 10],
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 3, //折线点的大小
                    stack: 100,
                    animationDuration: 2000,
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['-10', '-20'],
                        formatter: function (params) {
                            // var index = params.dataIndex;
                            // if(index==0){   
                            //     var content='<span style="margin-left:333px;">'+params.data + "%"+"</span>";
                            //     return content
                            // }else{
                            return params.data + "%"
                            // }
                        },
                        backgroundColor: 'rgba(243,225,39)',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff',
                        }
                    },
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            color: 'rgba(243,225,39,0.36)', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#f3e127"//折现颜色
                            }
                        },
                    }, //线条样式
                    areaStyle: {
                        normal: {}
                    },
                    markLine: {
                        animationDuration: 1000,
                        lineStyle: {
                            color: '#f49f44',
                            width: '2'
                        },
                        label: {
                            show: false,
                            // position: ['0', '0'],
                            // formatter: function(){
                            //     return '';
                            // }
                        },
                        data: [
                            { yAxis: this.state.targetLine, name: '' }
                        ]
                    },
                }
            ],
            //图例名
            legend: {
                show: false,
                type: "scroll",
                // icon: "line",
                icon: "circle",
                left: 'center',
                // bottom: 'bottom',
                y: '350',
                textStyle: {
                    color: "#333",
                    fontSize: 14
                },
            },
        })
    }
}
