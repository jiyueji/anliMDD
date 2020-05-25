import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import foaRedkuang from "../styles/assets/foaRedkuang.jpg"

export default class FoaBuyerProductivity extends Component {
    constructor() {
        super();
        this.state = {
            numFoaWithBvData:[],
            numNewFoaData:[],
            productivityData:[],
            monthShowAbo:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            // maxYShow:"",
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>FOA Buyer & Productivity</div>
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                    <div id="foaBuyerProductivityEcharts" style={{ width: "100%", height: "420px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowDataFoaBuyerProductivity()
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
            this.upDateShowDataFoaBuyerProductivity()
        })
    }
    upDateShowDataFoaBuyerProductivity() {
        var datas = this.props.datas || {}
        var data = this.props.data || {}
        // console.log(data,"111")
        var {num_foa_with_bv,num_new_foa} = data
        var {avg_bv_data} = datas
        var numFoaWithBvData = []
        var numNewFoaData = []
        var productivityData = []
        num_foa_with_bv && num_foa_with_bv.length >= 0 ? num_foa_with_bv.map((item,index)=>{
            numFoaWithBvData.push(Math.round(item.y / 1000))
        }) : ""
        num_new_foa && num_new_foa.length >= 0 ? num_new_foa.map((item,index)=>{
            numNewFoaData.push(Math.round(item.y / 1000))
        }) : ""
        avg_bv_data && avg_bv_data.length >= 0 ? avg_bv_data.map((item,index)=>{
            productivityData.push(Math.round(item.y))
        }) : ""
        // var maxYShow = numFoaWithBvData[0];
        // for (var i = 1; i < numFoaWithBvData.length; i++) {
        //     var cur = numFoaWithBvData[i];
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
            numFoaWithBvData,numNewFoaData,productivityData,
        }, () => {
            this.foaBuyerProductivityEcharts()
        })
    }
    foaBuyerProductivityEcharts() {
        //页面自适应
        var foaBuyerProductivityEchartsWidth = document.getElementById('foaBuyerProductivityEcharts')
        foaBuyerProductivityEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var foaBuyerProductivityEcharts = echarts.init(document.getElementById('foaBuyerProductivityEcharts'));
        window.addEventListener('resize', function () {
            foaBuyerProductivityEcharts.resize()
        });
        foaBuyerProductivityEcharts.setOption({
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
                            var value = params
                            var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                            return valueShow + "k"
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
                    // min: -200,
                    // max: 100,
                    boundaryGap: ['250%',0],
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
                left: 'center',
                // itemGap: 30,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    {name: 'FOA Buyer Count', icon: "image://" + foaRedkuang },
                    { name: 'inclu.new FOA Buyer', icon: 'rect' },
                    { name: 'Productivity($)', icon: "line" }
                ],
            },
            series: [{
                // 分隔
                type:"pictorialBar",
                name: "inclu.new FOA Buyer",
                itemStyle: {
                    normal: {
                        color: "#71adf8"
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: "inside",
                        formatter:(val) => {
                            // console.log(val)
                            var value = val.data
                            var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                            return valueShow + "k"
                        },
                        textStyle: {
                            color: "#ffffff",
                            fontSize: 8
                        }
                    }
                },
                barWidth: 20, //柱图宽度
                // barMaxWidth: '50%', //最大宽度
                // symbolMargin: 1, //图形垂直间隔
                // symbolRepeat: "true",
                symbol: "rect",
                // symbolSize: [20, 5],
                // symbolPosition: "start",
                // symbolBoundingData: [100],
                data: this.state.numNewFoaData,
                z: 1,
            },
            {
                name: "FOA Buyer Count",
                type: "bar",
                barGap: "-105%", // 设置外框粗细
                data: this.state.numFoaWithBvData,
                barWidth: 25,
                itemStyle: {
                    normal: {
                        color: "transparent", // 填充色
                        barBorderColor: "#e25855", // 边框色
                        barBorderWidth: 1, // 边框宽度
                        // barBorderRadius: 0, //圆角半径
                        label: {
                            // 标签显示位置
                            show: true,
                            position: "top", // insideTop 或者横向的 insideLeft,
                            formatter: (val) => {
                                // console.log(val)
                                var value = val.data
                                var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                                return valueShow + "k"
                            },
                            textStyle: {
                                fontSize: 12,
                                color: '#e25855',
                            },
                        }
                    }
                },
                z: 1
            }, {
                name: 'Productivity($)',
                data: this.state.productivityData,
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
                        return params.data
                    },
                    backgroundColor: '#fe9d3c',
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
                            color: "#fe9d3c"//折现颜色
                        },
                        borderColor: '#fe9d3c',  // 拐点边框颜色
                    },
                }, //线条样式
            }
            ],
        })
    }
}
