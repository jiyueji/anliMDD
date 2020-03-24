import React from 'react'

import { inject, observer } from 'mobx-react'

import * as hlp from './Helper'


/**
 * TableViewGrowth
 * @param {object} props 
 */
const TableViewGrowth = observer((props) => {
    const allData = props.data || {}
    const data = allData.tableData || []

    const maxMonthStr = String( hlp.yearMonthToStr( allData.maxMonth ) )
    const maxYear = String( allData.maxYear )
    const maxTargCalYear = String( allData.maxTargCalYear )

    const toPerc = (val) => {
        return `${Math.round( val * 100 )}%`
    }

    const rowsHtml = data.map((o)=>{
        const ytdVal = o.isTotal ? '' : `(${o.yoy_pct_sales})`
        return  <tr className={(o.isTotal === true?'main-row':'')} key={o.pct_first_time_buyer_population}>
            <td className={(o.isSubtitle === true?'subtitle':'') } >{o.segment_desc}</td>
            <td className="text-right">{ (o.first_time_buyer_population ? `${hlp.numberWithCommas(o.first_time_buyer_population)} (${toPerc(o.pct_first_time_buyer_population)})` : '')}</td>
            <td className="text-right">{hlp.numberWithCommas(o.existing_buyer_population)} ({toPerc(o.pct_existing_buyer_population)})</td>
            <td className="text-right">{hlp.numberWithCommas(o.total_buyer_population)} ({toPerc(o.pct_total_buyer_population)})</td>
            <td className="text-center">${Math.round(o.productivity)}</td>
            <td className="sorting-column font-weight-bold text-center">${ `${hlp.toShortMil(o.actual_sales)}m`} <span className={(o.isSquarePerc === true?'square':'')}>({toPerc(o.pct_actual_sales)})</span></td>
            <td className="sorting-column font-weight-bold text-center">{o.yoy_sales}<span>{ytdVal}</span></td>
        </tr>
    })

    
    return   <div className="main-block">
    <div className="main-block-header">
        <div className="row align-items-center">
            <div className="col-md-9 col-sm-8">
                <h6 className="text-blue">Growth <span className="growth-tbl-subt">(By Calendar Year)</span></h6>
            </div>
            <div className="col-md-3 col-sm-4">
                <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>
            </div>
        </div>
    </div>
    <div className="main-block-body">
        <div className="row">
            <div className="col-sm-9">
                <div className="alert alert-info">
                    <p>{maxYear} YTD Customer & ABO (Purchasing Only) Sales: <span className="font-weight-bold">{toPerc(allData.monthAvg2Rows)}</span></p>
                    <p className="mb-0">{maxTargCalYear} Customer & ABO (Purchasing Only) Sales Target: <span className="font-weight-bold">{toPerc(allData.minTargetSalPct)} - {toPerc(allData.maxTargetSalPct)}</span></p>
                </div>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table table-data">
                <thead>
                    <tr>
                        <th rowSpan="2" className="text-center">Segment</th>
                        <th colSpan="3" className="text-center">Number Purchasing</th>
                        <th rowSpan="2" className="text-center">Productivity</th>
                        <th colSpan="2" className="sorting-column font-weight-bold text-center">Total</th>
                    </tr>
                    <tr>
                        <th className="text-center">First Time Buyer</th>
                        <th className="text-center">Existing Buyer</th>
                        <th className="text-center">Total Buyer</th>
                        <th className="sorting-column font-weight-bold text-center">YTD Monthly Average</th>
                        <th className="sorting-column font-weight-bold text-center">YTD vs LY</th>
                    </tr>
                </thead>
                <tbody>

                    {rowsHtml}

                </tbody>
            </table>
        </div>
    </div>
</div>

})

export default TableViewGrowth
