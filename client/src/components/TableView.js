import React from 'react'

import { inject, observer } from 'mobx-react'

//import * as numeral from 'numeral'
import * as hlp from './Helper'

import ReactTable from 'react-table'

import 'react-table/react-table.css'



/**
 * QDistribution chart
 * @param {object} props 
 */
const TableView = observer((props) => {
    //const title = props.title || 'STAT NAME'

    const allData = props.data || {}

    const data = allData.data || []

    const itemsPerPage = data.length

    const maxMonthStr = String( hlp.yearMonthToStr( allData.maxMonth ) )


    if (!itemsPerPage) {
      return <div></div>
    }
   
    const columns = [{
      Header: 'FC Group',
      accessor: 'fc_group' // String-based value accessors!
    }, {
      Header: 'YTD Sales',
      accessor: 'total_sales_sum',
      Cell: props => <span className='number'>{'$'+hlp.toShortMil( props.value )+'m'}</span> // Custom cell components!
    }, {
      Header: '% of total sales',
      accessor: 'perc_of_total_sales'
    }, {
      Header: 'Sales vs SPLY',
      accessor: 'sales_vs_sply',
      Cell: props => {
        const lblClass = props.value.length && props.value[0] === '-' ? 'label-red' : 'label-green'
        return <label className={'label-main '+lblClass} >{props.value}</label>
      }
    }]
    return <div>
      <label className="st-card-tl">Sales by FC Group</label>
      <label className="st-card-tl-sub">(by performance year)</label>
      <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>
      <ReactTable
      pageSize={itemsPerPage}
      data={data}
      columns={columns}
      showPagination={false}
      style={{
        height: "190px" // This will force the table body to overflow and scroll, since there is not enough room
      }}
      className="-striped -highlight main-table"

    />
    </div>
//    defaultPageSize={itemsPerPage}
    // defaultPageSize
})

export default TableView
