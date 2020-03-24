import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryTooltip, VictoryGroup, Flyout, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend } from "victory";

import * as hlp from './Helper'

const LINE_COLORS = ['#59B961', '#EC3260', '#3C5165']

/**
 * QDistribution chart
 * @param {object} props 
 */
const LineSocialAttrRate = observer((props) => {

    const chartData = props.data || {}
    const maxYearStr = String( chartData.maxYear )

    const lineData = chartData[ props['lineDataName'] ]

    const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

    return   <div>
      <label className="st-card-tl-sm">{props.title}</label>
      <VictoryChart width={1300} height={300} 
        domainPadding={{x: [20, 0], y: 50}} 
        padding={{left: 60, top: 25, right: 45, bottom: 60}}
        theme={hlp.smallChartTheme}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `${ Math.round(datum.y*100)} %` : datum.info
            }}
            labelComponent={<VictoryTooltip 
              flyoutComponent={<Flyout height={50}/>} 
              cornerRadius={2} flyoutStyle={{fill: "#B0C9F4", stroke: "lightgrey"}}/>}
          />
        }

      >
      <VictoryLegend x={600} y={275}
        orientation="horizontal"
        gutter={3}
        style={{ border: { stroke: "none" } }}
        colorScale={[ LINE_COLORS[0] ]}
        data={[
          { name: maxYearStr, symbol: {type: 'minus'} }
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
          data={lineData}  
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
          tickValues={tickValues}
         />

      </VictoryChart>

    </div>
})

export default LineSocialAttrRate
