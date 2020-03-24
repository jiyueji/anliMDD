import React from 'react'

import { inject, observer, useLocalStore } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryGroup, VictoryLine, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const LineDropDrillBuyPen = observer((props) => {
  const local = useLocalStore(() => ({
    selSegment: '',
  }))

  if (!props.data) {
    return false
  }
  const allData = props.data
  const chartData = allData && allData.segments || {}
  local.selSegment = local.selSegment || chartData && chartData.length && chartData[0]['key']

  const selSegmentData = _.find(chartData, (o)=>{
    return o.key === local.selSegment
  })

  const curSelectedChartData = selSegmentData.chartData

  const lineData1 = curSelectedChartData['product_data']

  const onClickSegment = (segmentName) => {
    local.selSegment = segmentName
  }

  const segmentsHtml = chartData.map((item)=>{
    return  <div className={'info-row ' + (local.selSegment===item.key?'active':'') } key={item.key} onClick={onClickSegment.bind(null, item.key)}>
        <div className="info-title">{item.key}</div>
    </div>
  });

  const maxYear = allData.maxYear

  const COLOR_SCALE = [ "#AF4799" ]

  const tickValues = allData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return  <div className="main-block">
        <div className="main-block-body">
            <div className="table-emulation-wrap">
                <div className="table-emulation-header">
                    <div className="header-column">
                        <div className="header-row">
                            <div className="header-title">Product Penetration</div>
                        </div>
                    </div>
                    <div className="content-column"></div>
                </div>
                <div className="table-emulation">
                    <div className="table-row">
                        <div className="table-item">

                            {segmentsHtml}

                        </div>
                        <div className="table-content">


                            <div className="table-content-title">Product Penetration</div>

                            <VictoryChart width={700} height={300} 
                              theme={hlp.smallChartTheme}
                              domainPadding={{x: [20, 0], y: 150}} 
                              padding={{left: 60, top: 25, right: 25, bottom: 80}}
                              containerComponent={
                                <VictoryVoronoiContainer voronoiDimension="x"
                                  labels={({ datum }) => {
                                    return hlp.toPerc( datum.y )
                                  }}
                                  labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                                />
                              }>

                              <VictoryLegend x={250} y={250}
                                orientation="horizontal"
                                gutter={27}
                                style={{ border: { stroke: "none" } }}
                                colorScale={[COLOR_SCALE[0]]}
                                data={[
                                  { name: `${maxYear}`, symbol: {type: 'square'} }
                                ]}
                              />

                              {/* <VictoryScatter 
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
                              /> */}

                              <VictoryGroup
                                data={lineData1}  
                              >

                                <VictoryLine 
                                  style={{
                                    data: { 
                                      stroke: COLOR_SCALE[0],
                                      strokeWidth: ({ active }) => active ? 3 : 2,
                                    },
                                    labels: {fill: COLOR_SCALE[0] , lineHeight: 1},
                                    parent: { border: "1px solid #ccc"}
                                  }}
                                />

                                <VictoryScatter
                                    style={{
                                      data: {
                                        fill: "#fff",
                                        stroke: COLOR_SCALE[0],
                                        strokeWidth: ({ active }) => active ? 4 : 3,
                                      },
                                      labels: {fill: "none", fontSize: 6}
                                    
                                    }}
                                    size={({ active }) => active ? 4 : 2}
                                  />

                              </VictoryGroup>



                              <VictoryAxis
                                  dependentAxis
                                  tickFormat={(t) => hlp.toPerc( t )}
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
        <label className="bot-chart-com-sm pl-3">Product penetration % = Product Buyer count / Total Buyer count
        </label>
      </div>
})

export default LineDropDrillBuyPen