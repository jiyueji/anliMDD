import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryLine, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarChartSocialConv = observer((props) => {

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}


  const { total_foa_data, total_foa_data_ly, pct_foa_data } = chartData

  const getMaxima = (dataset) => Math.max(...dataset.map((d) => d.y))


  const roundClosestTop = (val, num) => Math.ceil((val+1) / num) * num
  
  const maxPctFoa = getMaxima(total_foa_data_ly)
  const maxPctFoaLy = getMaxima(total_foa_data)

  const maxNumFoa = getMaxima(pct_foa_data)
//  const maxNumFoaLy = getMaxima(num_foa_ly_data)


  const maxFirstAxisVal = roundClosestTop( Math.max( maxPctFoa, maxPctFoaLy ), 10000 )
  const maxSecondAxisVal = roundClosestTop( maxNumFoa, 1 )


  const maxYearStr = String( chartData.maxYear ),
    prevMaxYearStr = String( chartData.maxYear - 1 )

  
  const TICK_VALUES = [0.25, 0.5, 0.75, 1]


//  const needFormatThous = !!props.formatThous

  const COLOR_SCALE = [ "#7A90A8", "#032D57", "#59B961", "#BEE9C3" ]
  const BAR_WIDTH = 20
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return <div className="main-block">
        <label className="st-card-tl-sm"># of FOA Converted ABO & PC</label>

        <VictoryChart width={700} height={300} 
          theme={hlp.smallChartTheme}
          domainPadding={{x: [20, 0], y: 50}} 
          padding={{left: 60, top: 5, right: 45, bottom: 60}}

          domain={{ y: [0, 1] }}

          containerComponent={
            <VictoryVoronoiContainer //voronoiDimension="x"
              // labels={({ datum }) => datum.y }
              labels={({ datum }) => {
                return datum.y && datum.y<100 ? datum.y+'%' : datum.y
              }}
              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
            />
          }>

          <VictoryLegend x={165} y={270}

            orientation="horizontal"
            gutter={15}
            style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
            colorScale={[COLOR_SCALE[0], COLOR_SCALE[1], COLOR_SCALE[2], COLOR_SCALE[3], ]}
            data={[
              { name: prevMaxYearStr, symbol: {type: 'square'} },
              { name: maxYearStr, symbol: {type: 'square'} },
              { name: `${maxYearStr} %FOA Conversion`, symbol: {type: 'minus'} }
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
              data={total_foa_data_ly}
              style={{
                labels: {fill: COLOR_SCALE[0]},
                data: {fill: COLOR_SCALE[0]} }
              }
              y={(datum) => datum.y / maxFirstAxisVal}

            />

            <VictoryBar barWidth={BAR_WIDTH}
              data={total_foa_data}
              style={{
                labels: {fill: COLOR_SCALE[1]},
                data: {fill: COLOR_SCALE[1]} }
              }
              y={(datum) => datum.y / maxFirstAxisVal}

            />

          </VictoryGroup>

          <VictoryLine
            name="sc-1112"
            data={pct_foa_data}
            style={{
              data: { stroke: COLOR_SCALE[2], strokeWidth: ({ active }) => active ? 3 : 2},
              labels: {fill: COLOR_SCALE[2], lineHeight: 1
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
              tickFormat={(t) => hlp.toShortThous( Math.round( t * maxFirstAxisVal ) )+'k' }

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

        <label className="bot-chart-com-sm pl-3">Conversion % ： FOA convert to ABO/PC count / Active FOA count</label>
    </div>
})

export default BarChartSocialConv
