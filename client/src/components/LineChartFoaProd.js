import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, Flyout, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend } from "victory";

import * as hlp from './Helper'

const LINE_COLORS = ['#AF48C5', '#062E56']


/**
 * @param {object} props 
 */
const LineChartFoaProd = observer((props) => {
    const chartData = props.data || {}

    const maxYear = chartData.maxYear,
      prevYear = chartData.prevYear

    const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

    return   <div>
      <label className="st-card-tl-sm">FOA Productivity</label>
      <VictoryChart width={700} height={300}
        theme={hlp.smallChartTheme}
        // domainPadding={{y: 150}}
        padding={{left: 60, top: 30, bottom: 70, right: 30}}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `$${ Math.round(datum.y) }` : datum.info
            }}
            labelComponent={<VictoryTooltip cornerRadius={2} 
            flyoutComponent={<Flyout height={100}/>} 
            style={{opacity: 1}} flyoutStyle={{fill: "#B0C9F4", 
            stroke: "lightgrey", opacity: 1}}/>}
          />
        }
        >

        <VictoryLegend x={230} y={265}
          
          orientation="horizontal"
          gutter={7}
          style={{ border: { stroke: "none" } }}
          colorScale={[ LINE_COLORS[0], LINE_COLORS[1] ]}
          data={[
            { name: maxYear, symbol: {type: 'minus'} }, { name: prevYear, symbol: {type: 'minus'} }
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


        <VictoryGroup
          data={chartData.avg_bv_data}  
        >

          <VictoryLine 
            style={{
              data: { 
                stroke: LINE_COLORS[0],
                strokeWidth: ({ active }) => active ? 4 : 3,
              },
              labels: {fill: LINE_COLORS[0] , lineHeight: 1},
              parent: { border: "1px solid #ccc"}
            }}
          />

          <VictoryScatter
              style={{
                data: {
                  fill: "#fff",
                  stroke: LINE_COLORS[0],
                  strokeWidth: ({ active }) => active ? 5 : 4,
                },
                labels: {fill: "none", fontSize: 1,
                display: "inline",
                lineHeight: 0}
              
              }}
              size={({ active }) => active ? 5 : 4}
            />

        </VictoryGroup>

        <VictoryGroup
          data={chartData.avg_bv_ly_data}  
        >

          <VictoryLine 
            style={{
              data: { 
                stroke: LINE_COLORS[1],
                strokeWidth: ({ active }) => active ? 4 : 3,
              },
              labels: {fill: LINE_COLORS[1] , lineHeight: 1},
              parent: { border: "1px solid #ccc"}
            }}
          />

          <VictoryScatter
              style={{
                data: {
                  fill: "#fff",
                  stroke: LINE_COLORS[1],
                  strokeWidth: ({ active }) => active ? 5 : 4
                },
                labels: {fill: "none", fontSize: 1,
                display: "inline",
                lineHeight: 0}
              
              }}
              size={({ active }) => active ? 5 : 4}
            />

        </VictoryGroup>

        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `$${t}`}
          style={{ grid: {
            stroke: "none",
          },
          axis: {
            stroke: "none"
          },
          ticks: {
            stroke: "none"
          }
        }}
        />
        <VictoryAxis crossAxis
          style={{ grid: {
            stroke: "none"
          },
          axis: {
            stroke: "none"
          },
          ticks: {
            stroke: "none"
          }}}
          tickValues={tickValues}
         />
      </VictoryChart>

    </div>
})

export default LineChartFoaProd
