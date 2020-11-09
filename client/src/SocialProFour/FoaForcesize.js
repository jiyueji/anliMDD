import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class FoaForcesize extends Component {
    constructor() {
        super();
        this.state = {
            numExistingFoaData: [],
            // maxYShow:"",
            // isPerfYearAbo:false,
            monthShowAbo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            modifyDateModify:"",
            forcesize_cp:"",//今年的最后一个数据
            forcesize_cp_ly:"",//去年的最后一个数据
            forcesize_cp_growth:"",//今年的最后一个数据/去年的最后一个数据 - 1
            forcesize_cp_month:"",//最后一个月Sep
            maxMonthShow:"",
        }
    }
    render() {
        var {modifyDateModify,forcesize_cp,forcesize_cp_ly,forcesize_cp_growth,maxMonthShow} = this.state
        return (
            <Fragment>
                <div className="modifyAllTitle">
                    <TitleModify titleName={'FOA Forcesize'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub4"} keys={"FOA_Forcesize"} modifyDate={modifyDateModify} />
                </div>
                {/* <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>FOA Forcesize</div> */}
                <div style={{ fontSize: "13px", position: "absolute", left: '32%', top: "13%", fontWeight:"600"}}>Forcesize</div>
                <table width="30%" border="0" border-collapse="collapse" cellSpacing="0" cellPadding="0" className="FourTopTable">
                <tbody>
                    <tr style={{ fontWeight: '600' }}>
                        <td>{maxMonthShow}</td>
                        <td>SPLY</td>
                        <td>Growth</td>
                    </tr>
                    <tr>
                        <td>{forcesize_cp || ""}{forcesize_cp ? "m" : ""}</td>
                        <td>{forcesize_cp_ly || ""}{forcesize_cp_ly ? "m" : ""}</td>
                        <td style={{ color: forcesize_cp_growth && forcesize_cp_growth > 0 ? "#16b6aa" : "#ff0000" }}>{forcesize_cp_growth ? forcesize_cp_growth > 0 ? "+" : "" : ""}{forcesize_cp_growth || ""}{forcesize_cp_growth ? "%" : ""}</td>
                    </tr>
                </tbody>
            </table>
                <div className="allContent">
                    <div id="foaForcesizeEcharts" className="allContentEcharts"></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowDataFoaForcesize()
    }
    componentWillReceiveProps(nextProps) {
        var { data } = nextProps
        var { monthShowAbo, } = this.state
        // isPerfYearAbo = !isPerfYearAbo
        if (data.isPerfYear) {
            monthShowAbo = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShowAbo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.setState({
            monthShowAbo,
        }, () => {
            this.upDateShowDataFoaForcesize()
        })
    }
    upDateShowDataFoaForcesize() {
        var data = this.props.data || {}
        var modifyDateModify = data.maxMonthStr || ""
        var { num_existing_foa,forcesize_cp_ly } = data
        var { monthShowAbo } = this.state
        var maxMonthShow = data.maxMonth || ""
        var numExistingFoaData = []
        num_existing_foa && num_existing_foa.length >= 0 ? num_existing_foa.map((item, index) => {
            numExistingFoaData.push(((item.y - 250000) / 1000000).toFixed(1))
        }) : ""
        //判断当前月份是否有数据
        for (var i = 0; i < 12; i++) {
            if (num_existing_foa && num_existing_foa.length > 0 && monthShowAbo) {
                if (num_existing_foa[0].x == monthShowAbo[i]) {
                    break
                } else {
                    numExistingFoaData.unshift("")
                }
            }
        }
        var forcesize_cp_month = num_existing_foa && num_existing_foa.length >= 0 ? monthShowAbo[num_existing_foa.length] : ""
        var forcesize_cp = numExistingFoaData && numExistingFoaData.length > 0 ? numExistingFoaData[numExistingFoaData.length-1] : ""
        var forcesize_cp_growth = forcesize_cp && forcesize_cp_ly && forcesize_cp_ly !== 0 ? Math.round((forcesize_cp / forcesize_cp_ly) - 1) : ""
        this.setState({
            numExistingFoaData,modifyDateModify,forcesize_cp,forcesize_cp_ly,forcesize_cp_growth,forcesize_cp_month,maxMonthShow
        }, () => {
            this.foaForcesizeEcharts()
        })
    }
    foaForcesizeEcharts() {
        //页面自适应
        var foaForcesizeEchartsWidth = document.getElementById('foaForcesizeEcharts')
        foaForcesizeEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var foaForcesizeEcharts = echarts.init(document.getElementById('foaForcesizeEcharts'));
        window.addEventListener('resize', function () {
            foaForcesizeEcharts.resize()
        });
        foaForcesizeEcharts.setOption({
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
                    boundaryGap: [0, '50%'],
                    // min: 0,
                    // max:this.state.maxYShow,
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
            // legend: {
            //     type: "plain",
            //     left: 'center',
            //     bottom: 16,
            //     // icon: 'rect',
            //     itemWidth: 10,
            //     itemHeight: 10,
            //     itemGap: 120,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            //     // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
            //     data: [
            //         { name: 'FOA Sales', icon: 'rect' },
            //         { name: 'FOA Sales % of ACCL', icon: "line" }
            //     ],
            // },
            series: [
                {
                    name: 'FOA Forcesize',
                    type: 'bar',
                    barWidth: 16,
                    yAxisIndex: 0,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#30cdb0' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#fafefd' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                        }
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
                            color: '#30cdb0',
                        }
                    },
                    data: this.state.numExistingFoaData,
                }
            ],
        })
    }
}
