import React, { Component, Fragment } from 'react'
import echarts from "echarts"
import * as hlp from './Helper'
// 引入图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class EchartsFCWaterfall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxMonthStr: "",
            oldData: [300, 450, 770, 203, 255, 188, 156],
            data: [],
            echX: [],
            echY: [],
            totalSales: [],
            showAllData: [],
            falgDataTwo:false,
        }
    }
    render() {
        var { maxMonthStr } = this.state
        return (
            <Fragment>
                <div className="fcWaterFallTitle">YTD Variance Contribution by FC <span>(by performance year)</span></div>
                <div style={{ position: "absolute", top: 15, right: 60, zIndex: 1, color: "#666", fontSize: 12 }}>As of {maxMonthStr}</div>
                {/* <div style={{ background: "yellow", position: "absolute", top: 5, right: 100, zIndex: 1 }} onClick={this.handleChange2.bind(this)}>还原</div> */}
                <div id="main"
                    style={{ width: "100%", height: "100%", background: "#ffffff", marginBottom: "36px", position: "relative" }}
                ></div>
                <div className="mapSortLastData" onClick={this.mapSortLastDataHandler.bind(this)}></div>
            </Fragment>
        )
    }
    mapSortLastDataHandler() {
        var { falgDataTwo,data, datas, echX, echY, totalSales, showAllData } = this.state
        echX = [];
        echY = [];
        totalSales = [];
        showAllData = [];
        if(falgDataTwo){
            if (data || data.length > 0) {
                data.map((item, index) => {
                    echX.push(item.x)
                    echY.push(item.val)
                })
            }
            if (datas || datas.length > 0) {
                datas.map((item, index) => {
                    for (var i = 0; i < datas.length; i++) {
                        var obj = {}
                        if (datas[i].fc_group === echX[index]) {
                            // console.log(index,echX[index],datas[i].fc_group,datas[i].total_sales_sum)
                            totalSales.push(datas[i].total_sales_sum)
                            obj.name = datas[i].fc_group || "";
                            obj.salesVsSply = datas[i].sales_vs_sply || 0;
                            obj.percOfTotalSales = datas[i].perc_of_total_sales || 0;
                            showAllData.push(obj)
                        }
                    }
                })
            }
        }else{
            datas.sort((a, b) => {
                return b.total_sales_sum - a.total_sales_sum;
            })
            if (datas || datas.length > 0) {
                datas.map((item, index) => {
                    var obj = {}
                    echX.push(item.fc_group)
                    totalSales.push(item.total_sales_sum)
                    obj.name = item.fc_group || "";
                    obj.salesVsSply = item.sales_vs_sply || 0;
                    obj.percOfTotalSales = item.perc_of_total_sales || 0;
                    showAllData.push(obj)
                })
            }
            if (data || data.length > 0) {
                data.map((item, index) => {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].x === echX[index]) {
                            echY.push(data[i].val)
                        }
                    }
                })
            }
        }
        falgDataTwo = !falgDataTwo
        this.setState({
            data,
            datas,
            echX,
            echY,
            totalSales,
            showAllData,
            falgDataTwo,
        }, () => {
            this.handleEcharts()
        })
    }
    componentDidMount() {
        var data = this.props.data.data || []
        var datas = this.props.datas.data || []
        var maxMonthStr = String(hlp.yearMonthToStr(this.props.data.maxMonth))
        var echX = [];
        var echY = [];
        var totalSales = [];
        var showAllData = [];
        if (data || data.length > 0) {
            data.map((item, index) => {
                echX.push(item.x)
                echY.push(item.val)
            })
        }
        if (datas || datas.length > 0) {
            datas.map((item, index) => {
                for (var i = 0; i < datas.length; i++) {
                    var obj = {}
                    if (datas[i].fc_group === echX[index]) {
                        // console.log(index,echX[index],datas[i].fc_group,datas[i].total_sales_sum)
                        totalSales.push(datas[i].total_sales_sum)
                        obj.name = datas[i].fc_group || "";
                        obj.salesVsSply = datas[i].sales_vs_sply || 0;
                        obj.percOfTotalSales = datas[i].perc_of_total_sales || 0;
                        showAllData.push(obj)
                    }
                }
            })
        }
        this.setState({
            data,
            datas,
            echX,
            echY,
            totalSales,
            showAllData,
            maxMonthStr,
        }, () => {
            this.handleEcharts()
        })
    }
    handleEcharts() {
        var myChart = echarts.init(document.getElementById('main'));
        window.addEventListener('resize', function () {
            myChart.resize()
        });
        myChart.setOption({
            // backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value) => {
                    var name = "total";
                    var salesVsSply = "";
                    var percOfTotalSales = "";
                    for (var i = 0; i < this.state.showAllData.length; i++) {
                        if (this.state.showAllData[i].name === value[0].name) {
                            name = this.state.showAllData[i].name;
                            salesVsSply = this.state.showAllData[i].salesVsSply;
                            percOfTotalSales = "% of total sales:" + this.state.showAllData[i].percOfTotalSales
                        }
                    }
                    if (salesVsSply) {
                        salesVsSply = salesVsSply.replace(/%/g, '')
                        if (Number(salesVsSply) >= 0) {
                            salesVsSply = "Sales vs SPLY:" + "<span style='color:#17b6a9'>" + salesVsSply + "%" + "</span>"
                        } else {
                            salesVsSply = "Sales vs SPLY:" + "<span style='color:#fd0022'>" + salesVsSply + "%" + "</span>"
                        }
                    }
                    // console.log(value,this.state.showAllData)
                    return "<div style='border-bottom:1px solid #ffffff'>" + name + "</div>" + percOfTotalSales + "<br/>" + salesVsSply
                },
            },
            grid: {
                top: '60',
                right: '20',
                left: '10',
                bottom: '13%',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                data: this.state.echX,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)'
                    }
                },
                axisLabel: {
                    formatter: function (value) {
                        // 去掉字符串多余的中间的空白
                        var repStr = "";
                        for (var i = 0; i < value.length; i++) {
                            if (value.substring(i, i + 1) != " ")
                                repStr = repStr + value.substring(i, i + 1);
                            else {
                                if (repStr.substring(repStr.length - 1, repStr.length) != " ") {
                                    repStr = repStr + " ";
                                }
                            }
                        }
                        return repStr.split("").join("\n")
                        // return value.split("").join("\n")
                    },
                    interval: 0,
                    color: '#666',
                    textStyle: {
                        fontSize: 11
                    },
                },
            }],
            yAxis: [{
                axisLabel: {
                    formatter: (value) => {
                        var val = ((value || 0) / 1000000)
                        return val + "m"
                    },
                    color: '#666',
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#e5e9ee'
                    }
                }
            }],
            series: [{
                name: "Sales by FC Group",
                type: 'bar',
                data: this.state.totalSales,
                barWidth: '15px',
                barGap: '-100%',//向左平移100%假装堆叠
                // barCategoryGap: '20%',  // 柱形的间距
                itemStyle: {
                    normal: {
                        color: "#5198ee",
                    }
                },
                label: {
                    normal: {
                        show: true,
                        rotate: 0,  // 旋转角度
                        position: 'top', // 相对位置
                        formatter: (value) => {
                            var val = ((value.data || 0) / 1000000).toFixed(1)
                            return val + "m"
                        },
                    }
                }
            }, {
                name: "Increase",
                type: 'bar',
                data: this.state.echY,
                barWidth: '15px',
                stack: "one",//同样属性值可以堆叠
                // barCategoryGap: '20%',  // 柱形的间距
                itemStyle: {
                    normal: {
                        color: (value) => {
                            var val = ((value.data || 0) / 1000000).toFixed(1)
                            if (val >= 0) {
                                return "#17b6a9"
                            } else {
                                return "#fd0022"
                            }
                        },
                        // barBorderRadius: [30, 30, 30, 30],
                        // shadowColor: 'rgba(0,160,221,1)',
                        // shadowBlur: 4,
                    }
                },
                label: {
                    normal: {
                        show: true,
                        rotate: 0,  // 旋转角度
                        // lineHeight: 30,
                        position: 'bottom', // 相对位置
                        fontSize: 10,
                        // width: 80,
                        // height: 30,
                        // backgroundColor: 'rgba(0,160,221,0.1)',
                        // borderRadius: 200,
                        // position: ['-3', '-10'],
                        // distance: 1,
                        formatter: (value) => {
                            var val = ((value.data || 0) / 1000000).toFixed(1)
                            if (val >= 0) {
                                val = "+" + val
                            }
                            return val + "m"
                        },
                    }
                }
            }, {
                name: "Fall",
                type: 'bar',
                data: [],
                stack: "one",//同样属性值可以堆叠
                // barGap: '0',//向左平移100%假装堆叠
                itemStyle: {
                    normal: {
                        color: "#fd0022",
                    }
                },
            }],
            //图例名
            // color:["#5198ee","#17b6a9","#fd0022"],
            legend: {
                type: "scroll",
                data: ["Sales by FC Group", "Increase", "Fall"],
                // icon: "line",
                left: 'center',
                bottom: 'bottom',
                itemWidth: 10,
                itemHeight: 10,
                // y: '220',
                textStyle: {
                    color: "#666",
                    fontSize: 10
                },
            },
        })
    }

}
