import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryVoronoiContainer, LineSegment, VictoryLabel, VictoryLegend, VictoryBar, VictoryStack, VictoryAxis, VictoryTooltip, VictoryScatter} from "victory"

//import * as numeral from 'numeral'

import * as hlp from './Helper'


const BarAboRetention = observer((props) => {
  const chartData = props.data || {}
  if (!chartData) {
    return false
  }

  const BAR_WIDTH = 25
  const COLOR_SCALE = [ "#03305D", "#53C95C", "#E91E4F" ]
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return   <div>
    <label className="st-card-tl-sm">Total population</label>
    <VictoryChart width={700} height={300} 
      theme={hlp.smallChartTheme}
      domainPadding={{x: [25, 0], y: 100}} 
      padding={{left: 80, top: 5, right: 25, bottom: 10}}
      containerComponent={
        <VictoryVoronoiContainer voronoiDimension="x"
          labels={({ datum }) => {
            let curVal = datum.multiplyBy3 ? parseFloat(datum.y) * 3 : datum.y
            return curVal !== 0 ? `${datum.labelTooltip} ${ hlp.toShortThous( curVal )+'k' }` : datum.info
          }}
          labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
        />
      }>

      <VictoryLabel x={0} y={175} text={'Force size'} 
        style={{fontSize: 18, fontFamily: hlp.DEFAULT_FONT, fill: COLOR_SCALE[0]}}/>
      <VictoryLabel x={0} y={210} text={'Churned'} 
        style={{fontSize: 18, fontFamily: hlp.DEFAULT_FONT, fill: COLOR_SCALE[2]}}/>

      <VictoryLegend x={30} y={270}

        orientation="horizontal"
        gutter={3}
        style={{ border: { stroke: "white" } }}
        colorScale={[COLOR_SCALE[1], COLOR_SCALE[0], COLOR_SCALE[2] ]}
        data={[
          { name: "# of New recruited ABO", symbol: {type: 'square'} },
          { name: "# of Existing ABO", symbol: {type: 'square'} },
          { name: "# of Churned ABO", symbol: {type: 'square'} }
        ]}
      />


      <VictoryScatter 
        data={chartData.months_data}          
        style={{
          data: {
            fill:"none",
            stroke: "none"
          },
          labels: {
            fill: "#1F486F",
            fontWeight: 'bold'
          }
        }}
      />

      <VictoryStack
        colorScale={COLOR_SCALE}
      >
        <VictoryBar barWidth={BAR_WIDTH}
          data={chartData.renew_abo_data}
          style={{
            labels: {fill: COLOR_SCALE[0]}
          }}

        />
        <VictoryBar barWidth={BAR_WIDTH}
          data={chartData.new_abo_data}
          style={{
            labels: {fill: COLOR_SCALE[1]}
          }}

          labels={({ datum }) => {
            return `${ hlp.toShortThous( datum.y )+'k' }`
          }}
          //labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}

        />
        <VictoryBar barWidth={BAR_WIDTH}
            data={chartData.churn_abo_data}
            style={{
              labels: {fill: COLOR_SCALE[2]}
            }}
          />
      </VictoryStack>
      {/* <VictoryAxis
          dependentAxis
          tickFormat={(t) => hlp.toShortMil( t )+'m'}
          style={{ grid: {
            stroke: "none",
          },
          axis: {
            stroke: "none"
          }
        }}
        /> */}
        <VictoryAxis crossAxis
          style={{ grid: {
            stroke: "none"
          },
          axis: {
            stroke: "#0074C0",
          }}}
          tickLabelComponent={<VictoryLabel dy={45}/>}
          axisComponent={<LineSegment x1={10}/>}
          offsetY={105}
          tickValues={tickValues}
        />

    </VictoryChart>

  </div>
})

export default BarAboRetention