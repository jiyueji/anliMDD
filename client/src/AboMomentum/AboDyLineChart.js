import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import tuliGreen from "../styles/assets/tuliGreen.png"
import tuliforecast from "../styles/assets/tuliforecast.png"

export default class AboDyBarStack extends Component {
    constructor() {
        super();
        this.state = {
            monthShowAboLine: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            renewalRateData: [],
            renewalRatePredictionData: [],
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>First year ABO renewal rate</div>
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                    <div id="aboLineEcharts" style={{ width: "100%", height: "420px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowData()
    }
    componentWillReceiveProps(nextProps) {
        var { data, isPerfYear } = nextProps
        var { monthShowAboLine } = this.state
        if (isPerfYear) {
            monthShowAboLine = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShowAboLine = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.setState({
            monthShowAboLine
        }, () => {
            this.upDateShowData()
        })
    }
    upDateShowData() {
        var data = this.props.data || {}
        // console.log(data)
        // renewal_rate_data: (2) [{…}, {…}]
        // renewal_rate_prediction_data: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // scatter_data: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // isPerfYear: false
        var renewalRateData = []
        data.renewal_rate_data.map((item, index) => {
            renewalRateData.push((item.y * 100).toFixed(1))
        })
        var renewalRatePredictionData = []
        data.renewal_rate_prediction_data.map((item, index) => {
            renewalRatePredictionData.push((item.y * 100).toFixed(1))
        })
        for (var i = 0; renewalRatePredictionData.length < 12; i++) {
            renewalRatePredictionData.unshift("")
        }
        this.setState({
            renewalRateData, renewalRatePredictionData
        }, () => {
            this.aboDyBarEcharts()
        })
    }
    aboDyBarEcharts() {
        //页面自适应
        var aboBarEchartsWidth = document.getElementById('aboLineEcharts')
        aboBarEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var aboLineEcharts = echarts.init(document.getElementById('aboLineEcharts'));
        window.addEventListener('resize', function () {
            aboLineEcharts.resize()
        });
        aboLineEcharts.setOption({
            grid: {
                top: '18%',
                left: '4%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.monthShowAboLine,
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    }
                },
                boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    // show:false,
                    interval: 0,  //x轴文字全部显示
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    formatter: function (params) {
                        return params.split(' ')[0]
                    }
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
                            return params / 1 + "%"
                        }
                    },
                    max:80,
                    axisLine: {//隐藏X轴
                        show: false
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
                }
            ],
            legend: {
                type: "plain",
                left: 'center',
                bottom: 16,
                // icon: 'rect',
                // itemWidth: 10,
                // itemHeight: 10,
                itemGap: 30,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                // data: ['Actual Renewal Rate', 'Prediction Renewal Rate'],
                data: [
                    { name: 'Actual Renewal Rate', icon: "image://" + tuliGreen },
                    { name: 'Prediction Renewal Rate', icon: "image://" + tuliforecast }
                ],
            },
            series: [
                {
                    name: 'Prediction Renewal Rate',
                    type: 'line',
                    symbolSize: 5,   //拐点圆的大小
                    // color:['#fd0022'],  //折线条的颜色
                    data: this.state.renewalRatePredictionData,
                    // symbol: "none", //去掉折线点
                    smooth: false,   //关键点，为true是不支持虚线的，实线就用true
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3,
                                type: 'dotted',  //'dotted'虚线 'solid'实线
                                color: "#ff9c46"
                            },
                        }
                    },
                    label: {
                        show: true,
                        position: 'top',
                        // position: ['-10', '-20'],
                        formatter:(params)=> {
                            console.log(this.state.renewalRateData.length - 1)
                            // console.log(params.dataIndex)
                            if(params.dataIndex == this.state.renewalRateData.length - 1){
                                return ""
                            }
                            return params.data + "%"
                        },
                        backgroundColor: '#ff9c46',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 8,
                            color: '#ffffff',
                        }
                    },
                }, {
                    name: 'Actual Renewal Rate',
                    data: this.state.renewalRateData,
                    type: 'line',
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
                        backgroundColor: '#29ccaf',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 8,
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
                                color: "#29ccaf"//折现颜色
                            },
                            borderColor: '#29ccaf',  // 拐点边框颜色
                        },
                        // emphasis: {
                        //     color: '#fd0022',
                        //     lineStyle: { // 系列级个性化折线样式
                        //         width: 0.5,
                        //         type: 'dotted',
                        //         color: "#fd0022" //折线的颜色
                        //     }
                        // }
                    }, //线条样式
                }
            ],
        })
    }
}
