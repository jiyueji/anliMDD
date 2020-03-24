import React from 'react'

import { inject, observer } from 'mobx-react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import * as hlp from './Helper'

/**
 * TableViewGAR table
 * @param {object} props 
 */
const TableViewGAR = observer((props) => {
    const allData = props.data || {}
    const data = allData.data || []

    const maxMonthStr = String( hlp.yearMonthToStr( allData.maxMonth ) )

    const rowsHtml = data.map((o)=>{
        const tooltipData = o.pin_tt_data ? o.pin_tt_data.map((oIn)=>{return <span key={oIn+3}>{oIn}<br/></span>;}) : '';
        const tooltipData2 = o.new_tt_data ? o.new_tt_data.map((oIn)=>{return <span key={oIn+33}>{oIn}<br/></span>;}) : '';
        const tooltipData3 = o.orig_tt_data ? o.orig_tt_data.map((oIn)=>{return <span key={oIn+4}>{oIn}<br/></span>;}) : '';
        const tooltipData4 = o.orig_new_tt_data ? o.orig_new_tt_data.map((oIn)=>{return <span key={oIn+44}>{oIn}<br/></span>;}) : '';

        const tooltipCellStyle = { cursor: 'pointer', backgroundColor: '#F7F8FA' }
        return  <tr key={o.pin}>
        <td>{o.pin}</td>

        {tooltipData?(
            <OverlayTrigger key={o.pin+1} 
            placement={'right'}
                overlay={<Tooltip id={o.pin+55}><div>{tooltipData}</div></Tooltip>}>
                    <td className="text-right" style={tooltipCellStyle}>
                    <span className="d-inline-block">
                    {o.gar_account}
                    </span>
                    </td>
            </OverlayTrigger>
        ):(<td className="text-right">{o.gar_account}</td>)}

        {tooltipData2?(
            <OverlayTrigger key={o.pin+2} 
            placement={'right'}
                overlay={<Tooltip id={o.pin+56}><div>{tooltipData2}</div></Tooltip>}>
                    <td className="text-right" style={tooltipCellStyle}>
                    <span className="d-inline-block">
                    {o.gar_new}
                    </span>
                    </td>
            </OverlayTrigger>
        ):(<td className="text-right">{o.gar_new}</td>)}

        {tooltipData?(
            <OverlayTrigger key={o.pin+3} 
            placement={'right'}
                overlay={<Tooltip id={o.pin+57}><div>{tooltipData3}</div></Tooltip>}>
                    <td className="text-right" style={tooltipCellStyle}>
                    <span className="d-inline-block">
                    {o.orig_account}
                    </span>
                    </td>
            </OverlayTrigger>
        ):(<td className="text-right">{o.orig_account}</td>)}

        {tooltipData?(
            <OverlayTrigger key={o.pin+4} 
            placement={'right'}
                overlay={<Tooltip id={o.pin+58}><div>{tooltipData4}</div></Tooltip>}>
                    <td className="text-right" style={tooltipCellStyle}>
                    <span className="d-inline-block">
                    {o.orig_new}
                    </span>
                    </td>
            </OverlayTrigger>
        ):(<td className="text-right">{o.orig_new}</td>)}

        <td className="font-weight-bold text-center">{o.total_account}</td>
        <td className="font-weight-bold text-center">{o.total_new}</td>
    </tr>
    })

    
    return   <div className="main-block">
    <div className="main-block-header">
        <div className="row align-items-center">
            <div className="col-md-9 col-sm-8">
                <h6 className="text-blue">GAR by PIN</h6>
            </div>
            <div className="col-md-3 col-sm-4">
                <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>
            </div>
        </div>
    </div>
    <div className="main-block-body">
        <div className="table-responsive">
            <table className="table table-data">
                <thead>
                    <tr>
                        <th rowSpan="2" className="text-center">PIN Level</th>
                        <th colSpan="2" className="text-center">GAR</th>
                        <th colSpan="2" className="text-center">Original plan</th>
                        <th colSpan="2" className="font-weight-bold text-center">Overall</th>
                    </tr>
                    <tr>
                        <th className="text-center"># Total</th>
                        <th className="text-center"># of New</th>
                        <th className="text-center"># Total</th>
                        <th className="text-center"># of New</th>
                        <th className="font-weight-bold text-center"># Total</th>
                        <th className="font-weight-bold text-center"># of New</th>
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

export default TableViewGAR
