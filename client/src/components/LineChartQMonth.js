import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, Flyout, VictoryArea, VictoryScatter, VictoryGroup, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend } from "victory";

import * as hlp from './Helper'

const LINE_COLORS = ['#EC3260', '#59B961']

const DEFAULT_FONT = "'poppins-regular-webfont'"

/**
 * QDistribution chart
 * @param {object} props 
 */
const LineChartQMonth = observer((props) => {
    const chartData = props.data || {}

    const tickValues =  hlp.PERFORMANCE_YEAR_MONTHS

    const prevYearStr = chartData.prevYear,
      maxYearStr = chartData.maxYear

    return   <div>
      <label className="st-card-tl-sm">Monthly Q Months</label>
      <VictoryChart width={700} height={300}
        theme={hlp.smallChartTheme}
        // domainPadding={{y: 150}}
        padding={{left: 60, top: 30, bottom: 70, right: 30}}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `${datum.labelTooltip} ${ hlp.toShortThous( datum.y )+'k' }` : datum.info
            }}
            labelComponent={<VictoryTooltip cornerRadius={2} style={{opacity: 1}} 
              flyoutComponent={<Flyout height={100}/>}
              flyoutStyle={{fill: "#B0C9F4", stroke: "lightgrey", opacity: 1}}/>}
            />
        }
        >

        <VictoryLegend x={230} y={265}
          
          orientation="horizontal"
          gutter={15}
          style={{ border: { stroke: "none" } }}
          colorScale={[ LINE_COLORS[1], LINE_COLORS[0] ]}
          data={[
            { name: prevYearStr, symbol: {type: 'minus'} }, { name: maxYearStr, symbol: {type: 'minus'} }
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
          data={chartData.num_q_month_data}  
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
          data={chartData.num_q_month_ly_data}  
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
          tickFormat={(t) => hlp.toShortThous( t )+'k'}
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

export default LineChartQMonth
