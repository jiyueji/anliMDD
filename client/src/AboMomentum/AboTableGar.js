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
                                        <td style={{ paddingRight: '34px', position: 'relative', height: "35px", border: "1px solid #e5e6e9" }}>{item.total_account ? item.total_account : ""}</td>
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
        // pin_tt_data: (19)["傅南生  吴彩云", "熊世翔  吴奕", "傅后坚  柯淑真", "龚玲姬  何迅", "毛忠  王寒茹", "周帆扬  郑新清", "康君", "金梅  刘德沛", "任英才", "雷宇鸣  叶桂花", "陈来发  李月容", "卢宪新  卜范芝", "陈毅鼎  周婉明", "许旭昇  谢淑芬", "陈婉芬  嵇龙生", "金乃刚  王淑真", "袁为群  周亚星", "韩世荣", "周志坚  欧帼英"]
        // orig_tt_data: (16)["葛勇芹", "钟光文", "杜国渊  沈艳", "郭洪斌  范建平", "梁丁苏  孙东", "朱生才  张盛举", "刘红  狄晋", "简水兰", "李丽莉", "梁大工", "郑维良  罗斌", "尹建平  王成安", "武立荣", "黄安莉  林海峰", "江芝英  王纪接", "张忆平"]
        // orig_new_tt_data: (3)["朱生才  张盛举", "简水兰", "江芝英  王纪接"]
        
        console.log(data)
        this.setState({
            data,
        })
    }
}