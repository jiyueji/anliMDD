import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboPvPer extends Component {
    constructor() {
        super();
        this.state = {
            maxYear: "",
            prevYear: "",
            maxMonthStr: "",
            accOfQ: [],
            pvPerQ: [],
        }
    }
    render() {
        var { maxMonthStr } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>YTD Q Month & PV per Q Month</div>
                <div style={{ position: "absolute", right: ' 5%', top: '4%', fontSize: '12px', color: "#666" }}>As of {maxMonthStr}</div>
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                <div id="aboPvPerEcharts" style={{ width: "100%", height: "400px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        var { data,dataLegend } = nextProps
        this.upDateShowData(data,dataLegend)
    }
    componentDidMount() {
        var data = this.props.data
        var dataLegend = this.props.dataLegend
        this.upDateShowData(data,dataLegend)
    }
    upDateShowData(data,dataLegend){
        var { maxYear, prevYear } = dataLegend
        const maxMonthStr = String(hlp.yearMonthToStr(data.maxMonth))
        var accOfQ = []
        var pvPerQ = []
        data.prevYear ? data.prevYear.map((item, index) => {
            pvPerQ.push(item.y)
        }) : ""
        data.curYear ? data.curYear.map((item, index) => {
            accOfQ.push(item.y)
        }) : ""
        this.setState({
            maxYear, prevYear, maxMonthStr, accOfQ, pvPerQ,
        }, () => {
            this.aboPvPerEchartsHandle()
        })
    }
    aboPvPerEchartsHandle() {
        //页面自适应
        var aboPvPerEchartsWidth = document.getElementById('aboPvPerEcharts')
        aboPvPerEchartsWidth.style.width = (window.innerWidth * 0.32) + "px"

        var aboPvPerEcharts = echarts.init(document.getElementById('aboPvPerEcharts'));
        window.addEventListener('resize', function () {
            aboPvPerEcharts.resize()
        });
        aboPvPerEcharts.setOption({
            grid: {
                top: '18%',
                left: '4%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['Acc. # of Q Months', 'PV per Q Months'],
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        color: "#333",
                        fontSize: 12,
                    }
                },
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
            }],
            yAxis: {
                type: 'value',
                // data: monthShow,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#333"
                    },
                    formatter: function (params) {
                        return params / 1000 + "K"
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
                        color: '#e5e9ee'
                    }
                }
            },
            legend: {
                type: "scroll",
                icon: "rect",
                data: [
                    { name: this.state.prevYear },
                    { name: this.state.maxYear },
                ],
                itemWidth: 10,
                itemHeight: 10,
                bottom: 16,
                itemGap: 50,
                textStyle: {
                    color: "#333",
                    fontSize: 14
                },
            },
            series: [
                {
                    name: this.state.prevYear,
                    legendHoverLink: false,
                    type: 'bar',
                    barWidth: '40',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#4d96f2',

                            }, {
                                offset: 1,
                                color: '#5095f2'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['1', '-20'],
                        formatter: function (params) {
                            var b = parseInt(params.data).toString();
                            var len = b.length;
                            if (len <= 3) { return b; }
                            var r = len % 3;
                            return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
                            // return Math.round((params.data || 0) / 1) + ""
                        },
                        // backgroundColor: 'rgba(38,38,39,0.36)',
                        // borderRadius: 5,
                        // padding: 4,
                        textStyle: {
                            fontSize: 12,
                            color: '#333',
                        }
                    },
                    data: this.state.pvPerQ,
                },
                {
                    name: this.state.maxYear,
                    type: 'bar',
                    barWidth: '40',
                    barGap: 0.3,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ff9d3a'
                            }, {
                                offset: 1,
                                color: '#fe9c39'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['1', '-20'],
                        formatter: function (params) {
                            var b = parseInt(params.data).toString();
                            var len = b.length;
                            if (len <= 3) { return b; }
                            var r = len % 3;
                            return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
                        },
                        // backgroundColor: 'rgba(38,38,39,0.36)',
                        // borderRadius: 5,
                        // padding: 4,
                        textStyle: {
                            fontSize: 12,
                            color: '#333',
                        }
                    },
                    data: this.state.accOfQ,
                },
            ]
        })
    }
}