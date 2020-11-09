import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class FoaSalesLineBar extends Component {
    constructor() {
        super();
        this.state = {
            foaSalesData: [],
            foaSalesOfAcclData: [],
            // maxYShow:"",
            // isPerfYearAbo:false,
            monthShowAbo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            modifyDateModify: "",
            dataTable: {},
        }
    }
    render() {
        var { modifyDateModify, dataTable } = this.state
        return (
            <Fragment>
                <div className="modifyAllTitle">
                    <TitleModify titleName={'FOA Sales($)'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub4"} keys={"FOA_Sales"} modifyDate={modifyDateModify} />
                </div>
                {/* <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>FOA Sales($)</div> */}
                <table width="30%" border="0" border-collapse="collapse" cellSpacing="0" cellPadding="0" className="FourTopTable">
                    <tbody>
                        <tr style={{ fontWeight: '600' }}>
                            <td>YTD {dataTable.maxMonth}</td>
                            <td>SPLY</td>
                            <td>Growth</td>
                        </tr>
                        <tr>
                            <td>{dataTable.total_foa_sales || ""}{dataTable.total_foa_sales ? "m" : ""}</td>
                            <td>{dataTable.total_foa_sales_ly || ""}{dataTable.total_foa_sales_ly ? "m" : ""}</td>
                            <td style={{ color: dataTable.total_foa_sales_growth && dataTable.total_foa_sales_growth > 0 ? "#16b6aa" : "#ff0000" }}>{dataTable.total_foa_sales_growth ? dataTable.total_foa_sales_growth > 0 ? "+" : "" : ""}{dataTable.total_foa_sales_growth || ""}{dataTable.total_foa_sales_growth ? "%" : ""}</td>
                        </tr>
                        <tr>
                            <td>{dataTable.total_foa_sales_pct || ""}{dataTable.total_foa_sales_pct ? "%" : ""}</td>
                            <td>{dataTable.total_foa_sales_pct_ly || ""}{dataTable.total_foa_sales_pct_ly ? "%" : ""}</td>
                            <td style={{ color: dataTable.total_foa_sales_pct_growth && dataTable.total_foa_sales_pct_growth > 0 ? "#16b6aa" : "#ff0000" }}>{dataTable.total_foa_sales_pct_growth ? dataTable.total_foa_sales_pct_growth > 0 ? "+" : "" : ""}{dataTable.total_foa_sales_pct_growth || ""}{dataTable.total_foa_sales_pct_growth ? "pt" : ""}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="allContent">
                    <div id="foaBarEcharts" className="allContentEcharts"></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowDataFoa()
    }
    componentWillReceiveProps(nextProps) {
        var { data } = nextProps
        var { monthShowAbo } = this.state
        // isPerfYearAbo = !isPerfYearAbo
        if (data.isPerfYear) {
            monthShowAbo = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShowAbo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.setState({
            monthShowAbo
        }, () => {
            this.upDateShowDataFoa()
        })
    }
    upDateShowDataFoa() {
        var data = this.props.data || {}
        var dataTable = this.props.dataTable
        var modifyDateModify = data.maxMonthStr || ""
        var { total_foa_sales, total_pct_data } = data
        var { monthShowAbo } = this.state
        var foaSalesData = [];
        var foaSalesOfAcclData = [];
        total_foa_sales && total_foa_sales.length >= 0 ? total_foa_sales.map((item, index) => {
            foaSalesData.push(Math.round(item.y / 1000000))
        }) : ""
        total_pct_data && total_pct_data.length >= 0 ? total_pct_data.map((item, index) => {
            foaSalesOfAcclData.push(item.y)
        }) : ""
        //判断当前月份是否有数据
        for (var i = 0; i < 12; i++) {
            if (total_foa_sales && total_foa_sales.length > 0 && monthShowAbo) {
                if (total_foa_sales[0].x == monthShowAbo[i]) {
                    break
                } else {
                    foaSalesData.unshift("")
                    foaSalesOfAcclData.unshift("")
                }
            }
        }
        // var maxYShow = foaSalesData[0];
        // for (var i = 1; i < foaSalesData.length; i++) {
        //     var cur = foaSalesData[i];
        //     cur > maxYShow ? maxYShow = cur : null
        // }
        // const formatInt = (num, prec) => {
        //     const len = String(num).length;
        //     if (len <= prec) { return num };

        //     const mult = Math.pow(10, prec);

        //     return Math.ceil(num / mult) * mult;

        // }
        // maxYShow = formatInt(maxYShow, String(maxYShow).length - 1)
        this.setState({
            foaSalesData, foaSalesOfAcclData, modifyDateModify, dataTable
            // maxYShow,
        }, () => {
            this.foaBarEcharts()
        })
    }
    foaBarEcharts() {
        //页面自适应
        var foaBarEchartsWidth = document.getElementById('foaBarEcharts')
        foaBarEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var foaBarEcharts = echarts.init(document.getElementById('foaBarEcharts'));
        window.addEventListener('resize', function () {
            foaBarEcharts.resize()
        });
        foaBarEcharts.setOption({
            grid: {
                top: '28%',
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
                            return params + "m"
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
                    // min: -400,
                    // max: 100,
                    boundaryGap: ['250%', 0],
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
            color: ["#27caad"],
            legend: {
                type: "plain",
                orient: 'vertical',//纵向布局
                left: '20%',
                top: '0',
                // bottom: 16,
                // icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                // itemGap: 90,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    { name: 'FOA Sales', icon: 'rect' },
                    { name: 'FOA Sales % of ACCL', icon: "line" }
                ],
            },
            series: [
                {
                    name: 'FOA Sales',
                    type: 'bar',
                    barWidth: 16,
                    yAxisIndex: 0,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#97c5ff'
                            }, {
                                offset: 1,
                                color: '#5299f1'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (val) => {
                            // console.log(val)
                            var value = val.data
                            var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                            return valueShow + "m"
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#5299f1',
                        }
                    },
                    data: this.state.foaSalesData,
                },
                {
                    name: 'FOA Sales % of ACCL',
                    data: this.state.foaSalesOfAcclData,
                    type: 'line',
                    yAxisIndex: 1,
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
                        backgroundColor: '#27caad',
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
                                color: "#27caad"//折现颜色
                            },
                            borderColor: '#27caad',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
}
