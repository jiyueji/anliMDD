import React, { Component, Fragment } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboTableGar extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            rowsHtml: ""
        }
    }
    render() {
        var { data, rowsHtml } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>GAR by PIN</div>
                {/* 表格 */}
                <div style={{ marginLeft: '1%', marginRight: '1%', border: "10px solid #5198ee", width: "100%", height: "330px", marginTop: "55px" }}>
                    <table width="100%" border="0" border-collapse="collapse" cellSpacing="0" cellPadding="0" style={{ textAlign: "center", fontSize: "12px", wordBreak: 'break-all' }}>
                        <thead>
                            <tr>
                                <th rowSpan="2" style={{ height: "41px", border: "1px solid #e5e6e9" }}>PIN Level</th>
                                <th colSpan="2" style={{ height: "41px", border: "1px solid #e5e6e9" }}>GAR</th>
                                <th colSpan="2" style={{ height: "41px", border: "1px solid #e5e6e9" }}>Original plan</th>
                                <th colSpan="2" style={{ height: "41px", border: "1px solid #e5e6e9" }}>Overall</th>
                            </tr>
                            <tr>
                                <th style={{ height: "40px", border: "1px solid #e5e6e9" }}># Total</th>
                                <th style={{ height: "40px", border: "1px solid #e5e6e9" }}># of New</th>
                                <th style={{ height: "40px", border: "1px solid #e5e6e9" }}># Total</th>
                                <th style={{ height: "40px", border: "1px solid #e5e6e9" }}># of New</th>
                                <th style={{ height: "40px", border: "1px solid #e5e6e9" }}># Total</th>
                                <th style={{ height: "40px", border: "1px solid #e5e6e9" }}># of New</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsHtml ? rowsHtml : <tr></tr>}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data.data;

        var rowsHtml = data.map((o) => {
            const tooltipData = o.pin_tt_data ? o.pin_tt_data.map((oIn) => { return <span key={oIn + 3}>{oIn}<br /></span>; }) : '';
            const tooltipData2 = o.new_tt_data ? o.new_tt_data.map((oIn) => { return <span key={oIn + 33}>{oIn}<br /></span>; }) : '';
            const tooltipData3 = o.orig_tt_data ? o.orig_tt_data.map((oIn) => { return <span key={oIn + 4}>{oIn}<br /></span>; }) : '';
            const tooltipData4 = o.orig_new_tt_data ? o.orig_new_tt_data.map((oIn) => { return <span key={oIn + 44}>{oIn}<br /></span>; }) : '';

            const tooltipCellStyle = { cursor: 'pointer', backgroundColor: '#F7F8FA' }
            return <tr key={o.pin}>
                <td style={{ width: "180px", height: "38px", border: "1px solid #e5e6e9", fontWeight: "700", textAlign: " left", paddingLeft: "4px", lineHeight: "22px" }}>{o.pin ? o.pin : ""}</td>

                {tooltipData ? (
                    <OverlayTrigger key={o.pin + 1}
                        placement={'right'}
                        overlay={<Tooltip id={o.pin + 55}><div>{tooltipData}</div></Tooltip>}>
                        <td style={{ height: "38px", border: "1px solid #e5e6e9",cursor: 'pointer', backgroundColor: '#F7F8FA' }}>
                            <span className="d-inline-block">
                                {o.gar_account ? o.gar_account : ""}
                            </span>
                        </td>
                    </OverlayTrigger>
                ) : (<td style={{ height: "38px", border: "1px solid #e5e6e9" }}>{o.gar_account ? o.gar_account : ""}</td>)}

                {tooltipData2 ? (
                    <OverlayTrigger key={o.pin + 2}
                        placement={'right'}
                        overlay={<Tooltip id={o.pin + 56}><div>{tooltipData2}</div></Tooltip>}>
                        <td style={{ height: "38px", border: "1px solid #e5e6e9",cursor: 'pointer', backgroundColor: '#F7F8FA' }}>
                            <span className="d-inline-block">
                                {o.gar_new ? o.gar_new : ""}
                            </span>
                        </td>
                    </OverlayTrigger>
                ) : (<td style={{ height: "38px", border: "1px solid #e5e6e9" }}>{o.gar_new ? o.gar_new : ""}</td>)}

                {tooltipData ? (
                    <OverlayTrigger key={o.pin + 3}
                        placement={'right'}
                        overlay={<Tooltip id={o.pin + 57}><div>{tooltipData3}</div></Tooltip>}>
                        <td style={{ height: "38px", border: "1px solid #e5e6e9",cursor: 'pointer', backgroundColor: '#F7F8FA' }}>
                            <span className="d-inline-block">
                                {o.orig_account ? o.orig_account : ""}
                            </span>
                        </td>
                    </OverlayTrigger>
                ) : (<td style={{ height: "38px", border: "1px solid #e5e6e9" }}>{o.orig_account ? o.orig_account : ""}</td>)}

                {tooltipData ? (
                    <OverlayTrigger key={o.pin + 4}
                        placement={'right'}
                        overlay={<Tooltip id={o.pin + 58}><div>{tooltipData4}</div></Tooltip>}>
                        <td style={{ height: "38px", border: "1px solid #e5e6e9",cursor: 'pointer', backgroundColor: '#F7F8FA' }}>
                            <span className="d-inline-block">
                                {o.orig_new ? o.orig_new : ""}
                            </span>
                        </td>
                    </OverlayTrigger>
                ) : (<td style={{ height: "38px", border: "1px solid #e5e6e9" }}>{o.orig_new ? o.orig_new : ""}</td>)}

                <td className="font-weight-bold text-center" style={{ height: "38px", border: "1px solid #e5e6e9" }}>{o.total_account ? o.total_account : ""}</td>
                <td className="font-weight-bold text-center" style={{ height: "38px", border: "1px solid #e5e6e9" }}>{o.total_new ? o.total_new : ""}</td>
            </tr>
        })

        this.setState({
            data, rowsHtml
        })
    }
}