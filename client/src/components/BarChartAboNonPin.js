import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryVoronoiContainer, VictoryTooltip, VictoryChart, VictoryScatter, VictoryLegend, VictoryStack, VictoryGroup, VictoryBar, VictoryAxis, VictoryLabel} from "victory"

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

const CustomLabel =  props => {
  const { x, y, style } = props;
  const { fontSize } = style;
//  height={fontSize}
  return (
    <g>
      <rect fill="#DDE3EA" x={x-10} y={y - 15} rx={5} ry={5} width={40} height={30} />
      <VictoryLabel {...props} />
    </g>
  );
};

const TopTitleLabel =  props => {
  const { x, y, style } = props;
  const { fontSize } = style;
//  height={fontSize}
  return (
    <g>
      <rect fill="#F2F2F2" x={x-15} y={y - 15} rx={5} ry={5} width={120} height={30} />
      <VictoryLabel {...props} />
    </g>
  );
};

const formatPercent = (val) => {
  return `${Math.round(val*100)}%`
}

const BarChartAboNonPin = observer((props) => {
  const chartData = props.data || {}
  if (!chartData) {
    return false
  }

  const COLOR_SCALE = [ "#AF4799", "#03305D", "#DFBED9", "#A5B6C6" ]
  const prevYear = parseInt(chartData.maxYear) - 1 || 0
  const curLegendYear = hlp.yearToPfPref( parseInt(chartData.maxYear).toString() )
  const prevLegendYear = hlp.yearToPfPref( prevYear.toString() )

  const maxMonthStr = String( hlp.yearMonthToStr( chartData.maxMonth ) )

  const SECTION_NAME_MAP = {
    'new_abo': 'New ABO',
    'existing abo': 'Existing ABO'
  }

  const topLbl1 = chartData.pctEarnLy && chartData.pctEarnLy.length && chartData.pctEarnLy[0].y
  const topLbl2 = chartData.pctEarn && chartData.pctEarn.length && chartData.pctEarn[0].y
  const topLbl3 = chartData.pctEarnLy && chartData.pctEarnLy.length && chartData.pctEarnLy[1].y
  const topLbl4 = chartData.pctEarn && chartData.pctEarn.length && chartData.pctEarn[1].y

  const labelComponent = <VictoryTooltip
    center={{ y: 30 }}
    //centerOffset={{ y: 35 }}
    cornerRadius={2}
    flyoutStyle={{ 
        fill: "#B0C9F4", stroke: "lightgrey", 
        overflow:'visible', height: 'auto',
        width:'100%'
      }}
    />


  return   <div>
    <label className="st-card-tl-sm">Monthly Income of non-PIN ABOs ($)</label>
    <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>

    <VictoryChart width={700} height={300} padding={{left: 70, top: 30, right: 10, bottom: 80}}
      theme={hlp.smallChartTheme}
      domainPadding={{x: 180, y: [0, 35]}}
      // containerComponent={
      //   <VictoryVoronoiContainer voronoiDimension="x"
      //     labels={({ datum }) => {
      //       return hlp.toShortThous( datum.y )+'k'// datum.y !== 0 ? `${datum.labelTooltip} ${ hlp.toShortThous( datum.y )+'k' }` : (datum.info || '')
      //     }}
      //     style={{
      //       fontSize: 8
      //     }}

      //     //labelComponent={<ChartPointTooltip data={chartData}/>}

      //     labelComponent={<VictoryTooltip
      //       center={{ y: 30 }}
      //       //centerOffset={{ y: 35 }}
      //       cornerRadius={2}
      //       flyoutStyle={{ 
      //           fill: "#B0C9F4", stroke: "lightgrey", 
      //           overflow:'visible', height: 'auto',
      //           width:'100%'
      //         }}
      //       />
      //     }
      //   />
      // }
    >

    {/* <VictoryLegend x={30} y={250}
      orientation="horizontal"
      gutter={{left: 5, right: 15}}
      style={{ border: { stroke: "none" } }}
      colorScale={ [ COLOR_SCALE[0], COLOR_SCALE[2] ]}
      data={[
        { name: 'YTD income RC', symbol: {type: 'square'} },
        { name: `${prevLegendYear} income RC`, symbol: {type: 'square'} },
      ]}
      /> */}

    <VictoryLegend x={25} y={255}
      orientation="horizontal"
      gutter={{left: 5, right: 15}}
      style={{ border: { stroke: "none" } }}
      colorScale={ [ COLOR_SCALE[1], COLOR_SCALE[3] ]}
      data={[
        { name: `${curLegendYear} income`, symbol: {type: 'square'} },
        { name: `${prevLegendYear} income`, symbol: {type: 'square'} }
      ]}
      />

    <VictoryLegend x={490} y={255}
      orientation="horizontal"
      gutter={{left: 5, right: 15}}
      style={{ border: { stroke: "none" } }}
      data={[
        { name: "Median income"}
      ]}
      dataComponent={<DashPoint width={35} xOffset={-10}/>}
      />

      <TopTitleLabel x={160} y={10} text={'% Earner of Total'}/>
      <TopTitleLabel x={490} y={10} text={'% Earner of Total'}/>

      <CustomLabel x={160} y={43} text={ formatPercent( topLbl1 ) }/>
      <CustomLabel x={250} y={43} text={ formatPercent( topLbl2 ) }/>

      <CustomLabel x={490} y={43} text={ formatPercent( topLbl3 ) }/>
      <CustomLabel x={575} y={43} text={ formatPercent( topLbl4 ) }/>

      <VictoryGroup offset={90} >

        <VictoryBar
          style={{labels:{fontSize: 16}}}
          barWidth={70}
          colorScale={[COLOR_SCALE[3]]}
          data={chartData.avgNoPinPbLy}
          labelComponent={labelComponent}
          labels={({ datum }) => datum.labelTooltip}
        />

        <VictoryBar
          style={{labels:{fontSize: 16}}}
          barWidth={70}
          colorScale={[COLOR_SCALE[1]]}

          data={chartData.avgNoPinPb}
          labelComponent={labelComponent}
          labels={({ datum }) => datum.labelTooltip}
        />

      </VictoryGroup>

      <VictoryGroup offset={90}>

        <VictoryScatter width={70}
          data={chartData.noPinMedianLy}        
          dataComponent={<DashPoint/>}
        />

        <VictoryScatter width={70}
          data={chartData.noPinMedian}
          dataComponent={<DashPoint/>}
        />

      </VictoryGroup>


      <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${Math.round(t)}`}
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

    <label className="bot-chart-com-sm pl-4">New ABO：New sign-up ABO in current performance year</label>
  </div>
})

export default BarChartAboNonPin