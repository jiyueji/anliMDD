import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend, VictoryScatter } from "victory";

import * as hlp from './Helper'

//import ChartPointTooltip from './ChartPointTooltip'

const LINE_COLORS = ['#EC3260', '#59B961', '#3C5165', 'white']

const DEFAULT_FONT = "'poppins-regular-webfont'"

/**
 * Line YTD chart
 * @param {object} props 
 */


const LineChart = inject('chartStore')(observer((props) => {
    const chartData = props.data || {}

    return   <div>
      <label className="st-card-tl">Total Sales YTD ( $ )</label>
      <VictoryChart style={{ parent: { overflow: 'visible' }}}
        width={700} height={300}
        padding={{ top: 0, bottom: 60, left: 60, right: 20 }}
        theme={VictoryTheme.material}
        // // !NOTE: for a custom tooltip approach
        // containerComponent={
        //   <VictoryVoronoiContainer voronoiDimension="x"/>
        // }
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y !== 0 ? `${datum.labelTooltip} ${ hlp.toShortMil( datum.y )+'m' }` : datum.info
            }}
            style={{
              fontSize: 8, 
              overflow:'visible', 
              height:'auto', 
              width:'100%',
              fontFamily: DEFAULT_FONT
            }}
  
            labelComponent={<VictoryTooltip  flyoutWidth={150}
            cornerRadius={2} flyoutStyle={{ fill: "#B0C9F4", stroke: "lightgrey", overflow:'visible', height:'auto', width:'100%' }}/>}
          />
        }
      >
        <VictoryLegend x={45} y={275}
          orientation="horizontal" 
          gutter={10}
          style={{ border: { stroke: "none" },
              labels: {
                fontFamily: DEFAULT_FONT
              }
            }}
          colorScale={[ LINE_COLORS[0], LINE_COLORS[1], LINE_COLORS[2] ]}
          data={[
            { name: "YTD Sales" }, { name: "Planned Target" }, { name: "2018 Sales" }
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


        <VictoryLine
          data={chartData.tooltip_info_data}
          style={{
            parent: { border: "1px solid #ccc"},
            data: { stroke: "white", strokeWidth: ({ active }) => active ? 3 : 2},
            labels: {fill: 'black'}
          }}
        />

        <VictoryLine
          style={{
            data: { stroke: LINE_COLORS[0] },
            parent: { border: "1px solid #ccc"}
          }}
          data={chartData.actual_sales_data}
          style={{
            data: { stroke: LINE_COLORS[0], strokeWidth: ({ active }) => active ? 3 : 2},
            labels: {fill: LINE_COLORS[0]}
          }}


          // !NOTE: for a custom tooltip approach
          // labels={({datum})=>{}}

          // labelComponent={
          //   <VictoryTooltipc
          //     flyoutComponent={
          //       <ChartPointTooltip  />
          //     }
          //   />
          // }
        />
        <VictoryLine
          style={{
            data: { stroke: LINE_COLORS[1] },
            parent: { border: "1px solid #ccc"}
          }}
          data={chartData.target_sales_data}
          style={{
            data: { stroke: LINE_COLORS[1], strokeWidth: ({ active }) => active ? 3 : 2},
            labels: {fill: LINE_COLORS[1]}
          }}
        />
        <VictoryLine
          style={{
            data: { stroke: LINE_COLORS[2] },
            parent: { border: "1px solid #ccc"}
          }}
          data={chartData.actual_sales_ly_data}
          style={{
            data: { stroke: LINE_COLORS[2], strokeWidth: ({ active }) => active ? 3 : 2},
            labels: {fill: LINE_COLORS[2]}
          }}
        />

        <VictoryAxis
          dependentAxis
          tickFormat={ (t) =>  hlp.toShortMil( t )+'m'  }
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
         />

      </VictoryChart>
    </div>
}))

export default LineChart
