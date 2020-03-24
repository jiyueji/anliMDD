import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryLine, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarSocialBusImp = observer((props) => {

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  const dataPropName = props.dataPropName

  const chartDataBar = chartData[dataPropName]

  const maxYearStr = String( chartData.maxYear )


//  const needFormatThous = !!props.formatThous

  const COLOR_SCALE = [ "#AE4698" ]
  const BAR_WIDTH = 20
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return   <div>

      <div className="main-block">
              <label className="st-card-tl-sm">{props.title}</label>

              <VictoryChart width={700} height={300} 
                theme={hlp.smallChartTheme}
                domainPadding={{x: [20, 0], y: 50}} 
                padding={{left: 60, top: 5, right: 45, bottom: 60}}

                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={({ datum }) => datum.y }
                    // labels={({ datum }) => {
                    //   return datum.y !== 0 ? `${datum.labelTooltip} ${ needFormatThous ? hlp.toShortThous( datum.y )+'k' : hlp.numberWithCommas( datum.y ) }` : datum.info
                    // }}
                    labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                  />
                }>

                <VictoryLegend x={265} y={270}

                  orientation="horizontal"
                  gutter={15}
                  style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
                  colorScale={[COLOR_SCALE[0]]}
                  data={[
                    { name: maxYearStr, symbol: {type: 'square'} },
                  ]}
                />


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
                    data={chartDataBar}
                    style={{
                      labels: {fill: COLOR_SCALE[0]},
                      data: {fill: COLOR_SCALE[0]} }
                    }

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
                    tickFormat={(t) => hlp.toShortThous(t)+'k' }

                  />


                  <VictoryAxis crossAxis
                    style={{ grid: {
                      stroke: "none"
                    },
                    axis: {
                      stroke: "none",
                    }}}
                    offsetY={60}
                    tickValues={tickValues}
                  />

              </VictoryChart>



          </div>
  </div>
})

export default BarSocialBusImp
