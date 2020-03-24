import React from 'react'

import { inject, observer } from 'mobx-react'

import * as hlp from './Helper'


/**
 * TableViewDailySales table
 * @param {object} props 
 */
const TableViewDailySales = observer((props) => {
    const allData = props.data || {}
    const data = allData.tableData || []

    const maxDateTitle = allData.maxDateTitle,
        maxDMin1 = allData.maxDMin1,
        maxDMin2 = allData.maxDMin2

    const COLS = props.columnNames || []

    const TR_MAIN_SEC = ['Net Sales', 'Order BV Sales', 'Recruitment', 'Buyer Counts']

    const formatPercent = (val) => {
      if(isNaN(val)){return ''}
      const SIGN = val<0?'':'+'
      return `${SIGN}${Math.round(val*100)}%`
    }

    const formatNumFirstFn = (val) => {
        return props.formatThous ? `${hlp.numberWithCommas(val)}` : `${(Math.round(val*100)/100000000).toFixed(1)}m`
    }
  
    const formatNumFn = (val) => {
        return props.formatThous ? `${hlp.toShortThous(val)}k` : `${hlp.toShortMil(val)}m`
    }

    const rowsHtml = data.map((o)=>{

        return  <tr className={( TR_MAIN_SEC.indexOf(o[COLS[0]])!==-1 ?'tr-main':'')} key={o[COLS[0]]}>
          <td className={(TR_MAIN_SEC.indexOf(o[COLS[0]])===-1 ?'subitem':'')}>{o[COLS[0]]}</td>
          <td className="text-right">{ formatNumFirstFn(o[COLS[1]]) }</td>
          <td className="text-right">{ formatNumFirstFn(o[COLS[2]]) }</td>
          <td className="text-right">{ formatNumFirstFn(o[COLS[3]]) }</td>
          <td className="text-right">{ formatNumFn(o[COLS[4]]) }</td>
          <td className={`${(o[COLS[5]]<0 ?'red':'green')} text-right`}>{ formatPercent(o[COLS[5]]) }</td>
          <td className={`${(o[COLS[6]]<0 ?'red':'green')} text-right`}>{ formatPercent(o[COLS[6]]) }</td>
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
            <table className="table table-main">
                <thead className="thead-main">
                    <tr>
                        <th></th>
                        <th className="text-right">{maxDMin2}{props.formatThous?'':'($)'}</th>
                        <th className="text-right">{maxDMin1}{props.formatThous?'':'($)'}</th>
                        <th className="text-right">{maxDateTitle}{props.formatThous?'':'($)'}</th>
                        <th className="text-right">Month to date{props.formatThous?'':'($)'}</th>
                        <th className="text-right">MTD % change<br/>vs. last month</th>
                        <th className="text-center">MTD % change<br/>vs. SPLY</th>
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

export default TableViewDailySales
