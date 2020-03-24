import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboQMonths extends Component {
    constructor() {
        super();
        this.state = {
            num_q_month_data_show:[],
            num_q_month_ly_data_show:[],
            months_data_show:[],
            maxYear:"",
            prevYear:"",
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Monthly Q Months</div>
                <div id="aboQMonthsEcharts" style={{ width: "100%", height: "400px" }}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        // num_q_month_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // num_q_month_ly_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // ytd_consecutive_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // ytd_consecutive_ly_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // months_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // months_data_cons: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // maxYear: "PF 20"
        // prevYear: "PF 19"
        var {num_q_month_data,num_q_month_ly_data,months_data,maxYear,prevYear} = data
        var num_q_month_data_show = []
        var num_q_month_ly_data_show = []
        var months_data_show = []
        num_q_month_data ? num_q_month_data.map((item,index)=>{
            num_q_month_data_show.push(item.y)
        }) : ""
        num_q_month_ly_data ? num_q_month_ly_data.map((item,index)=>{
            num_q_month_ly_data_show.push(item.y)
        }) : ""
        months_data ? months_data.map((item,index)=>{
            months_data_show.push(item.x)
        }) : ""
        this.setState({
            num_q_month_data_show,num_q_month_ly_data_show,months_data_show,maxYear,prevYear
        },()=>{
            this.aboQMonthsHandle()
        })
        // console.log(data)
    }
    aboQMonthsHandle() {
        //页面自适应
        var aboQMonthsEchartsWidth = document.getElementById('aboQMonthsEcharts')
        aboQMonthsEchartsWidth.style.width = (window.innerWidth * 0.32) + "px"

        var aboQMonthsEcharts = echarts.init(document.getElementById('aboQMonthsEcharts'));
        window.addEventListener('resize', function () {
            aboQMonthsEcharts.resize()
        });
        aboQMonthsEcharts.setOption({
            tooltip: {//鼠标移入
                trigger: 'axis',
                confine: true,
                formatter: (data) => {
                    var thisYearDataShow = 0
                    var lastYearDataShow = 0
                    var thisNameShow = ""
                    data.map((item, index) => {
                        // console.log(item.componentIndex)
                        if (item.componentIndex && item.componentIndex == 1) {
                            lastYearDataShow = item.data || 0
                        } else {
                            thisYearDataShow = item.data || ""
                        }
                        thisNameShow = item.axisValue
                    })
                    if(thisYearDataShow){
                        thisYearDataShow = this.state.maxYear + ":" + Math.round(thisYearDataShow / 1000) + "k"
                    }
                    if(lastYearDataShow){
                        lastYearDataShow = this.state.prevYear + ":" + Math.round(lastYearDataShow / 1000) + "k"
                    }
                    return "<div style='border-bottom:1px solid #ffffff'>" + thisNameShow + "</div>" + thisYearDataShow + "</br>" + lastYearDataShow
                }
            },
            grid: {
                top: '18%',
                left: '4%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.months_data_show,
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    }
                },
                boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    interval: 0,  //x轴文字全部显示
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
                }
            ],
            series: [
                {
                    name: this.state.maxYear,
                    data: this.state.num_q_month_data_show,
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    // stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                            color: '#fe9c3b', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#fe9c3b"//折现颜色
                            },
                            borderColor: '#fe9c3b',  // 拐点边框颜色
                        },
                    }, //线条样式
                }, {
                    name: this.state.prevYear,
                    data: this.state.num_q_month_ly_data_show,
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                            color: '#4f90f4', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#4f90f4"//折现颜色
                            },
                            borderColor: '#4f90f4',  // 拐点边框颜色
                        },
                    }, //线条样式
                },
            ],
            //图例名
            color: ['#fe9c3b', '#4f90f4'],
            legend: {
                type: "scroll",
                icon: "line",
                data: [
                    { name: this.state.maxYear },
                    { name: this.state.prevYear }
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
        })
    }
}