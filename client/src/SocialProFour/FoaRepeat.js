import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class FoaRepeat extends Component {
    constructor() {
        super();
        this.state = {
            repeatBuyerCountData: [],
            repeatBuyerData: [],
            monthShowAbo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            modifyDateModify:""
        }
    }
    render() {
        var {modifyDateModify} = this.state
        return (
            <Fragment>
                {/* <div className="modifyAllTitle">
                    <TitleModify titleName={'FOA Repeat Buyer'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub4"} keys={"FOA_Repeat_Buyer"} modifyDate={modifyDateModify} />
                </div> */}
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>FOA Repeat Buyer</div>
                <div className="allContent">
                    <div id="foaRepeatEcharts" className="allContentEcharts"></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowDataFoaRepeat()
    }
    componentWillReceiveProps(nextProps) {
        var { data } = nextProps
        var { monthShowAbo, } = this.state
        if (data.isPerfYear) {
            monthShowAbo = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShowAbo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.setState({
            monthShowAbo,
        }, () => {
            this.upDateShowDataFoaRepeat()
        })
    }
    upDateShowDataFoaRepeat() {
        var data = this.props.data || {}
        // console.log(data, "show")
        var modifyDateModify = data.maxMonthStr || ""
        var { num_foa_data, pct_foa_data } = data
        var { monthShowAbo } = this.state
        var repeatBuyerCountData = [];
        var repeatBuyerData = []
        num_foa_data && num_foa_data.length >= 0 ? num_foa_data.map((item, index) => {
            repeatBuyerCountData.push(Math.round(item.y / 1000))
        }) : ""
        pct_foa_data && pct_foa_data.length >= 0 ? pct_foa_data.map((item, index) => {
            repeatBuyerData.push(Math.round(item.y))
        }) : ""
        //判断当前月份是否有数据
        for (var i = 0; i < 12; i++) {
            if (num_foa_data && num_foa_data.length > 0 && monthShowAbo) {
                if (num_foa_data[0].x == monthShowAbo[i]) {
                    break
                } else {
                    repeatBuyerCountData.unshift("")
                    repeatBuyerData.unshift("")
                }
            }
        }
        this.setState({
            repeatBuyerCountData, repeatBuyerData,modifyDateModify
        }, () => {
            this.foaRepeatEcharts()
        })
    }
    foaRepeatEcharts() {
        //页面自适应
        var foaRepeatEchartsWidth = document.getElementById('foaRepeatEcharts')
        foaRepeatEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var foaRepeatEcharts = echarts.init(document.getElementById('foaRepeatEcharts'));
        window.addEventListener('resize', function () {
            foaRepeatEcharts.resize()
        });
        foaRepeatEcharts.setOption({
            grid: {
                top: '20%',
                left: '1%',
                right: '2%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.monthShowAbo,
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
                    yAxisIndex: 0,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#333"
                        },
                        formatter: function (params) {
                            return params + "k"
                        }
                    },
                    axisLine: {//隐藏X轴
                        show: false
                    },
                    boundaryGap: [0, '200%'],
                    // min: 0,
                    // max: this.state.maxYShow,
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
                },
                {
                    type: 'value',
                    yAxisIndex: 1,
                    axisLabel: {
                        show: false,
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
                    boundaryGap: ['250%', 0],
                    // min: -200,
                    // max: 100,
                    nameGap: 10,
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    splitLine: {//Y轴的样式虚线
                        show: false,
                        lineStyle: {
                            type: 'dashed',
                            color: '#e5e9ee'
                        }
                    }
                }
            ],
            color: ["#2acdae"],
            legend: {
                type: "plain",
                left: 'center',
                bottom: 16,
                // icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                // itemGap: 90,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    { name: 'Repeat Buyer Count', icon: 'rect' },
                    { name: 'Repeat Buyer %', icon: "line" }
                ],
            },
            series: [
                {
                    name: 'Repeat Buyer Count',
                    type: 'bar',
                    barWidth: 16,
                    yAxisIndex: 0,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fbda1d'
                            }, {
                                offset: 1,
                                color: '#fffdf1'
                            }]),
                            barBorderRadius: [30, 30, 0, 0],
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (val) => {
                            var value = val.data
                            var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                            return valueShow + "k"
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#fbda1d',
                        }
                    },
                    data: this.state.repeatBuyerCountData,
                },
                {
                    name: 'Repeat Buyer %',
                    data: this.state.repeatBuyerData,
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (params) {
                            return params.data + "%"
                        },
                        backgroundColor: '#2acdae',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 12,
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
                                color: "#2acdae"//折现颜色
                            },
                            borderColor: '#2acdae',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
}
