import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
require('./fishboneDiagram.css')

export default class AboDyFishGuTuBig extends Component {
    constructor() {
        super();
        this.state = {
            recPerfYear: [],
            prevRecPerfYear: [],
            futurePerfYear: [],
            data: {},
            actualMonth: "",

            actualArr: [],
            predArr: [],
            actualAdd: 0,
            predAdd: 0,
        }
        this.toPerc = this.toPerc.bind(this)
    }
    render() {
        var { recPerfYear, prevRecPerfYear, futurePerfYear, data, actualMonth, actualArr, predArr, actualAdd, predAdd } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Prediction of PIN Migration for PF20</div>
                <div style={{ position: "absolute", right: ' 5%', top: '4%', fontSize: '12px', color: "#666" }}>As of {actualMonth}</div>
                {
                    !data['EDC+'] ? <div></div> :
                        <div className="fishbone-diagram fishbone-diagram-big">
                            <ul className="sub-title sub-title">
                                <div className="pinTuli">
                                    <div className="tuliShow">
                                        <div className="bluetuliShow"></div>
                                        <div style={{whiteSpace:'nowrap'}}>{hlp.yearToPfPref2(recPerfYear)} Actual</div>
                                    </div>
                                    <div className="tuliShow">
                                        <div className="yellowtuliShow"></div>
                                        <div style={{whiteSpace:'nowrap'}}>{hlp.yearToPfPref2(futurePerfYear)} Prediction</div>
                                    </div>
                                </div>
                                <li className="tagging-rise">
                                    <span className="normal" style={{ color: "#00b8ac" }}>2%</span>
                                    <span className="small">(1%)</span>
                                </li>
                                <li className="text-list">
                                    <p className="text-item line-num1 line-num1-big">Historical {hlp.yearToPfPref2(recPerfYear)} vs {hlp.yearToPfPref2(prevRecPerfYear)}</p>
                                    <p className="text-item line-num2 line-num2-big">Prediction {hlp.yearToPfPref2(futurePerfYear)} vs {hlp.yearToPfPref2(recPerfYear)}<br></br>(<span style={{color:'#00b8ac'}}>better</span>/<span style={{color:'red'}}>worse</span>)</p>
                                </li>
                            </ul>
                            <ul className="legend">
                                <li className="legend-item">EDC+</li>
                                <li className="legend-item">Diamond</li>
                                <li className="legend-item">Emerald</li>
                                <li className="legend-item">DD</li>
                                <li className="legend-item">GP</li>
                                <li className="legend-item">SP</li>
                                <li className="legend-item">SP & up:</li>
                            </ul>
                            <ul className="platUp">
                                <li className="platUp-item" style={{ textAlign: "left", fontSize: '14px', color: "#333",textAlign:"center" }}>Population by<br></br>PIN level</li>
                                {
                                    actualArr && actualArr.length >= 0 && predArr && predArr.length >= 0 ? actualArr.map((item, index) => {
                                        return <li className="platUp-item" key={index}>
                                            <div className="platUp-item-blue">{item}</div>
                                            <div className="platUp-item-yellow">{predArr[index]}</div>
                                        </li>
                                    }) : ""
                                }
                                <li className="platUp-item">
                                    <div className="platUp-item-blue">{actualAdd}</div>
                                    <div className="platUp-item-yellow">{predAdd}</div>
                                </li>
                            </ul>
                            <ul className="diagram">
                                <li className="animation-container" style={{ width: "99%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal" style={{color:data['SP'].pred_pct_up > data['SP'].actual_pct_up ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['SP'].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data['SP'].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal" style={{color:data['SP'].pred_pct_down < data['SP'].actual_pct_down ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['SP'].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data['SP'].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone">
                                            <li className="fishbone-central fishbone-central-big"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container" style={{ left: '10%', width: "87%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal" style={{color:data['GP'].pred_pct_up > data['GP'].actual_pct_up ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['GP'].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data['GP'].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal" style={{color:data['GP'].pred_pct_down < data['GP'].actual_pct_down ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['GP'].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data['GP'].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central fishbone-central-big"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container" style={{ left: '20%', width: "77%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal" style={{color:data['DD'].pred_pct_up > data['DD'].actual_pct_up ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['DD'].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data['DD'].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal" style={{color:data['DD'].pred_pct_down < data['DD'].actual_pct_down ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['DD'].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data['DD'].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central fishbone-central-big"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container" style={{ left: '30%', width: "67%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal" style={{color:data['Emerald'].pred_pct_up > data['Emerald'].actual_pct_up ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['Emerald'].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data['Emerald'].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal" style={{color:data['Emerald'].pred_pct_down < data['Emerald'].actual_pct_down ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['Emerald'].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data['Emerald'].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central fishbone-central-big"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container" style={{ left: '40%', width: "57%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal" style={{color:data['Diamond'].pred_pct_up > data['Diamond'].actual_pct_up ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['Diamond'].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data['Diamond'].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal" style={{color:data['Diamond'].pred_pct_down < data['Diamond'].actual_pct_down ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['Diamond'].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data['Diamond'].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central fishbone-central-big"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container" style={{ left: '50%', width: "47%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            {/* <li className="tagging-rise">
                                                <span className="normal">0</span>
                                                <span className="small">0</span>
                                            </li> */}
                                            <li className="tagging-fall">
                                                <span className="normal" style={{color:data['EDC+'].pred_pct_down < data['EDC+'].actual_pct_down ? "#00b8ac" : "#ff0000" }}>{this.toPerc(data['EDC+'].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data['EDC+'].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central fishbone-central-big"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                }

            </Fragment>
        )
    }
    componentDidMount() {
        const allData = this.props.data || {}
        const allData2 = this.props.data2 || {}//右上角的时间

        const data = allData.tableData || {}
        let { actualMonth } = allData2
        actualMonth = hlp.yearMonthToStr(actualMonth)
        const { recPerfYear, prevRecPerfYear, futurePerfYear } = allData
        // Pin的数字的数据
        var dataPin = this.props.dataPin || {}
        // console.log(dataPin)
        var { actualYear, predYear } = dataPin
        var actualArr = []
        var predArr = []
        var actualAdd = 0
        var predAdd = 0
        actualYear ? actualYear.map((item, index) => {
            actualAdd += item.y
            actualArr.push(item.y.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,'))
        }) : ""
        actualArr = actualArr.reverse()
        actualAdd = actualAdd.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
        predYear ? predYear.map((item, index) => {
            predAdd += item.y
            predArr.push(item.y.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,'))
        }) : ""
        predArr = predArr.reverse()
        predAdd = predAdd.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')

        this.setState({
            recPerfYear, prevRecPerfYear, futurePerfYear, data, actualMonth, actualArr, predArr, actualAdd, predAdd
        })
    }
    toPerc = (val) => {
        return `${Math.round(val * 100)}%`
    }
    componentWillReceiveProps(nextProps) {

    }
}