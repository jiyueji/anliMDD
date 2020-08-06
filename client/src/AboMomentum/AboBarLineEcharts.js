import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import TitleModify from "../components/TitleModify.js"

export default class AboBarLineEcharts extends Component {
    constructor() {
        super();
        this.state = {
            nowColorAbo: false,
            clickShow: true,
            showXShow: [],

            csi_per_earner_blueData: [],
            csi_earner_redData: [],
            vcs_sales_bv_data: [],
            foa_sales_bv_data: [],
            total_sales_bv_data: [],
            object_ytd_data: {},
            vcs_sales_bv_ShowNow: [],
            foa_sales_bv_ShowNow: [],
            NOW_MAXDATEPF: "",
            modifyDateModify:""
        }
    }
    render() {
        var { clickShow, object_ytd_data,modifyDateModify } = this.state
        return (
            <Fragment>
                <div className="modifyAllTitle">
                    <TitleModify titleName={'CSI'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub3"} keys={"CSI"} modifyDate={modifyDateModify} />
                </div>
                {/* <div style={{ position: "absolute", left: ' 3%', top: '4%', fontSize: '14px', fontWeight: '600' }}>CSI</div> */}
                <div className="salesButt" onClick={this.AboBarLineEchartshandleClick.bind(this)}>
                    <span className="salesButt-ytd">Sales BV Mix</span>
                    <span className="salesButt-Monthly">Income</span>
                </div>
                {
                    clickShow ? <div style={{ position: "absolute", width: "100%", }}>
                        <div style={{ width: "100%", height: "109px", display: 'flex'}}>
                            {/* <div style={{ position: "absolute", top: "20%", left: "25%", fontSize: "16px", fontWeight: "600" }}>YTD Mthly Avg.<br></br>Sales BV Mix</div> */}
                            <div id="aboBvMixEcharts" style={{ width: "100%", height: "109px" }}></div>
                            {/* <div style={{ position: "absolute", top: "5%", right: "7%", fontSize: "12px", lineHeight: "20px", textAlign: "right" }}>
                                <div>Note: FOA / Total :{object_ytd_data.foa_sales_bv_ShowNowOne}%</div>
                                <div>VCS / Total :{object_ytd_data.vcs_sales_bv_ShowNowOne}%</div>
                            </div> */}
                        </div>
                        <div style={{ position: "absolute", left: ' 3%', top: '27%', fontSize: '12px', color: "#333" }}>Monthly Sales BV ($)</div>
                        <div style={{ width: "100%", height: "253px", display: 'flex' }}>
                            <div id="aboBvMixEcharts2" style={{ width: "100%", height: "253px" }}></div>
                        </div>
                    </div> : <div style={{ position: "absolute", width: "100%", }}>
                            <div style={{ position: "absolute", left: ' 3%', top: '12%', fontSize: '14px', color: "#333" }}>Mthly Trend</div>
                            <div style={{ width: "100%", height: "362px", display: 'flex' }}>
                                <div id="aboBarLineEcharts" style={{ width: "80%", height: "362px" }}></div>
                                <div id="aboBarLineEcharts2" style={{ width: "20%", height: "362px" }}></div>
                            </div>
                        </div>
                }
            </Fragment>
        )
    }
    AboBarLineEchartshandleClick(e) {
        var { nowColorAbo, clickShow } = this.state
        if (nowColorAbo !== e.target && nowColorAbo) {
            clickShow = !clickShow
        } else if (!nowColorAbo) {
            clickShow = false
        }
        if (nowColorAbo) {
            nowColorAbo.style.background = "#f7f8fa";
            nowColorAbo.style.color = "#333"
        } else {
            if (e.target.innerHTML === "Income") {
                e.target.previousSibling.style.background = "#f7f8fa";
                e.target.previousSibling.style.color = "#333";
            }
        }
        nowColorAbo = e.target
        nowColorAbo.style.background = "#5198ee";
        nowColorAbo.style.color = "#ffffff"
        this.setState({
            nowColorAbo, clickShow
        }, () => {
            var { clickShow } = this.state
            if (clickShow) {
                this.aboBvMixEchartsHandle1()
                this.aboBvMixEchartsHandle2()
            } else {
                this.aboBarLineEchartsHandle()
                this.aboBarLineEchartsHandle2()
            }
        })
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
        var { YTD_DATA, CSI_AMT, CSI_COUNT, QUALIF_CSI_SR, TOTAL_ORDER_BV, FOA_ORDER_BV_1B, VCS_AMT, NOW_MAXDATE, NOW_MAXDATEPF, DatePicker } = data
        var showXShow = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',]
        if (DatePicker < 9) {
            showXShow = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',]
        }
        var csi_per_earner_blueData = []
        var csi_earner_redData = []
        var vcs_sales_bv_data = VCS_AMT || []
        var foa_sales_bv_data = FOA_ORDER_BV_1B || []
        var total_sales_bv_data = TOTAL_ORDER_BV || []
        CSI_COUNT && CSI_COUNT.length >= 0 ? CSI_COUNT.map((item, index) => {
            csi_per_earner_blueData.push(Math.round(CSI_AMT[index] / item))
            csi_earner_redData.push(((item / QUALIF_CSI_SR[index]) * 100).toFixed(1))
            // vcs_sales_bv_data.push(VCS_AMT[index])
            // foa_sales_bv_data.push(FOA_ORDER_BV_1B[index])
            // total_sales_bv_data.push(Math.round(TOTAL_ORDER_BV[index]))
        }) : ""
        var vcs_sales_bv_ShowNow = []
        var foa_sales_bv_ShowNow = []
        TOTAL_ORDER_BV && TOTAL_ORDER_BV.length >= 0 > TOTAL_ORDER_BV.map((item, index) => {
            vcs_sales_bv_ShowNow.push(VCS_AMT[index] / item)
            foa_sales_bv_ShowNow.push(FOA_ORDER_BV_1B[index] / item)
        })
        var object_ytd_data = {}
        YTD_DATA && YTD_DATA.length >= 0 ? YTD_DATA.map((item, index) => {
            if (item.kpi_code == "CSI_AMT") {
                object_ytd_data.CSI_AMT = item.kpi_cy_values
            } else if (item.kpi_code == "CSI_COUNT") {
                object_ytd_data.CSI_COUNT = item.kpi_cy_values
            } else if (item.kpi_code == "QUALIF_CSI_SR_PPV") {
                object_ytd_data.QUALIF_CSI_SR = item.kpi_cy_values
            } else if (item.kpi_code == "TOTAL_ORDER_BV") {
                object_ytd_data.TOTAL_ORDER_BV = item.kpi_cy_values
            } else if (item.kpi_code == "FOA_ORDER_BV_1B") {
                object_ytd_data.FOA_ORDER_BV_1B = item.kpi_cy_values
            } else if (item.kpi_code == "VCS_AMT") {
                object_ytd_data.VCS_AMT = item.kpi_cy_values
            }
        }) : ""
        object_ytd_data.csi_per_earner_blueDataOne = Math.round(object_ytd_data.CSI_AMT / object_ytd_data.CSI_COUNT)
        object_ytd_data.csi_earner_redDataOne = ((object_ytd_data.CSI_COUNT / object_ytd_data.QUALIF_CSI_SR) * 100).toFixed(1)
        object_ytd_data.vcs_sales_bv_ShowNowOne = ((object_ytd_data.VCS_AMT / object_ytd_data.TOTAL_ORDER_BV) * 100).toFixed(1)
        object_ytd_data.foa_sales_bv_ShowNowOne = ((object_ytd_data.FOA_ORDER_BV_1B / object_ytd_data.TOTAL_ORDER_BV) * 100).toFixed(1)
        object_ytd_data.vcsAddFoa = Number(object_ytd_data.vcs_sales_bv_ShowNowOne) + Number(object_ytd_data.foa_sales_bv_ShowNowOne)

        // //取Y轴最大值（用数组中最大的值去变成整百数来实现）
        // var maxYShow = csi_per_earner_blueData[0];
        // for (var i = 1; i < csi_per_earner_blueData.length; i++) {
        //     var cur = csi_per_earner_blueData[i];
        //     cur > maxYShow ? maxYShow = cur : null
        // }
        // const formatInt = (num, prec) => {
        //     const len = String(num).length;
        //     if (len <= prec) { return num };

        //     const mult = Math.pow(10, prec);

        //     return Math.ceil(num / mult) * mult;

        // }
        // maxYShow = formatInt(maxYShow, String(maxYShow).length - 1)
        var modifyDateModify = NOW_MAXDATE
        this.setState({
            csi_per_earner_blueData, csi_earner_redData, vcs_sales_bv_data, foa_sales_bv_data, total_sales_bv_data, object_ytd_data, vcs_sales_bv_ShowNow, foa_sales_bv_ShowNow, NOW_MAXDATEPF, showXShow,modifyDateModify
        }, () => {
            this.aboBvMixEchartsHandle1()
            this.aboBvMixEchartsHandle2()
        })
    }
    aboBarLineEchartsHandle() {
        //页面自适应
        var aboBarLineEchartsWidth = document.getElementById('aboBarLineEcharts')
        aboBarLineEchartsWidth.style.width = (window.innerWidth * 0.35) + "px"

        var aboBarLineEcharts = echarts.init(document.getElementById('aboBarLineEcharts'));
        window.addEventListener('resize', function () {
            aboBarLineEcharts.resize()
        });
        aboBarLineEcharts.clear()
        aboBarLineEcharts.setOption({
            animationDuration: 0,
            grid: {
                top: '25%',
                left: '4%',
                right: '0',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.showXShow,
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
                            return params / 1
                        }
                    },
                    axisLine: {//隐藏X轴
                        show: false
                    },
                    boundaryGap: [0, '100%'],
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
            legend: {
                type: "plain",
                left: 'center',
                bottom: 16,
                // icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                // itemGap: 30,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    { name: 'CSI per Earner ($)', icon: 'rect' },
                    { name: 'CSI earner % of total eligible earner', icon: "line" }
                ],
            },
            series: [
                {
                    name: 'CSI per Earner ($)',
                    type: 'bar',
                    barWidth: 20,
                    yAxisIndex: 0,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#99c8ff'
                            }, {
                                offset: 1,
                                color: '#559bf1'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        // formatter: (val) => {
                        //     var value = Math.round((val.data / 1000))
                        //     var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        //     return valueShow + "k"
                        // },
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff',
                        }
                    },
                    data: this.state.csi_per_earner_blueData,
                },
                {
                    name: 'CSI earner % of total eligible earner',
                    data: this.state.csi_earner_redData,
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
                        // backgroundColor: '#ec5453',
                        // borderRadius: 5,
                        // padding: 4,
                        textStyle: {
                            fontSize: 12,
                            color: '#ec5453',
                        }
                    },
                    // stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#ec5453"//折现颜色
                            },
                            borderColor: '#ec5453',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
    aboBarLineEchartsHandle2() {
        //页面自适应
        var aboBarLineEcharts2Width = document.getElementById('aboBarLineEcharts2')
        aboBarLineEcharts2Width.style.width = (window.innerWidth * 0.12) + "px"

        var aboBarLineEcharts2 = echarts.init(document.getElementById('aboBarLineEcharts2'));
        window.addEventListener('resize', function () {
            aboBarLineEcharts2.resize()
        });
        aboBarLineEcharts2.setOption({
            grid: {
                top: '25%',
                left: '0%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [this.state.NOW_MAXDATEPF + ' YTD Mthly Avg'],
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
                        show: false,
                        textStyle: {
                            color: "#333"
                        },
                        formatter: function (params) {
                            return params / 1
                        }
                    },
                    boundaryGap: [0, '100%'],
                    // min: 0,
                    // max:this.state.maxYShow,
                    nameGap: 10,
                    axisLine: {//隐藏X轴
                        show: true,
                        lineStyle: {
                            color: "e7e8ea",
                            type: 'dashed',
                        }
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
                        show: false,
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
            series: [
                {
                    name: 'CSI per Earner',
                    type: 'bar',
                    yAxisIndex: 0,
                    barWidth: 20,
                    stack: 'stack',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ffa441'
                            }, {
                                offset: 1,
                                color: '#ffa441'
                            }]),
                        },
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        // formatter: (val) => {
                        //     var value = Math.round((val.data / 1000))
                        //     var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        //     return valueShow + "k"
                        // },
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff',
                        }
                    },
                    data: [this.state.object_ytd_data.csi_per_earner_blueDataOne],
                },
                {
                    name: 'CSI earner % of total eligible earner',
                    data: [this.state.object_ytd_data.csi_earner_redDataOne],
                    yAxisIndex: 1,
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    label: {
                        show: true,
                        position: 'right',
                        // position: ['-10', '-20'],
                        formatter: function (params) {
                            return params.data + "%"
                        },
                        backgroundColor: '#ec5453',
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
                                width: 5,
                                type: 'solid',
                                color: "#ec5453"//折现颜色
                            },
                            borderColor: '#ec5453',  // 拐点边框颜色
                        },
                    }, //线条样式
                }
            ],
        })
    }
    aboBvMixEchartsHandle2() {
        var aboBvMixEchartsWidth2 = document.getElementById('aboBvMixEcharts2')
        aboBvMixEchartsWidth2.style.width = (window.innerWidth * 0.48) + "px"

        var aboBvMixEcharts2 = echarts.init(document.getElementById('aboBvMixEcharts2'));
        window.addEventListener('resize', function () {
            aboBvMixEcharts2.resize()
        });
        aboBvMixEcharts2.setOption({
            grid: {
                top: '6%',
                left: '4%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.showXShow,
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
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#333"
                    },
                    formatter: (val) => {
                        var val = val / 1000000;
                        if (val > 999) {
                            var b = parseInt(val).toString();
                            var len = b.length;
                            if (len <= 3) { val = b; }
                            var r = len % 3;
                            r > 0 ? val = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : val = b.slice(r, len).match(/\d{3}/g).join(",");
                            return val + "m";
                        }
                        return val + "m";
                    }
                },
                axisLine: {//隐藏X轴
                    show: false
                },
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
            color: ['#5497f2', '#28cdad', '#fea443'],
            series: [
                {
                    name: 'VCS Sales BV',
                    type: 'line',
                    // stack: 'stack',
                    label: {
                        show: true,
                        position: 'bottom',
                        formatter: (params) => {
                            var { vcs_sales_bv_ShowNow } = this.state
                            var showVcs = Math.round(vcs_sales_bv_ShowNow[params.dataIndex] * 100) + "%"
                            return showVcs
                        },
                        textStyle: {
                            // fontSize: 8,
                            color: '#5497f2',
                        }
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#aad3f1'
                            }, {
                                offset: 1, color: '#d1e9f5'
                            }],
                            global: false
                        }
                    },
                    data: this.state.vcs_sales_bv_data
                },
                {
                    name: 'FOA Sales BV',
                    type: 'line',
                    // stack: 'stack',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params) => {
                            var { foa_sales_bv_ShowNow } = this.state
                            var showFoa = Math.round(foa_sales_bv_ShowNow[params.dataIndex] * 100) + "%"
                            return showFoa
                        },
                        textStyle: {
                            // fontSize: 8,
                            color: '#28cdad',
                        }
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#bbede1'
                            }, {
                                offset: 1, color: '#bbede1'
                            }],
                            global: false
                        }
                    },
                    data: this.state.foa_sales_bv_data
                },
                {
                    name: 'Total Sales BV',
                    type: 'line',
                    // stack: 'stack',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#ffe8d0'
                            }, {
                                offset: 1, color: '#ffecdb'
                            }],
                            global: false
                        }
                    },
                    data: this.state.total_sales_bv_data
                }
            ],
            legend: {
                type: "plain",
                icon: "line",
                left: 'center',
                bottom: 5,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 30,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            },
        })
    }
    aboBvMixEchartsHandle1() {
        var aboBvMixEchartsWidth = document.getElementById('aboBvMixEcharts')
        aboBvMixEchartsWidth.style.width = (window.innerWidth * 0.48) + "px"

        var aboBvMixEcharts = echarts.init(document.getElementById('aboBvMixEcharts'));
        window.addEventListener('resize', function () {
            aboBvMixEcharts.resize()
        });
        aboBvMixEcharts.setOption({
            title: {
                "text": this.state.NOW_MAXDATEPF + "YTD",
                "x": "center",
                "y": "5%",
                "textStyle": {
                    "color": "#333",
                    "fontSize": 12,
                    "fontWeight": "600",
                    "align": "center",
                    "width": "200px"
                },
            },
            color: ['#4e9bed', '#29ccaf', 'rgba(239,163,62,0.8)'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    hoverAnimation: false,
                    width: "20%",
                    left: "center",
                    top: "30%",
                    selectedMode: 'single',
                    radius: [0, this.state.object_ytd_data.vcs_sales_bv_ShowNowOne + "%"],
                    label: {
                        show: true,
                        position: 'center',
                        formatter: (params) => {
                            return Math.round(this.state.object_ytd_data.vcs_sales_bv_ShowNowOne) + "%"
                        },
                        textStyle: {
                            fontSize: 10,
                            color: '#ffffff',
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.state.object_ytd_data.vcs_sales_bv_ShowNowOne, name: 'VCS Sales BV' }
                    ]
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    hoverAnimation: false,
                    width: "20%",
                    left: "center",
                    top: "30%",
                    radius: [this.state.object_ytd_data.vcs_sales_bv_ShowNowOne + "%", this.state.object_ytd_data.vcsAddFoa + "%"],
                    data: [
                        { value: this.state.object_ytd_data.vcsAddFoa, name: 'FOA Sales BV' },
                    ],
                    label: {
                        show: true,
                        position: 'inner',
                        formatter: (params) => {
                            return Math.round(this.state.object_ytd_data.foa_sales_bv_ShowNowOne) + "%"
                        },
                        textStyle: {
                            fontSize: 10,
                            color: '#ffffff',
                        }
                    },
                    labelLine: {
                        show: false
                    },
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    hoverAnimation: false,
                    width: "20%",
                    left: "center",
                    top: "30%",
                    labelLine: {
                        show: false
                    },
                    radius: [this.state.object_ytd_data.vcsAddFoa + "%", '100%'],
                    data: [
                        { value: this.state.object_ytd_data.vcsAddFoa, name: 'Total Sales BV' },
                    ]
                }
            ],
            // legend: {
            //     orient: 'vertical',
            //     "textStyle": {
            //         "color": "#333",
            //         // "fontSize": 16
            //     },
            //     "icon": "circle",
            //     "right": "5%",
            //     "bottom": "0",
            //     // "padding": [30, 60],
            //     "itemGap": 10,
            //     "data": ["VCS Sales BV", "FOA Sales BV", "Total Sales BV"]
            // },
        })
    }
}