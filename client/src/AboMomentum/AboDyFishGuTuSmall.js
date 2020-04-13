import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
require('./fishboneDiagram.css')

export default class AboDyFishGuTuSmall extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            actualMonth: '',
            futureMonthStr: [],
            futureMonth: [],
            NAMES_IDS: []
        }
        this.toPerc = this.toPerc.bind(this)
    }
    render() {
        var { actualMonth, futureMonth, futureMonthStr, NAMES_IDS, data } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Prediction of Bonus Migration for Next 3 months</div>
                <div style={{ position: "absolute", right: ' 5%', top: '4%', fontSize: '12px', color: "#666" }}>As of {actualMonth}</div>
                {
                    !data['Bonus0-9'] ? <div></div> :
                        <div className="fishbone-diagram">
                            <ul className="sub-title">
                                <li className="tagging-rise">
                                    <span className="normal" style={{ color: "#00b8ac" }}>2%</span>
                                    <span className="small">(1%)</span>
                                </li>
                                <li className="text-list">
                                    {/* <p className="text-item line-num1">Predict 3 months from {futureMonthStr} (Historical 3 months prior {hlp.yearMonthToStr(hlp.subtractMonth(futureMonth))})</p>
                            <p className="text-item line-num2">Historical 3 months prior {actualMonth}</p> */}
                                    <p className="text-item line-num1 line-num1-big">Migration Sep.19-Nov.19</p>
                                    <p className="text-item line-num2 line-num2-big">Migration Dec.19-Feb.20<br></br>(<span style={{ color: '#00b8ac' }}>better</span>/<span style={{ color: 'red' }}>worse</span>)</p>
                                </li>
                            </ul>
                            <ul className="legend legend_smallfish">
                                <li className="legend-item">≥15%</li>
                                <li className="legend-item">9-12%</li>
                                <li className="legend-item">3-6%</li>
                            </ul>
                            <ul className="diagram">
                                <li className="animation-container  animation-container-height">
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal" style={{ color: "#00b8ac" }}>{this.toPerc(data[NAMES_IDS[2]].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data[NAMES_IDS[2]].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal" style={{ color: "#00b8ac" }}>{this.toPerc(data[NAMES_IDS[2]].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data[NAMES_IDS[2]].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone diagram-item_fishbone_smallfish">
                                            <li className="fishbone-central"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container animation-container-height" style={{ left: '10%', width: "75%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal">{this.toPerc(data[NAMES_IDS[1]].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data[NAMES_IDS[1]].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal">{this.toPerc(data[NAMES_IDS[1]].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data[NAMES_IDS[1]].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone diagram-item_fishbone_smallfish">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central"></li>
                                            <li className="fishbone-tail"></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="animation-container animation-container-height" style={{ left: '20%', width: "62%" }}>
                                    <div className="diagram-item">
                                        <ul className="diagram-item_tagging">
                                            <li className="tagging-rise">
                                                <span className="normal">{this.toPerc(data[NAMES_IDS[0]].pred_pct_up)}</span>
                                                <span className="small">({this.toPerc(data[NAMES_IDS[0]].actual_pct_up)})</span>
                                            </li>
                                            <li className="tagging-fall">
                                                <span className="normal">{this.toPerc(data[NAMES_IDS[0]].pred_pct_down)}</span>
                                                <span className="small">({this.toPerc(data[NAMES_IDS[0]].actual_pct_down)})</span>
                                            </li>
                                        </ul>
                                        <ul className="diagram-item_fishbone diagram-item_fishbone_smallfish">
                                            <li className="fishbone-front"></li>
                                            <li className="fishbone-central"></li>
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
        const data = allData.tableData || {}
        let { actualMonth, futureMonth } = allData
        actualMonth = hlp.yearMonthToStr(actualMonth)
        let futureMonthStr = hlp.yearMonthToStr(futureMonth)
        const NAMES_IDS = [
            'Bonus15+', 'Bonus9-15', 'Bonus0-9'
        ]
        this.setState({
            actualMonth, futureMonth, futureMonthStr, NAMES_IDS, data
        })
    }
    toPerc = (val) => {
        return `${Math.round(val * 100)}%`
    }
    componentWillReceiveProps(nextProps) {

    }
}
{/* <div className="main-block">
    <div className="main-block-header">
        <div className="row align-items-center">
            <div className="col-md-9 col-sm-8">
                Migration - Bonus Level <span className="subtitle">(rolling 3 months)</span>
            </div>
            <div className="col-md-3 col-sm-4">
                <label className="st-card-tl-sm float-right">As of {actualMonth}</label>
            </div>
        </div>
    </div>
    <div className="main-block-body">
        <div className="scroll-wrapper">
            <div className="graph-wrapper">
                <div className="graph-legend legend-callout">
                    <div className="legend-row">
                        <div className="legend-value green">
                            <i className="fas fa-caret-up"></i> <span className="callout callout-1">2% <small>Predict 3 months from {futureMonthStr} (Historical 3 months prior {hlp.yearMonthToStr(hlp.subtractMonth(futureMonth))})</small></span> <span className="callout callout-2">(1%) <small>Historical 3 months prior {actualMonth}</small></span>
                        </div>
                    </div>
                </div>

                <div className="statistic-graph-wrapper2">
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-6 arrow-right arrow-right-2">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{this.toPerc(data[NAMES_IDS[0]].pred_pct_up)}<span>({this.toPerc(data[NAMES_IDS[0]].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Bronze (Bonus 15%)</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-5 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{this.toPerc(data[NAMES_IDS[1]].pred_pct_up)}<span>({this.toPerc(data[NAMES_IDS[1]].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell red elem-border-top">
                                <i className="fas fa-caret-down"></i>{this.toPerc(data[NAMES_IDS[0]].pred_pct_down)}<span>({this.toPerc(data[NAMES_IDS[0]].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Bonus 9-12%</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row elem-border-bottom statistic-graph-row-4 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{this.toPerc(data[NAMES_IDS[2]].pred_pct_up)}<span>({this.toPerc(data[NAMES_IDS[2]].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell red elem-border-top">
                                <i className="fas fa-caret-down"></i>{this.toPerc(data[NAMES_IDS[1]].pred_pct_down)}<span>({this.toPerc(data[NAMES_IDS[1]].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Bonus 3-6%</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-0">
                            <div className="growth-cell" style={{ width: 300 }}>
                            </div>
                            <div className="footnote-cell red" style={{ paddingLeft: 95 }}>
                                <i className="fas fa-caret-down"></i>{this.toPerc(data[NAMES_IDS[2]].pred_pct_down)}<span>({this.toPerc(data[NAMES_IDS[2]].actual_pct_down)})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}