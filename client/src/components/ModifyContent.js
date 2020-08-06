//修改备注页面
import React, { Fragment } from "react";

import { observer, inject } from 'mobx-react'
import {Spin } from 'antd';
import ModifyText from "../ModifyKpi/ModifyText.js";

@inject('chartRemarks') @observer
class ModifyContent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      id: "sub1",
      keys: "YTD_salesby_city_cluster",
      modifyDate: "",
      remarks:"",
      dataFlag:false,
    }
  }


  render() {
    var {id, keys, modifyDate,} = this.state
    const chartRemarks = this.props.chartRemarks.remarksMonthGet//拿到的数据
    console.log(chartRemarks,"chartRemarks")
    return (
      <Fragment>
          <ModifyText id={id} parentid={keys} n_month={modifyDate} data={chartRemarks.dataState} updateHandle={this.updateRemarksHandle.bind(this)} />
      </Fragment>
    );
  }
  componentDidMount() {
    var { id, keys, modifyDate, } = this.props
    this.setState({
      id, keys, modifyDate,
    })
  }
  componentWillReceiveProps(nextProps) {
    var { id, keys, modifyDate, } = nextProps
    this.setState({
      id, keys, modifyDate
    })
  }
  updateRemarksHandle(id, keys, modifyDate,remarks) {//修改备注数据
    // var { id, keys, modifyDate } = this.state
    this.props.chartRemarks.fetchUpdateRemarks("", id, keys, modifyDate, remarks)
        // this.props.chartRemarks.fetchRemarksMonth("", id, keys, modifyDate)//执行过修改备注之后立马执行查询
  }
}

export default ModifyContent;