import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryCandlestick, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme} from "victory";

//import * as numeral from 'numeral'

import * as hlp from './Helper'



const LINE_COLORS = ['green', 'blue', 'yellow']

const WaterfallChart = inject('chartStore')(observer((props) => {

  const allData = props.data || {}
  const chartData = allData.data || []
  const maxMonthStr = String( hlp.yearMonthToStr( allData.maxMonth ) )

    return (
      <div>
      <label className="st-card-tl">YTD Variance Contribution by FC</label>
      <label className="st-card-tl-sub">(by performance year)</label>
      <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>


      <VictoryChart scale={{ x: "linear", y: "linear" }} width={1200} height={600} 
      domainPadding={{ x: [ 19, 40], y: 100}}
      padding={{ top: 40, bottom: 120, left: 110, right: 10 }}>
      <VictoryCandlestick
        candleWidth={27}
        // candleRatio={1.8}
        candleColors={{ positive: "#53C95C", negative: "#E81E4E" }}
        data={chartData}
        style={{ data: { stroke: "none", width: 50, opacity: 1 }, closeLabels: { fill: "blue" }, labels: { angle: 270 } }}
        //size={8}
        labelComponent={<VictoryLabel dy={0} dx={({ text }) => { 
          //console.log('text', text[0].length );
          if (!text) {
            return 0
          }
          // const numVal = Math.abs( parseFloat( text ) )
          // if (numVal < 80) { 
          //   return 16
          // } else if ( numVal > 100 && numVal < 200){
          //   return 30
          // } else if ( numVal > 200 && numVal < 700){
          //   return 40
          // }
          return 70
        }} />}
        // <VictoryLabel
        //   dx={({ text }) => text[0].length === 1 ? -4 : -8}
        // />
        labels={({ datum }) => hlp.toShortThous( datum.val )+'k'}
        // closeLabels={({ datum }) => numeral(datum.close).format('0.0 a')}
        // lowLabels={({ datum }) => datum.low}
        // highLabels={({ datum }) => datum.high}
        labelOrientation={{ open: "bottom" }}
        // padding={{ left: 20}}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(t) => hlp.toShortMil( t )+'m'}
        style={{
          axis: {
            stroke: "none"
          }
        }}

      />
      <VictoryAxis crossAxis style={{ tickLabels: { angle: 270 , fontWeight: 'bold'}, axis: {stroke: "none"} }} 
        tickLabelComponent={<VictoryLabel y={550} dx={-5}/>}
        orientation="bottom"
      />

    </VictoryChart>
    </div>
    );
}))

export default WaterfallChart



