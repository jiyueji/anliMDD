import React from 'react'

import { inject, observer } from 'mobx-react'

import * as hlp from './Helper'




/**
 * QDistribution chart
 * @param {object} props 
 */
const TreeViewMigrationTop = observer((props) => {
    const allData = props.data || {}
    const data = allData.tableData || {}
    const { recPerfYear, prevRecPerfYear, futurePerfYear} = allData

    const toPerc = (val) => {
        return `${Math.round( val * 100 )}%`
    }

    if (!data['EDC+']) {
        return <div></div>
    }

    
    return    <div className="main-block">
    <div className="main-block-header">
        <h6>
            Migration - PIN <span className="subtitle">(year over year)</span>
        </h6>
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
                            <i className="fas fa-caret-up"></i> <span className="callout callout-1">2% <small>Prediction {hlp.yearToPfPref2(futurePerfYear)}</small></span> <span className="callout callout-2">(1%) <small>Historical {hlp.yearToPfPref2(recPerfYear)} vs {hlp.yearToPfPref2(prevRecPerfYear)}</small></span>
                        </div>
                    </div>
                </div>

                <div className="statistic-graph-wrapper">
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-9 arrow-right">
                            <div className="growth-cell"></div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top"></div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">EDC+</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-8 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data['Diamond'].pred_pct_up)}<span>({toPerc(data['Diamond'].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                                <i className="fas fa-caret-down"></i>{toPerc(data['EDC+'].pred_pct_down)}<span>({toPerc(data['EDC+'].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Diamond</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-7 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data['Emerald'].pred_pct_up)}<span>({toPerc(data['Emerald'].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                                <i className="fas fa-caret-down"></i>{toPerc(data['Diamond'].pred_pct_down)}<span>({toPerc(data['Diamond'].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">Emerald</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-6 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data['DD'].pred_pct_up)}<span>({toPerc(data['DD'].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                                <i className="fas fa-caret-down"></i>{toPerc(data['Emerald'].pred_pct_down)}<span>({toPerc(data['Emerald'].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">DD</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-5 arrow-right arrow-right-3">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data['GP'].pred_pct_up)}<span>({toPerc(data['GP'].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                                <i className="fas fa-caret-down"></i>{toPerc(data['DD'].pred_pct_down)}<span>({toPerc(data['DD'].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">GP</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row elem-border-bottom statistic-graph-row-4 arrow-right">
                            <div className="growth-cell green">
                                <i className="fas fa-caret-up"></i>{toPerc(data['SP'].pred_pct_up)}<span>({toPerc(data['SP'].actual_pct_up)})</span>
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell elem-border-top red">
                                <i className="fas fa-caret-down"></i>{toPerc(data['GP'].pred_pct_down)}<span>({toPerc(data['GP'].actual_pct_down)})</span>
                            </div>
                        </div>
                        <div className="statistic-graph-row-title">
                            <div className="graph-title">SP</div>
                        </div>
                    </div>
                    <div className="statistic-graph-row-wrapper">
                        <div className="statistic-graph-row statistic-graph-row-3 statistic-graph-row-extra">
                            <div className="growth-cell">
                                {/* Rolling 3 months population */}
                            </div>
                            <div className="divider"></div>
                            <div className="footnote-cell red">
                                <i className="fas fa-caret-down"></i>{toPerc(data['SP'].pred_pct_down)}<span>({toPerc(data['SP'].actual_pct_down)})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

})

export default TreeViewMigrationTop
