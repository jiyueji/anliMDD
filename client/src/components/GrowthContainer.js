//第二个页面
import React from "react";

import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import _ from 'lodash'

import TableViewGrowth from '../components/TableViewGrowth'
import LineChartGrowthSust from '../components/LineChartGrowthSust'
import BarChartDropDrillSale from '../components/BarChartDropDrillSale'
import BarChartDropDrillPop from '../components/BarChartDropDrillPop'
import BarChartDropDrillBuy from '../components/BarChartDropDrillBuy'
import LineChartDropDrillBuy from '../components/LineChartDropDrillBuy'

import GrowthTable from '../Agpkpi/GrowthTable'
import SegmentsThree from '../Agpkpi/SegmentsThree'
import Sustainability from '../Agpkpi/Sustainability'
import SustainabilityEnd from '../Agpkpi/SustainabilityEnd'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


/**
 * This layout demonstrates how to sync to localstorage.
 */
@inject('chartStoreGrowth') @observer
class GrowthContainer extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const chartStoreGrowth = this.props.chartStoreGrowth

    return (
      // <div className="container-fluid">
      <div>
        <div className="page-block" style={{display: 'flex',justifyContent: 'space-between'}}>
          <div style={{ width: '50%', height: '435px', background: '#ffffff',borderRadius:"10px" }}>
            {/* 第一个表格 */}
            <GrowthTable data={chartStoreGrowth.growthTable} />
          </div>
          <div style={{ width: '49%', height: '435px', background: '#ffffff',borderRadius:"10px" }}>
            {/* 第二个可以切换的三个图 */}
            <SegmentsThree dataSales={chartStoreGrowth.growthSalesSeg} dataPopulation={chartStoreGrowth.growthPopSeg} dataProductivity={chartStoreGrowth.growthProdSeg}/>
          </div>
          {/* <TableViewGrowth data={chartStoreGrowth.growthTable}/> */}
        </div>
        
        <div style={{height:'40px',lineHeight:'50px',fontSize:'18px',fontWeight:'600'}}>
          Sustainability
        </div>

        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <div style={{width:'49.5%',height:'442px', background: '#ffffff',borderRadius:"10px" }}>
            <Sustainability data={chartStoreGrowth.growthSustainability}/>
          </div>
          <div style={{width:'49.5%',height:'442px', background: '#ffffff',borderRadius:"10px" }}>
            <SustainabilityEnd data={chartStoreGrowth.growthSustainability}/>
          </div>
        </div>
        {/* <div className="page-block">
          <label className="tab-cont-title">
            Healthy
          </label>
          <Row>
            <Col>
              <div className="sb-wrap-sm">
                <LineChartGrowthSust data={chartStoreGrowth.growthSustainability}
                  title={'High PPV % of Sales'} lineDataName={'high_ppv_pct_of_sales_actual_data'}
                  topRightLabels={['Calendar year YTD High PPV % of Sales: ', 'High PPV % of Sales Target: ']}
                  topLblFields={['last_ytd_highppv_pct', 'last_target_high_ppv_pct']} />
              </div>
            </Col>
            <Col>
              <div className="sb-wrap-sm">
                <LineChartGrowthSust data={chartStoreGrowth.growthSustainability}
                  title={'End of Month % of Sales'} lineDataName={'eom_pct_of_sales_actual_data'}
                  topRightLabels={['Calendar year YTD End of Month % of Sales: ', 'End of Month % of Sales Target: ']}
                  topLblFields={['last_ytd_end_of_month_pct', 'last_target_eom_pct']} />
              </div>
            </Col>
          </Row>
        </div> */}

        {/* <div className="page-block">
          <label className="tab-cont-title">
            Sales by Segments
          </label>
          <Row>
            <Col>
              <BarChartDropDrillSale data={chartStoreGrowth.growthSalesSeg} />
            </Col>
          </Row>
        </div>

        <div className="page-block">
          <label className="tab-cont-title">
            Population by Segments
          </label>
          <Row>
            <Col>
              <BarChartDropDrillPop title={'Population'} subtitle={'Population'}
                data={chartStoreGrowth.growthPopSeg} formatThous={true}
                subtPostfix={''} />
            </Col>
          </Row>
        </div>

        <div className="page-block">
          <label className="tab-cont-title">
            Productivity by Segments
          </label>
          <Row>
            <Col>
              <BarChartDropDrillPop title={'Productivity'} subtitle={'Productivity $'}
                subtPostfix={'($)'}
                data={chartStoreGrowth.growthProdSeg} formatThous={false} />
            </Col>
          </Row>
        </div>

        <div className="page-block">
          <label className="tab-cont-title">
            Buyer Population
          </label>
          <Row>
            <Col>
              <BarChartDropDrillBuy data={chartStoreGrowth.growthBuyer} />
            </Col>
          </Row>
        </div>

        <div className="page-block">
          <label className="tab-cont-title">
            Buyers Productivity
          </label>
          <Row>
            <Col>
              <LineChartDropDrillBuy data={chartStoreGrowth.growthBuyerLine} />
            </Col>
          </Row>
        </div> */}



      </div>
    );
  }
}

export default GrowthContainer;