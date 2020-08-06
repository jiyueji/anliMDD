//备注显示文字
import React, { Fragment } from "react";
import { observer, inject } from 'mobx-react'

export default class TitleModifyTextShow extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            modifyFlag: false
        }
    }
    render() {
        var { titleName, titlePerfYear,remarksText,titlePerfYearFlag} = this.props
        var {modifyFlag} = this.state
        // const chartRemarksText = this.props.chartRemarks.remarksMonthGet.remarks//拿到的数据
        return (
            <Fragment>
                <div className="modifyTitleCss">
                    {titleName}
                    {
                        titlePerfYearFlag ? 
                        <span style={{ fontSize: "12px" }}>
                            {titlePerfYear ? '(By Performance Year)' : '(By Calendar Year)'}
                        </span> : ""
                    }
                    {/* <span style={{ fontSize: "12px" }}>
                        {titlePerfYear ? '(By Performance Year)' : '(By Calendar Year)'}
                    </span> */}
                    <i className="fa fa-list-alt" style={{ marginLeft: "8px" }} onClick={this.modifyFlagHandle.bind(this,true)}></i>
                </div>
                {/* 弹框内容 */}
                {
                    modifyFlag ? <div className="modifyFlagCss">
                        <div className="modifyFlagClose" onClick={this.modifyFlagHandle.bind(this,false)}>X</div>
                        <div>{remarksText}</div>
                        {/* {chartRemarksText} */}
                    </div> : ""
                }
            </Fragment>
        )
    }
    modifyFlagHandle(flag) {//备注框出现开关
        var { modifyFlag, } = this.state
        modifyFlag = flag
        modifyFlag ? this.props.getRemarksHandle() : ""//点击备注框时执行查询请求
        this.setState({
            modifyFlag
        })
    }
}