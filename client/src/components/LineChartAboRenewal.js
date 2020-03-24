import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryGroup, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend, VictoryScatter } from "victory";

import * as hlp from './Helper'

const LINE_COLORS = ['#53C95C', '#1F486F', '#cc6633']

/**
 * QDistribution chart
 * @param {object} props 
 */
const LineChartAboRenewal = inject('chartStore')(observer((props) => {
    const chartData = props.data || {}

    const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

    return   <div>
      <label className="st-card-tl-sm">First year ABO renewal rate<span> (rolling 12 months)</span></label>
      <VictoryChart theme={hlp.smallChartTheme} 
        width={700} height={300} domainPadding={{y: 150}}
        padding={{ top: 15, bottom: 70, left: 60, right: 20 }}
        containerComponent={
          <VictoryVoronoiContainer />
        }

      >
      <VictoryLegend x={120} y={265}
        
        orientation="horizontal"
        gutter={3}
        style={{ border: { stroke: "none" } }}
        colorScale={[ LINE_COLORS[0], LINE_COLORS[1] ]}
        data={[
          { name: "Actual Renewal Rate" , symbol: { type: "minus" } },
          { name: "Prediction Renewal Rate", symbol: { type: "minus" } }    
        ]}
      />
        <VictoryLine
          style={{
            data: { 
              stroke: LINE_COLORS[0],
              strokeWidth: ({ active }) => active ? 4 : 3,
            },
            labels: {fill: LINE_COLORS[0]},
            parent: { border: "1px solid #ccc"}
          }}
          data={chartData.renewal_rate_data}  
        />
        <VictoryLine
          data={chartData.renewal_rate_prediction_data}
          style={{
            data: { 
              stroke: LINE_COLORS[1],
              strokeWidth: ({ active }) => active ? 4 : 3,
              strokeDasharray: "7 4"
            },
            labels: {fill: LINE_COLORS[1]},
            parent: { border: "1px solid #ccc"}
          }}
        />
        <VictoryScatter 
          //style={{data: {fill: 'red'}}}
          size={3} 
          data={chartData.scatter_data}
          
          style={{
            data: {
              fill:"none",
              stroke: "none", //LINE_COLORS[2],
              fillOpacity: 0.1,
              strokeWidth: 2
            }
          }}

          labels={({ datum }) => `${datum.x}\n ${Math.round(datum.y*10000)/100} %`} //${numeral(datum.y).format('0.00 a')}`}
          labelComponent={<VictoryTooltip dy={30} cornerRadius={2} flyoutStyle={{fill: "#B0C9F4", stroke: "lightgrey",}}/>}

        />

        <VictoryAxis
          dependentAxis
          crossAxis
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
            fill: "none",
            strokeDasharray: "5 5",
            stroke: "none"
          },
          axis: {
            stroke: "none"
          },
          ticks: {
            stroke: "none"
          }
        }}
        tickValues={tickValues}
        />

      </VictoryChart>

    </div>
}))

export default LineChartAboRenewal
