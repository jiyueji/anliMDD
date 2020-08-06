import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class FoaConvertedToAbo extends Component {
    constructor() {
        super();
        this.state = {
            foaConvertedToAboPcData: [],
            convertionDowmData: [],
            monthShowAbo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            modifyDateModify: ""
        }
    }
    render() {
        var { modifyDateModify } = this.state
        return (
            <Fragment>
                <div className="modifyAllTitleFour" style={{ paddingLeft: "33%" }}>
                    <TitleModify titleName={''} titlePerfYearFlag={false} titlePerfYear={false} id={"sub4"} keys={"FOA_Converted_to_ABO/PC"} modifyDate={modifyDateModify} />
                </div>
                <div style={{ position: "absolute", left: ' 0%', top: '-6%', fontSize: '18px', fontWeight: '600', color: '#333' }}>FOA Converted to ABO/PC</div>
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                    <div id="foaConvertedToAboEcharts" style={{ width: "100%", height: "420px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowDataFoaConvertedToAbo()
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
            this.upDateShowDataFoaConvertedToAbo()
        })
    }
    upDateShowDataFoaConvertedToAbo() {
        var data = this.props.data || {}
        var modifyDateModify = data.maxMonthStr || ""
        var { total_foa_data, pct_foa_data } = data
        var { monthShowAbo } = this.state
        var foaConvertedToAboPcData = []
        var convertionDowmData = []
        total_foa_data && total_foa_data.length >= 0 ? total_foa_data.map((item, index) => {
            foaConvertedToAboPcData.push(Math.round(item.y / 1000))
        }) : ""
        pct_foa_data && pct_foa_data.length >= 0 ? pct_foa_data.map((item, index) => {
            convertionDowmData.push(item.y)
        }) : ""
        //判断当前月份是否有数据
        for (var i = 0; i < 12; i++) {
            if (total_foa_data && total_foa_data.length > 0 && monthShowAbo) {
                if (total_foa_data[0].x == monthShowAbo[i]) {
                    break
                } else {
                    foaConvertedToAboPcData.unshift("")
                    convertionDowmData.unshift("")
                }
            }
        }
        this.setState({
            foaConvertedToAboPcData, convertionDowmData,modifyDateModify
        }, () => {
            this.foaConvertedToAboEcharts()
        })
    }
    foaConvertedToAboEcharts() {
        //页面自适应
        var foaConvertedToAboEchartsWidth = document.getElementById('foaConvertedToAboEcharts')
        foaConvertedToAboEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var foaConvertedToAboEcharts = echarts.init(document.getElementById('foaConvertedToAboEcharts'));
        window.addEventListener('resize', function () {
            foaConvertedToAboEcharts.resize()
        });
        foaConvertedToAboEcharts.setOption({
            grid: {
                top: '18%',
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
            color: ["#25d1b7"],
            legend: {
                type: "plain",
                left: 'center',
                bottom: 16,
                // icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                // itemGap: 120,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    { name: 'FOA Converted to ABO/PC Count', icon: 'rect' },
                    { name: 'Convertion %', icon: "line" }
                ],
            },
            series: [
                {
                    name: 'FOA Converted to ABO/PC Count',
                    type: 'bar',
                    barWidth: 16,
                    yAxisIndex: 0,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#66a5f4'
                            }, {
                                offset: 1,
                                color: '#fafbff'
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
                            color: '#66a5f4',
                        }
                    },
                    data: this.state.foaConvertedToAboPcData,
                },
                {
                    name: 'Convertion %',
                    data: this.state.convertionDowmData,
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
                        backgroundColor: '#25d1b7',
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
                                color: "#25d1b7"//折现颜色
                            },
                            borderColor: '#25d1b7',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
}
