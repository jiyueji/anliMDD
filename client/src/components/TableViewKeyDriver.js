import React from 'react'

import { inject, observer } from 'mobx-react'

//import * as hlp from './Helper'


/**
 * @param {object} props 
 */
const TableViewKeyDriver = observer((props) => {
    const allData = props.data || []
    if (!allData.length) {
      return <div></div>
    }

    const dataElementNum = props.dataElementNum || 0
    const isFullWidth = props.isFullWidth || false
    const data = allData[dataElementNum]

    const IS_POSITIVE = 'positive'

    const rowsHtml = data.map((o)=>{
      const progressVal = Math.round( o[1] * 100 )
//      console.log('progressVal ', o[2], progressVal)
      return  <tr className="key-table-row" key={o[0]}>
        <td className="tbl-sm-text" style={isFullWidth?{width:'360px'}:{}}>{o[0]}</td>
        <td className="text-right">
        <div className="progress">
            <div className={`progress-bar ${o[2]===IS_POSITIVE ? 'bg-green' : 'bg-red'}`} role="progressbar" style={{width: `${progressVal}%`}} aria-valuenow={progressVal} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </td>
      </tr>
    })



    return <div className="main-block">
    <div className="main-block-header">
        <div className="row align-items-center">
            <div className="col-md-12 col-sm-12">
                <h6 className={`text-blue ${isFullWidth?'text-left':'text-center'}`} style={{fontSize:14}}>{props.title}
                    {isFullWidth && <span style={{fontSize:11, paddingLeft:20}}>(Key Drivers on Prediction Modelling)</span>}
                </h6>
            </div>
        </div>
    </div>

    <div className="main-block-body">
            <div className="table-responsive">
                <table className="table table-data table-sm">

                <thead>
                    <tr className="key-table-row">
                        <th>Key Drivers</th>
                        <th>Impact</th>
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

export default TableViewKeyDriver
