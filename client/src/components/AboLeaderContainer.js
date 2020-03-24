import React from "react";

import { observer, inject} from 'mobx-react'

import _ from 'lodash'

import PieChartAboLeader from '../components/PieChartAboLeader'
import TableViewGAR from '../components/TableViewGAR'
import BarAboPinPop from '../components/BarAboPinPop'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'


/**
 * This layout demonstrates how to sync to localstorage.
 */
@inject('chartStoreAbo') @observer
class AboLeaderContainer extends React.PureComponent {


  constructor(props) {
    super(props);
  }


  render() {

    const chartStoreAbo = this.props.chartStoreAbo

    return (
      <div className="container-fluid">

        <div className="page-block">
          <PieChartAboLeader data={chartStoreAbo.aboBonus} />
        </div>

        <div className="page-block">
          <TableViewGAR data={chartStoreAbo.aboGar1} />
        </div>
        
        <div className="page-block">
          <label className="tab-cont-title">
              PIN Distribution
            </label>
          <Row>
            <Col>
              <div className="sb-wrap-sm">
              <BarAboPinPop data={chartStoreAbo.aboPinPop} />
              </div>
            </Col>
            
            <Col>

            </Col>
          </Row>
        </div>


  

      </div>
    );
  }
}

export default AboLeaderContainer;