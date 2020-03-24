import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryVoronoiContainer, VictoryTooltip, VictoryScatter, VictoryLabel, VictoryLegend, VictoryGroup, VictoryBar, VictoryAxis} from "victory"

//import * as numeral from 'numeral'

import * as hlp from './Helper'

const formatPercent = (val) => {
  return `${Math.round(val*100)}%`
}

class LblPoint extends React.Component {
  render() {

    let { x, y, style, datum } = this.props;
    const valText = `${formatPercent(datum.y)} U35`
    const POSITION_X = 840
    return (
      <g>
        <rect fill="#DDE3EA" x={POSITION_X-5} y={y - 15} rx={5} ry={5} width={60} height={30} />
        <VictoryLabel {...this.props}  x={POSITION_X} text={valText}/>
      </g>  
    )
  }
}

const BarAboPinPop = inject('chartStore')(observer((props) => {
  const chartData = props.data || {}
  if (!chartData) {
    return false
  }

  const COLOR_SCALE = [ "#FADF96", "#EEBC3A" ]
  
  const maxPredYear =`${String(chartData.maxPredYear)} Prediction`,
    maxActualYear = String(chartData.maxActualYear)


  return   <div>
    <label className="st-card-tl-sm">Population by PIN Level</label>

    <VictoryChart width={900} height={450} padding={{left: 70, top: 45, right: 40, bottom: 50}}
      theme={hlp.smallChartTheme}
      horizontal
      domainPadding={{x: 0, y: [0, 75]}}
      containerComponent={
        <VictoryVoronoiContainer voronoiDimension="x"
          
          style={{
            fontSize: 8
          }}

          //labelComponent={<ChartPointTooltip data={chartData}/>}

        />
      }
    >
    <VictoryLegend x={270} 
      // y={-8}
      y={8}
      orientation="horizontal"
      gutter={{left: 5, right: 15}}
      style={{ border: { stroke: "none" }, labels: {fontSize: 13} }}
      colorScale={ [ COLOR_SCALE[0], COLOR_SCALE[1] ]}
      data={[
        { name: maxActualYear, symbol: {type: 'square'} },
        { name: maxPredYear, symbol: {type: 'square'} }
      ]}

      />

      <VictoryGroup offset={20}>


        <VictoryBar
          style={{labels:{fontSize: 16}}}
          barWidth={20}
          colorScale={[COLOR_SCALE[1]]}
          data={chartData.predYear}
          labelComponent={<VictoryTooltip
            //center={{ y: 30 }}
            centerOffset={{ x: 55 }}
            cornerRadius={2}
            flyoutStyle={{ 
                fill: "#B0C9F4", stroke: "lightgrey", 
                overflow:'visible', height: 'auto',
                width:'100%'
              }}
            />
          }
          labels={({ datum }) => {
            return Math.round( datum.y ) 
          }}


        />

        <VictoryBar
          style={{labels:{fontSize: 16}}}
          barWidth={20}
          colorScale={[COLOR_SCALE[0]]}
          data={chartData.actualYear}
          labelComponent={<VictoryTooltip
            //center={{ y: 30 }}
            centerOffset={{ x: 55 }}
            cornerRadius={2}
            flyoutStyle={{ 
                fill: "#B0C9F4", stroke: "lightgrey", 
                overflow:'visible', height: 'auto',
                width:'100%'
              }}
            />
          }
          labels={({ datum }) => {
            return Math.round( datum.y ) 
          }}


        />

      </VictoryGroup>


      <VictoryScatter width={30}
        data={chartData.pctU35}
        dataComponent={<LblPoint/>}
        flyoutStyle={{ 
          display: 'none',
          opacity: 0
        }}
      />


      <VictoryAxis
          tickFormat={(t) => `${hlp.toShortThous( t )+'k'}`}
          dependentAxis
          style={{ grid: {
            stroke: "none",
          },
          axis: {
            stroke: "none"
          },
          ticks: {
            stroke: "none"
          },
          tickLabels: { fontSize: 12 }
        }}

        offsetY={30}
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
          },
          tickLabels: { fontSize: 12 }
        }}
        />

    </VictoryChart>

  </div>
}))

export default BarAboPinPop