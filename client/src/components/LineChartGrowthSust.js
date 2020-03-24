import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryTooltip, VictoryGroup, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend } from "victory";

import * as hlp from './Helper'

const LINE_COLORS = ['#59B961', '#EC3260', '#3C5165']

/**
 * @param {object} props 
 */
const LineChartGrowthSust = observer((props) => {

    const chartData = props.data || {}
    const curYear = chartData.maxYear || 2020
    const curLegendYear = curYear.toString()
    const maxCalendarYear = chartData.maxCalendarYear

    const lineData = chartData[ props['lineDataName'] ]
    const topLblFields = props['topLblFields'] || ['','']
    const topLbl1 = chartData[ topLblFields[0] ],
      topLbl2 = chartData[ topLblFields[1] ]

    const topRightLabels = props['topRightLabels'] || ['',''],
      topRLbl1 = topRightLabels[0],
      topRLbl2 = topRightLabels[1]

    const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

    return   <div>
      <label className="st-card-tl-sm">{props.title}</label>      
      <label className="alert alert-info grow-sus-tlbl float-right">
          {maxCalendarYear} {topRLbl1}{hlp.toPerc1Dec(topLbl1)}<br/>2020 {topRLbl2}{hlp.toPerc1Dec(topLbl2)}
      </label>

      <VictoryChart width={700} height={300}
        padding={{ top: 25, bottom: 60, left: 70, right: 20 }}
        domainPadding={{y: 30}}
        theme={hlp.smallChartTheme}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `${datum.labelTooltip} ${ Math.round(datum.y*100)} %` : datum.info
            }}
            labelComponent={<VictoryTooltip cornerRadius={2} flyoutStyle={{fill: "#B0C9F4", stroke: "lightgrey",}}/>}
          />
        }

      >
      <VictoryLegend x={230} y={275}
        orientation="horizontal"
        gutter={3}
        style={{ border: { stroke: "none" } }}
        colorScale={[ LINE_COLORS[0] ]}
        data={[
          { name: curLegendYear, symbol: {type: 'minus'} }
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
          data={lineData}  
        >

          <VictoryLine 
            style={{
              data: { 
                stroke: LINE_COLORS[0],
                strokeWidth: ({ active }) => active ? 3 : 2,
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
          // !TODO: set max value from data here
          domain={{y: [0, 0.25]}}
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

export default LineChartGrowthSust
