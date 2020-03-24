import React from 'react'

import { observer } from 'mobx-react'

import * as hlp from './Helper'


/**
 * TableViewDailySalEvents table
 * @param {object} props 
 */
const TableViewDailySalEvents = observer((props) => {
    const allData = props.data || {}
    const data = allData.tableData || []
    //  we use this variable to display only month name per a few rows, like '2019 Oct'
    //  TODO: we need to sort this data set by 'n_month' field in the 'daily store' to use it correctly with the 'prevRowMonth' variable
    let prevRowMonth
    const rowsHtml = data.map((o, ind)=>{
        const monthRowText = prevRowMonth === o.n_month ? '' : hlp.yearMonthToStr(o.n_month)
        prevRowMonth = o.n_month
        return  <tr key={o.promotion_desc}>
          <td className="text-left">{ monthRowText }</td>
          <td className="text-right">{ o.start_day }</td>
          <td className="text-right">{ o.activity }</td>
          <td className="text-left pl-5">{ o.promotion_desc }</td>
        </tr>
    })

    return   <div className="main-block">
    <div className="main-block-header">
        <h6 className="text-blue">
            {props.title}
        </h6>
    </div>
    <div className="main-block-body">
        <div className="table-responsive">
            <table className="table table-main table-daily-events">
                <thead className="thead-main">
                    <tr>
                        <th>Month</th>
                        <th className="text-right">Start Day</th>
                        <th className="text-right">Activity</th>
                        <th className="text-center">Description</th>
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

export default TableViewDailySalEvents
