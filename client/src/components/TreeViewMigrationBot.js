import React from 'react'

import { inject, observer } from 'mobx-react'

import * as hlp from './Helper'


/**
 * @param {object} props 
 */


const TreeViewMigrationBot = observer((props) => {
    const allData = props.data || {}
    const data = allData.tableData || {}
    let { actualMonth, futureMonth } = allData
    actualMonth = hlp.yearMonthToStr(actualMonth)
    let futureMonthStr = hlp.yearMonthToStr(futureMonth)

    const toPerc = (val) => {
        return `${Math.round( val * 100 )}%`
    }

    if (!data['Bonus0-9']) {
        return <div></div>
    }

    const NAMES_IDS = [
        'Bonus15+', 'Bonus9-15', 'Bonus0-9'
    ]
    
    return     <div className="main-block">
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
                    {/* <div className="legend-row">
                        <div className="legend-value green">
                            <i className="fas fa-caret-up"></i> 2% <span>(1%)</span>
                        </div>

                        <div className="legend-title">Migrate up</div>
                    </div>

                    <div className="legend-row">
                        <div className="legend-value red">
                            <i className="fas fa-caret-down"></i> 2% <span>(1%)</span>
                        </div>

                        <div className="legend-title">Migrate down</div>
                    </div> */}

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
                                <i className="fas fa-caret-up"></i>{toPerc(data[NAMES_IDS[0]].pred_pct_up)}<span>({toPerc(data[NAMES_IDS[0]].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                                {/* <i className="fas fa-caret-down"></i><span></span> */}
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Bronze (Bonus 15%)</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-5 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data[NAMES_IDS[1]].pred_pct_up)}<span>({toPerc(data[NAMES_IDS[1]].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell red elem-border-top">
                                <i className="fas fa-caret-down"></i>{toPerc(data[NAMES_IDS[0]].pred_pct_down)}<span>({toPerc(data[NAMES_IDS[0]].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Bonus 9-12%</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row elem-border-bottom statistic-graph-row-4 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data[NAMES_IDS[2]].pred_pct_up)}<span>({toPerc(data[NAMES_IDS[2]].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell red elem-border-top">
                                <i className="fas fa-caret-down"></i>{toPerc(data[NAMES_IDS[1]].pred_pct_down)}<span>({toPerc(data[NAMES_IDS[1]].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Bonus 3-6%</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-0">
                            <div className="growth-cell" style={{width: 300}}>
                            </div>
                            <div className="footnote-cell red" style={{paddingLeft: 95}}>
                               <i className="fas fa-caret-down"></i>{toPerc(data[NAMES_IDS[2]].pred_pct_down)}<span>({toPerc(data[NAMES_IDS[2]].actual_pct_down)})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <label className="tree-bot-lbl text-blue">Bonus Level Prediction Model uses max bonus level of previous 3 months to predict for max bonus level for the next 3</label>
            </div>
        </div>
    </div>
</div>

})

export default TreeViewMigrationBot
