import React from 'react'

import { observer } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryLine, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'

const BarSocial3eSal2 = observer((props) => {
  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  const dataProps = props.dataPropNames

  const data1 = chartData[ dataProps[0] ],
    data2 = chartData[ dataProps[1] ],
    title = props.title || ''

  const getMaxima = (dataset) => Math.max(...dataset.map((d) => d.y))


  const roundClosestTop = (val, num) => Math.ceil((val+1) / num) * num
  
  const maxNumFoa = getMaxima(data1)
  const maxPctFoa = getMaxima(data2)


  const maxFirstAxisVal = roundClosestTop( maxNumFoa, 100000 )
  const maxSecondAxisVal = roundClosestTop( maxPctFoa, 5 )


  const maxYearStr = String( chartData.maxYear )
  
  const TICK_VALUES = [0.25, 0.5, 0.75, 1]


//  const needFormatThous = !!props.formatThous

  const COLOR_SCALE = [ "#AF4799", "#FDCC49" ]
  const BAR_WIDTH = 20
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return   <div className="main-block">
              <label className="st-card-tl-sm">{title}</label>
              <label className="st-card-tl-sm float-right">Percentage of FOA 3E Sales of Total 3E Sales</label>

              <VictoryChart width={700} height={300} 
                theme={hlp.smallChartTheme}
                domainPadding={{x: [20, 0], y: 50}} 
                padding={{left: 60, top: 5, right: 45, bottom: 60}}

                domain={{ y: [0, 1] }}

                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={({ datum }) => datum.y > 100 ? hlp.formatMilFirstDec( datum.y )+'m' :Math.round( datum.y )+'%' }
                    // labels={({ datum }) => {
                    //   return datum.y !== 0 ? `${datum.labelTooltip} ${ needFormatThous ? hlp.toShortThous( datum.y )+'k' : hlp.numberWithCommas( datum.y ) }` : datum.info
                    // }}
                    labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                  />
                }>

                <VictoryLegend x={65} y={270}

                  orientation="horizontal"
                  gutter={15}
                  style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
                  colorScale={[COLOR_SCALE[0], COLOR_SCALE[1] ]}
                  data={[
                    { name: `FOA 3E Sales ${maxYearStr}`, symbol: {type: 'square'} },
                    { name: `FOA 3E Sales of Total 3E Sales ${maxYearStr}`, symbol: {type: 'minus'} }
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
                    data={data1}
                    style={{
                      labels: {fill: COLOR_SCALE[0]},
                      data: {fill: COLOR_SCALE[0]} }
                    }
                    y={(datum) => datum.y / maxFirstAxisVal}

                  />

                <VictoryLine
                  data={data2}
                  style={{
                    data: { stroke: COLOR_SCALE[1], strokeWidth: ({ active }) => active ? 3 : 2},
                    labels: {fill: COLOR_SCALE[1], lineHeight: 1
                    },
                    parent: { border: "1px solid #ccc"}
                  }}
                  // normalize data for additional axis
                  y={(datum) => datum.y / maxSecondAxisVal}
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

                    tickValues={TICK_VALUES}
                    // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => hlp.toShortMil( Math.round( t * maxFirstAxisVal ) )+'m' }

                  />

                  <VictoryAxis dependentAxis
                    offsetX={705}
                    style={{ grid: {
                        stroke: "none"
                      },
                      axis: {
                        stroke: "none",
                      }}
                    }
                    // style={{
                    //   axis: { stroke: colors[i] },
                    //   ticks: { padding: tickPadding[i] },
                    //   tickLabels: { fill: colors[i], textAnchor: anchors[i] }
                    // }}
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
                    offsetY={60}
                    tickValues={tickValues}
                  />

              </VictoryChart>

          </div>
})

export default BarSocial3eSal2