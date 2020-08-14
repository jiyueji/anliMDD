import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import ApiService from '../services/ApiService'
// 
export default class TableViewComments extends Component {
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
    var remarksText = dataText[0] && dataText[0].remarks
    this.setState({
      remarksText
    })
    // this.props.chartRemarks.fetchRemarksMonth("", id, keys, modifyDate)
  }
}