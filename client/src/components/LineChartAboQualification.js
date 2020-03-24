import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryGroup, Flyout, VictoryTooltip, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend } from "victory";

import * as numeral from 'numeral'

import * as hlp from './Helper'

const LINE_COLORS = [ '#59B961', '#EC3260', '#3C5165']

/**
 * QDistribution chart
 * @param {object} props 
 */
const LineChartMonthly = observer((props) => {
    const chartData = props.data || {}

    const tickValues = hlp.PERFORMANCE_YEAR_MONTHS

    const prevYearStr = chartData.prevYear,
     maxYearStr = chartData.maxYear

    return   <div>
      <label className="st-card-tl-sm">Consequtive qualification rate</label>
      <VictoryChart width={700} height={300}
        padding={{ top: 25, bottom: 60, left: 70, right: 20 }}
        domainPadding={{y: 10}}
        theme={hlp.smallChartTheme}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `${datum.labelTooltip} ${ Math.round(datum.y*100)} %` : datum.info
            }}
            labelComponent={<VictoryTooltip cornerRadius={2} style={{opacity: 1}} 
              flyoutComponent={<Flyout height={100}/>}
              flyoutStyle={{fill: "#B0C9F4", stroke: "lightgrey", opacity: 1}}/>}          
            />
        }

      >
      <VictoryLegend x={230} y={275}
        
        orientation="horizontal"
        gutter={15}
        style={{ border: { stroke: "none" } }}
        colorScale={[ LINE_COLORS[0], LINE_COLORS[1] ]}
        data={[
          { name: prevYearStr, symbol: {type: 'minus'} }, { name: maxYearStr, symbol: {type: 'minus'} }
        ]}
      />
        <VictoryScatter 
          data={chartData.months_data_cons}          
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
          data={chartData.ytd_consecutive_ly_data} 
        >

          <VictoryLine
            style={{ data: {stroke: LINE_COLORS[0], strokeWidth: ({ active }) => active ? 4 : 3 },
            labels: {fill: LINE_COLORS[0], opacity: 1} }}
          />

          <VictoryScatter
              style={{
                data: {
                  fill: "#fff",
                  stroke: LINE_COLORS[0],
                  strokeWidth: ({ active }) => active ? 4 : 3,
                },
                labels: {fill: "none", fontSize: 1,
                display: "inline",
                lineHeight: 0}
              
              }}
              size={({ active }) => active ? 4 : 2}
            />

        </VictoryGroup>

        <VictoryGroup
          data={chartData.ytd_consecutive_data}
        >

        <VictoryLine
            style={{ data: { stroke: LINE_COLORS[1], strokeWidth: ({ active }) => active ? 4 : 3 },
            labels: {fill: LINE_COLORS[1], opacity: 1} }}
          />

          <VictoryScatter
              style={{
                data: {
                  fill: "#fff",
                  stroke: LINE_COLORS[1],
                  strokeWidth: ({ active }) => active ? 4 : 3,
                },
                labels: {fill: "none", fontSize: 1,
                display: "inline",
                lineHeight: 0}
              
              }}
              size={({ active }) => active ? 4 : 2}
            />

        </VictoryGroup>

        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${Math.round(t*100)} %`}
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

export default LineChartMonthly
