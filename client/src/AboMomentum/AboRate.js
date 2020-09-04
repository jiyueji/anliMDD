import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class AboRate extends Component {
    constructor() {
        super();
        this.state = {
            num_q_month_data_show: [],
            num_q_month_ly_data_show: [],
            months_data_show: [],
            maxYear: "",
            prevYear: "",
            num_consecutive_q_show: [],
            num_consecutive_q_ly_show: [],
            modifyDateModify:""
        }
    }
    render() {
        var {modifyDateModify} = this.state
        return (
            <Fragment>
                {/* <div className="modifyAllTitle">
                    <TitleModify titleName={'Consecutive qualification rate'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub3"} keys={"Consecutive_qualification_rate"} modifyDate={modifyDateModify} />
                </div> */}
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Consecutive qualification rate</div>
                <div style={{ width: "100%", height: "400px", display: 'flex' }}>
                    <div id="aboRateEcharts" style={{ width: "100%", height: "400px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        var { data } = nextProps
        this.upDateShowData(data)
    }
    componentDidMount() {
        var data = this.props.data;
        this.upDateShowData(data)
    }
    upDateShowData(data) {
        var { num_q_month_data, num_q_month_ly_data, months_data, maxYear, prevYear, ytd_consecutive_data, ytd_consecutive_ly_data, num_consecutive_q, num_consecutive_q_ly } = data
        var num_q_month_data_show = []
        var num_q_month_ly_data_show = []
        var months_data_show = []
        var ytd_consecutive_data_show = []
        var ytd_consecutive_ly_data_show = []
        var num_consecutive_q_show = []
        var num_consecutive_q_ly_show = []
        // num_q_month_data ? num_q_month_data.map((item, index) => {
        //     num_q_month_data_show.push(item.y)
        // }) : ""
        // num_q_month_ly_data ? num_q_month_ly_data.map((item, index) => {
        //     num_q_month_ly_data_show.push(-item.y)
        // }) : ""
        months_data ? months_data.map((item, index) => {
            months_data_show.push(item.x)
        }) : ""
        ytd_consecutive_data ? ytd_consecutive_data.map((item, index) => {
            ytd_consecutive_data_show.push(Math.round(item.y * 100))
        }) : ""
        ytd_consecutive_ly_data ? ytd_consecutive_ly_data.map((item, index) => {
            ytd_consecutive_ly_data_show.push(Math.round(item.y * 100))
        }) : ""
        num_consecutive_q ? num_consecutive_q.map((item, index) => {
            num_consecutive_q_show.push(item.y)
        }) : ""
        num_consecutive_q_ly ? num_consecutive_q_ly.map((item, index) => {
            num_consecutive_q_ly_show.push(-item.y)
        }) : ""
        // num_q_month_data_show = num_q_month_data_show.reverse()
        // num_q_month_ly_data_show = num_q_month_ly_data_show.reverse()
        months_data_show = months_data_show.reverse()
        ytd_consecutive_data_show = ytd_consecutive_data_show.reverse()
        ytd_consecutive_ly_data_show = ytd_consecutive_ly_data_show.reverse()
        num_consecutive_q_show = num_consecutive_q_show.reverse()
        num_consecutive_q_ly_show = num_consecutive_q_ly_show.reverse()
        var num_consecutive_q_show_formatter = num_consecutive_q_show.map((item, index) => {
            return item ? 0 : item
        })
        var modifyDateModify = data.maxMonthStr || ""
        this.setState({
            // num_q_month_data_show, num_q_month_ly_data_show,
            months_data_show, maxYear, prevYear, ytd_consecutive_data_show, ytd_consecutive_ly_data_show, num_consecutive_q_show, num_consecutive_q_ly_show, num_consecutive_q_show_formatter,modifyDateModify
        }, () => {
            this.aboRateEchartsHandle()
        })
    }
    aboRateEchartsHandle() {
        //页面自适应
        var aboRateEchartsWidth = document.getElementById('aboRateEcharts')
        aboRateEchartsWidth.style.width = (window.innerWidth * 0.32) + "px"

        var aboRateEcharts = echarts.init(document.getElementById('aboRateEcharts'));
        window.addEventListener('resize', function () {
            aboRateEcharts.resize()
        });
        aboRateEcharts.clear()
        aboRateEcharts.setOption({
            animationDuration: 0,
            grid: {
                top: '20%',
                left: '4%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    show: false,
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    axisLine: {       //y轴
                        show: false
                    },
                    axisTick: {       //y轴刻度线
                        show: false
                    },
                    splitLine: {     //网格线
                        show: false
                    },
                    data: this.state.months_data_show,
                    // data:['Aug','Jul','Jun','May','Apr','Mar','Feb','Jan','Dec','Nov', 'Oct','Sep', ],
                }
            ],
            color: ['#fe9c3b', '#4f90f4'],
            series: [
                {
                    name: this.state.maxYear,
                    type: 'bar',
                    stack: '总量',
                    color: "#fe9c3b",
                    label: {
                        normal: {
                            show: true,
                            position: 'insideLeft',
                            formatter: (params) => {
                                var { ytd_consecutive_data_show } = this.state
                                return ytd_consecutive_data_show[params.dataIndex] + "%"
                            },
                        }
                    },
                    data: this.state.num_consecutive_q_show,
                },
                {
                    name: this.state.maxYear,
                    type: 'bar',
                    stack: '总量',
                    color: "#fe9c3b",
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            formatter: (params) => {
                                var { num_consecutive_q_show } = this.state
                                var valueParamsShow = Number(num_consecutive_q_show[params.dataIndex]).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') || ""
                                return valueParamsShow
                            },
                        }
                    },
                    // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    data: this.state.num_consecutive_q_show_formatter,
                },
                {
                    name: this.state.prevYear,
                    type: 'bar',
                    stack: '总量',
                    color: "#4f90f4",
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            formatter: (params) => {
                                var { ytd_consecutive_ly_data_show } = this.state
                                return ytd_consecutive_ly_data_show[params.dataIndex] + "%"
                            },
                        }
                    },
                    data: this.state.num_consecutive_q_ly_show,
                },
                {
                    name: this.state.prevYear,
                    type: 'bar',
                    stack: '总量',
                    color: "#4f90f4",
                    label: {
                        normal: {
                            show: true,
                            position: 'insideLeft',
                            formatter: (params) => {
                                var { num_consecutive_q_ly_show } = this.state
                                var valueParamsShow2 = Number(-num_consecutive_q_ly_show[params.dataIndex]).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') || ""
                                return valueParamsShow2
                            },
                            // formatter: function(params){return -params.value}
                        }
                    },
                    data: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                },
            ],
            legend: {
                type: "scroll",
                icon: "rect",
                left: "38%",
                data: [
                    { name: this.state.prevYear },
                    { name: this.state.maxYear },
                ],
                itemWidth: 10,
                itemHeight: 10,
                bottom: 16,
                itemGap: 38,
                // itemGap: 50,
                textStyle: {
                    color: "#333",
                    fontSize: 14
                },
            },
        })
    }
}