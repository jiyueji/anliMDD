import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import TitleModifyTextShow from "./TitleModifyTextShow.js";
import ApiService from '../services/ApiService'
// 备注信息
@inject('chartRemarks') @observer
class TitleModify extends Component {
    constructor() {
        super();
        this.state = {
            modifyFlag: false,
            remarksText:""
        }
    }
    render() {
        var { titleName, titlePerfYear,id, keys, modifyDate,titlePerfYearFlag } = this.props
        var {modifyFlag,remarksText} = this.state
        return (
            <Fragment>
                <TitleModifyTextShow titleName={titleName} titlePerfYear={titlePerfYear} getRemarksHandle={this.getRemarksHandle.bind(this)} remarksText={remarksText} titlePerfYearFlag={titlePerfYearFlag}/>
            </Fragment>
        )
    }

    async getRemarksHandle(){
        var {id, keys, modifyDate} = this.props
        var dataText = await ApiService.get_remarksMonth("", id, keys, modifyDate)
        dataText = dataText ? JSON.parse(dataText) : []
        var remarksTextBase64 = dataText[0] && dataText[0].remarks
        if (remarksTextBase64) {
            // 对base64转编码
            var remarksTextDecode = atob(remarksTextBase64);
            // 编码转字符串
            var remarksText = decodeURI(remarksTextDecode);
          }else{
            var remarksText = ""
          }
        this.setState({
            remarksText
        })
        // this.props.chartRemarks.fetchRemarksMonth("", id, keys, modifyDate)
    }
}
export default TitleModify