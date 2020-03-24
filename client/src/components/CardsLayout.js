import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

import { observable} from 'mobx'
import { observer, inject} from 'mobx-react'

import _ from 'lodash'

import SmallCard from '../components/SmallCard'
import Card from '../components/Card'
// import AddCardPopup from '../components/AddCardPopup'
// import DonutChart from '../components/DonutChart'
// import LineChart from '../components/LineChart'
import LineChartMonthly from '../components/LineChartMonthly'
// import LineChartAboRenewal from '../components/LineChartAboRenewal'
// import WaterfallChart from '../components/WaterfallChart'
// import HorizontalBar from '../components/HorizontalBar'
import TableView from '../components/TableView'
// import TableViewCity from '../components/TableViewCity'

// import BarChartAboPin from '../components/BarChartAboPin'
import BarAboRetention from '../components/BarAboRetention'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'


// import salesData1 from '../stores/sales_data1.json'
// import * as jslinq from 'jslinq'


const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
@inject('authStore', 'chartStore', 'chartStoreAbo') @observer
class CardsLayout extends React.PureComponent {

  @observable isEditMode = false
  @observable layout = []

  // @observable isPerfYear = false

  // handleSwitchChange = () => {
  //   this.isPerfYear = !this.isPerfYear
  //   console.log('this.isPerfYear', this.isPerfYear)
  // }

  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.layout = JSON.parse(JSON.stringify(originalLayout))

