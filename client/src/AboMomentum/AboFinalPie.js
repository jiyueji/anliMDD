import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';
import faaArrow from "../styles/assets/faaArrow.png"
import faaBrackets from "../styles/assets/faaBrackets.png"
import TitleModify from "../components/TitleModify.js"

export default class AboFinalPie extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            maxMonthStr: "",
            chartData: {},
            pieAboFinalRightNumber: 0,
            modifyDateModify:""
        }
    }
    render() {
        var { title, maxMonthStr, chartData, pieAboFinalRightNumber,modifyDateModify } = this.state
        return (
            <Fragment>
                {/* <div className="modifyAllTitle">
                    <TitleModify titleName={'FAA'} titlePerfYearFlag={false} titlePerfYear={false} id={"sub3"} keys={"FAA"} modifyDate={modifyDateModify} />
                </div> */}
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>FAA</div>
                <div style={{ position: "absolute", right: ' 5%', top: '6%', fontSize: '12px', color: "#666" }}>As of {maxMonthStr}</div>
                <div style={{ width: "100%", height: "350px",marginTop: "50px" }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px" }}>
                        <div style={{ width: "100%" }}>
                            <div style={{ fontWeight: "600" }}>Total FAA Bonus</div>
                            <div>{chartData.total_tracking_faa} ships</div>
                        </div>
                        {/* <div style={{ width: "50%" }}>
                            <div style={{ fontWeight: "600" }}>Total EDC & up</div>
                            <div>{chartData.num_est_edc_up} ships</div>
                        </div> */}
                    </div>
                    {/* <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px", marginTop: "15px" }}>
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
                    </div> */}
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", marginTop: "45px", height: "190px", color: "#ffffff", fontSize: "16px" }}>
                        <div id="pieAboFinalAllLeft" style={{ width: "100%", position: "relative", }}>
                            <div id="pieAboFinalLeft" style={{ position: "absolute", textAlign: "left", borderRadius: "50%", background: "rgba(113, 186, 228,0.7)", paddingLeft: "2%", width: "160px", height: "160px", top: "30px", }}>
                                {/* <div style={{ position: "absolute", color: "#333", left: "-50%", top: "-30%", textAlign: "center", height: "100%" }}>
                                    <span style={{ display: "block", height: "75%" }}>New FAA</span>
                                    <span>{chartData.num_tracking_new_faa_only}</span>
                                </div> */}
                            </div>
                            <div id="pieAboFinalRight" style={{ position: "absolute", textAlign: "right", borderRadius: "50%", background: "rgba(206, 153, 227,0.7)", paddingRight: "2%", width: pieAboFinalRightNumber + "px", height: pieAboFinalRightNumber + "px", top: (110 - (pieAboFinalRightNumber / 2)) + "px", }}>
                                {/* <div style={{ position: "absolute", color: "#333", right: "-55%", top: "-50%", textAlign: "center" }}>
                                    <span style={{ display: "block", height: "75%" }}>Old FAA</span>
                                    <span >{chartData.num_tracking_old_faa_only}</span>
                                </div>
                                <div style={{ position: "absolute", width: "100%", color: "#333", right: "25%", top: "-50%", textAlign: "center" }}>
                                    <span style={{ display: "block", height: "75%" }}>Both</span>
                                    <span>{chartData.num_new_old_faa}</span>
                                </div> */}
                            </div>
                            {/* <div id="pieAboFinalCenter" style={{ position: "absolute",textAlign: "center", width: "90px",top: "45px",lineHeight:"90px",height: "90px",borderRadius: "50%", background: "rgba(86, 167, 230,0.5)" }}>{chartData.num_new_old_faa}</div> */}
                        </div>
                        {/* <div style={{ width: "50%", position: "relative", }}>
                            <div id="pieAboFinalLeft2" style={{ position: "absolute",textAlign: "left", height: "90px", borderRadius: "50%", background: "rgba(248, 231, 101,0.7)",paddingLeft:"2%",zIndex:"1" }}>
                            <span style={{position:"absolute",color:"#333",left:"-15%"}}>{chartData.num_by_gar_only}</span>
                            <span style={{position:"absolute",color:"#333",left:"45%"}}>{chartData.num_gar_orig_plan}</span>
                            <span style={{position:"absolute",color:"#333",left:"105%"}}>{chartData.num_by_orig_plan_only}</span>
                            </div>
                            <div id="pieAboFinalRight2" style={{ position: "absolute",textAlign: "right", height: "90px", borderRadius: "50%", background: "rgba(255, 183, 111,0.7)",paddingRight:"2%"  }}></div>
                        </div> */}
                    </div>
                    <img src={faaBrackets} style={{ position: "absolute", top: "120px", width: "90%", left: "5%" }} />
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px", position: "absolute", top: "135px" }}>
                        <div style={{ color: "#71bae4", width: "33.3%", marginTop: "35px" }}>
                            <div style={{ fontWeight: "600", marginBottom: "55px" }}>New FAA</div>
                            <div style={{ fontWeight: "600" }}>{chartData.num_tracking_new_faa_only}</div>
                        </div>
                        <div style={{ color: "#9e84da", width: "33.3%" }}>
                            <div style={{ fontWeight: "600" }}>Both</div>
                            <img src={faaArrow} style={{ height: "90px" }} />
                            <div style={{ fontWeight: "600" }}>{chartData.num_new_old_faa}</div>
                        </div>
                        <div style={{ color: "#ce99e3", width: "33.3%", marginTop: "35px" }}>
                            <div style={{ fontWeight: "600", marginBottom: "55px" }}>Old FAA</div>
                            <div style={{ fontWeight: "600" }}>{chartData.num_tracking_old_faa_only}</div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        var { data, maxYear } = nextProps.data
        this.upDateShowData(data, maxYear)
    }
    componentDidMount() {
        var { data, maxYear } = this.props.data;
        // var title = this.props.titleData && this.props.titleData['gar_title']
        this.upDateShowData(data, maxYear)
    }
    upDateShowData(data, maxYear) {
        var chartData = data.length && data[0]
        // var maxMonthStr = chartData ? String(hlp.yearMonthToStr(chartData.update_month)) : ""
        var maxMonthStr = String(hlp.yearMonthToStr(maxYear)) || ""
        var modifyDateModify = maxYear

        var pieAboFinalRightNumber = (chartData.num_tracking_old_faa / (chartData.num_tracking_new_faa / 160)) || 0

        var pieAboFinalLeft = document.getElementById("pieAboFinalLeft")
        var pieAboFinalRight = document.getElementById("pieAboFinalRight")
        var pieAboFinalLeftWidth = window.innerWidth * 0.33
        var pieAboFinalLeftNumber = (chartData.num_tracking_new_faa_only) || 0
        pieAboFinalLeft.style.left = ((pieAboFinalLeftWidth * 0.36) - ((chartData.num_tracking_new_faa_only) || 0)) + "px"
        pieAboFinalRight.style.left = (pieAboFinalLeftWidth * 0.36) + "px"

        this.setState({
            // title,
            chartData, maxMonthStr, pieAboFinalRightNumber,modifyDateModify
        })



        // var pieAboFinalAllLeft = document.getElementById("pieAboFinalAllLeft")
        // var pieAboFinalLeft = document.getElementById("pieAboFinalLeft")
        // var pieAboFinalRight = document.getElementById("pieAboFinalRight")
        // var showLeftText = document.getElementById("showLeftText")
        // var pieAboFinalCenter = document.getElementById("pieAboFinalCenter")
        // var pieAboFinalLeftWidth = window.innerWidth * 0.33
        // var pieAboFinalLeftNumber = (chartData.num_tracking_new_faa_only) || 0
        // pieAboFinalLeft.style.width = (90 + pieAboFinalLeftNumber) + "px"
        // pieAboFinalLeft.style.lineHeight = (90 + pieAboFinalLeftNumber) + "px"
        // pieAboFinalLeft.style.height = (90 + pieAboFinalLeftNumber) + "px"
        // pieAboFinalLeft.style.top = (45 - (pieAboFinalLeftNumber / 2)) + "px"
        // pieAboFinalLeft.style.left = ((pieAboFinalLeftWidth * 0.4) - pieAboFinalLeftNumber) + "px"
        // pieAboFinalCenter.style.left = (pieAboFinalLeftWidth * 0.4) + "px"

        // var pieAboFinalRightNumber = (chartData.num_tracking_old_faa / (chartData.num_tracking_new_faa / 160)) || 0
        // var pieAboFinalRightNumber = (chartData.num_tracking_old_faa_only) || 0
        // pieAboFinalRight.style.width = (90 + pieAboFinalRightNumber) + "px"
        // pieAboFinalRight.style.lineHeight = (90 + pieAboFinalRightNumber) + "px"
        // pieAboFinalRight.style.height = (90 + pieAboFinalRightNumber) + "px"
        // pieAboFinalRight.style.top = (45 - (pieAboFinalRightNumber / 2)) + "px"
        // pieAboFinalRight.style.left = ((pieAboFinalLeftWidth * 0.4)) + "px"

        // showLeftText.style.left = -(((pieAboFinalLeftNumber + 90)) + 45) + "%"

        // var pieAboFinalLeft2 = document.getElementById("pieAboFinalLeft2")
        // var pieAboFinalRight2 = document.getElementById("pieAboFinalRight2")
        // // var pieAboFinalCenter2 = document.getElementById("pieAboFinalCenter2")
        // // pieAboFinalCenter2.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        // var pieAboFinalLeft2Number = (chartData.num_by_gar_only / 2) || 0
        // pieAboFinalLeft2.style.width = (90 + pieAboFinalLeft2Number) + "px"
        // pieAboFinalLeft2.style.lineHeight = (90 + pieAboFinalLeft2Number) + "px"
        // pieAboFinalLeft2.style.height = (90 + pieAboFinalLeft2Number) + "px"
        // pieAboFinalLeft2.style.top = (45 - (pieAboFinalLeft2Number / 2)) + "px"
        // pieAboFinalLeft2.style.left = ((pieAboFinalLeftWidth * 0.4) - pieAboFinalLeft2Number) + "px"
        // var pieAboFinalRight2Number = (chartData.num_by_orig_plan_only / 2) || 0
        // pieAboFinalRight2.style.width = (90 + pieAboFinalRight2Number) + "px"
        // pieAboFinalRight2.style.lineHeight = (90 + pieAboFinalRight2Number) + "px"
        // pieAboFinalRight2.style.height = (90 + pieAboFinalRight2Number) + "px"
        // pieAboFinalRight2.style.top = (45 - (pieAboFinalRight2Number / 2)) + "px"
        // pieAboFinalRight2.style.left = (pieAboFinalLeftWidth * 0.4) + "px"

    }
}