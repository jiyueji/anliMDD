//第三个页面
import React from "react";

import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import _ from 'lodash'

import LineChartAboRenewal from '../components/LineChartAboRenewal'
import BarChartAboPin from '../components/BarChartAboPin'
import BarChartAboNonPin from '../components/BarChartAboNonPin'
import BarAboRetention from '../components/BarAboRetention'
import BarChartQMonthPV from '../components/BarChartQMonthPV'
import LineChartQMonth from '../components/LineChartQMonth'
import LineChartAboQualification from '../components/LineChartAboQualification'
import TreeViewMigrationTop from './TreeViewMigrationTop'
import TreeViewMigrationBot from './TreeViewMigrationBot'
import TableViewKeyDriver from './TableViewKeyDriver'

import PieChartAboLeader from '../components/PieChartAboLeader'
import TableViewGAR from '../components/TableViewGAR'
import BarAboPinPop from '../components/BarAboPinPop'
import AboDyBarStack from '../AboMomentum/AboDyBarStack'
import AboDyLineChart from '../AboMomentum/AboDyLineChart'
import AboDyFishGuTuBig from '../AboMomentum/AboDyFishGuTuBig'
import AboDyFishGuTuSmall from '../AboMomentum/AboDyFishGuTuSmall'
import AboQMonths from '../AboMomentum/AboQMonths'
import AboRate from '../AboMomentum/AboRate'
import AboPvPer from '../AboMomentum/AboPvPer'
import AboFinalPie from '../AboMomentum/AboFinalPie'
import AboTableGar from '../AboMomentum/AboTableGar'
import AboTableGar1 from '../AboMomentum/AboTableGar1'
import AboBarTwoEcharts from '../AboMomentum/AboBarTwoEcharts'
import AboBarLineEcharts from '../AboMomentum/AboBarLineEcharts'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import Image from 'react-bootstrap/Image'
import BarDropDrillAboNewQual from './BarDropDrillAboNewQual'


/**
 * This layout demonstrates how to sync to localstorage.
 */
@inject('chartStoreAbo', 'chartStoreDaily') @observer
class AboDynamicsContainer extends React.PureComponent {


  constructor(props) {
    super(props);
  }


