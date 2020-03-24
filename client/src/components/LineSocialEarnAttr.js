import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryTooltip, VictoryGroup, Flyout, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend } from "victory";

import * as hlp from './Helper'

const LINE_COLORS = ['#59B961', '#EC3260']

/**
 * QDistribution chart
 * @param {object} props 
 */
const LineSocialEarnAttr = observer((props) => {

    const chartData = props.data || {}
    const maxYearStr = String( chartData.maxYear ),
      prevYearStr = String(chartData.maxYear-1)

    const lineData1 = chartData[ 'attrition_pct_data' ],
      lineData2 = chartData[ 'attrition_pct_ly_data' ]

    // const tickValues = chartData.tickValues || []

    return   <div>
      <label className="st-card-tl-sm">{props.title}</label>
      <VictoryChart width={700} height={300}
        padding={{ top: 25, bottom: 60, left: 70, right: 30 }}
        domainPadding={{y: 30}}
        theme={hlp.smallChartTheme}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `${ Math.round(datum.y*100)} %` : datum.info
            }}
            labelComponent={<VictoryTooltip 
              flyoutComponent={<Flyout height={130}/>} 
              cornerRadius={2} flyoutStyle={{fill: "#B0C9F4", stroke: "lightgrey"}}/>}
          />
        }

      >
      <VictoryLegend x={230} y={275}
        orientation="horizontal"
        gutter={3}
        style={{ border: { stroke: "none" } }}
        colorScale={LINE_COLORS}
        data={[
          { name: `${maxYearStr} attrition%`, symbol: {type: 'minus'} },
          { name: `${prevYearStr} attrition%`, symbol: {type: 'minus'} }
        ]}
      />
        {/* <VictoryScatter 
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
        /> */}


        <VictoryGroup
          data={lineData1}  
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

        <VictoryGroup
          data={lineData2}  
        >

          <VictoryLine 
            style={{
              data: { 
                stroke: LINE_COLORS[1],
                strokeWidth: ({ active }) => active ? 3 : 2,
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
          //domain={{y: [0, 0.25]}}
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
          // tickValues={tickValues}
         />

      </VictoryChart>
      <label className="bot-chart-com-sm pl-3">1st Income ≥ CNY 50</label>
    </div>
})

export default LineSocialEarnAttr
