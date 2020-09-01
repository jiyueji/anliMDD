import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import ApiService from '../services/ApiService'
// 
export default class TableViewCommentsOne extends Component {
  constructor() {
    super();
    this.state = {
      remarksText: ""
    }
  }
  render() {
    var {remarksText } = this.state
    return (
      <Fragment>
        {
          remarksText ? <div>
            <div dangerouslySetInnerHTML={{ __html: remarksText }}></div>
          </div> : ""
        }
      </Fragment>
    )
  }

  componentWillReceiveProps(nextProps) {
    var modifyDate = nextProps.modifyDate
    this.getRemarksHandle(modifyDate)
  }

  componentDidMount(){
    var {modifyDate} = this.props
    this.getRemarksHandle(modifyDate)
  }
  async getRemarksHandle(modifyDate) {
    // console.log(modifyDate,"modifyDate")
    var dataText = await ApiService.get_remarksMonth("", "sub1", "sales_remarks", modifyDate)
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