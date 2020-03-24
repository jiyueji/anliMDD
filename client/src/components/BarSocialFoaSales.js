import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryLine, VictoryLabel, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup, VictoryStack} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarDropDrillAboNewQual = observer((props) => {

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  const { total_3e_data, total_3e_ly_data, total_non3e_data, total_non3e_ly_data, total_pct_data } = chartData

  const getMaxima = (dataset) => Math.max(...dataset.map((d) => d.y))


  const roundClosestTop = (val, num) => Math.ceil((val+1) / num) * num
  
  const maxTotal3e = getMaxima(total_3e_data)
  const maxTotal3eLy = getMaxima(total_3e_ly_data)
  const maxTotalNon3e = getMaxima(total_non3e_data)
  const maxTotalNon3eLy = getMaxima(total_non3e_ly_data)

  const maxTotalPct = getMaxima(total_pct_data)
//  const maxNumFoaLy = getMaxima(num_foa_ly_data)


  const maxFirstAxisVal = roundClosestTop( Math.max( maxTotal3e, maxTotal3eLy, maxTotalNon3e, maxTotalNon3eLy ), 10000 )
  const maxSecondAxisVal = roundClosestTop( maxTotalPct, 5 )


  const maxYearStr = String( chartData.maxYear ),
    prevMaxYearStr = String( chartData.maxYear - 1 )

  const COLOR_SCALE = [ "#7A90A8", "#032D57", "#BEE9C3", "#59B961", "#31BEF9" ]
  const BAR_WIDTH = 15
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  const TICK_VALUES = [0.25, 0.5, 0.75, 1]


  return  <div className="main-block">
              <label className="st-card-tl-sm">FOA Sales($)</label>

              <VictoryChart width={1300} height={300} 
                theme={hlp.smallChartTheme}
                domainPadding={{x:[50,0], y: 10}}
                padding={{left: 80, top: 25, right: 100, bottom: 60}}

                domain={{ y: [0, 1] }}

                containerComponent={
                  <VictoryVoronoiContainer //voronoiDimension="x"
 //                   labels={({ datum }) => Math.round(datum.y) }
                    labels={({ datum }) => {
                      return datum.y && datum.y<100 ? datum.y+'%' : Math.round(datum.y)
                    }}
                    labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                  />
                }>

                <VictoryLegend x={45} y={270}

                  orientation="horizontal"
                  gutter={15}
                  style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
                  colorScale={[COLOR_SCALE[0], COLOR_SCALE[1], COLOR_SCALE[2], COLOR_SCALE[3], COLOR_SCALE[4]]}
                  data={[
                    { name: `${prevMaxYearStr} FOA non-3e sales`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} FOA non-3e sales`, symbol: {type: 'square'} },
                    { name: `${prevMaxYearStr} FOA 3e sales`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} FOA 3e sales`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} %FOA sales out of total`, symbol: {type: 'minus'} }
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


                <VictoryGroup offset={20} >

      

                  <VictoryBar barWidth={BAR_WIDTH}
                    data={total_non3e_ly_data}
                    style={{
                      labels: {fill: COLOR_SCALE[0]},
                      data: {fill: COLOR_SCALE[0]} }
                    }
                    y={(datum) => datum.y / maxFirstAxisVal}
                  />

                  <VictoryBar  barWidth={BAR_WIDTH}
                    data={total_non3e_data}
                    style={{
                      labels: {fill: COLOR_SCALE[1]},
                      data: {fill: COLOR_SCALE[1]} }
                    }
                    y={(datum) => datum.y / maxFirstAxisVal}
                  />
 
                   <VictoryBar  barWidth={BAR_WIDTH}
                    data={total_3e_ly_data}
                    style={{
                      labels: {fill: COLOR_SCALE[2]},
                      data: {fill: COLOR_SCALE[2]} }
                    }
                    y={(datum) => datum.y / maxFirstAxisVal}
                  />

                  <VictoryBar barWidth={BAR_WIDTH}
                    data={total_3e_data}
                    style={{
                      labels: {fill: COLOR_SCALE[3]},
                      data: {fill: COLOR_SCALE[3]} }
                    }
                    y={(datum) => datum.y / maxFirstAxisVal}
                  />


                </VictoryGroup>

                <VictoryLine
                  data={total_pct_data}
                  style={{
                    data: { stroke: COLOR_SCALE[4], strokeWidth: ({ active }) => active ? 3 : 2},
                    labels: {fill: COLOR_SCALE[4], lineHeight: 1
                    },
                    parent: { border: "1px solid #ccc"}
                  }}

                  // normalize data for additional axis
                  y={(datum) => datum.y / maxSecondAxisVal}
                  />



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

                    tickValues={TICK_VALUES}
                    // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => hlp.toShortThous( Math.round( t * maxFirstAxisVal ) )+'k' }

                  />

                  <VictoryAxis dependentAxis
                    offsetX={1310}
                    style={{ grid: {
                        stroke: "none"
                      },
                      axis: {
                        stroke: "none",
                      }}
                    }
                    // Use normalized tickValues (0 - 1)
                    tickValues={TICK_VALUES}
                    // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => `${t*maxSecondAxisVal}%` }
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

export default BarDropDrillAboNewQual