import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import tuliYellowXuXian from "../styles/assets/tuliYellowXuXian.jpg"
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class AboBarTwoEcharts extends Component {
    constructor() {
        super();
        this.state = {
            upShowX: [],
            downShowX: [],
            maxMonthStr: "",
            curLegendYear: "",
            prevLegendYear: "",
            prevYearShowLastYear: [],
            curYearShowNowYear: [],
            middle19: [],
            middle20: [],
            avgNoPinPbShowNowYear: [],
            avgNoPinPbLyShowNowYear: [],
            abo19: [],
            abo20: [],
            totalEarn: {},
            modifyDateModify:""
        }
    }
    render() {
        var { maxMonthStr, totalEarn,modifyDateModify } = this.state
        return (
            <Fragment>
                <div className="modifyAllTitle">
                    <TitleModify titleName={'Monthly Income by PIN level'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub3"} keys={"Monthly_Income_by_PIN_level"} modifyDate={modifyDateModify} />
                </div>
                {/* <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Monthly Income by PIN level</div> */}
                <div style={{ position: "absolute", right: ' 5%', top: '6%', fontSize: '12px', color: "#666" }}>As of {maxMonthStr}</div>
                <div style={{ width: "100%", height: "362px", display: "flex", flexWrap: "wrap" }}>
                    <div id="aboBarTwoEcharts" style={{ width: "100%", height: "181px", borderBottom: "1px solid #e9e9eb" }}></div>
                    <div id="aboBarTwoEcharts2" style={{ width: "100%", height: "181px" }}></div>
                </div>
                <ul className="AboDownUlEch">
                    <li>% Earner of Total</li>
                    <li>
                        <div>
                            {totalEarn.thisEarn}%
                            <p></p>
                        </div>
                        <div>
                            {totalEarn.lastEarn}%
                            <p></p>
                        </div>
                    </li>
                </ul>
            </Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        var { data, datas } = nextProps
        this.upDateShowData(data, datas)
    }
    componentDidMount() {
        var data = this.props.data;
        var datas = this.props.datas;
        // prevYear: (3)[{ … }, { … }, { … }]
        // curYear: (3)[{ … }, { … }, { … }]
        // prevYearMed: (3)[{ … }, { … }, { … }]
        // curYearMed: (3)[{ … }, { … }, { … }]
        // maxMonth: "202002"
        // maxYear: 2020
        //         0: {x: "SP", y: 692.259310344828, labelTooltip: "Avg income: 692"}
        // 1: {x: "GP", y: 1051.38068965517, labelTooltip: "Avg income: 1051"}
        // 2: {x: "DD", y: 1937.77379310345, labelTooltip: "Avg income: 1938"}
        this.upDateShowData(data, datas)
    }
    upDateShowData(data, datas) {
        data.prevYear.sort(function (a, b) {
            var order = ["DD", "GP", "SP"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        data.curYear.sort(function (a, b) {
            var order = ["DD", "GP", "SP"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        data.prevYearMed.sort(function (a, b) {
            var order = ["DD", "GP", "SP"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        data.curYearMed.sort(function (a, b) {
            var order = ["DD", "GP", "SP"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        datas.avgNoPinPb.sort(function (a, b) {
            var order = ["Bonus Level=15% ABO", "new_abo", "existing abo"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        datas.avgNoPinPbLy.sort(function (a, b) {
            var order = ["Bonus Level=15% ABO", "new_abo", "existing abo"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        datas.noPinMedian.sort(function (a, b) {
            var order = ["Bonus Level=15% ABO", "new_abo", "existing abo"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        datas.noPinMedianLy.sort(function (a, b) {
            var order = ["Bonus Level=15% ABO", "new_abo", "existing abo"];
            return order.indexOf(a.x) - order.indexOf(b.x);
        });
        var curYearNow = data.maxYear || 2020
        var maxMonthStr = String(hlp.yearMonthToStr(data.maxMonth))
        var curLegendYear = hlp.yearToPfPref(curYearNow.toString()) + "income"
        var prevLegendYear = hlp.yearToPfPref((curYearNow - 1).toString()) + "income"

        var prevYearShowLastYear = []
        var upShowX = []
        var middle19 = []
        var curYearShowNowYear = []
        var middle20 = []
        data.prevYear ? data.prevYear.map((item, index) => {
            prevYearShowLastYear.push(Math.round(item.y || 0))
        }) : ""
        data.curYear ? data.curYear.map((item, index) => {
            curYearShowNowYear.push(Math.round(item.y || 0))
        }) : ""
        data.prevYearMed ? data.prevYearMed.map((item, index) => {
            middle19.push(Math.round(item.y || 0))
        }) : ""
        data.curYearMed ? data.curYearMed.map((item, index) => {
            middle20.push(Math.round(item.y || 0))
        }) : ""
        // avgNoPinPb: (2) [{…}, {…}]
        // avgNoPinPbLy: (2) [{…}, {…}]
        // noPinMedian: (2) [{…}, {…}]
        // noPinMedianLy: (2) [{…}, {…}]
        // pctEarn: (2) [{…}, {…}]
        // pctEarnLy: (2) [{…}, {…}]
        // maxMonth: "202002"
        // maxYear: 2020
        var avgNoPinPbShowNowYear = []
        var downShowX = []
        var abo20 = []
        var avgNoPinPbLyShowNowYear = []
        var abo19 = []
        var totalEarn = {}
        //         0: {x: "new_abo", y: 38.4117118058546, labelTooltip: "Avg income: 38↵Median income: 12"}
        // 1: {x: "existing abo", y: 68.543329898926, labelTooltip: "Avg income: 69↵Median income: 14"}
        // 2: {x: "Bonus Level=15% ABO", y: 406.824782089019, labelTooltip: "Avg income: 407↵Median income: 305"}
        datas.avgNoPinPb ? datas.avgNoPinPb.map((item, index) => {
            if (item.x !== "existing abo") {
                avgNoPinPbShowNowYear.push(Math.round(item.y || 0))
            }
        }) : ""
        datas.avgNoPinPbLy ? datas.avgNoPinPbLy.map((item, index) => {
            if (item.x !== "existing abo") {
                avgNoPinPbLyShowNowYear.push(Math.round(item.y || 0))
            }
        }) : ""
        datas.noPinMedian ? datas.noPinMedian.map((item, index) => {
            if (item.x !== "existing abo") {
                abo20.push(Math.round(item.y || 0))
            }
        }) : ""
        datas.noPinMedianLy ? datas.noPinMedianLy.map((item, index) => {
            if (item.x !== "existing abo") {
                abo19.push(Math.round(item.y || 0))
            }
        }) : ""
        datas.pctEarn ? datas.pctEarn.map((item, index) => {
            if (item.x == 'new_abo') {
                totalEarn.thisEarn = Math.round(item.y * 100)
            }
        }) : ""
        datas.pctEarnLy ? datas.pctEarnLy.map((item, index) => {
            if (item.x == 'new_abo') {
                totalEarn.lastEarn = Math.round(item.y * 100)
            }
        }) : ""

        //所有的数组按从大到小进行排序
        // var compare = function (x, y) {
        //     if (x < y) {
        //         return 1;
        //     } else if (x > y) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // }
        // prevYearShowLastYear.sort(compare)
        // middle19.sort(compare)
        // curYearShowNowYear.sort(compare)
        // middle20.sort(compare)
        // avgNoPinPbShowNowYear.sort(compare)
        // abo20.sort(compare)
        // avgNoPinPbLyShowNowYear.sort(compare)
        // abo19.sort(compare)
        var modifyDateModify = data.maxMonth
        this.setState({
            maxMonthStr, curLegendYear, prevLegendYear, prevYearShowLastYear, curYearShowNowYear, middle19, middle20, avgNoPinPbShowNowYear, avgNoPinPbLyShowNowYear, abo19, abo20, upShowX, downShowX, totalEarn,modifyDateModify
        }, () => {
            this.aboBarTwoEchartsHandle()
            this.aboBarTwoEchartsHandle2()
        })
    }
    aboBarTwoEchartsHandle() {
        //页面自适应
        var aboBarTwoEchartsWidth = document.getElementById('aboBarTwoEcharts')
        aboBarTwoEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var aboBarTwoEcharts = echarts.init(document.getElementById('aboBarTwoEcharts'));
        window.addEventListener('resize', function () {
            aboBarTwoEcharts.resize()
        });
        aboBarTwoEcharts.clear()
        aboBarTwoEcharts.setOption({
            animationDuration: 0,
            tooltip: {
                // trigger: 'axis',
                // confine: false,
                show: true,
                textStyle: {
                    // fontSize: 8
                }, //提示标签字体颜色
                // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                // },
                formatter: (data) => {
                    if (data.componentIndex == 0 || data.componentIndex == 2 || data.componentIndex == 3) {
                        var b = parseInt(this.state.middle19[data.dataIndex]).toString();
                    } else {
                        var b = parseInt(this.state.middle20[data.dataIndex]).toString();
                    }
                    var len = b.length;
                    var number;
                    if (len <= 3) { number = b; }
                    var r = len % 3;
                    number = b ? r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",") : "";
                    return '<div style="color:#ffa441">' + 'Median income:' + number + '</div>'
                }
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '5%',
                top: '20%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                // data: this.state.upShowX,
                data: ["DD", "GP", "SP"],
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#425873'

                    }
                },
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        // fontFamily: 'Microsoft YaHei',
                        color: "#333",
                        fontSize: 12,
                    }
                },
                axisTick: {
                    show: false
                }
            },
            /*隐藏一个不显示的横坐标，用作横线的位置*/
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: []
            }],
            yAxis: {
                type: 'value',
                show: false,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#757575'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#333",
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    name: this.state.prevLegendYear,
                    legendHoverLink: false,
                    type: 'bar',
                    barWidth: '40',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#3bedcd',

                            }, {
                                offset: 1,
                                color: '#028971'
                            }]),
                        },
                        // emphasis:{
                        //     label:{
                        //         show:false
                        //     }
                        // }

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
                            fontSize: 10,
                            color: '#333',
                        }
                    },
                    data: this.state.prevYearShowLastYear,
                },
                {
                    name: this.state.curLegendYear,
                    type: 'bar',
                    barWidth: '40',
                    barGap: 0.3,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#75b2ff'
                            }, {
                                offset: 1,
                                color: '#0159ee'
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
                            fontSize: 10,
                            color: '#333',
                        }
                    },
                    data: this.state.curYearShowNowYear,
                },
                // 上边第er个柱子/去年
                {
                    name: 'Median income',
                    type: 'bar',
                    zlevel: 9,
                    stack: 'breakevenEleGroup',
                    barWidth: '40',
                    animationDuration: 2000,
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                        }

                    },

                    data: this.state.middle19,
                },
                {
                    /*这个bar是横线的显示*/
                    name: "Median income",
                    stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
                    type: 'bar',
                    zlevel: 9,
                    xAxisIndex: 1,
                    animationDuration: 2000,
                    // barGap: 0.3,
                    itemStyle: {
                        normal: {
                            color: '#ffa441',
                            barBorderColor: '#ffa441',
                            barBorderWidth: 2,
                            barBorderRadius: 10,
                            borderType: "dotted"
                        }
                    },
                    data: [20, 20, 20],
                },
                // 上边第二个图
                {
                    name: 'Median income',
                    zlevel: 9,
                    type: 'bar',
                    stack: 'aaa',
                    barWidth: '40',
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                        }

                    },
                    data: this.state.middle20,
                },
                {
                    /*这个bar是横线的显示*/
                    name: "Median income",
                    zlevel: 9,
                    stack: 'aaa',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
                    type: 'bar',
                    xAxisIndex: 1,
                    barGap: "0.3",
                    itemStyle: {
                        normal: {
                            color: '#ffa441',
                            barBorderColor: '#ffa441',
                            barBorderWidth: 2,
                            barBorderRadius: 10,
                            borderType: "dotted"
                        }
                    },
                    data: [20, 20, 20],
                },
            ]
        })
    }
    aboBarTwoEchartsHandle2() {
        //页面自适应
        var aboBarTwoEchartsWidth2 = document.getElementById('aboBarTwoEcharts2')
        aboBarTwoEchartsWidth2.style.width = (window.innerWidth * 0.47) + "px"

        var aboBarTwoEcharts2 = echarts.init(document.getElementById('aboBarTwoEcharts2'));
        window.addEventListener('resize', function () {
            aboBarTwoEcharts2.resize()
        });
        aboBarTwoEcharts2.clear()
        aboBarTwoEcharts2.setOption({
            animationDuration: 0,
            tooltip: {
                // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                // }
                formatter: (data) => {
                    if (data.componentIndex == 0 || data.componentIndex == 2 || data.componentIndex == 3) {
                        var number = parseInt(this.state.abo19[data.dataIndex]).toString();
                    } else {
                        var number = parseInt(this.state.abo20[data.dataIndex]).toString();
                    }
                    return '<div style="color:#ffa441">' + 'Median income:$' + number + '</div>'
                }
            },
            grid: {
                left: '6.5%',
                right: '35%',
                bottom: '23%',
                top: '15%',
                containLabel: true
            },
            legend: {
                orient: 'vertical',
                data: [
                    { name: this.state.prevLegendYear, icon: "rect" },
                    { name: this.state.curLegendYear, icon: "rect" },
                    { name: 'Median income', icon: "image://" + tuliYellowXuXian }],
                right: 65,
                top: 50,
                textStyle: {
                    color: "#333"
                },
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 14,
            },
            xAxis: [{
                type: 'category',
                // data: this.state.downShowX,
                // data: ["Bronze (15%)", 'New ABO'],
                data: ["15%er", 'New ABO'],
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#425873'

                    }
                },
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        // fontFamily: 'Microsoft YaHei',
                        color: "#333",
                        fontSize: 12,
                    }
                },
                axisTick: {
                    show: false
                }
            },
            /*隐藏一个不显示的横坐标，用作横线的位置*/
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: []
            }],

            yAxis: {
                type: 'value',
                show: false,
                axisTick: {       //y轴刻度线
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#757575'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#333",
                        fontSize: 12
                    }
                },

            },
            series: [
                {
                    name: this.state.prevLegendYear,
                    type: 'bar',
                    barWidth: '40',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#3bedcd'
                            }, {
                                offset: 1,
                                color: '#028971'
                            }]),
                        }

                    },
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['7', '-20'],
                        formatter: function (params) {
                            return params.data
                        },
                        // backgroundColor: 'rgba(38,38,39,0.36)',
                        // borderRadius: 5,
                        // padding: 4,
                        textStyle: {
                            fontSize: 10,
                            color: '#333',
                        }
                    },
                    data: this.state.avgNoPinPbLyShowNowYear,
                },
                {
                    name: this.state.curLegendYear,
                    type: 'bar',
                    barWidth: '40',
                    barGap: 0.3,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#75b2ff'
                            }, {
                                offset: 1,
                                color: '#0159ee'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['7', '-20'],
                        formatter: function (params) {
                            return params.data
                        },
                        // backgroundColor: 'rgba(38,38,39,0.36)',
                        // borderRadius: 5,
                        // padding: 4,
                        textStyle: {
                            fontSize: 10,
                            color: '#333',
                        }
                    },
                    data: this.state.avgNoPinPbShowNowYear,
                },
                // 上边第一个柱子
                {
                    name: 'Median income',
                    type: 'bar',
                    zlevel: 9,
                    stack: 'breakevenEleGroup',
                    barWidth: '40',
                    barGap: 0.3,
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                        }

                    },
                    data: this.state.abo19,
                },
                {
                    /*这个bar是横线的显示*/
                    name: "Median income",
                    stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
                    type: 'bar',
                    zlevel: 9,
                    xAxisIndex: 1,
                    // barGap: 0.4,
                    itemStyle: {
                        normal: {
                            color: '#ffa441',
                            barBorderColor: '#ffa441',
                            barBorderWidth: 2,
                            barBorderRadius: 10,
                            borderType: "dotted"
                        }
                    },
                    data: [1, 1],
                },
                // 下边第二个柱子
                {
                    name: 'Median income',
                    type: 'bar',
                    stack: 'aaa',
                    barWidth: '40',
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                        }

                    },
                    data: this.state.abo20,
                },
                {
                    /*这个bar是横线的显示*/
                    name: "Median income",
                    stack: 'aaa',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
                    type: 'bar',
                    xAxisIndex: 1,
                    // barGap: "0",
                    itemStyle: {
                        normal: {
                            color: '#ffa441',
                            barBorderColor: '#ffa441',
                            barBorderWidth: 2,
                            barBorderRadius: 10,
                            borderType: "dotted"
                        }
                    },
                    data: [1, 1],
                },

            ]
        })
    }
}