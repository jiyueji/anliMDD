import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

// import routes from '../routes'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'
// import history from '../services/history'

import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

//import CardsLayout from '../components/CardsLayout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'

//import HomeContainer from '../components/HomeContainer'
import SalesPerformanceContainer from '../components/SalesPerformanceContainer'
import AboDynamicsContainer from '../components/AboDynamicsContainer'
//import AboLeaderContainer from '../components/AboLeaderContainer'
import GrowthContainer from '../components/GrowthContainer'
import DailyReportContainer from '../components/DailyReportContainer'
import SocialPromContainer from '../components/SocialPromContainer'

import { DatePicker } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
import { withOktaAuth } from '@okta/okta-react';
import ApiService from '../services/ApiService'

/**
 * Home page extra component
 */


@inject('authStore', 'chartStore', 'chartStoreAbo', 'chartStoreGrowth', 'chartStoreDaily', 'chartStoreSocial') @observer
    export default withOktaAuth(class Home extends Component {

        _isMounted = false;
        oktaSignInWithRedirect = false;
        @observable selectedTab = 'Sales Performance'
        @observable isPerfYear = true
        @observable isFiveDatePicker = ""
        // @observable isMonthDatePicker = ""
        @observable isAllDatePicker = ""


        constructor(props) {
            super(props)
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
            this.checkUser = this.checkUser.bind(this);
            this.state = {
                thisWindowWidth: false,
                thisPageTitle: "Update on 9th of each month",
                nowDateMonth: "",
                nowDateDay: "",
                nowDateYear: "",
                userOkta: null,
                userFlag:false,
            }
            //        this.onClickEditDashboard = this.onClickEditDashboard.bind(this)
        }
        async checkUser() {
            if (this.props.authState.isAuthenticated && !this.state.userFlag) {
                // console.log("checkUser")
              const userInfo = await this.props.oktaAuth.token.getUserInfo();
              var userOkta = userInfo && userInfo.name
            //   console.log(this.props,userInfo,"userInfo")
              const dataUser = await ApiService.get_query_user(userOkta)
              var UserShow = dataUser && dataUser.length > 5 ? JSON.parse(dataUser) : null
              if (this._isMounted && userOkta && UserShow) {
                this.setState({ userFlag:true});
              }
            }
          }

        async login() {
            this.props.oktaAuth.signInWithRedirect("/");
        }

        async logout() {
            console.log(this.props,"this.props")
            // this.props.authStore.logout()
            this.props.oktaAuth.signOut({
                revokeAccessToken: false,
            });
        }

          async componentDidUpdate() {
            this._isMounted = true;
            this.checkUser();
          }

          componentWillUnmount() {
            this._isMounted = false;
          }
        // async login() {
        //     this.props.authService.login('/');
        // }

        // async logout() {
        //     this.props.authService.logout('/');
        // }

        async componentDidMount() {
            console.log(this.props,"this.props")
            if(!this.props.authStore.isAuthenticated){
                this.login()
            }
            this._isMounted = true;
            this.checkUser();
            // 实现吸顶
            window.addEventListener("scroll", () => {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log(document.getElementById('topTatilShow'))
                var offsetTopNav = document.getElementsByClassName('nav-tabs')[0] ? document.getElementsByClassName('nav-tabs')[0].offsetTop : 0;
                if (scrollTop > offsetTopNav && document.getElementsByClassName('nav-tabs')[0]) {
                    document.getElementsByClassName('nav-tabs')[0].style.position = "fixed";
                    document.getElementsByClassName('nav-tabs')[0].style.top = "0";
                    document.getElementsByClassName('nav-tabs')[0].style.zIndex = "1000";
                    document.getElementsByClassName('nav-tabs')[0].style.width = "100%";
                } else if (document.getElementsByClassName('nav-tabs')[0]) {
                    document.getElementsByClassName('nav-tabs')[0].style.position = "";
                    document.getElementsByClassName('nav-tabs')[0].style.top = "";
                }
                var offsetTop = document.getElementById('topTatilShow') ? document.getElementById('topTatilShow').offsetTop : 0;
                if (scrollTop > offsetTop && document.getElementById('topTatilShow')) {
                    document.getElementById('topTatilShow').style.position = "fixed";
                    document.getElementById('topTatilShow').style.top = "44px";
                } else if (document.getElementById('topTatilShow')) {
                    document.getElementById('topTatilShow').style.position = "absolute";
                    document.getElementById('topTatilShow').style.top = "110px";
                }
            })

            this.apiDataUpdate()
        }

        apiDataUpdate() {
            this.props.chartStore.fetchPerformanceData1();
            this.props.chartStore.fetchPerformanceData2Tooltip();
            this.props.chartStore.fetchPerformanceData2Com()
            this.props.chartStore.fetchPerformanceData2();
            this.props.chartStore.fetchPerformanceData3();
            // 一屏备注框新接口
            this.props.chartStore.fetchSalesSecondComByMonth("", '20')//提示框

            this.props.chartStoreAbo.fetchAboCisKpiData();
            this.props.chartStoreAbo.fetchAboRenewalData();
            this.props.chartStoreAbo.fetchAboPinData();
            this.props.chartStoreAbo.fetchAboNonPinData();
            this.props.chartStoreAbo.fetchAboRetentionData();
            this.props.chartStoreAbo.fetchAboQualificationData();
            this.props.chartStoreAbo.fetchAboMigBot()
            this.props.chartStoreAbo.fetchAboMigTop()
            this.props.chartStoreAbo.fetchAboQMonthPvData()
            this.props.chartStoreAbo.fetchAboNewQualData()
            this.props.chartStoreAbo.fetchKeyDriverData()

            //this.props.chartStoreAbo.fetchAboLeaderData1();
            this.props.chartStoreAbo.fetchAboBonusData()
            this.props.chartStoreAbo.fetchAboGar2()
            this.props.chartStoreAbo.fetchAboGar1()
            this.props.chartStoreAbo.fetchAboPinPopData()
            //三屏新全数据接口
            this.props.chartStoreAbo.fetchAboRenewalRateByMonth("", '20')//二图
            this.props.chartStoreAbo.fetchAboQualificationDataByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchAboBonusByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchGarTracking1ByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchGarTracking2ByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchAboPinDataByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchAboNonPinDataByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchAboCsiKpiByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchQMonthPvByMonth("", '20')//提示框
            this.props.chartStoreAbo.fetchAboMigrationBotByMonth("", '20')//提示框


            this.props.chartStoreGrowth.fetchGrowthSustData()
            this.props.chartStoreGrowth.fetchGrowthSalesSegData()
            this.props.chartStoreGrowth.fetchGrowthPopSegData()
            this.props.chartStoreGrowth.fetchGrowthBuyerData()
            this.props.chartStoreGrowth.fetchGrowthTableData()
            //二屏新全数据接口
            this.props.chartStoreGrowth.fetchGrowthTableByMonth("", '20')//提示框


            this.props.chartStoreDaily.fetchDailySalEventsData()
            this.props.chartStoreDaily.fetchDailySalesData()
            this.props.chartStoreDaily.fetchDailyRecData()
            this.props.chartStoreDaily.fetchDailyTableSalData()
            this.props.chartStoreDaily.fetchDailyTableRecData()
            this.props.chartStoreDaily.fetchManualInputsData()
            this.props.chartStoreDaily.fetchDailyCommentsData()
            this.props.chartStoreDaily.fetchGetQueryDailySalesLine()

            this.props.chartStoreDaily.fetchGetQueryQueryDailySalesLine2ByMonth("", '20')//第五屏折线图的所有数据
            this.props.chartStoreDaily.fetchGetQueryDailySalEventsByMonth("", '20')//提示框

            this.props.chartStoreSocial.fetchSocialRepBuyData()
            this.props.chartStoreSocial.fetchSocialFoaProdData()
            this.props.chartStoreSocial.fetchSocialPopData()
            this.props.chartStoreSocial.fetchSocialConvData()
            this.props.chartStoreSocial.fetchSocialReferData()

            this.props.chartStoreSocial.fetchSocialBusImpData()
            this.props.chartStoreSocial.fetchSocialBusImp35Data()
            this.props.chartStoreSocial.fetchSocialBusImpMonData()
            this.props.chartStoreSocial.fetchSocialEarnSegData()
            this.props.chartStoreSocial.fetchSocialEarnDurData()
            this.props.chartStoreSocial.fetchSocial3eSalData()
            this.props.chartStoreSocial.fetchSocialEarnAttrData()
            this.props.chartStoreSocial.fetchSocialBuyLoyData()
            this.props.chartStoreSocial.fetchSocialBuyPenData()
            this.props.chartStoreSocial.fetchSocialProdFirstData()
            this.props.chartStoreSocial.fetchSocialAttrRateData()
            this.props.chartStoreSocial.fetchSocialRndPartData()
            this.props.chartStoreSocial.fetchSocialPartDistData()
            this.props.chartStoreSocial.fetchSocialSopSalData()

            this.props.chartStoreSocial.fetchSocialFoaProdDataNew()//第四屏新加数据表格内容
            this.props.chartStoreSocial.fetchSocialPopDataNew()
            this.props.chartStoreSocial.fetchSocialRepBuyDataNew()
            this.props.chartStoreSocial.fetchSocialRefDataNew()
            this.props.chartStoreSocial.fetchSocialConvDataNew()
        }

        handleSwitchChange = nr => () => {
            this.isPerfYear = !this.isPerfYear

            if (this.props.chartStore && this.props.chartStoreAbo) {
                this.props.chartStore.isPerfYear = !this.props.chartStore.isPerfYear
                this.props.chartStoreAbo.isPerfYear = !this.props.chartStoreAbo.isPerfYear
                // this.props.chartStoreGrowth.isPerfYear = !this.props.chartStoreGrowth.isPerfYear
                this.props.chartStoreDaily.isPerfYear = !this.props.chartStoreDaily.isPerfYear
                this.props.chartStoreSocial.isPerfYear = !this.props.chartStoreSocial.isPerfYear
            }
        }
        handleClickToUp = () => {
            var { thisPageTitle } = this.state
            // console.log(window.innerWidth)
            // var thisWindowWidth = window.innerWidth
            // window.location.reload()
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            // this.setState({
            //     thisWindowWidth,
            // }),AGP KPI,,,
            if (this.selectedTab && (this.selectedTab == "Sales Performance" || this.selectedTab == "Customer Dynamics")) {
                thisPageTitle = "Update on 9th of each month"
            } else if (this.selectedTab && (this.selectedTab == "AGP KPI" || this.selectedTab == "ABO Momentum & Goal Tracking")) {
                thisPageTitle = "Update on 12th of each month"
            } else if (this.selectedTab && this.selectedTab == "Daily Report") {
                thisPageTitle = "Update around 2 pm of each day"
            }
            this.setState({
                thisPageTitle,
            })
            // console.log(this.selectedTab)
        }
        handleDataUpdate = () => {
            // this.apiDataUpdate()
            this.props.chartStoreGrowth.fetchGrowthTableData()
            this.props.chartStoreAbo.fetchAboPinPopData()
        }
        //日期范围发生变化的回调
        clickDateChange = (date, dateString) => {
            if (!this.isFiveDatePicker) {//当刚进入系统的时候获取目前数据的实际月份和日
                var nowDateMonth = this.props.chartStoreDaily.queryDailySalesLineHandle.dateChangeOld.slice(5, 7)
                var nowDateDay = this.props.chartStoreDaily.queryDailySalesLineHandle.dateChangeOld.slice(8, 10)
                var nowDateYear = this.props.chartStoreDaily.queryDailySalesLineHandle.dateChangeOld.slice(0, 4)
                this.setState({
                    nowDateMonth,
                    nowDateDay,
                    nowDateYear,
                })
            } else {
                var { nowDateMonth, nowDateDay, nowDateYear } = this.state
            }
            //dateString是目前选择的年加月
            var antdChangeDateMonth = dateString.slice(5, 7)//目前选择的月
            var antdChangeDateYear = dateString.slice(0, 4)//目前选择的年
            var getThisMonthDay = new Date(antdChangeDateYear, antdChangeDateMonth, 0).getDate()//根据选择年月算月有多少天
            this.isFiveDatePicker = antdChangeDateYear == nowDateYear && antdChangeDateMonth == nowDateMonth ? moment(date).format('YYYYMM') + nowDateDay : moment(date).format('YYYYMM') + getThisMonthDay
            //如果没有进行日期选择那么就用最之前的日期进行传值，选择后默认为选择月+最后一天
            this.props.chartStoreDaily.isFiveDatePicker = antdChangeDateYear == nowDateYear && antdChangeDateMonth == nowDateMonth ? moment(date).format('YYYYMM') + nowDateDay : moment(date).format('YYYYMM') + getThisMonthDay
            this.props.chartStoreDaily.fetchGetQueryDailySalesTableByMonth("", this.isFiveDatePicker)//
            this.props.chartStoreDaily.fetchGetQueryDailyRecTableByMonth("", this.isFiveDatePicker)//后两个图的
            this.props.chartStoreDaily.fetchGetQueryDailyCommentsByMonth("", this.isFiveDatePicker)
        }
        //限制日期选择
        disabledDate = (current) => {
            if (this.selectedTab === "AGP KPI") {//第二屏
                return current < moment(new Date('2015/01')) || current > moment().endOf('day')
            } else if (this.selectedTab === "Customer Dynamics") {//第四屏
                return current < moment(new Date('2018/09')) || current > moment().endOf('day')
            } else if (this.selectedTab === "Daily Report") {//第五屏
                return current < moment(new Date('2018/01')) || current > moment().endOf('day')
            }
            return current < moment(new Date('2015/09')) || current > moment().endOf('day')
        }
        //前四屏日期范围发生变化的回调
        clickDateChangeAll = (date, dateString) => {
            this.isAllDatePicker = moment(date).format('YYYYMM')
            // console.log(this.isAllDatePicker)
            this.props.chartStoreSocial.isAllDatePicker = this.isAllDatePicker//第四
            this.props.chartStoreAbo.isAllDatePicker = this.isAllDatePicker//第三
            this.props.chartStoreGrowth.isAllDatePicker = this.isAllDatePicker//第二
            this.props.chartStore.isAllDatePicker = this.isAllDatePicker//第一
        }

        render() {
            const authStore = this.props.authStore
            const fivePageDateUp = this.props.chartStoreDaily.queryDailySalesLineHandle.pageUpShowDate//第五屏的时间显示
            const monthFormat = 'YYYY/MM';
            const dateFormat = 'YYYY/MM';
            const dateFormatFive = this.props.chartStoreDaily.queryDailySalesLineHandle.dateChangeOld;
            const dateFormatAll = this.props.chartStore.donutTotalSalesLastMonth.dateChangeData;
            const { MonthPicker } = DatePicker;

            var { thisWindowWidth, thisPageTitle,userFlag } = this.state
            // console.log(this.props.authState,"this.props.authStat")
            if (this.props.authState.isPending || (this.props.authState.isAuthenticated && !userFlag)) return <div>Loading...</div>;
            return this.props.authState.isAuthenticated ? userFlag ?
                <div className="dashboard-wrap">
                    <button onClick={this.logout} className="logoutCss">logout</button>
                    {authStore.isAuthenticated &&
                        <React.Fragment>
                            <div className="container-fluid">
                                <div className="page-title bigTatie" id="topTatilShow">
                                    <h1 className="main-title" style={{ lineHeight: "inherit" }}>{this.selectedTab} <span style={{ fontSize: "12px", color: "#417bff" }}>({thisPageTitle})</span></h1>
                                    {
                                        this.selectedTab === "AGP KPI" ? "" : this.selectedTab === "Daily Report" ? <div style={{ marginRight: "11%", lineHeight: "30px" }}>{dateFormatFive}</div> : <div className='custom-control custom-switch perf-switch-wrap' style={{ marginRight: "11%" }}>
                                            <label className='perf-lbl' htmlFor='perfYearSwitcher'>
                                                Performance Year
                                            </label>
                                            <input
                                                type='checkbox'
                                                className='custom-control-input'
                                                id='perfYearSwitcher'
                                                checked={this.isPerfYear}
                                                onChange={this.handleSwitchChange()}
                                                readOnly
                                            />
                                            <label className='custom-control-label' htmlFor='perfYearSwitcher'>
                                                Calendar Year
                                            </label>
                                        </div>
                                    }
                                    {
                                        this.selectedTab === "Daily Report" ? <DatePicker picker="month" defaultValue={moment(dateFormatFive, dateFormat)} format={dateFormat} allowClear={false} inputReadOnly={true} showToday={true} onChange={this.clickDateChange.bind(this)} disabledDate={this.disabledDate.bind(this)} /> : <MonthPicker defaultValue={moment(dateFormatAll, monthFormat)} format={monthFormat} picker="month" allowClear={false} inputReadOnly={true} showToday={true} onChange={this.clickDateChangeAll.bind(this)} disabledDate={this.disabledDate.bind(this)} />
                                    }
                                </div>
                                <div className="main-navigation">
                                    <Tabs activeKey={this.selectedTab} onSelect={k => this.selectedTab = k} onClick={this.handleClickToUp.bind(this)}>
                                        <Tab eventKey="Sales Performance" title={<div><i className="fas fa-dollar-sign"></i>Sales Performance</div>}>
                                            <SalesPerformanceContainer thisWindowWidth={thisWindowWidth} />
                                        </Tab>
                                        <Tab eventKey="AGP KPI" title={<div><i className="fas fa-chart-bar"></i>AGP KPI</div>}>
                                            <GrowthContainer />
                                        </Tab>
                                        <Tab eventKey="ABO Momentum & Goal Tracking" title={<div><i className="fas fa-dollar-sign"></i>ABO Momentum & Goal Tracking</div>}>
                                            <AboDynamicsContainer />
                                        </Tab>
                                        <Tab eventKey="Customer Dynamics" title={<div><i className="fas fa-home"></i>Customer Dynamics</div>}>
                                            <SocialPromContainer />
                                        </Tab>
                                        <Tab eventKey="Daily Report" title={<div><i className="fas fa-home"></i>Daily Report</div>}>
                                            <DailyReportContainer />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div> : <div>Contact us with any questions by dialing 8333 or sending email to servicedesk.china@Amway.com.</div> : <button onClick={this.login} className="loginButton">Login</button>;
        }
    })

