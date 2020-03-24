import React from 'react'

import { inject, observer, useLocalStore } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryStack, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryLine, VictoryAxis} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'

const SEG_TYPES = [
  'Customer',
  'ABO (Purchasing Only)',
  'Developing ABO',
  'Building ABO',
  'ABO Leader'
]

const BarChartDropDrillBuy = inject('chartStoreGrowth')(observer((props) => {
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

  const bar1Data = curSelectedChartData[SEG_TYPES[0]],
    bar2Data = curSelectedChartData[SEG_TYPES[1]],
    bar3Data = curSelectedChartData[SEG_TYPES[2]],
    bar4Data = curSelectedChartData[SEG_TYPES[3]],
    bar5Data = curSelectedChartData[SEG_TYPES[4]]


  const onClickSegment = (segmentName) => {
    local.selSegment = segmentName
  }

  const segmentsHtml = chartData.segments.map((item)=>{
    return  <div className={'info-row ' + (local.selSegment===item.key?'active':'') } key={item.key} onClick={onClickSegment.bind(null, item.key)}>
        <div className="info-title">{item.key}</div>
        <div className="info-data">{(item.lastMonthVal<5000?Math.round(item.lastMonthVal):hlp.toShortThous( item.lastMonthVal )+'k')}</div>
    </div>
  });


  const COLOR_SCALE = [ "#EA1E4F", "#FEC93E", "#53C95C", "#AF4799", "#03305D" ]

  const BAR_WIDTH = 25

  const legendFirst = [
    { name: "Building ABO", symbol: {type: 'square'} },
    { name: "Abo Leader", symbol: {type: 'square'} }
  ]
  const legendSecond = [
    { name: "Building ABO", symbol: {type: 'square'} }
  ]

  const isDisplayABOLeader = bar5Data && bar5Data.length

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
                            <div className="header-title">Buyer Type</div>
                            <div className="header-sorting">Recent Month Productivity($)</div>
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


                            <div className="table-content-title">Productivity $</div>

                            <VictoryChart width={700} height={300} 
                              theme={hlp.smallChartTheme}
                              domainPadding={{x: [20, 0], y: 50}} 
                              padding={{left: 60, top: 25, right: 25, bottom: 80}}
                              containerComponent={
                                <VictoryVoronoiContainer voronoiDimension="x"
                                  labels={({ datum }) => {
                                    return datum.y !== 0 ? `${datum.labelTooltip} ${ (datum.y<5000?Math.round(datum.y):hlp.toShortThous( datum.y )+'k') }` : datum.info
                                  }}
                                  labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                                />
                              }>

                              <VictoryLegend x={100} y={250}
                                orientation="horizontal"
                                gutter={27}
                                style={{ border: { stroke: "none" } }}
                                colorScale={[COLOR_SCALE[0], COLOR_SCALE[1], COLOR_SCALE[2]]}
                                data={[
                                  { name: "Customer", symbol: {type: 'square'} },
                                  { name: "ABO (Purchasing Only)", symbol: {type: 'square'} },
                                  { name: "Developing ABO", symbol: {type: 'square'} }
                                ]}
                              />

                            <VictoryLegend x={165} y={270}
                                orientation="horizontal"
                                gutter={3}
                                style={{ border: { stroke: "none" } }}
                                colorScale={[COLOR_SCALE[3], COLOR_SCALE[4] ]}
                                data={ isDisplayABOLeader ? legendFirst : legendSecond  }
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

                                <VictoryLine 
                                  name='b-11'
                                  key='b-11'
                                  data={ bar1Data }
                                  style={{
                                    data: {
                                      stroke: COLOR_SCALE[0],
                                      strokeWidth: ({ active }) => active ? 3 : 2
                                    },
                                    labels: {fill: COLOR_SCALE[0]}
                                  }}
                                />
                                <VictoryLine
                                  name='b-22'
                                  key='b-22'
                                  data={ bar2Data }
                                  style={{
                                    data: {
                                      stroke: COLOR_SCALE[1],
                                      strokeWidth: ({ active }) => active ? 3 : 2
                                    },
                                    labels: {fill: COLOR_SCALE[1]}
                                  }}
                                />
                                <VictoryLine 
                                    name='b-33'
                                    key='b-33'
                                    data={ bar3Data }
                                    style={{
                                      data: {
                                        stroke: COLOR_SCALE[2],
                                        strokeWidth: ({ active }) => active ? 3 : 2
                                      },
                                      labels: {fill: COLOR_SCALE[2]}
                                    }}
                                  />
                                <VictoryLine 
                                  name='b-44'
                                  key='b-44'
                                  data={ bar4Data }
                                  style={{
                                    data: {
                                      stroke: COLOR_SCALE[3],
                                      strokeWidth: ({ active }) => active ? 3 : 2
                                    },
                                    labels: {fill: COLOR_SCALE[3]}
                                  }}
                                />
                                {isDisplayABOLeader &&
                                  <VictoryLine 
                                    name='b-55'
                                    data={ bar5Data }
                                    style={{
                                      data: {
                                        stroke: COLOR_SCALE[4],
                                        strokeWidth: ({ active }) => active ? 3 : 2
                                      },
                                      labels: {fill: COLOR_SCALE[4]}
                                    }}
                                  />}



                              <VictoryAxis
                                  dependentAxis
                                  tickFormat={(t) => (t<5000?t:hlp.toShortThous( t )+'k')}
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
                                  tickValues={tickValues}
                                //  offsetY={60}
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

export default BarChartDropDrillBuy