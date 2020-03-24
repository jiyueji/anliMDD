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
        }
    }
    render() {
        var { data } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>GAR by PIN</div>
                {/* 表格 */}
                <div style={{ marginLeft: '1%', marginRight: '1%', border: "10px solid #5198ee", width: "100%", height: "330px", marginTop: "55px" }}>
                    <table width="100%" border="0" border-collapse="collapse" cellSpacing="0" cellPadding="0" style={{ textAlign: "center", fontSize: "12px", wordBreak: 'break-all' }}>
                        <thead>
                            <tr>
                                <th rowSpan="2" style={{ height: "40px", border: "1px solid #e5e6e9" }}>PIN Level</th>
                                <th colSpan="2" style={{ height: "40px", border: "1px solid #e5e6e9" }}>GAR</th>
                                <th colSpan="2" style={{ height: "40px", border: "1px solid #e5e6e9" }}>Original plan</th>
                                <th colSpan="2" style={{ height: "40px", border: "1px solid #e5e6e9" }}>Overall</th>
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
                            {
                                data.map((item, index) => {
                                    return <tr key={index}>
                                        <td style={{ width: "140px", height: "35px", border: "1px solid #e5e6e9", fontWeight: "700", textAlign: " left", paddingLeft: "4px", lineHeight: "22px" }}>{item.pin ? item.pin : ""}</td>
                                        <td style={{ height: "35px", border: "1px solid #e5e6e9" }}>{item.gar_account ? item.gar_account : ""}</td>
                                        <td style={{ height: "35px", border: "1px solid #e5e6e9" }}>{item.gar_new ? item.gar_new : ""}</td>
                                        <td style={{ height: "35px", border: "1px solid #e5e6e9", textAlign: "right", paddingRight: "28px" }}>{item.orig_account ? item.orig_account : ""}</td>
                                        <td style={{ height: "35px", border: "1px solid #e5e6e9" }}>{item.orig_new ? item.orig_new : ""}</td>
                                        <td style={{ paddingRight: '34px', position: 'relative', height: "35px", border: "1px solid #e5e6e9"}}>{item.total_account ? item.total_account : ""}</td>
                                        <td style={{ height: "35px", border: "1px solid #e5e6e9" }}>{item.total_new ? item.total_new : ""}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data.data;
        console.log(data)

        this.setState({
            data,
        })
    }
}