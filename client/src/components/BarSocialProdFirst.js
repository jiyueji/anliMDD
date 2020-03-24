import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryScatter, Flyout, VictoryStack, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarSocialProdFirst = observer((props) => {

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  //const dataPropName = props.dataPropName

//  const chartDataBar = chartData[dataPropName]

  const bar1 = chartData['sales_per_buyer_data'] || []

  const maxYear = String( chartData.maxYear ),
    maxMonthStr = String( hlp.yearMonthToStr( chartData.maxMonth ) )

//  const needFormatThous = !!props.formatThous

  const COLOR_SCALE = [ "#AF4799"]
  const BAR_WIDTH = 20
  //const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return  <div className="main-block">
              <label className="st-card-tl-sm">{props.title}</label>
              <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>

              <VictoryChart width={1300} height={300} 
                theme={hlp.smallChartTheme}
                domainPadding={{x: [20, 0], y: 50}} 
                padding={{left: 60, top: 25, right: 45, bottom: 60}}

                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={({ datum }) => {
                      return Math.round(datum.y)
//                      return datum.labelTooltip
                    }}

                    labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}

                  />
                }>

                {/* <VictoryLegend x={600} y={270}

                  orientation="horizontal"
                  gutter={15}
                  style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
                  colorScale={COLOR_SCALE}
                  data={[
                    { name: `${maxYearStr}`, symbol: {type: 'square'} }
                  ]}
                /> */}


                {/* <VictoryScatter 
                  data={chartData.monthsData}          
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
                /> */}
                    
                  <VictoryBar barWidth={BAR_WIDTH}
                    data={bar1}
                    style={{
                      labels: {fill: COLOR_SCALE[0]},
                      data: {fill: COLOR_SCALE[0]}
                    }}
                  />



                  <VictoryAxis
                    dependentAxis
                    //tickFormat={(t) => hlp.numberWithCommas( t ) }
                    style={{ grid: {
                        stroke: "none",
                      },
                      axis: {
                        stroke: "none"
                      }
                    }}
                    // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => `$${hlp.numberWithCommas(t)}` }

                  />


                  <VictoryAxis crossAxis
                    style={{ grid: {
                      stroke: "none"
                    },
                    axis: {
                      stroke: "none",
                    }}}
                    offsetY={60}
                    //tickValues={tickValues}
                  />

              </VictoryChart>

              <label className="bot-chart-com-sm pl-3">SOP participant (with seniority ≥ 12 months) productivity (6 months before participate in SOP and 6 months after participate in SOP )</label>
          </div>
})

export default BarSocialProdFirst
