import React from 'react'

import { inject, observer } from 'mobx-react'

import { Flyout, VictoryVoronoiContainer,VictoryTooltip,VictoryChart, VictoryScatter, VictoryLegend, VictoryGroup, VictoryBar, VictoryAxis} from "victory"

//import * as numeral from 'numeral'

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

const BarChartAboPin = observer((props) => {
  const chartData = props.data || {}
  if (!chartData) {
    return false
  }

  const COLOR_SCALE = [ "#647789", "#032D57" ]
  const curYear = chartData.maxYear || 2020
  const curLegendYear = hlp.yearToPfPref( curYear.toString() ),
    prevLegendYear = hlp.yearToPfPref( (curYear -1).toString() )

  const maxMonthStr = String( hlp.yearMonthToStr( chartData.maxMonth ) )

  return   <div>
    <label className="st-card-tl-sm">Monthly Income of selected PIN level ABOs ($)</label>
    <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>

    <VictoryChart width={700} height={300} padding={{left: 70, top: 30, right: 10, bottom: 70}}
      theme={hlp.smallChartTheme}
      containerComponent={
        <VictoryVoronoiContainer voronoiDimension="x"
          labels={({ datum }) => {
            return datum.labelTooltip// datum.y !== 0 ? `${datum.labelTooltip} ${ hlp.toShortThous( datum.y )+'k' }` : (datum.info || '')
          }}
          style={{
            fontSize: 8
          }}

          //labelComponent={<ChartPointTooltip data={chartData}/>}

          labelComponent={<VictoryTooltip
            center={{ y: 200 }}
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
    <VictoryLegend x={100} y={270}
      orientation="horizontal"
      gutter={{left: 5, right: 35}}
      style={{ border: { stroke: "none" } }}
      colorScale={ [ COLOR_SCALE[0], COLOR_SCALE[1] ]}
      data={[
        { name: prevLegendYear, symbol: {type: 'square'} },
        { name: curLegendYear, symbol: {type: 'square'} }
      ]}
      // dataComponent={<DashPoint/>}
      />

    <VictoryLegend x={410} y={275}
      orientation="horizontal"
      gutter={{left: 5, right: 35}}
      style={{ border: { stroke: "none" } }}
      data={[
        { name: "Median income"}
      ]}
      dataComponent={<DashPoint width={35} xOffset={-10}/>}
      />

      <VictoryGroup offset={70}  colorScale={COLOR_SCALE}>

        <VictoryBar
          style={{labels:{fontSize: 16}}}
          barWidth={70}
          
          data={chartData.prevYear}
          labels={({ datum }) => hlp.numberWithCommas(Math.round( datum.y ))}
        />

        <VictoryBar
          style={{labels:{fontSize: 16}}}
          barWidth={70}

          data={chartData.curYear}
          labels={({ datum }) => hlp.numberWithCommas(Math.round( datum.y ))}
        />

      </VictoryGroup>

      <VictoryGroup offset={70}>

        <VictoryScatter width={70}
          data={chartData.prevYearMed}
          style={{labels:{fontSize: 16}}}
          dataComponent={<DashPoint/>}
        />

        <VictoryScatter width={70}
          data={chartData.curYearMed}
          style={{labels:{fontSize: 16}}}
          dataComponent={<DashPoint/>}
        />

      </VictoryGroup>


      <VictoryAxis
          dependentAxis
          tickFormat={(t) => hlp.numberWithCommas(Math.round(t))} // `${hlp.toShortThous( t )+'k'}`}
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
})

export default BarChartAboPin