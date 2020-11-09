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
            remarksText:"",
            remarksTextFlag:false,
        }
    }
    render() {
        var { titleName, titlePerfYear,id, keys, modifyDate,titlePerfYearFlag } = this.props
        var {modifyFlag,remarksText,remarksTextFlag} = this.state
        return (
            <Fragment>
                <TitleModifyTextShow titleName={titleName} titlePerfYear={titlePerfYear} getRemarksHandle={this.getRemarksHandle.bind(this)} remarksText={remarksText} remarksTextFlag={remarksTextFlag} titlePerfYearFlag={titlePerfYearFlag}/>
            </Fragment>
        )
    }
    async componentWillReceiveProps(nextProps) {
        var {id, keys,modifyDate} = nextProps
        // console.log(id, keys,modifyDate,"modifyDate")
        var dataTextF = await ApiService.get_remarksMonth("", id, keys, modifyDate)
        if(dataTextF && dataTextF.length > 5){
            dataTextF = dataTextF ? JSON.parse(dataTextF) : []
            var remarksTextShow = dataTextF[0] && dataTextF[0].remarks
            // if (remarksTextShow) {
            //     // 对base64转编码
            //     var remarksTextShowDecode = atob(remarksTextShow);
            //     // 编码转字符串
            //     var remarksTextShowText = decodeURI(remarksTextShowDecode);
            //   }else{
            //     var remarksTextShowText = ""
            //   }
            // console.log(remarksTextShowText,"remarksTextShowText")
            var remarksTextFlag = remarksTextShow ? true : false
        }else{
            var remarksTextFlag = false
        }
        // console.log(dataTextF,remarksTextFlag,"dataTextF")
        this.setState({
            remarksTextFlag,
        })
    }
    // componentDidMount(){
    //     var {id, keys,modifyDate} = this.props
    //     console.log(id, keys,modifyDate,"modifyDate")
    // }
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