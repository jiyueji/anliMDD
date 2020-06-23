import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
require('./styleAll.css')

export default class SegmentsThree extends Component {
    constructor() {
        super();
        this.state = {
            dataSales:{},
            dataPopulation:{},
            dataProductivity:{},
            sheet: 0,
            maxMonthStr: '',

            salesCustomer:[],
            salesPurchasing:[],
            salesDeveloping:[],
            salesBuilding:[],
            salesLeader:[],

            populationCustomer:[],
            populationPurchasing:[],
            populationDeveloping:[],
            populationBuilding:[],
            populationLeader:[],

            productivityCustomer:[],
            productivityPurchasing:[],
            productivityDeveloping:[],
            productivityBuilding:[],
            productivityLeader:[],
        }
    }
    render() {
        var { maxMonthStr } = this.state
        return (
            <Fragment>
                <div style={{width:'100%',height:"100%"}}>
                    <div style={{ paddingLeft: '1%', paddingRight: '1%', height: '58px', display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: "14px", lineHeight: '58px', margin: '0', fontWeight: '700' }}>Segment Trend</h3>
                        <ul className="segmentsNav">
                            <li className="segmentsNav-item segmentsNavActive" onClick={this.switchChart.bind(this, 0)}>Sales($)</li>
                            <li className="segmentsNav-item" onClick={this.switchChart.bind(this, 1)}>Buyer Count</li>
                            <li className="segmentsNav-item" onClick={this.switchChart.bind(this, 2)}>Productivity($)</li>
                        </ul>
                        {/* <div style={{ fontSize: "12px", lineHeight: '58px' }}>As of {maxMonthStr}</div> */}
                    </div>
                    <div style={{ width: "100%", height: "377px", display: 'flex' }}>
                    <div id="segmentsEcharts" style={{ width: "100%", height: "377px" }}></div>
                    </div>
                </div>
            </Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        var {dataSales, dataPopulation,dataProductivity} = nextProps
        this.dateUpdateNowHandle(dataSales, dataPopulation,dataProductivity)
    }
    componentDidMount() {
        var dataSales = this.props.dataSales || {}
        var dataPopulation = this.props.dataPopulation || {}
        var dataProductivity = this.props.dataProductivity || {}
        this.dateUpdateNowHandle(dataSales, dataPopulation,dataProductivity)
    }
    dateUpdateNowHandle(dataSales, dataPopulation,dataProductivity){
        var maxMonthStr = String(hlp.yearMonthToStr(dataSales.maxMonth))

        var salesCustomer = []
        var salesPurchasing = []
        var salesDeveloping = []
        var salesBuilding = []
        var salesLeader = []
        dataSales.segments ? dataSales.segments[0].chartData.map((item,index)=>{
            salesCustomer.push(item.y)
        }) : ""
        dataSales.segments ? dataSales.segments[1].chartData.map((item,index)=>{
            salesPurchasing.push(item.y)
        }) : ""
        dataSales.segments ? dataSales.segments[2].chartData.map((item,index)=>{
            salesDeveloping.push(item.y)
        }) : ""
        dataSales.segments ? dataSales.segments[3].chartData.map((item,index)=>{
            salesBuilding.push(item.y)
        }) : ""
        dataSales.segments ? dataSales.segments[4].chartData.map((item,index)=>{
            salesLeader.push(item.y)
        }) : ""

        var populationCustomer = []
        var populationPurchasing = []
        var populationDeveloping = []
        var populationBuilding = []
        var populationLeader = []
        dataPopulation.segments ? dataPopulation.segments[0].chartData.map((item,index)=>{
            populationCustomer.push(item.y)
        }) : ""
        dataPopulation.segments ? dataPopulation.segments[1].chartData.map((item,index)=>{
            populationPurchasing.push(item.y)
        }) : ""
        dataPopulation.segments ? dataPopulation.segments[2].chartData.map((item,index)=>{
            populationDeveloping.push(item.y)
        }) : ""
        dataPopulation.segments ? dataPopulation.segments[3].chartData.map((item,index)=>{
            populationBuilding.push(item.y)
        }) : ""
        dataPopulation.segments ? dataPopulation.segments[4].chartData.map((item,index)=>{
            populationLeader.push(item.y)
        }) : ""

        var productivityCustomer = []
        var productivityPurchasing = []
        var productivityDeveloping = []
        var productivityBuilding = []
        var productivityLeader = []
        dataProductivity.segments ? dataProductivity.segments[0].chartData.map((item,index)=>{
            productivityCustomer.push(item.y)
        }) : ""
        dataProductivity.segments ? dataProductivity.segments[1].chartData.map((item,index)=>{
            productivityPurchasing.push(item.y)
        }) : ""
        dataProductivity.segments ? dataProductivity.segments[2].chartData.map((item,index)=>{
            productivityDeveloping.push(item.y)
        }) : ""
        dataProductivity.segments ? dataProductivity.segments[3].chartData.map((item,index)=>{
            productivityBuilding.push(item.y)
        }) : ""
        dataProductivity.segments ? dataProductivity.segments[4].chartData.map((item,index)=>{
            productivityLeader.push(item.y)
        }) : ""
        this.setState({
            dataSales,
            salesCustomer,
            salesPurchasing,
            salesDeveloping,
            salesBuilding,
            salesLeader,

            populationCustomer,
            populationPurchasing,
            populationDeveloping,
            populationBuilding,
            populationLeader,

            productivityCustomer,
            productivityPurchasing,
            productivityDeveloping,
            productivityBuilding,
            productivityLeader,

            dataPopulation,
            dataProductivity,
            maxMonthStr,

        }, () => {
            var { sheet } = this.state
            this.echartsShow(sheet)
            // sheet ? this.echartsShow(sheet) : this.echartsShow()
        })
    }
    switchChart(idx, e) {
        var { sheet } = this.state
        sheet = idx;
        this.setState({
            sheet,
        },()=>{
            this.echartsShow(idx)
        })
        var elm = e.currentTarget,
            elmClassList = elm.classList;
        if (elmClassList.contains('segmentsNavActive')) return false;
        var parent = elm.parentElement,
            activeClassList = parent.querySelector('.segmentsNavActive').classList;
        activeClassList.remove('segmentsNavActive');
        elmClassList.add('segmentsNavActive');
        // myChartThree.setOption(chartArray[idx]);

    }
    segmentsHandleEcharts(chartArray, defaultOpt,idIndex) {
                //页面自适应
        var segmentsEchartsWidth = document.getElementById('segmentsEcharts')
        segmentsEchartsWidth.style.width = (window.innerWidth * 0.45) + "px"
        
        var myChartThree = echarts.init(document.getElementById('segmentsEcharts'));
        window.addEventListener('resize', function () {
            myChartThree.resize()
        });
        var idx = 0,
            option = chartArray[idx];
        document.querySelector(`.nav-item:nth-child(${idx + 1})`).classList.add('segmentsNavActive');
        // myChartThree.clear();//把数据完全清除重新加载
        idIndex ? myChartThree.setOption(chartArray[idIndex]) : myChartThree.setOption({ ...defaultOpt, ...option });
    }
    echartsShow(idx) {
        var { sheet } = this.state
        // console.log(sheet)
        var myChartThree,
            defaultOpt = {
                tooltip: {//鼠标移入
                    trigger: 'axis',
                    confine: true,
                    //                 tooltip_data_map:
                    // Jan:
                    // monthName: "2019 January"
                    // actual_sales: "$277m"
                    // actual_sales_ly: "$235m"
                    // sales_forecast: null
                    // events: (3) ["Olive Oil Launch", "Nutrilite XS Jan Promotion", "Olive Oil Experience"]
                    formatter: (data) => {
                        var {sheet} = this.state
                        // console.log(data)
                        var yearThisData = 0;
                        var yearLastData = 0;
                        var forecastData = 0;

                        var customer = 0;
                        var aboPurchasing = 0;
                        var developingAbo = 0;
                        var buildingAbo = 0;
                        var aboLeader = 0;
                        // var nameShow = "";
                        // var toolShow = "";
                        var monthUp = "";
                        // var yearUp = new Date().getFullYear()
                        data.map((item, index) => {
                            // console.log(item.componentIndex)
                            if ("Registered Customers" == item.seriesName) {
                                customer = item.data || ""

                            } else if ("Customer Equivalents" == item.seriesName) {
                                aboPurchasing = item.data || ""

                            } else if ("Developing ABO" == item.seriesName) {
                                developingAbo = item.data || ""

                            } else if ("Building ABO" == item.seriesName) {
                                buildingAbo = item.data || ""

                            } else if ("ABO Leader" == item.seriesName) {
                                aboLeader = item.data || ""

                            }
                            // nameShow = item.name
                            monthUp = item.axisValue
                        })

                        // if (yearThisData) {
                        //     var b = parseInt(yearThisData).toString();
                        //     var len = b.length;
                        //     if (len <= 3) { yearThisData = b; }
                        //     var r = len % 3;
                        //     r > 0 ? yearThisData = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : yearThisData = b.slice(r, len).match(/\d{3}/g).join(",");
                        // }
                        // if (yearLastData) {
                        //     var b = parseInt(yearLastData).toString();
                        //     var len = b.length;
                        //     if (len <= 3) { yearLastData = b; }
                        //     var r = len % 3;
                        //     r > 0 ? yearLastData = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : yearLastData = b.slice(r, len).match(/\d{3}/g).join(",");
                        // }
                        var segmentsThreeAllNumber = customer + aboPurchasing + developingAbo + buildingAbo + aboLeader
                        if(sheet == 0){
                            customer = Math.round(customer / 1000000) + "m" + "(" + Math.round((customer / segmentsThreeAllNumber) * 100) + "%" + ")"
                            aboPurchasing = Math.round(aboPurchasing / 1000000) + "m" + "(" + Math.round((aboPurchasing / segmentsThreeAllNumber) * 100) + "%" + ")"
                            developingAbo = Math.round(developingAbo / 1000000) + "m" + "(" + Math.round((developingAbo / segmentsThreeAllNumber) * 100) + "%" + ")"
                            buildingAbo = Math.round(buildingAbo / 1000000) + "m" + "(" + Math.round((buildingAbo / segmentsThreeAllNumber) * 100) + "%" + ")"
                            aboLeader = Math.round(aboLeader / 1000000) + "m" + "(" + Math.round((aboLeader / segmentsThreeAllNumber) * 100) + "%" + ")"
                        }else if(sheet == 1){
                            customer = Math.round(customer / 1000) + "k"
                            aboPurchasing = Math.round(aboPurchasing / 1000) + "k"
                            developingAbo = Math.round(developingAbo / 1000) + "k"
                            buildingAbo = Math.round(buildingAbo / 1000) + "k"
                            aboLeader = Math.round(aboLeader / 1000) + "k"
                        }else{
                            customer = Math.round(customer / 1)
                            aboPurchasing = Math.round(aboPurchasing / 1)
                            developingAbo = Math.round(developingAbo / 1)
                            buildingAbo = Math.round(buildingAbo / 1)
                            aboLeader = Math.round(aboLeader / 1)
                            // if (customer && customer > 999) {
                            //     var b = parseInt(customer).toString();
                            //     var len = b.length;
                            //     if (len <= 3) { customer = b; }
                            //     var r = len % 3;
                            //     r > 0 ? customer = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : customer = b.slice(r, len).match(/\d{3}/g).join(",");
                            // }
                            // if (aboPurchasing && aboPurchasing > 999) {
                            //     var b = parseInt(aboPurchasing).toString();
                            //     var len = b.length;
                            //     if (len <= 3) { aboPurchasing = b; }
                            //     var r = len % 3;
                            //     r > 0 ? aboPurchasing = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : aboPurchasing = b.slice(r, len).match(/\d{3}/g).join(",");
                            // }
                            // if (developingAbo && developingAbo > 999) {
                            //     var b = parseInt(developingAbo).toString();
                            //     var len = b.length;
                            //     if (len <= 3) { developingAbo = b; }
                            //     var r = len % 3;
                            //     r > 0 ? developingAbo = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : developingAbo = b.slice(r, len).match(/\d{3}/g).join(",");
                            // }
                            // if (buildingAbo && buildingAbo > 999) {
                            //     var b = parseInt(buildingAbo).toString();
                            //     var len = b.length;
                            //     if (len <= 3) { buildingAbo = b; }
                            //     var r = len % 3;
                            //     r > 0 ? buildingAbo = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : buildingAbo = b.slice(r, len).match(/\d{3}/g).join(",");
                            // }
                            // if (aboLeader && aboLeader > 999) {
                            //     var b = parseInt(aboLeader).toString();
                            //     var len = b.length;
                            //     if (len <= 3) { aboLeader = b; }
                            //     var r = len % 3;
                            //     r > 0 ? aboLeader = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : aboLeader = b.slice(r, len).match(/\d{3}/g).join(",");
                            // }
                        }
                        var customerShow = "<div style='color:#4d96f1'>" + "Registered Customers:" + customer + "</div>";
                        var aboPurchasingShow = "<div style='color:#28ccae'>" + "Customer Equivalents:" + aboPurchasing + "</div>";
                        var developingAboShow = "<div style='color:#ffa441'>" + "Developing ABO:" + developingAbo + "</div>";
                        var buildingAboShow = "<div style='color:#eb5653'>" + "Building ABO:" + buildingAbo + "</div>";
                        var aboLeaderShow = "<div style='color:#f3e126'>" + "ABO Leader:" + aboLeader + "</div>";


                        // if (tooltipData && tooltipData[nameShow]) {
                        //     tooltipData[nameShow].events.map((item, index) => {
                        //         toolShow += "<div style='display:flex;justify-content: space-between'><span style='color:#f2df3f'>" + "★" + "</span>" + item + "</div>"
                        //     })
                        // }
                        return "<div style='border-bottom:1px solid #ffffff'>" + monthUp + "</div>" + customerShow + aboPurchasingShow + developingAboShow + buildingAboShow + aboLeaderShow;
                    }
                },
                grid: {
                    left: 20,
                    right: 10,
                    bottom: 75,
                    top: 18,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
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
                            // margin: 14,
                            interval: 0,  //x轴文字全部显示
                            fontSize: 12,
                            // fontFamily: 'ArialMT'
                        },
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec' ]
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
                                var {sheet} = this.state
                                if (sheet == 0) {
                                    return val / 1000000 + 'm';
                                }else if(sheet == 1){
                                    return val / 1000 + 'k';
                                } else if (sheet == 2) {
                                    if (val > 999) {
                                        var b = parseInt(val).toString();
                                        var len = b.length;
                                        if (len <= 3) { val = b; }
                                        var r = len % 3;
                                        r > 0 ? val = b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : val = b.slice(r, len).match(/\d{3}/g).join(",");
                                        return val;
                                    }
                                    return val;
                                }
                                // return val / 1 + 'm';
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#757575'
                            }
                        }
                    }
                ],
                color: ['#4d96f1', '#28ccae', '#ffa441', '#eb5653', '#f3e126'],
                legend: [{
                    type:"plain",
                    left:"center",
                    bottom: 31,
                    icon: 'rect',
                    itemWidth: 10,
                    itemHeight: 10,
                    width:'80%',
                    itemGap: 15,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                    formatter: '{default|{name}}',
                    textStyle: {
                        rich: {
                            default: {
                                // width: 80,
                                color: '#333',
                                fontSize: 12,
                                // padding: [-2, 40, 0, 0]
                                lineHeight:10,
                            }
                        }
                    },
                    data: [
                        'Registered Customers',
                        {
                            name: 'Customer Equivalents',
                            // textStyle: {
                            //     padding: [0, 40]
                            // }
                        },
                    ]
                },{
                    type:"plain",
                    left:"center",
                    bottom: 11,
                    icon: 'rect',
                    itemWidth: 10,
                    itemHeight: 10,
                    width:'80%',
                    itemGap: 15,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                    data: [
                        'Developing ABO',
                        'Building ABO',
                        'ABO Leader'
                    ]
                }]
            },
            chartArray = [
                {
                    series: [
                        {
                            name: 'Registered Customers',
                            type: 'bar',
                            barWidth: 18,
                            stack: 'stack',
                            data: this.state.salesCustomer
                        },
                        {
                            name: 'Customer Equivalents',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.salesPurchasing
                        },
                        {
                            name: 'Developing ABO',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.salesDeveloping
                        },
                        {
                            name: 'Building ABO',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.salesBuilding
                        },
                        {
                            name: 'ABO Leader',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.salesLeader
                        }
                    ]
                }, {
                    series: [
                        {
                            name: 'Registered Customers',
                            type: 'bar',
                            barWidth: 18,
                            stack: 'stack',
                            data: this.state.populationCustomer
                        },
                        {
                            name: 'Customer Equivalents',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.populationPurchasing
                        },
                        {
                            name: 'Developing ABO',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.populationDeveloping
                        },
                        {
                            name: 'Building ABO',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.populationBuilding
                        },
                        {
                            name: 'ABO Leader',
                            type: 'bar',
                            stack: 'stack',
                            data: this.state.populationLeader
                        }
                    ]
                }, {
                    series: [
                        {
                            name: 'Registered Customers',
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
                                        offset: 0, color: '#4d96f180'
                                    }, {
                                        offset: 1, color: '#4d96f100'
                                    }],
                                    global: false
                                }
                            },
                            data: this.state.productivityCustomer
                        },
                        {
                            name: 'Customer Equivalents',
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
                                        offset: 0, color: '#28ccae66'
                                    }, {
                                        offset: 1, color: '#28ccae00'
                                    }],
                                    global: false
                                }
                            },
                            data: this.state.productivityPurchasing
                        },
                        {
                            name: 'Developing ABO',
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
                                        offset: 0, color: '#ffa4414d'
                                    }, {
                                        offset: 1, color: '#ffa44100'
                                    }],
                                    global: false
                                }
                            },
                            data: this.state.productivityDeveloping
                        },
                        {
                            name: 'Building ABO',
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
                                        offset: 0, color: '#eb565333'
                                    }, {
                                        offset: 1, color: '#eb565300'
                                    }],
                                    global: false
                                }
                            },
                            data:this.state.productivityBuilding
                        },
                        {
                            name: 'ABO Leader',
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
                                        offset: 0, color: '#f3e12633'
                                    }, {
                                        offset: 1, color: '#f3e12600'
                                    }],
                                    global: false
                                }
                            },
                            data: this.state.productivityLeader
                        }
                    ]
                }
            ];
        window.addEventListener('resize', function () {
            myChartThree && myChartThree.resize && myChartThree.resize();
        });
        idx ? this.segmentsHandleEcharts(chartArray, defaultOpt,idx) :this.segmentsHandleEcharts(chartArray, defaultOpt)
        
    }
}
