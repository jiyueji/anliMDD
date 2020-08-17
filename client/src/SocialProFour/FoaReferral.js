import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class FoaReferral extends Component {
    constructor() {
        super();
        this.state = {
            ofNewFoaData: [],
            ofWhoFoaData: [],
            monthShowAbo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            modifyDateModify:""
        }
    }
    render() {
        var {modifyDateModify} = this.state
        return (
            <Fragment>
                {/* <div className="modifyAllTitleFour">
                    <TitleModify titleName={''} titlePerfYearFlag={false} titlePerfYear={false} id={"sub4"} keys={"Referral"} modifyDate={modifyDateModify} />
                </div> */}
                {/* <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Foa Repeat Buyer</div> */}
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                    <div id="foaReferralEcharts" style={{ width: "100%", height: "420px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowDataFoaReferral()
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
            this.upDateShowDataFoaReferral()
        })
    }
    upDateShowDataFoaReferral() {
        var data = this.props.data || {}
        //         foa_ref_link_data: (3) [{…}, {…}, {…}]
        // foa_suc_ref_data: (3) [{…}, {…}, {…}]
        var modifyDateModify = data.maxMonthStr || ""
        var { foa_ref_link_data, foa_suc_ref_data } = data
        var { monthShowAbo } = this.state
        var ofNewFoaData = []
        var ofWhoFoaData = []
        foa_ref_link_data && foa_ref_link_data.length >= 0 ? foa_ref_link_data.map((item, index) => {
            ofNewFoaData.push(Math.round(item.y / 1000))
        }) : ""
        foa_suc_ref_data && foa_suc_ref_data.length >= 0 ? foa_suc_ref_data.map((item, index) => {
            ofWhoFoaData.push(Math.round(item.y / 1000))
        }) : ""
        //判断当前月份是否有数据
        for (var i = 0; i < 12; i++) {
            if (foa_ref_link_data && foa_ref_link_data.length > 0 && monthShowAbo) {
                if (foa_ref_link_data[0].x == monthShowAbo[i]) {
                    break
                } else {
                    ofNewFoaData.unshift("")
                    ofWhoFoaData.unshift("")
                }
            }
        }
        this.setState({
            ofNewFoaData, ofWhoFoaData,modifyDateModify
        }, () => {
            this.foaReferralEcharts()
        })
    }
    foaReferralEcharts() {
        //页面自适应
        var foaReferralEchartsWidth = document.getElementById('foaReferralEcharts')
        foaReferralEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var foaReferralEcharts = echarts.init(document.getElementById('foaReferralEcharts'));
        window.addEventListener('resize', function () {
            foaReferralEcharts.resize()
        });
        foaReferralEcharts.setOption({
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
                    boundaryGap: [0, '50%'],
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
                }
            ],
            // color:["#2acdae"],
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
                    { name: '# of New FOA buyer referred by FOA', icon: 'rect' },
                    { name: '# of FOA who referred other FOA', icon: "rect" }
                ],
            },
            series: [
                {
                    name: '# of New FOA buyer referred by FOA',
                    type: 'bar',
                    barWidth: 11,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ff9e3c'
                            }, {
                                offset: 1,
                                color: '#ff9d3a'
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
                            color: '#ff9e3c',
                        }
                    },
                    data: this.state.ofNewFoaData,
                }, {
                    name: '# of FOA who referred other FOA',
                    type: 'bar',
                    barWidth: 11,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#5695f6'
                            }, {
                                offset: 1,
                                color: '#4f9cea'
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
                            color: '#5695f6',
                        }
                    },
                    data: this.state.ofWhoFoaData,
                },
            ],
        })
    }
}
