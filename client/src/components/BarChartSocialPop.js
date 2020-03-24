import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryLabel, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup, VictoryStack} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarChartSocialPop = observer((props) => {

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  const { num_foa_data, num_foa_ly_data, new_foa_data, new_foa_ly_data } = chartData


  const maxYearStr = String( chartData.maxYear ),
    prevMaxYearStr = String( chartData.maxYear - 1 )

  const COLOR_SCALE = [ "#7A90A8", "#032D57", "#BEE9C3", "#59B961" ]
  const BAR_WIDTH = 15
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return  <div className="main-block">
              <label className="st-card-tl-sm">Population</label>

              <VictoryChart width={1300} height={300} 
                theme={hlp.smallChartTheme}
                domainPadding={{x:[50,0], y: 10}}
                padding={{left: 80, top: 25, right: 45, bottom: 60}}

                
                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={({ datum }) => datum.y }
                    // labels={({ datum }) => {
                    //   return datum.y !== 0 ? `${datum.labelTooltip} ${ needFormatThous ? hlp.toShortThous( datum.y )+'k' : hlp.numberWithCommas( datum.y ) }` : datum.info
                    // }}
                    labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                  />
                }
                >

                <VictoryLegend x={165} y={270}

                  orientation="horizontal"
                  gutter={15}
                  style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
                  colorScale={[COLOR_SCALE[0], COLOR_SCALE[1], COLOR_SCALE[2], COLOR_SCALE[3], ]}
                  data={[
                    { name: `${prevMaxYearStr} existing FOA buyer`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} existing FOA buyer`, symbol: {type: 'square'} },
                    { name: `${prevMaxYearStr} new FOA buyer`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} new FOA buyer`, symbol: {type: 'square'} }
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


                <VictoryGroup offset={20}>

      

                  <VictoryBar barWidth={BAR_WIDTH}
                    data={num_foa_ly_data}
                    style={{
                      labels: {fill: COLOR_SCALE[0]},
                      data: {fill: COLOR_SCALE[0]} }
                    }
                  />

                  <VictoryBar  barWidth={BAR_WIDTH}
                    data={num_foa_data}
                    style={{
                      labels: {fill: COLOR_SCALE[1]},
                      data: {fill: COLOR_SCALE[1]} }
                    }
                  />
 
                   <VictoryBar  barWidth={BAR_WIDTH}
                    data={new_foa_ly_data}
                    style={{
                      labels: {fill: COLOR_SCALE[2]},
                      data: {fill: COLOR_SCALE[2]} }
                    }

                  />

                  <VictoryBar barWidth={BAR_WIDTH}
                    data={new_foa_data}
                    style={{
                      labels: {fill: COLOR_SCALE[3]},
                      data: {fill: COLOR_SCALE[3]} }
                    }

                  />


                </VictoryGroup>



                  <VictoryAxis
                    dependentAxis
                    crossAxis
                    //tickFormat={(t) => hlp.numberWithCommas( t ) }
                    style={{ grid: {
                        stroke: "none",
                      },
                      axis: {
                        stroke: "none"
                      }
                    }}

                    // tickValues={TICK_VALUES}
                    // // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => hlp.toShortThous( t )+'k' }

                  />


                  <VictoryAxis crossAxis
                    style={{ grid: {
                      stroke: "none"
                    },
                    axis: {
                      stroke: "none",
                    }}}
                    tickLabelComponent={<VictoryLabel/>}// dx={45}/>}
                    tickValues={tickValues}
                  />

              </VictoryChart>



          </div>
})

export default BarChartSocialPop