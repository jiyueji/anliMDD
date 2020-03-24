import React from "react";

import { observable} from 'mobx'
import { observer, inject} from 'mobx-react'

import _ from 'lodash'

import DonutChart from '../components/DonutChart'
import LineChartMonthly from '../components/LineChartMonthly'
import WaterfallChart from '../components/WaterfallChart'
import TableView from '../components/TableView'
import TableViewCity from '../components/TableViewCity'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


/**
 * This layout demonstrates how to sync to localstorage.
 */
@inject('chartStore', 'chartStoreAbo', 'chartStoreGrowth', 'chartStoreSocial') @observer
class HomeContainer extends React.PureComponent {


  constructor(props) {
    super(props);

  }


  render() {

    const chartStore = this.props.chartStore



    return (

      <div className="container-fluid">

      <Row>

      <div className="progress-wrapper">
          <div className="row row-title d-none d-lg-block">
              <div className="col-lg-6">Key Drivers</div>
              <div className="col-lg-6 text-right">Avg. rank among population</div>
          </div>
          <div className="row align-items-center">
              <div className="col-lg-6 progress-title">
                  Total Downline PV (last month)
              </div>
              <div className="col-lg-5 col-sm-10">
                  <div className="progress">
                      <div className="progress-bar bg-green" role="progressbar" style={{width:'100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              <div className="col-lg-1 col-sm-2">
                  <div className="progress-data">25</div>
              </div>
          </div>
          <div className="row align-items-center">
              <div className="col-lg-6 progress-title">
                  Total Downline PV current
              </div>
              <div className="col-lg-5 col-sm-10">
                  <div className="progress opacity-middle">
                      <div className="progress-bar bg-green" role="progressbar" style={{width:'80%'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              <div className="col-lg-1 col-sm-2">
                  <div className="progress-data">33</div>
              </div>
          </div>
          <div className="row align-items-center">
              <div className="col-lg-6 progress-title">
                  Total walkup order revenue (last 9 months)
              </div>
              <div className="col-lg-5 col-sm-10">
                  <div className="progress opacity-low">
                      <div className="progress-bar bg-red" role="progressbar" style={{width:'45%'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              <div className="col-lg-1 col-sm-2">
                  <div className="progress-data">38</div>
              </div>
          </div>
      </div>

      </Row>
      
      {/* <Row>
          <div className="col-xl-3 col-lg-3 col-md-3 col-graph">
              <div className="grid-graph">
                  <a href="#" className="info-btn" data-toggle="modal" data-target="#infoModal">
                      <i className="fas fa-exclamation"></i>
                  </a>
                  <a href="#" className="bulb-btn" data-toggle="modal" data-target="#accordionModal">
                      <i className="far fa-lightbulb"></i> 5
                  </a>
                  <h4 className="grid-graph-title text-center">Sales</h4>
                  <p className="grid-graph-description text-center">Nam id lacinia anteat plac.</p>
                  <div className="grid-graph-wrapper">
                      <div className="home-cnt-subt"></div>
                      <div className="graph-data">
                          <h6 className="graph-data-title">$1.768M</h6>
                          <p className="graph-data-description">year to date</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-graph">
              <div className="grid-graph">
                  <a href="#" className="info-btn" data-toggle="modal" data-target="#infoModal">
                      <i className="fas fa-exclamation"></i>
                  </a>
                  <a href="#" className="bulb-btn" data-toggle="modal" data-target="#accordionModal">
                      <i className="far fa-lightbulb"></i> 5
                  </a>
                  <h4 className="grid-graph-title text-center">Growth</h4>
                  <p className="grid-graph-description text-center">ABO & Customer percent vs. target</p>
                  <div className="progress-graph">
                      <div className="progress-container">
                          <div className="progress-title">Title #1</div>
                          <div className="row align-items-center">
                              <div className="col-md-9">
                                  <div className="progress">
                                      <div className="progress-bar bg-green" role="progressbar" style={{width:'30%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                              </div>
                              <div className="col-md-3 text-right col-value">30%</div>
                          </div>
                      </div>

                      <div className="progress-container">
                          <div className="progress-title">Title #2</div>
                          <div className="row align-items-center">
                              <div className="col-md-9">
                                  <div className="progress">
                                      <div className="progress-bar bg-green" role="progressbar" style={{width:'55%'}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                              </div>
                              <div className="col-md-3 text-right col-value">55%</div>
                          </div>
                      </div>

                      <div className="progress-container">
                          <div className="progress-title">Title #3</div>
                          <div className="row align-items-center">
                              <div className="col-md-9">
                                  <div className="progress">
                                      <div className="progress-bar bg-green" role="progressbar" style={{width:'15%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                              </div>
                              <div className="col-md-3 text-right col-value">15%</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-graph">
              <div className="grid-graph">
                  <a href="#" className="info-btn" data-toggle="modal" data-target="#infoModal">
                      <i className="fas fa-exclamation"></i>
                  </a>
                  <a href="#" className="bulb-btn" data-toggle="modal" data-target="#accordionModal">
                      <i className="far fa-lightbulb"></i> 5
                  </a>
                  <h4 className="grid-graph-title text-center">Renewal Rate</h4>
                  <p className="grid-graph-description text-center">Predicted rate of renewal.</p>
                  <div className="graph-info-wrapper">
                      <div className="graph-info-label graph-info-label-top danger">
                          <i className="fas fa-arrow-down"></i> 0.5% lower than 2018
                      </div>
                      <div className="graph-info">
                          <div className="graph-data">
                              <h6 className="graph-data-title">14.5 million</h6>
                              <p className="graph-data-description">2019 population</p>
                          </div>
                      </div>
                      <div className="graph-info-label graph-info-label-bottom success">
                          <i className="fas fa-arrow-up"></i> 3.2% higher than Aug
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-graph">
              <div className="grid-graph">
                  <a href="#" className="info-btn" data-toggle="modal" data-target="#infoModal">
                      <i className="fas fa-exclamation"></i>
                  </a>
                  <a href="#" className="bulb-btn" data-toggle="modal" data-target="#accordionModal">
                      <i className="far fa-lightbulb"></i> 5
                  </a>
                  <h4 className="grid-graph-title text-center">PIN Migration</h4>
                  <div className="grid-graph-description text-center">
                      Predicted 
                      <div className="dropdown">
                          <span className="dropdown-toggle" data-toggle="dropdown">
                              Diamond
                          </span>
                          <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">Link 1</a>
                              <a className="dropdown-item" href="#">Link 2</a>
                              <a className="dropdown-item" href="#">Link 3</a>
                          </div>
                      </div> 
                      pop for 2019.
                  </div>
                  <div className="graph-info-wrapper">
                      <div className="graph-info-label graph-info-label-top success">
                          <i className="fas fa-arrow-up"></i> 12.5% move up
                      </div>
                      <div className="graph-info">
                          <div className="graph-data">
                              <h6 className="graph-data-title">14.5 million</h6>
                              <p className="graph-data-description">2019 population</p>
                          </div>
                      </div>
                      <div className="graph-info-label graph-info-label-bottom danger">
                          <i className="fas fa-arrow-down"></i> 8.4% move down
                      </div>
                  </div>
              </div>
          </div>
      </Row> */}





      <div className="page-block">
        <label className="tab-cont-title">
          Sales Overview
        </label>
        <Row>
          <Col>
            <div className="block-wrapper">
              <DonutChart data={chartStore.donutTotalSalesYear} isMonth={false}/>
            </div>
          </Col>
          <Col>
            <div className="block-wrapper">
              <DonutChart data={chartStore.donutTotalSalesLastMonth} isMonth={true}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="sb-wrap">
              <LineChartMonthly data={chartStore.totalSalesLineMonth}/>
            </div>
          </Col>
        </Row>
      </div>

      {/* <div className="page-block">
        <div className="sb-wrap-table">
          <TableViewCity data={chartStore.totalSalesCityCluster} />
        </div>
      </div>

      <div className="page-block">
        <div className="sb-wrap-table">
          <TableView data={chartStore.totalSales} />
        </div>
      </div>

      <div className="page-block">
        <div className="sb-wrap">
          <WaterfallChart data={chartStore.waterfallChartData}/>
        </div>
      </div> */}



      </div>
    );
  }
}

export default HomeContainer