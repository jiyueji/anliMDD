import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, Flyout, VictoryGroup, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLegend, VictoryScatter } from "victory";

import * as hlp from './Helper'

// import ChartPointTooltip from './ChartPointTooltip'
import TooltipEarnSegment from './TooltipEarnSegment';

const DEFAULT_FONT = "'poppins-regular-webfont'"

const LINE_COLORS = ['#EC3260', '#59B961', '#3C5165', 'orange']

class DashPoint extends React.Component {
  render() {
    const {x, y, datum, width, xOffset} = this.props;
    const curWidth = width || 60
    const dx = xOffset || 0
    return (
      <path d={`M${x+dx-curWidth/2} ${y} ${x+dx+curWidth/2} ${y}`} strokeWidth="3" stroke="#EC3260" strokeDasharray="3 2"/>
    );
  }
}

/**
 * @param {object} props 
 */
const LineChartMonthly = observer((props) => {
    const chartData = props.data || {}

    const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

    return   <div id="monthlySalesLine">
      <label className="st-card-tl">Monthly Sales ( $ )</label>
      <VictoryChart width={700} height={300}
        padding={{ top: 5, bottom: 60, left: 60, right: 10 }}
        theme={VictoryTheme.material}

        // containerComponent={
        //   <VictoryVoronoiContainer voronoiDimension="x"/>
        // }


        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => {
              return datum.y// !== 0 ? `${datum.labelTooltip} ${ hlp.toShortMil( datum.y )+'m' }` : (datum.info || '')
            }}

            // style={{
            //   fontSize: 8, 
            //   overflow:'visible', 
            //   height:'auto', 
            //   width:'100%',
            //   fontFamily: DEFAULT_FONT
            // }}

            labelComponent={<TooltipEarnSegment data={chartData.tooltip_data_map} />}

            // labelComponent={<VictoryTooltip
            //   cornerRadius={2}
            //   flyoutComponent={<Flyout height={200}/>}
            //   flyoutStyle={{ 
            //       fill: "#B0C9F4", stroke: "lightgrey", 
            //       overflow:'visible', height: 'auto',
            //       width:'100%', opacity: 0.3
            //     }}
            //   />
            // }

          />
        }

      >
      <VictoryLegend x={120} y={275}
        
        orientation="horizontal"
        gutter={{left: 5, right: 15}}
        style={{ border: { stroke: "none" } }}
        colorScale={[ LINE_COLORS[0], LINE_COLORS[1] ]}
        data={[
          { name: "Monthly Sales", symbol: {type: 'minus'} }, 
          // { name: "Sales Forecast", symbol: {type: 'minus'} },
          { name: "Monthly Sales Last Year", symbol: {type: 'minus'} }, 
          // { name: "Baseline (without promotions)", symbol: {type: 'minus'} },
        ]}
      />

      <VictoryLegend x={410} y={275}
        orientation="horizontal"
        gutter={{left: 5, right: 15}}
        style={{ border: { stroke: "none" } }}
        data={[
          { name: "Sales Forecast"}
        ]}
        dataComponent={<DashPoint width={15} xOffset={0}/>}
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

      {/* <VictoryLine
        data={chartData.tooltip_info_data}
        style={{
          parent: { border: "1px solid #ccc"},
          data: { stroke: "none", strokeWidth: ({ active }) => active ? 3 : 2},
          labels: {fill: 'black'}
        }}

      /> */}


      <VictoryGroup
        data={chartData.actual_sales_data}  
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
              }            
            }}
            size={({ active }) => active ? 4 : 2}
          />

      </VictoryGroup>



      <VictoryGroup
        data={chartData.actual_sales_ly_data}
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
              labels: {fill: "none", fontSize:1,
              display: "inline", lineHeight: 0}
            
            }}
            size={({ active }) => active ? 4 : 2}
          />

      </VictoryGroup>



      {/* <VictoryGroup
        data={chartData.target_baseline_no_promo_data}
      >

        <VictoryLine
          name="sc-4"

          style={{
            data: { stroke: LINE_COLORS[2], strokeWidth: ({ active }) => active ? 3 : 2},
            labels: {fill: LINE_COLORS[2], lineHeight: 1
            },
            parent: { border: "1px solid #ccc"}
          }}
          />

        <VictoryScatter

            style={{
              data: {
                fill: "#fff",
                stroke: LINE_COLORS[2],
                strokeWidth: ({ active }) => active ? 3 : 1
              },
              labels: {fill: "none", display: 'inline', lineHeight: 0}
            }}
            size={({ active }) => active ? 4 : 2}
          />

      </VictoryGroup> */}


      <VictoryGroup
        data={chartData.revenue_forecast_usd_data}
      >

        <VictoryLine
          name="sc-5"

          style={{
            data: { stroke: LINE_COLORS[0], 
              strokeWidth: ({ active }) => active ? 3 : 2,
              strokeDasharray: "7 4"
            },
            parent: { border: "1px solid #ccc"}
          }}
          />

        <VictoryScatter

            style={{
              data: {
                fill: "#fff",
                stroke: LINE_COLORS[0],
                strokeWidth: ({ active }) => active ? 3 : 1
              }
            }}
            size={({ active }) => active ? 4 : 2}

          />

      </VictoryGroup>

      {/* <VictoryScatter
        
        name="sc-156"
        data={chartData.actual_sales_ly_data}          
        style={{
          data: {
            fill:"none",
            stroke: "none"
          },
          labels: {
            fill: "blue"
          }
        }}
      /> */}


      <VictoryAxis
        dependentAxis
        tickFormat={(t) => hlp.toShortMil( t )+'m'}
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
        tickValues={tickValues}
        />

    </VictoryChart>

    </div>
})

export default LineChartMonthly
