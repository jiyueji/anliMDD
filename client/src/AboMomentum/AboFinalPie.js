import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboFinalPie extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            chartData: {},
        }
    }
    render() {
        var { title, chartData } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>{title}</div>
                <div style={{ width: "100%", height: "350px", marginTop: "50px" }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px" }}>
                        <div style={{ width: "50%" }}>
                            <div style={{ fontWeight: "600" }}>Total FAA Bonus</div>
                            <div>{chartData.total_tracking_faa} ships</div>
                        </div>
                        <div style={{ width: "50%" }}>
                            <div style={{ fontWeight: "600" }}>Total EDC & up</div>
                            <div>{chartData.num_est_edc_up} ships</div>
                        </div>
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px", marginTop: "15px" }}>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#61d8c5" }}>Tracking New FAA Bonus</div>
                            <div>{chartData.num_tracking_new_faa} ships</div>
                        </div>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#81b1ef" }}>Tracking Old FAA Bonus</div>
                            <div>{chartData.num_tracking_old_faa} ships</div>
                        </div>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#f4ec67" }}>by GAR</div>
                            <div>{chartData.num_by_gar} ships</div>
                        </div>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#fbb671" }}>by Original Plan</div>
                            <div>{chartData.num_by_orig_plan} ships</div>
                        </div>
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", marginTop: "15px", height: "190px",color:"#ffffff",fontSize:"16px" }}>
                        <div id="pieAboFinalAllLeft" style={{ width: "50%", position: "relative", }}>
                            <div id="pieAboFinalLeft" style={{ position: "absolute",textAlign: "left", height: "90px", borderRadius: "50%", background: "rgba(100, 218, 194,0.7)",paddingLeft:"2%" }}></div>
                            <div id="pieAboFinalRight" style={{ position: "absolute",textAlign: "right", height: "90px", borderRadius: "50%", background: "rgba(129, 179, 248,0.7)",paddingRight:"2%" }}>{chartData.num_tracking_old_faa_only}<span style={{position:"absolute",right:"45%"}}>{chartData.num_new_old_faa}</span><span style={{position:"absolute",right:"90%"}}>{chartData.num_tracking_new_faa_only}</span></div>
                            {/* <div id="pieAboFinalCenter" style={{ position: "absolute",textAlign: "center", width: "90px",top: "45px",lineHeight:"90px",height: "90px",borderRadius: "50%", background: "rgba(86, 167, 230,0.5)" }}>{chartData.num_new_old_faa}</div> */}
                        </div>
                        <div style={{ width: "50%", position: "relative", }}>
                            <div id="pieAboFinalLeft2" style={{ position: "absolute",textAlign: "left", height: "90px", borderRadius: "50%", background: "rgba(248, 231, 101,0.7)",paddingLeft:"2%",zIndex:"1" }}>{chartData.num_by_gar_only}<span style={{position:"absolute",left:"45%"}}>{chartData.num_gar_orig_plan}</span><span style={{position:"absolute",left:"90%"}}>{chartData.num_by_orig_plan_only}</span></div>
                            <div id="pieAboFinalRight2" style={{ position: "absolute",textAlign: "right", height: "90px", borderRadius: "50%", background: "rgba(255, 183, 111,0.7)",paddingRight:"2%"  }}></div>
                            {/* <div id="pieAboFinalCenter2" style={{ position: "absolute", top: "45px",textAlign: "center", width: "90px", height: "90px",lineHeight:"90px", borderRadius: "50%", background: 'rgba(255, 177, 69, 0.5)' }}>{chartData.num_gar_orig_plan}</div> */}
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        // console.log(data)
        var chartData = data.length && data[0]
        var title = this.props.titleData && this.props.titleData['gar_title']

        // var pieAboFinalAllLeft = document.getElementById("pieAboFinalAllLeft")
        var pieAboFinalLeft = document.getElementById("pieAboFinalLeft")
        var pieAboFinalRight = document.getElementById("pieAboFinalRight")
        // var pieAboFinalCenter = document.getElementById("pieAboFinalCenter")
        var pieAboFinalLeftWidth = window.innerWidth * 0.25
        var pieAboFinalLeftNumber = (chartData.num_tracking_new_faa_only / 2) || 0
        pieAboFinalLeft.style.width = (90 + pieAboFinalLeftNumber) + "px"
        pieAboFinalLeft.style.lineHeight = (90 + pieAboFinalLeftNumber) + "px"
        pieAboFinalLeft.style.height = (90 + pieAboFinalLeftNumber) + "px"
        pieAboFinalLeft.style.top = (45 - (pieAboFinalLeftNumber / 2)) + "px"
        pieAboFinalLeft.style.left = ((pieAboFinalLeftWidth * 0.4) - pieAboFinalLeftNumber) + "px"
        // pieAboFinalCenter.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        var pieAboFinalRightNumber = (chartData.num_tracking_old_faa_only / 2) || 0
        pieAboFinalRight.style.width = (90 + pieAboFinalRightNumber) + "px"
        pieAboFinalRight.style.lineHeight = (90 + pieAboFinalRightNumber) + "px"
        pieAboFinalRight.style.height = (90 + pieAboFinalRightNumber) + "px"
        pieAboFinalRight.style.top = (45 - (pieAboFinalRightNumber / 2)) + "px"
        pieAboFinalRight.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        var pieAboFinalLeft2 = document.getElementById("pieAboFinalLeft2")
        var pieAboFinalRight2 = document.getElementById("pieAboFinalRight2")
        // var pieAboFinalCenter2 = document.getElementById("pieAboFinalCenter2")
        // pieAboFinalCenter2.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        var pieAboFinalLeft2Number = (chartData.num_by_gar_only / 2) || 0
        pieAboFinalLeft2.style.width = (90 + pieAboFinalLeft2Number) + "px"
        pieAboFinalLeft2.style.lineHeight = (90 + pieAboFinalLeft2Number) + "px"
        pieAboFinalLeft2.style.height = (90 + pieAboFinalLeft2Number) + "px"
        pieAboFinalLeft2.style.top = (45 - (pieAboFinalLeft2Number / 2)) + "px"
        pieAboFinalLeft2.style.left = ((pieAboFinalLeftWidth * 0.4) - pieAboFinalLeft2Number) + "px"
        var pieAboFinalRight2Number = (chartData.num_by_orig_plan_only / 2) || 0
        pieAboFinalRight2.style.width = (90 + pieAboFinalRight2Number) + "px"
        pieAboFinalRight2.style.lineHeight = (90 + pieAboFinalRight2Number) + "px"
        pieAboFinalRight2.style.height = (90 + pieAboFinalRight2Number) + "px"
        pieAboFinalRight2.style.top = (45 - (pieAboFinalRight2Number / 2)) + "px"
        pieAboFinalRight2.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        this.setState({
            title, chartData
        })
    }
}