    this.onAddItem = this.onAddItem.bind(this);

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }


  @observable newCounter = 0
  // @observable items = [0, 1, 2, 3, 4].map(function(i, key, list) {

  @observable items = [].map(function(i, key, list) {
    return {
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
      type: 'q'
      //,add: i === (list.length - 1)
    };
  })

  @observable showAddCardDialog = false

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  async componentDidMount() {
    this.props.onRef(this)
    // !NOTE: temporary
    this.resetLayout()
    // this.props.chartStore.fetchPerformanceData1();
    // this.props.chartStore.fetchPerformanceData2();
    // this.props.chartStore.fetchPerformanceData2Tooltip();
    // this.props.chartStore.fetchPerformanceData3();
    // this.props.chartStore.fetchAboRenewalData();
    // this.props.chartStore.fetchAboPinData();
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
  

    const i = el.add ? "+" : el.i;
  
//    const qDistElement = <QDistribution/>
    const smallCardElement = <SmallCard title={i}/>
  
    return (
      <div key={i} data-grid={el}>

        {
          <Card isEditMode={this.isEditMode} onRemoveItem={this.onRemoveItem.bind(this, i)}>
            {smallCardElement}
          </Card>
        }

        {/* {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (

          // <span className="text">{i}</span>
        )} */}

        {/* <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span> */}
      </div>
    );
  }
  
  onRemoveItem(i) {
    console.log("removing", i);
    this.items = _.reject(this.items, { i: i });
  }

  onAddItem() {
    this.showAddCardDialog = true


    console.log("adding", "n" + this.newCounter);

    // Add a new item. It must have a unique key!
    this.items = this.items.concat({
      i: "n" + this.newCounter,
      x: (this.items.length * 2), // % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    })
    // Increment the counter to ensure key is always unique.
    this.newCounter++
  }

  resetLayout() {
    this.layout = []
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.layout = layout;
    // this.props.onLayoutChange(layout); // updates status display
  }

  onClickEditDashboard() {
    this.isEditMode = !this.isEditMode;
  }

  render() {

    const authStore = this.props.authStore
    const chartStore = this.props.chartStore
    const chartStoreAbo = this.props.chartStoreAbo


    console.log('authStore CardsLayout', authStore.isAuthenticated)

//    console.log( 'TOTAL SALES chartStore.aboQualification:   :', chartStoreAbo.aboQualification )

    return (
      <div className="container-fluid">

        <Row>
          <Col md={3}>
        <label className="tab-cont-title">
            Favorite Views
        </label>
          </Col>
          <Col md={6}>
          </Col>
          <Col md={3}>
            {/* <button className="btn btn-light res-layout-btn" onClick={this.resetLayout}>Reset Layout</button> */}
          </Col>
        </Row>
        


        {/* <AddCardPopup show={this.showAddCardDialog} closeAddCardHandler={()=>{this.showAddCardDialog=false}}/> */}



        {/* <Image className="dshb-bot-btn" src="assets/add_button.png" rounded 
          onClick={this.onAddItem}/> */}


        {/* layout={this.state.layout} */}

        <ReactGridLayout
          {...this.props}
          layout={this.layout}
          onLayoutChange={this.onLayoutChange}
          isResizable={this.isEditMode}
          isDraggable={this.isEditMode}
          verticalCompact={false}
          
        >

          {_.map(this.items, el => this.createElement(el))}


          
          {/* <div key="123" data-grid={{ w: 6, h: 4, x: 0, y: 0 }}>
          <Card isEditMode={this.isEditMode}>
            <HorizontalBar/>
          </Card>
          </div> */}


          {/* <div key="3568" data-grid={{ w: 2, h: 4, x: 5, y: 1 }}>
          <Card isEditMode={this.isEditMode}>
            <DonutChart percentVal={chartStore.donutTotalSalesLastMonth} isMonth={true}/>
            
          </Card>
          </div> */}

          <div key="3571"  data-grid={{ w: 10, h: 9, x: 1, y: 0 }}>
          <Card isEditMode={this.isEditMode}>
            <div className="sb-wrap">
              <LineChartMonthly data={chartStore.totalSalesLineMonth}/>
            </div>
          </Card>
          </div>

          <div key="3561" data-grid={{ w: 8, h: 5, x: 1, y: 11 }}>
          <Card isEditMode={this.isEditMode}>
            <TableView data={chartStore.totalSales} />
          </Card>
          </div>

          {/* <div key="3562" data-grid={{ w: 2, h: 5, x: 9, y: 11 }}>
          <Card isEditMode={this.isEditMode}>
            <DonutChart data={chartStore.donutTotalSalesYear} isMonth={false}/>
          </Card>
          </div> */}

          <div key="43371" data-grid={{ w: 8, h: 8, x: 1, y: 18 }}>
            <div className="sb-wrap">
              <Card isEditMode={this.isEditMode}>
                <BarAboRetention data={chartStoreAbo.aboRetention}/>
              </Card>
            </div>
          </div>

          {/* <div key="3161" data-grid={{ w: 5, h: 5, x: 7, y: 4 }}>
          <Card isEditMode={this.isEditMode}>
            <TableViewCity data={chartStore.totalSalesCityCluster} />
          </Card>
          </div> */}

          {/* <div key="44271" data-grid={{ w: 6, h: 7, x: 8, y: 16 }}>
          <Card isEditMode={this.isEditMode}>
            <LineChartAboRenewal data={chartStore.aboRenewalRate}/>
          </Card>
          </div>





          <div key="45271" data-grid={{ w: 6, h: 7, x: 8, y: 16 }}>
          <Card isEditMode={this.isEditMode}>
            <LineChartMonthly data={chartStore.totalSalesLineMonth}/>
          </Card>
          </div>

          <div key="3671" data-grid={{ w: 11, h: 11, x: 7, y: 8 }}>
          <Card isEditMode={this.isEditMode}>
            <WaterfallChart data={chartStore.waterfallChartData}/>
          </Card>
          </div> */}
          



          {/* <div key="48871" data-grid={{ w: 6, h: 7, x: 1, y: 19 }}>
          <Card isEditMode={this.isEditMode}>
            <BarChartAboPin data={chartStore.aboPinBarData}/>
          </Card>
          </div> */}





          {/* <div key="2" data-grid={{ w: 3, h: 3, x: 4, y: 0 }}>
            <SmallCard/>
          </div>
          <div key="3" data-grid={{ w: 3, h: 3, x: 6, y: 0 }}>
            <SmallCard title={'MONTH AVG'}/>
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 10, y: 0 }}>
            <Card isEditMode={this.isEditMode}>
              <SmallCard/>
            </Card>
          </div> */}



        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default CardsLayout;