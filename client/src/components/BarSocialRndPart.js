import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryVoronoiContainer, VictoryTooltip, VictoryLegend, VictoryGroup, VictoryBar, VictoryAxis} from "victory"

import * as hlp from './Helper'


const BarSocialRndPart = inject('chartStore')(observer((props) => {
  const chartData = props.data || {}
  if (!chartData) {
    return false
  }

  const COLOR_SCALE = [ "#19AF54"]
//  const curYear = chartData.maxYear
  const maxMonth = String( hlp.yearMonthToStr( chartData.maxMonth ) ) 


  return   <div>
    <label className="st-card-tl-sm">YTD SOP 2nd Round Prticipation % ({maxMonth})</label>
    {/* <label className="st-card-pin-sub">Monthly median</label> */}

    <VictoryChart width={700} height={300} padding={{left: 70, top: 30, right: 10, bottom: 60}}
      domainPadding={{x: 180, y: [0, 35]}}
      theme={hlp.smallChartTheme}
      containerComponent={
        <VictoryVoronoiContainer voronoiDimension="x"
          labels={({ datum }) => {
            return hlp.toPerc( datum.y )
          }}
          style={{
            fontSize: 8
          }}


          labelComponent={<VictoryTooltip
            center={{ y: 30 }}
            //centerOffset={{ y: 35 }}
            cornerRadius={2}
            flyoutStyle={{ 
                fill: "#B0C9F4", stroke: "lightgrey", 
                overflow:'visible', height: 'auto',
                width:'100%'
              }}
            />
          }
        />
      }
    >
    {/* <VictoryLegend x={210} y={275}
      orientation="horizontal"
      gutter={{left: 5, right: 35}}
      style={{ border: { stroke: "none" } }}
      colorScale={ [ COLOR_SCALE[0] ]}
      data={[
        { name: 'Last Year', symbol: {type: 'square'} },
        { name: 'Current Year', symbol: {type: 'square'} }
      ]}
      /> */}


      <VictoryBar
        style={{labels:{fontSize: 16}, data: {fill: COLOR_SCALE[0]}}}
        barWidth={70}
        colorScale={COLOR_SCALE[0]}
        data={chartData.rnd_part_data}
        labels={({ datum }) => hlp.toPerc( datum.y )}
      />

      <VictoryAxis
          dependentAxis
          tickFormat={(t) => hlp.toPerc( t )}
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
        //tickFormat={(t) => SECTION_NAME_MAP[t]}
        />

    </VictoryChart>

  </div>
}))

export default BarSocialRndPart