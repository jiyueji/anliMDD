import React, { Component, Fragment } from 'react'
import handPic from "../styles/assets/fiveHand.png"
import handPics from "../styles/assets/fiveHands.png"
import tuliLine from "../styles/assets/tuliLine.jpg"
import tulibackground from "../styles/assets/tulibackground.png"
import echarts from 'echarts';

export default class PicFourChange extends Component {
    constructor() {
        super();
        this.state = {
            allEvents:"Net Sales(MTD)",//下面的可以变化的标题

            data: {},
            data2: {},
            netData: {},
            bvData: {},
            recruitmentDate: {},
            buyerCountsDate: {},
            changeName: [],//切换数据的名字
            elmUpDateBlue: "",//被点击的蓝色的标志

            data3XShow: [],
            data3ThisYear: [],
            data3LastYear: [],
            data3PrevYear: "",
            data3MaxYear: "",
            data3MaxMonth: "",
            pieThreeDataArr: [],//玫瑰图原数据
            pieThreeShowData: [],//玫瑰图加了数据
        }
    }
    render() {
        var { allEvents,netData, bvData, recruitmentDate, buyerCountsDate,changeName,} = this.state
        return (
            <Fragment>
                <div style={{ height: '160px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div className="greenPic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 0)}>
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Net Sales(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>${netData.monthData || 0}m</h3>
                        <div style={{ position: 'absolute', left: "49%", top: "46px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>Target Completion:{netData.lmData || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(netData.lmData > 0 ? "+" + netData.lmData : netData.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "100px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY:{(netData.splyData > 0 ? "+" + netData.splyData : netData.splyData) || 0}%</div>
                    </div>
                    <div className="yellowPic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 1)}>
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Order BV Sales(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>${bvData.monthData || 0}m</h3>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(bvData.lmData > 0 ? "+" + bvData.lmData : bvData.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "102px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY:{(bvData.splyData > 0 ? "+" + bvData.splyData : bvData.splyData) || 0}%</div>
                    </div>
                    <div className="redPic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 2)} >
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Recruitment(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>{recruitmentDate.monthData || 0}k</h3>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(recruitmentDate.lmData > 0 ? "+" + recruitmentDate.lmData : recruitmentDate.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "102px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY:{(recruitmentDate.splyData > 0 ? "+" + recruitmentDate.splyData : recruitmentDate.splyData) || 0}%</div>
                    </div>
                    <div className="bluePic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 3)} >
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Buyer Counts(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>{buyerCountsDate.monthData || 0}k</h3>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(buyerCountsDate.lmData > 0 ? "+" + buyerCountsDate.lmData : buyerCountsDate.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "102px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY:{(buyerCountsDate.splyData > 0 ? "+" + buyerCountsDate.splyData : buyerCountsDate.splyData) || 0}%</div>
                    </div>
                </div>
                <div style={{ width: '100%', height: "340px", background: "#ffffff", borderRadius: "10px", display: "flex" }}>
                    <div style={{ width: '75%', height: "100%", display: "flex", flexWrap: "wrap" }}>
                        <div style={{ paddingLeft: '1%', paddingRight: '1%', height: '58px', display: 'flex' }}>
                            <h3 style={{ fontSize: "12px", lineHeight: '58px', margin: '0', marginRight: "20px", fontWeight: '700' }}>{allEvents}</h3>
                            <ul className="picFourChangeNav">
                                <li className="picFourChangeNav-item picFourChangeNavActive" id="upDateBlueShow" onClick={this.changeDateHandle.bind(this, 0)}>Total</li>
                                {
                                    (changeName && changeName.length >= 0) ? changeName.map((item, index) => {
                                        return <li key={index} className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, index + 1)}>{item}</li>

                                    }) : ""
                                }
                                {/* <li className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, 1)}>Population</li>
                                <li className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, 2)}>Productivity($)</li>
                                <li className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, 2)}>Productivity($)</li> */}
                            </ul>
                        </div>
                        <div id="fourChangeLine" style={{ width: "100%", height: '280px' }}></div>
                    </div>
                    <div style={{ width: '25%', height: "100%", display: "flex" }}>
                        <div id="pieAngleEcharts" style={{ width: "100%", height: '280px' }}></div>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        // tableData: Array(5)
        // 0:
        // n_date: "20200225"
        // agg_type: "Net Sales"
        // sales: 5704194.4262069
        // sales_minus_1d: 3741290.88965517
        // sales_minus_2d: 4251392.66068965
        // mtd_sales: 95514621.1986207
        // pct_mtd_splm: -0.52700492819066
        // pct_mtd_sply: -0.0912532014079843
        var data = this.props.data || {}
        var data2 = this.props.data2 || {}
        var data3 = this.props.data3 || {}
        var changeName = []
        var netData = {}
        var bvData = {}
        // n_date: "20200304"
        // agg_type: "ACCL"
        // sales: 6856868.64214831
        // sales_minus_1d: 6699803.26551114
        // sales_minus_2d: 7425065.32687214
        // mtd_sales: 28009179.4089838
        // pct_mtd_splm: 0.562395147931947
        // pct_mtd_sply: 0.103270530035608
        var pieThreeDataArr = []// 饼图的三个数据
        data.tableData ? data.tableData.map((item, index) => {
            var pieThreeData = {}
            if (item.agg_type == "Net Sales") {
                netData.monthData = Math.round(((item.mtd_sales || 0) / 1000000))
                netData.monthData = netData.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                netData.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                netData.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else if (item.agg_type == "Order BV Sales") {
                bvData.monthData = Math.round(((item.mtd_sales || 0) / 1000000))
                bvData.monthData = bvData.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                bvData.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                bvData.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else {
                changeName.push(item.agg_type)
                // 饼图的三个数据
                pieThreeData.value = Math.round(((item.mtd_sales || 0) / 1000000));
                pieThreeData.name = item.agg_type;
                pieThreeData.lmData = Math.round((item.pct_mtd_splm || 0) * 100);
                pieThreeData.splyData = Math.round((item.pct_mtd_sply || 0) * 100);
                pieThreeDataArr.push(pieThreeData)
            }
        }) : ""

        var pieThreeShowData = []
        var sum = 0, max = 0;

        pieThreeDataArr.forEach(item => {
            sum += item.value
            if (item.value >= max) max = item.value
        })

        // 放大规则
        var number = Math.round(max * 0.5)

        pieThreeShowData = pieThreeDataArr.map(item => {
            return {
                value: number + item.value,
                name: item.name,
                lmData: item.lmData,
                splyData: item.splyData
            }
        })
        // console.log(pieThreeShowData,111)
        var recruitmentDate = {}
        var buyerCountsDate = {}
        // tableData: Array(8)
        // 0:
        // n_date: "20200225"
        // type: "Recruitment"
        // num_population: 120238
        // num_population_minus_1d: 10307
        // num_population_minus_2d: 11403
        // num_population_mtd: 328500
        // pct_mtd_splm: -0.390252956855524
        // pct_mtd_sply: 1.76916073776849
        // date_buyer_count: "20200225"
        // date_recruit_count: "20200225"
        data2.tableData ? data2.tableData.map((item, index) => {
            if (item.type == "Recruitment") {
                recruitmentDate.monthData = Math.round(((item.num_population_mtd || 0) / 1000))
                recruitmentDate.monthData = recruitmentDate.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                recruitmentDate.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                recruitmentDate.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else if (item.type == "Buyer Counts") {
                buyerCountsDate.monthData = Math.round(((item.num_population_mtd || 0) / 1000))
                buyerCountsDate.monthData = buyerCountsDate.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                buyerCountsDate.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                buyerCountsDate.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            }
        }) : ""
        // sales_data: (31)[{ … }]
        // sales_ly_data: (31)[{ … }]
        // maxYearStr: "2020"
        // prevYearStr: "2019"
        // maxMonth: 3
        var data3XShow = []; //X轴的展示
        var data3ThisYear = []; //今年的数据
        var data3LastYear = []; //去年的数据
        var data3PrevYear = data3.prevYearStr || ""; //去年的年
        var data3MaxYear = data3.maxYearStr || ""; //今年的年
        var data3MaxMonth = data3.maxMonth || ""; //现在的月
        data3.sales_data ? data3.sales_data.map((item, index) => {
            item.y ? data3ThisYear.push(Math.round(((item.y || 0) / 1000000))) : ""
        }) : ""
        data3.sales_ly_data ? data3.sales_ly_data.map((item, index) => {
            item.x ? data3XShow.push(item.x) : ""
            item.y ? data3LastYear.push(Math.round(((item.y || 0) / 1000000))) : ""
        }) : ""
        this.setState({
            data,
            data2,
            netData,
            bvData,
            recruitmentDate,
            buyerCountsDate,
            changeName,//切换数据的名字
            data3XShow,
            data3ThisYear,
            data3LastYear,
            data3PrevYear,
            data3MaxYear,
            data3MaxMonth,
            pieThreeDataArr,
            pieThreeShowData,//玫瑰图加了数据的
        }, () => {
            this.echartsShowLine();
            this.pieAngleHandle();
        })
        // console.log(data2)
    }
    //点击图片下面切换数据
    picChangeDateHandle(idx, e) {
        var { data, data2, changeName,allEvents } = this.state
        changeName = []
        if(e.target.childNodes[1].innerHTML){
            allEvents = e.target.childNodes[1].innerHTML
        }
        if (idx == 0) {
            data.tableData ? data.tableData.map((item, index) => {
                if (item.agg_type !== "Net Sales" && item.agg_type !== "Order BV Sales") {
                    changeName.push(item.agg_type)
                }
            }) : ""
        } else if (idx == 1) {
            changeName = []
        } else if (idx == 2) {
            data2.tableData ? data2.tableData.map((item, index) => {
                if (item.type !== "Recruitment" && item.type !== "Buyer Counts") {
                    changeName.push(item.type)
                }
            }) : ""
            changeName.length = 3
        } else if (idx == 3) {
            data2.tableData ? data2.tableData.map((item, index) => {
                if (item.type !== "Recruitment" && item.type !== "Buyer Counts") {
                    changeName.push(item.type)
                }
            }) : ""
            changeName = changeName.slice(3)
        }
        this.setState({
            changeName,allEvents
        }, () => {
            var { elmUpDateBlue } = this.state
            if (elmUpDateBlue) {
                elmUpDateBlue.classList.remove("picFourChangeNavActive");
                document.getElementById("upDateBlueShow").classList.add("picFourChangeNavActive");
            }
        })
    }
    // 点击切换数据
    changeDateHandle(index, e) {
        var elm = e.currentTarget,
            elmClassList = elm.classList;
        if (elmClassList.contains('picFourChangeNavActive')) return false;
        var parent = elm.parentElement,
            activeClassList = parent.querySelector('.picFourChangeNavActive').classList;
        activeClassList.remove('picFourChangeNavActive');
        elmClassList.add('picFourChangeNavActive');
        this.setState({
            elmUpDateBlue: elm,
        })
    }
    // 可以切换的折线图Echarts
    echartsShowLine(idx) {
        var myChartThree,
            defaultFourOpt = {
                grid: {
                    left: 20,
                    right: 20,
                    bottom: 55,
                    top: 30,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.state.data3XShow,
                        axisTick: {
                            show: false //隐藏X轴刻度
                        },
                        axisLine: {
                            show: false,
                        },
                        boundaryGap: false,//X轴刻度位置
                        axisLabel: {
                            interval: 0,//x轴文字显示不全
                            textStyle: {
                                fontSize: 12,
                                color: '#333'
                            },
                            formatter: function (params) {
                                return params.split(' ')[0]
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 12,
                            fontFamily: 'ArialMT',
                            formatter: (val) => {
                                return val / 1 + 'm';
                            }
                            // formatter: (val) => {
                            //     var { sheet } = this.state
                            //     if (sheet == 0) {
                            //         return val / 1000000 + 'm';
                            //     } else if (sheet == 1) {
                            //         return val / 1000 + 'k';
                            //     } else if (sheet == 2) {
                            //         if (val > 999) {
                            //             var b = parseInt(val).toString();
                            //             var len = b.length;
                            //             if (len <= 3) { val = b; }
                            //             var r = len % 3;
                            //             r > 0 ? val = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : val = b.slice(r, len).match(/\d{3}/g).join(",");
                            //             return val;
                            //         }
                            //         return val;
                            //     }
                            //     return val / 1 + 'm';
                            // }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#757575'
                            }
                        }
                    }
                ],
                // color: ['#4d96f1', '#28ccae', '#ffa441', '#eb5653', '#f3e126'],
                legend: {
                    left: '30%',
                    bottom: 25,
                    // icon: 'rect',
                    itemWidth: 20,
                    itemHeight: 12,
                    itemGap: 190,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                    // formatter: '{default|{name}}',
                    data: [
                        { name: this.state.data3MaxMonth + "/" + this.state.data3MaxYear, icon: "image://" + tuliLine },
                        { name: this.state.data3MaxMonth + "/" + this.state.data3PrevYear, icon: "image://" + tulibackground }
                    ],
                    // textStyle: {
                    //     rich: {
                    //         default: {
                    //             width: 80,
                    //             color: '#333',
                    //             fontSize: 12,
                    //             padding: [-2, 10, 0, 0]
                    //         }
                    //     }
                    // },
                    // data: [
                    //     'Customer',
                    //     {
                    //         name: 'ABO (Purchasing Only)',
                    //         textStyle: {
                    //             padding: [0, 70, 0, 0]
                    //         }
                    //     },
                    //     'Developing ABO',
                    //     'Building ABO',
                    //     'ABO Leader'
                    // ]
                }
            },
            chartArray = [
                {
                    series: [
                        {
                            name: this.state.data3MaxMonth + "/" + this.state.data3MaxYear,
                            data: this.state.data3ThisYear,
                            animationDuration: 2000,
                            type: 'line',
                            smooth: true,
                            // symbol:"triangle",
                            // symbol: (value) => {
                            //     // console.log(value)
                            //     var showSymbol = "circle"
                            //     tooltipData.map((item, index) => {
                            //         if (item.y == value) {
                            //             showSymbol = "triangle";
                            //         }
                            //     })
                            //     return showSymbol
                            // }, //去掉折线点
                            symbolSize: 8, //折线点的大小
                            // label: {
                            //     show: true,
                            //     // position: 'top',
                            //     position: ['-40', '-50'],
                            //     formatter: (params) => {
                            //         var showMonth = ""
                            //         var showAct = ""
                            //         var showDes = ""
                            //         // tooltipData.map((item,index)=>{
                            //             if(toolSolid.x && toolSolid.x == params.name){
                            //                 showMonth = toolSolid.xMonth;
                            //                 showAct = toolSolid.Activity;
                            //                 showDes = toolSolid.Description;
                            //             }
                            //         // })
                            //         if(showMonth){
                            //             return showMonth + "\n" + showDes
                            //         }else{
                            //             return ""
                            //         }

                            //     },
                            //     backgroundColor: 'rgba(38,38,39,0.6)',
                            //     borderRadius: 5,
                            //     // padding: 4,
                            //     textStyle: {
                            //         fontSize: 13,
                            //         color: '#ffffff',
                            //     }
                            // },
                            // stack: 100,
                            itemStyle: {
                                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                                    color: "#ffffff",
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid',
                                        color: "#4d96f1"//折现颜色
                                    },
                                    borderColor: '#4d96f1',  // 拐点边框颜色
                                },

                            }, //线条样式
                        },
                        {
                            name: this.state.data3MaxMonth + "/" + this.state.data3PrevYear,
                            data: this.state.data3LastYear,
                            type: 'line',
                            smooth: true,
                            symbol: "none", //去掉折线点
                            symbolSize: 5, //折线点的大小
                            stack: 100,
                            itemStyle: {
                                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: 'rgba(239,239,240)', //背景渐变色
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 0.5,
                                        type: 'solid',
                                        color: "rgba(239,239,240)"//折现颜色
                                    }
                                },
                            }, //线条样式
                            areaStyle: {
                                normal: {}
                            },
                        }
                    ]
                }, {
                    series: [

                    ]
                }, {
                    series: [

                    ]
                }
            ];
        idx ? this.segmentsHandleEcharts(chartArray, defaultFourOpt, idx) : this.segmentsHandleEcharts(chartArray, defaultFourOpt)
    }
    segmentsHandleEcharts(chartArray, defaultOpt, idIndex) {
        //页面自适应
        var fourChangeLineWidth = document.getElementById('fourChangeLine')
        fourChangeLineWidth.style.width = (window.innerWidth * 0.72) + "px"

        var myChartThree = echarts.init(document.getElementById('fourChangeLine'));
        window.addEventListener('resize', function () {
            myChartThree && myChartThree.resize && myChartThree.resize();
        });
        var idx = 0,
            option = chartArray[idx];
        document.querySelector(`.nav-item:nth-child(${idx + 1})`).classList.add('segmentsNavActive');
        idIndex ? myChartThree.setOption(chartArray[idIndex]) : myChartThree.setOption({ ...defaultOpt, ...option });
    }
    pieAngleHandle() {
        //页面自适应
        var pieAngleWidth = document.getElementById('pieAngleEcharts')
        pieAngleWidth.style.width = (window.innerWidth * 0.24) + "px"

        var pieAngleEcharts = echarts.init(pieAngleWidth);
        window.addEventListener('resize', function () {
            pieAngleEcharts.resize();
        });
        pieAngleEcharts.setOption({
            // backgroundColor: '#2c343c',
            tooltip: {
                trigger: 'item',
                formatter: (data) => {
                    // pieThreeData.value = Math.round(((item.mtd_sales || 0) / 1000000));
                    // pieThreeData.name = item.agg_type;
                    // pieThreeData.lmData = Math.round((item.pct_mtd_splm || 0) * 100);
                    // pieThreeData.splyData = Math.round((item.pct_mtd_sply || 0) * 100);
                    var { pieThreeDataArr } = this.state;
                    var pieIndex = pieThreeDataArr[data.dataIndex];
                    var namePie = pieIndex.name;
                    var valuePie = "Month to date($):" + pieIndex.value + "m";
                    if (pieIndex.lmData >= 0) {
                        var lmData = "<span style='color:red'>" + "-" + pieIndex.lmData + "%" + "</span>"
                    } else {
                        var lmData = "<span style='color:green'>" + "+" + pieIndex.lmData + "%" + "</span>"
                    }
                    if (pieIndex.splyData >= 0) {
                        var splyData = "<span style='color:red'>" + "-" + pieIndex.splyData + "%" + "</span>"
                    } else {
                        var splyData = "<span style='color:green'>" + "+" + pieIndex.splyData + "%" + "</span>"
                    }
                    var lmDataPie = "MTD % changevs last month:" + lmData;
                    var splyDataPie = "MTD % changevs SPLY:" + splyData;
                    return namePie + "</br>" + valuePie + "</br>" + lmDataPie + "</br>" + splyDataPie
                    // console.log(data.dataIndex)
                }
            },
            legend: {
                orient: 'vertical',
                right: 20,
                bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
                data: ['ACCL', '3E', 'ECOM']
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: this.state.pieThreeShowData,
                    roseType: 'angle',
                    color: ["#5599ea", '#76b9fc', '#c6e2fa'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        // emphasis: {
                        //     show: false,
                        //     textStyle: {
                        //         fontSize: '12',
                        //         fontWeight: 'bold'
                        //     }
                        // }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },

                }
            ]
        })
    }
}
