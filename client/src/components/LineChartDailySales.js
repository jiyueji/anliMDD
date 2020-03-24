import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, Flyout, VictoryGroup, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend, VictoryScatter } from "victory";

import * as hlp from './Helper'

const DEFAULT_FONT = "'poppins-regular-webfont'"

const LINE_COLORS = ['#EC3260', '#59B961', '#3C5165', 'orange']

/**
 * QDistribution chart
 * @param {object} props 
 */
const LineChartDailySales = observer((props) => {
    const chartData = props.data || {}

    //const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS
    const chartData1 = chartData[`${props.dataPropName}_data`],
      chartData2 = chartData[`${props.dataPropName}_ly_data`]

    const maxYearLegend = `${chartData.maxMonth}/${chartData.maxYearStr}`,
      prevYearLegend = `${chartData.maxMonth}/${chartData.prevYearStr}`

    const formatFnName = !!props.formatThous ? 'toShortThous' : 'toShortMil'

    return   <div>
      <VictoryChart width={700} height={300}
        padding={{ top: 5, bottom: 60, left: 60, right: 10 }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.labelTooltip// datum.y !== 0 ? `${datum.labelTooltip} ${ props.formatThous ? Math.round(datum.y) : hlp[formatFnName]( datum.y )+'m' }` : null
            }}
            // style={{
            //   fontSize: 8, 
            //   overflow:'visible', 
            //   height:'auto', 
            //   width:'100%',
            //   fontFamily: DEFAULT_FONT
            // }}

            //flyoutComponent={<Flyout height={180}/>}

            labelComponent={<VictoryTooltip
              cornerRadius={2}
              //flyoutComponent={<Flyout height={250}/>}
              flyoutStyle={{ 
                  fill: "#B0C9F4", stroke: "lightgrey", 
                  overflow:'visible', height: 'auto',
                  width:'100%', opacity: 0.3
                }}
              />
            }

          />
        }

      >
      <VictoryLegend x={170} y={275}
        
        orientation="horizontal"
        gutter={3}
        style={{ border: { stroke: "none" } }}
        colorScale={[ LINE_COLORS[0], LINE_COLORS[1] ]}
        data={[
          { name: maxYearLegend, symbol: {type: 'minus'} },
          { name: prevYearLegend, symbol: {type: 'minus'} }
        ]}
      />



      {/* <VictoryScatter
        
        name="sc-1"
        data={chartData.months_data}          
        style={{
          data: {
            fill:"none",
            stroke: "none"
          },
          labels: {
            fill: "#1F486F",
            fontWeight: 'bold',
            lineHeight: 2
          }
        }}
      /> */}



      <VictoryGroup
        data={chartData1}  
      >

        <VictoryLine 
          name="sc-2"

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
                strokeWidth: ({ active }) => active ? 3 : 1,
              },
              labels: {fill: "none", fontSize: 8,
              display: "inline",
              lineHeight: 1}
            
            }}
            size={({ active }) => active ? 4 : 2}
          />

      </VictoryGroup>



      <VictoryGroup
        data={chartData2}
      >

        <VictoryLine
          name="sc-3"

          style={{
            data: { 
              stroke: LINE_COLORS[1],
              strokeWidth: ({ active }) => active ? 3 : 2
            },
            labels: {fill: LINE_COLORS[1], lineHeight: 1},
            parent: { border: "1px solid #ccc"}
          }}
        />

        <VictoryScatter
 
            style={{
              data: {
                fill: "#fff",
                stroke: LINE_COLORS[1],
                strokeWidth: ({ active }) => active ? 3 : 1,
              },
              labels: {fill: "none", fontSize:8,
              display: "inline", lineHeight: 1}
            
            }}
            size={({ active }) => active ? 4 : 2}
          />

      </VictoryGroup>





      <VictoryAxis
        dependentAxis
        tickFormat={(t) => {return  `${hlp[formatFnName]( t )}${(props.formatThous ?'k':'m')}`}}
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
        minDomain={20}
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

    </div>
})

export default LineChartDailySales
