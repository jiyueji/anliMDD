import React from 'react'

import { inject, observer } from 'mobx-react'

import * as hlp from './Helper'


/**
 * Pie chart
 * @param {object} props 
 */
const PieChartAboLeader = observer((props) => {
    const data = props.data || []
    const chartData = data.length && data[0]

    const title = props.titleData && props.titleData['gar_title']

//    const maxMonthStr = String( hlp.yearMonthToStr( chartData.latest_month ) )


    return    <div className="main-block">
        <div className="row">
            <div className="col">
                <h6 className="text-center" style={{width: '100%'}}>{title}</h6>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 col-circle-graph">
                <div className="main-block-header text-center">
                    <h6>Total FAA Bonus</h6>
                    <label>{chartData.total_tracking_faa} ships</label>
                </div>
                <div className="row">
                    <div className="col-6 circle-graph-wrapper">
                        <h6 className="summer-sky graph-title">Tracking New FAA Bonus</h6>
                        <div className="ships-number">{chartData.num_tracking_new_faa} ships</div>
                    </div>
                    <div className="col-6 circle-graph-wrapper">
                        <h6 className="medium-orchid graph-title">Tracking Old FAA Bonus</h6>
                        <div className="ships-number">{chartData.num_tracking_old_faa} ships</div>
                    </div>
                </div>
                <div className="row-graph">
                    <div className="row">
                        <div className="col-6 circle-graph-wrapper">
                            <div className="circle-graph-wrap">
                                <div className="circle-graph summer-sky">
                                    <span>{chartData.num_tracking_new_faa_only}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 circle-graph-wrapper">
                            <div className="circle-graph-wrap">
                                <div className="circle-graph medium-orchid">
                                    <span>{chartData.num_tracking_old_faa_only}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="average-value">{chartData.num_new_old_faa}</div>
                </div>
                {/* <div className="circle-graph-wrapper">
                    <h6 className="allports">Total Tracking FAA Bonus</h6>
                    <div className="ships-number">{chartData.total_tracking_faa} ships</div>
                </div> */}
            </div>
            <div className="col-md-6 col-circle-graph">
                <div className="main-block-header text-center">
                    <h6>Total EDC & up</h6>
                    <label>{chartData.num_est_edc_up} ships</label>
                </div>
                <div className="row">
                    <div className="col-6 circle-graph-wrapper">
                        <h6 className="dark-pink graph-title">by GAR</h6>
                        <div className="ships-number">{chartData.num_by_gar} ships</div>
                    </div>
                    <div className="col-6 circle-graph-wrapper">
                        <h6 className="light-sea-green graph-title">by Original Plan</h6>
                        <div className="ships-number">{chartData.num_by_orig_plan} ships</div>
                    </div>
                </div>
                <div className="row-graph">
                    <div className="row">
                        <div className="col-6 circle-graph-wrapper">
                            <div className="circle-graph-wrap">
                                <div className="circle-graph dark-pink">
                                    <span>{chartData.num_by_gar_only}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 circle-graph-wrapper">
                            <div className="circle-graph-wrap">
                                <div className="circle-graph light-sea-green">
                                    <span>{chartData.num_by_orig_plan_only}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="average-value">{chartData.num_gar_orig_plan}</div>
                </div>
                {/* <div className="circle-graph-wrapper">
                    <h6 className="allports">Total Estimated EDC & up</h6>
                    <div className="ships-number">{chartData.num_est_edc_up} ships</div>
                </div> */}
            </div>
        </div>
    </div>
})

export default PieChartAboLeader