  render() {

    const chartStoreAbo = this.props.chartStoreAbo
    const chartStoreDaily = this.props.chartStoreDaily

    return (
      // <div className="container-fluid">
      <div>

        <div className="page-block">
          <label className="tab-cont-title">
            Recruitment & Retention
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', height: '420px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第一个堆叠柱状图 */}
              <AboDyBarStack data={chartStoreAbo.aboRetention} />
            </div>
            <div style={{ width: '49%', height: '420px', background: '#ffffff', borderRadius: "10px" , position: "relative"}}>
              {/* 第二个折线图 */}
              <AboDyLineChart data={chartStoreAbo.aboRenewalRate} />
            </div>
          </div>
          <label className="tab-cont-title">
            Migration
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第一个鱼骨图 */}
              <AboDyFishGuTuBig data={chartStoreAbo.aboMigTop} data2={chartStoreAbo.aboMigBot} dataPin={chartStoreAbo.aboPinPop}/>
            </div>
            <div style={{ width: '49%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第二个鱼骨图 */}
              <AboDyFishGuTuSmall data={chartStoreAbo.aboMigBot} />
            </div>
          </div>
          <label className="tab-cont-title">
            Q Months (by performance year)
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '33%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第一个折线图 */}
              <AboQMonths data={chartStoreAbo.aboQualification}/>
            </div>
            <div style={{ width: '33%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第二个竖起来柱状图 */}
              <AboRate data={chartStoreAbo.aboQualification}/>
            </div>
            <div style={{ width: '33%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第二个两行柱状图 */}
              <AboPvPer data={chartStoreAbo.aboQMonthPv} dataLegend={chartStoreAbo.aboQualification}/>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:"15px" }}>
            <div style={{ width: '50%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第一个圆重叠图 */}
              <AboFinalPie data={chartStoreAbo.aboBonus} titleData={chartStoreDaily.manualInputs}/>
            </div>
            <div style={{ width: '49%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 右边的表格 */}
              <AboTableGar1 data={chartStoreAbo.aboGar1}/>
            </div>
          </div>
          <label className="tab-cont-title">
            Income
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第一个有中位线的柱状图 */}
              <AboBarTwoEcharts data={chartStoreAbo.aboPinBarData} datas={chartStoreAbo.aboNonPinBarData}/>
            </div>
            <div style={{ width: '49%', height: '400px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 第二个柱状图加折线 */}
              <AboBarLineEcharts data={chartStoreAbo.aboNonPinBarData}/>
            </div>
          </div>
          {/* <Row>
              <Col>
                <div className="sb-wrap-sm">
                  <BarAboRetention data={chartStoreAbo.aboRetention}/>
                </div>
              </Col>
              <Col>
                <div className="sb-wrap-sm">
                  <LineChartAboRenewal data={chartStoreAbo.aboRenewalRate}/>
                </div>
              </Col>
            </Row> */}
          {/* <Row className="pt-4">
            <Col>
              <div className="sb-wrap-sm">

                <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                  dataElementNum={2} isFullWidth={true}
                  title={'1st Year ABO Renewal Model'}
                />

                <Row className="key-dr-leg-wrp">
                  <Col>
                  </Col>
                  <Col>
                    <i className="fas fa-square green"></i> <label className="fa-lbl">- positive contribution to renewal</label>
                  </Col>
                  <Col>
                    <i className="fas fa-square red"></i> <label className="fa-lbl">- negative contribution to renewal</label>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row> */}
        </div>

        {/* <div className="page-block">
              <label className="tab-cont-title">
                Key Drivers on Prediction Modelling
              </label>
            <Row className="sb-wrap-sm">

              <Col>
                  <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                    dataElementNum={0} 
                    title={'PIN Migration Model'}
                  />
              </Col>
              <Col>
                  <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                    dataElementNum={1} 
                    title={'Bonus Migration Model'}
                  />
              </Col>
              <Col>
                  <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                    dataElementNum={2} 
                    title={'1st Year ABO Renewal Model'}
                  />
              </Col>
              <Row className="key-dr-leg-wrp">
                <Col>
                  <i className="fas fa-square green"></i> <label className="fa-lbl">- positive contribution to renewal / up migration probability</label>
                </Col>
                <Col>
                  <i className="fas fa-square red"></i> <label className="fa-lbl">- negative contribution to renewal / up migration probability</label>
                </Col>
              </Row>
            </Row>
          </div> */}

        {/* <div className="page-block">
            <Row>
              <Col>
                <div className="sb-wrap-sm">

                  <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                    dataElementNum={2} isFullWidth={true}
                    title={'1st Year ABO Renewal Model'}
                  />

                  <Row className="key-dr-leg-wrp">
                    <Col>
                      <i className="fas fa-square green"></i> <label className="fa-lbl">- positive contribution to renewal / up migration probability</label>
                    </Col>
                    <Col>
                      <i className="fas fa-square red"></i> <label className="fa-lbl">- negative contribution to renewal / up migration probability</label>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div> */}

        {/* <div className="page-block sb-wrap-mig">
          <label className="tab-cont-title">
            Migration
            </label>
          <div className="sb-wrap sb-wrap-mig">
            <TreeViewMigrationTop data={chartStoreAbo.aboMigTop} />
            <Row className="pt-4">
              <Col>
                <div className="sb-wrap-sm">

                  <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                    dataElementNum={0}
                    title={'PIN Migration Model'} isFullWidth={true}
                  />

                  <Row className="key-dr-leg-wrp">
                    <Col>
                    </Col>
                    <Col>
                      <i className="fas fa-square green"></i> <label className="fa-lbl">- positive up migration probability</label>
                    </Col>
                    <Col>
                      <i className="fas fa-square red"></i> <label className="fa-lbl">- negative up migration probability</label>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className="sb-wrap sb-wrap-mig">
            <TreeViewMigrationBot data={chartStoreAbo.aboMigBot} />
            <Row className="pt-4">
              <Col>
                <div className="sb-wrap-sm">

                  <TableViewKeyDriver data={chartStoreAbo.aboKeyDriver}
                    dataElementNum={1} isFullWidth={true}
                    title={'Bonus Migration Model'}
                  />

                  <Row className="key-dr-leg-wrp">
                    <Col>
                    </Col>
                    <Col>
                      <i className="fas fa-square green"></i> <label className="fa-lbl">- positive up migration probability</label>
                    </Col>
                    <Col>
                      <i className="fas fa-square red"></i> <label className="fa-lbl">- negative up migration probability</label>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}

        {/* <div className="page-block">
          <label className="tab-cont-title">
            PIN Distribution
            </label>
          <Row>
            <Col md={12}>
              <div className="sb-wrap-sm">
                <BarAboPinPop data={chartStoreAbo.aboPinPop} />
              </div>
            </Col>

          </Row>
        </div> */}

        {/* <div className="page-block">
          <label className="tab-cont-title">
            New Qualifier
            </label>
          <Row>
            <Col>
              <BarDropDrillAboNewQual data={chartStoreAbo.aboNewQual} />
            </Col>
          </Row>
        </div> */}


        {/* <div className="page-block">
          <label className="tab-cont-title">
            Q Months
            </label>
          <label className="st-card-tl-sub">(by performance year)</label>
          <Row>
            <Col>
              <div className="sb-wrap-sm">
                <LineChartQMonth data={chartStoreAbo.aboQualification} />
              </div>
            </Col>
            <Col>
              <div className="sb-wrap-sm">
                <LineChartAboQualification data={chartStoreAbo.aboQualification} />
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <div className="sb-wrap-sm">
                <BarChartQMonthPV data={chartStoreAbo.aboQMonthPv} />
              </div>
            </Col>
            <Col>
            </Col>
          </Row>
        </div> */}

        {/* <div className="page-block">
          <PieChartAboLeader data={chartStoreAbo.aboBonus} titleData={chartStoreDaily.manualInputs} />
        </div>

        <div className="page-block">
          <TableViewGAR data={chartStoreAbo.aboGar1} />
        </div> */}


        {/* <div className="page-block">
          <label className="tab-cont-title">
            Income
            </label>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <div className="sb-wrap-sm">
                <BarChartAboPin data={chartStoreAbo.aboPinBarData} />
              </div>
            </Col>
            <Col>
              <div className="sb-wrap-sm">
                <BarChartAboNonPin data={chartStoreAbo.aboNonPinBarData} />
              </div>
            </Col>
          </Row>
        </div> */}

      </div>
    );
  }
}

export default AboDynamicsContainer;