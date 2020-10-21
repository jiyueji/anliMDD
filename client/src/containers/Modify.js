import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import ApiService from '../services/ApiService'
import { Layout, Menu, DatePicker, Spin } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Menus from "../ModifyKpi/Menus.js";
import ModifyContent from '../components/ModifyContent'
import moment from 'moment';
import "antd/dist/antd.css";

@inject('chartRemarks') @observer
class Modify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArr: [
        { id: "sub1", name: "Sales Performance", item: [{ keys: "sales_remarks", title: "sales remarks" }, { keys: "YTD_salesby_city_cluster", title: "YTD salesby city cluster" }, { keys: "YTD_Salse_by_FC", title: "YTD Salse by FC" }] },
        { id: "sub2", name: "AGP KPI", item: [{ keys: "Shape_of_the_Business", title: "Shape of the Business" }, { keys: "High_PPV_%_of_Sales", title: "High PPV % of Sales" }, { keys: "End_of_Month_%_of_Sales", title: "End of Month % of Sales" }] },
        { id: "sub3", name: "ABO Momentum & Goal Tracking", item: [{ keys: "ABO_force_movement", title: "ABO force movement" }, { keys: "First_year_ABO_renewal_rate", title: "First year ABO renewal rate" }, { keys: "Monthly_Q_Months", title: "Monthly Q Months" }, { keys: "FAA", title: "FAA" }, { keys: "GAR_by_PIN", title: "GAR by PIN" }, { keys: "Monthly_Income_by_PIN_level", title: "Monthly Income by PIN level" }, { keys: "CSI", title: "CSI" }, { keys: "Prediction_of_Bonus_Migration_for_Next_3_months", title: "Prediction of Bonus Migration for Next 3 months" }] },
        { id: "sub4", name: "Customer Dynamics", item: [{ keys: "FOA_Sales", title: "FOA Sales" }, { keys: "FOA_Forcesize", title: "FOA Forcesize" }, { keys: "FOA_Buyer_&_Productivity", title: "FOA Buyer & Productivity" }, { keys: "FOA_Repeat_Buyer", title: "FOA Repeat Buyer" }, { keys: "Referral", title: "Referral" }, { keys: "FOA_Converted_to_ABO/PC", title: "FOA Converted to ABO/PC" }] },
        { id: "sub5", name: "Daily Report", item: [{ keys: "daily_report_remarks", title: "daily report remarks" },] },
      ],
      id: "sub1",
      keys: "sales_remarks",
      remarksMonthDate: "",
      modifyDate: "",
      modifyDateFive:"",//第五
    }
  }

  render() {

    const { Header, Content, Footer, Sider } = Layout;
    var { dataArr, id, keys, remarksMonthDate, modifyDate,modifyDateFive } = this.state
    const dateFormat = 'YYYY/MM';
    const dateDayFromat = "YYYY/MM/DD"
    const { MonthPicker } = DatePicker;
    var chartRemarks = this.props.chartRemarks

    // 展示时间    //显示到月份"202007"
    var date = new Date();
    var modifyDateGetMonth = (date.getMonth()) < 10 ? "0" + (date.getMonth()) : (date.getMonth()) == 0 ? "12" : toString((date.getMonth()))
    var showMonth = date.getFullYear() + modifyDateGetMonth
    // 展示时间    //显示到昨天的日期"20200826"
    date.setTime(date.getTime()-24*60*60*1000);
    var showYear = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()
    return (
      <Router>
        <Spin spinning={chartRemarks.modifyLoading}>
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              // width="256"
              style={{
                // overflow: 'auto',
                // height: '90%',
                // position: 'fixed',
                // left: 0,
              }}
              onBreakpoint={broken => {
                // console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
              }}
            >
              {/* <div className="logo" /> */}
              <Menus dataArr={dataArr} parameter={this.getParameter.bind(this)} />
            </Sider>
            <Layout>
              <Header className="site-layout-sub-header-background" style={{ padding: '0 16px', textAlign: 'right', background: 'white' }}>
                {
                  id === "sub5" ?
                    <DatePicker defaultValue={moment(showYear, dateDayFromat)} format={dateDayFromat} allowClear={false} inputReadOnly={true} showToday={false} onChange={this.clickDateChangeFive.bind(this)} disabledDate={this.disabledDate.bind(this)} /> :
                    <MonthPicker defaultValue={moment(showMonth, dateFormat)} picker="month" format={dateFormat} allowClear={false} inputReadOnly={true} showToday={false} onChange={this.clickDateChange.bind(this)} disabledDate={this.disabledDate.bind(this)} />
                }
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%', position: 'relative' }}>
                  <ModifyContent id={id} keys={keys} modifyDate={id === "sub5" ? modifyDateFive : modifyDate} />
                </div>
              </Content>
              {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2020-07-17 Created by Ant UED</Footer> */}
            </Layout>
          </Layout>
        </Spin>
      </Router>
    )
  }
  clickDateChangeFive(date, dateString) {//第五时间插件改变的时候
    // var dateNow = new Date();
    // dateNow.setTime(dateNow.getTime()-24*60*60*1000);
    // var dateNowYear = dateNow.getFullYear()
    // var dateNowMonth = dateNow.getMonth() + 1
    // //dateString是目前选择的年加月
    // var antdChangeDateMonth = dateString.slice(5, 7)//目前选择的月
    // var antdChangeDateYear = dateString.slice(0, 4)//目前选择的年
    // var getThisMonthDay = new Date(antdChangeDateYear, antdChangeDateMonth, 0).getDate()//根据选择年月算月有多少天
    // if(dateNowYear == antdChangeDateYear && dateNowMonth == antdChangeDateMonth){
    //   var modifyDateGetMonthFive = dateNowMonth < 10 ? "0" + dateNowMonth : toString(dateNowMonth)
    //   var modifyDateFive = (dateNow.getFullYear() + "/" + modifyDateGetMonthFive + "/" + dateNow.getDate()).replace(/\//g,'')
    // }else{
    //   var modifyDateFive = moment(date).format('YYYYMM') + getThisMonthDay
    // }
    var modifyDateFive = moment(date).format('YYYYMMDD')//获取目前选择的年月日
    // console.log(modifyDateFive)
    this.setState({
      modifyDateFive,
    }, () => {
      this.apiRemarksUpdate()//执行查询备注数据
    })
  }
  clickDateChange(date, dateString) {//时间插件改变的时候
    //dateString是目前选择的年加月(yyyy/mm)
    // console.log(dateString,moment(date).format('YYYYMM'),"dateString")
    var modifyDate = moment(date).format('YYYYMM')
    this.setState({
      modifyDate,
    }, () => {
      this.apiRemarksUpdate()//执行查询备注数据
    })
  }
  disabledDate() {//时间插件禁止点击的日期

  }
  // 拿到子组件Id的数据
  getParameter(id, keys) {
    this.setState({
      id,
      keys,
    }, () => {
      this.apiRemarksUpdate()//执行查询备注数据
    })
  }
  componentDidMount() {
    //前四
    var date = new Date();
    var modifyDateGetMonth = (date.getMonth()) < 10 ? "0" + (date.getMonth()) : (date.getMonth()) == 0 ? "12" : toString((date.getMonth()))
    var modifyDate = date.getFullYear() + modifyDateGetMonth
    //第五
    date.setTime(date.getTime()-24*60*60*1000);
    var modifyDateGetMonthFive = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    var modifyDateFive = (date.getFullYear() + "/" + modifyDateGetMonthFive + "/" + date.getDate()).replace(/\//g,'')
    this.setState({
      modifyDate,modifyDateFive
    }, () => {
      this.apiRemarksUpdate()
    })
  }
  apiRemarksUpdate() {//查询备注数据
    var { id, keys, modifyDate,modifyDateFive } = this.state
    id === "sub5" ? 
    this.props.chartRemarks.fetchRemarksMonth("", id, keys, modifyDateFive) : 
    this.props.chartRemarks.fetchRemarksMonth("", id, keys, modifyDate)
  }
}
export default Modify




// async fetchRemarksMonth(params,id,parentid,n_month) {
//   var {remarksMonthDate} = this.state
//   try {
//     const data = await ApiService.get_remarksMonth(params,id,parentid,n_month)
//     (() => {
//       remarksMonthDate = data ? JSON.parse(data) : []
//       console.log("1111",remarksMonthDate)
//       this.setState({
//         remarksMonthDate,
//       })
//     })
//   } catch (e) {
//     (() => {
//       remarksMonthDate = []
//     })
//   }
// }
// async fetchUpdateRemarks(params,id,parentid,n_month,remarks) {
//   var {updateRemarksDate} = this.state
//   try {
//     const data = await ApiService.get_updateRemarks(params,id,parentid,n_month,remarks)
//     (() => {
//       updateRemarksDate = data ? JSON.parse(data) : []
//     })
//   } catch (e) {
//     (() => {
//       updateRemarksDate = []
//     })
//   }
//   this.setState({
//     updateRemarksDate,
//   })
// }