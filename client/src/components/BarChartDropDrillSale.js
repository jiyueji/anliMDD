import React from 'react'

import { inject, observer, useLocalStore } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarChartDropDrillSale = inject('chartStoreGrowth')(observer((props) => {
  const local = useLocalStore(() => ({
    selSegment: '',
  }))

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  const maxMonthStr = String( hlp.yearMonthToStr( chartData.maxMonth ) )

  local.selSegment = local.selSegment || chartData.segments && chartData.segments.length && chartData.segments[0]['key']

  const selSegmentData = _.find(chartData.segments, (o)=>{
    return o.key === local.selSegment
  })

  const curSelectedChartData = selSegmentData.chartData

  const onClickSegment = (segmentName) => {
    local.selSegment = segmentName
  }

  const segmentsHtml = chartData.segments.map((item)=>{
    return  <div className={'info-row ' + (local.selSegment===item.key?'active':'') } key={item.key} onClick={onClickSegment.bind(null, item.key)}>
        <div className="info-title">{item.key}</div>
        <div className="info-data">$ {  hlp.toShortMil( item.lastMonthVal )+'m'}</div>
    </div>
  });

  const COLOR_SCALE = [ "#032F5A", "#032D57" ]
  const BAR_WIDTH = 25
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return   <div>

      <div className="main-block">
        {/* <div className="main-block-header">
            <h6 className="text-blue">Income</h6>
        </div> */}
        <div className="main-block-body">
            <div className="table-emulation-wrap">
                <div className="table-emulation-header">
                    <div className="header-column">
                        <div className="header-row">
                            <div className="header-title">Segment</div>
                            <div className="header-sorting">Recent monthly sales</div>
                        </div>
                    </div>
                    <div className="content-column">
                      <label className="st-card-tl-sm float-right">As of {maxMonthStr}</label>
                    </div>
                </div>
                <div className="table-emulation">
                    <div className="table-row">
                        <div className="table-item">

                            {segmentsHtml}

                        </div>
                        <div className="table-content">


                            <div className="table-content-title">Sales($)</div>

                            <VictoryChart width={700} height={300} 
                              theme={hlp.smallChartTheme}
                              domainPadding={{x: [20, 0], y: 50}} 
                              padding={{left: 60, top: 25, right: 25, bottom: 60}}
                              containerComponent={
                                <VictoryVoronoiContainer voronoiDimension="x"
                                  labels={({ datum }) => {
                                    return datum.y !== 0 ? `${datum.labelTooltip} ${ hlp.toShortMil( datum.y )+'m' }` : datum.info
                                  }}
                                  labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                                />
                              }>

                              <VictoryLegend x={230} y={270}

                                orientation="horizontal"
                                gutter={3}
                                style={{ border: { stroke: "none" } }}
                                colorScale={[COLOR_SCALE[0] ]}
                                data={[
                                  { name: "Monthly Sales", symbol: {type: 'square'} }
                                ]}
                              />


                              <VictoryScatter 
                                data={chartData.monthsData}          
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

                              <VictoryBar barWidth={BAR_WIDTH}
                                data={curSelectedChartData}
                                style={{
                                  labels: {fill: COLOR_SCALE[0]},
                                  data: {fill: COLOR_SCALE[0]} }
                                }
                              />

                              <VictoryAxis
                                  dependentAxis
                                  tickFormat={(t) => hlp.toShortMil( t )+'m'}
                                  style={{ grid: {
                                    stroke: "none",
                                  },
                                  axis: {
                                    stroke: "none"
                                  }
                                }}
                                />
                                <VictoryAxis crossAxis
                                  style={{ grid: {
                                    stroke: "none"
                                  },
                                  axis: {
                                    stroke: "none",
                                  }}}
                                  offsetY={60}
                                  tickValues={tickValues}
                                />

                            </VictoryChart>



                        </div>




                    </div>
                </div>
            </div>
        </div>
      </div>

  </div>
}))

export default BarChartDropDrillSale