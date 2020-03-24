import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryVoronoiContainer, VictoryTooltip, VictoryLegend, VictoryGroup, VictoryBar, VictoryAxis} from "victory"

import * as hlp from './Helper'


class DashPoint extends React.Component {
  render() {
    const {x, y, datum, width, xOffset} = this.props;
    const curWidth = width || 60
    const dx = xOffset || 0
    return (
      <path d={`M${x+dx-curWidth/2} ${y} ${x+dx+curWidth/2} ${y}`} strokeWidth="3" stroke="red" strokeDasharray="9 6"/>
    );
  }
}

const BarChartQMonthPV = observer((props) => {
  const chartData = props.data || {}
  if (!chartData) {
    return false
  }
  const SECTION_NAME_MAP = {
    'acc_of_q': 'Acc. # of QMonths',
    'pv_per_q': 'PV per QMonth'
  }

  const maxMonthStr = String( hlp.yearMonthToStr( chartData.maxMonth ) )

  const COLOR_SCALE = [ "#AF4799", "#03305D"]
  const curYear = hlp.yearToPfPref2(  String(chartData.maxYear) ),
    prevYear = hlp.yearToPfPref2(  String(chartData.maxYear-1) )

  return   <div>
    <label className="st-card-tl-sm">YTD {curYear} Q Month & PV per QMonth</label>
    <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>

    <VictoryChart width={700} height={300} padding={{left: 70, top: 30, right: 10, bottom: 60}}
      domainPadding={{x: 180, y: [0, 35]}}
      theme={hlp.smallChartTheme}
      containerComponent={
        <VictoryVoronoiContainer voronoiDimension="x"
          labels={({ datum }) => {
            return Math.round( datum.y )
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
    <VictoryLegend x={210} y={275}
      orientation="horizontal"
      gutter={{left: 5, right: 35}}
      style={{ border: { stroke: "none" } }}
      colorScale={ [ COLOR_SCALE[0], COLOR_SCALE[1] ]}
      data={[
        { name: prevYear, symbol: {type: 'square'} },
        { name: curYear, symbol: {type: 'square'} }
      ]}
      />


    <VictoryGroup offset={90}>
      <VictoryBar
        style={{labels:{fontSize: 16}}}
        barWidth={70}
        colorScale={[COLOR_SCALE[0]]}
        data={chartData.prevYear}
        labels={({ datum }) => hlp.numberWithCommas( datum.y )}
      />

      <VictoryBar
        style={{labels:{fontSize: 16}}}
        barWidth={70}
        colorScale={[COLOR_SCALE[1]]}
        data={chartData.curYear}
        labels={({ datum }) => hlp.numberWithCommas( datum.y )}
      />
    </VictoryGroup>

 


      <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${hlp.toShortThous( t )+'k'}`}
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
        tickFormat={(t) => SECTION_NAME_MAP[t]}
        />

    </VictoryChart>

  </div>
})

export default BarChartQMonthPV