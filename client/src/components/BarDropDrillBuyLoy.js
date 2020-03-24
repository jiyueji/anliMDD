import React from 'react'

import { inject, observer, useLocalStore } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryStack, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarDropDrillBuyLoy = observer((props) => {
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

  const bar1Data = curSelectedChartData['loyal_buyer_data'],
    bar2Data = curSelectedChartData['non_loyal_buyer_data'],
    bar3Data = curSelectedChartData['new_buyer_data']

  const onClickSegment = (segmentName) => {
    local.selSegment = segmentName
  }

  const segmentsHtml = chartData.map((item)=>{
    return  <div className={'info-row ' + (local.selSegment===item.key?'active':'') } key={item.key} onClick={onClickSegment.bind(null, item.key)}>
        <div className="info-title">{item.key}</div>
    </div>
  });

  const maxYear = allData.maxYear

  const COLOR_SCALE = [ "#AF4799", "#FDCC49", "#03305D" ]

  const BAR_WIDTH = 25

  const tickValues = allData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return  <div className="main-block">
        <div className="main-block-body">
            <div className="table-emulation-wrap">
                <div className="table-emulation-header">
                    <div className="header-column">
                        <div className="header-row">
                            <div className="header-title">Buyer Loyalty</div>
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


                            <div className="table-content-title">Buyers</div>

                            <VictoryChart width={700} height={300} 
                              theme={hlp.smallChartTheme}
                              domainPadding={{x: [20, 0], y: 50}} 
                              padding={{left: 60, top: 25, right: 25, bottom: 80}}
                              containerComponent={
                                <VictoryVoronoiContainer voronoiDimension="x"
                                  labels={({ datum }) => {
                                    return datum.y !== 0 ? `${datum.labelTooltip} ${ hlp.toShortThous( datum.y )+'k' }` : datum.info
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
                                  { name: `Loyal ${maxYear}`, symbol: {type: 'square'} },
                                  { name: `Non-Loyal ${maxYear}`, symbol: {type: 'square'} },
                                  { name: `New Buyer ${maxYear}`, symbol: {type: 'square'} }
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

                              <VictoryStack
                                colorScale={COLOR_SCALE}
                              >
                                <VictoryBar barWidth={BAR_WIDTH}
                                  name='b-11'
                                  key='b-11'
                                  data={ bar1Data }
                                  style={{
                                    labels: {fill: COLOR_SCALE[0]}
                                  }}
                                />
                                <VictoryBar barWidth={BAR_WIDTH}
                                  name='b-22'
                                  key='b-22'
                                  data={ bar2Data }
                                  style={{
                                    labels: {fill: COLOR_SCALE[1]}
                                  }}
                                />
                                <VictoryBar barWidth={BAR_WIDTH}
                                    name='b-33'
                                    key='b-33'
                                    data={ bar3Data }
                                    style={{
                                      labels: {fill: COLOR_SCALE[2]}
                                    }}
                                  />
                                </VictoryStack>



                              <VictoryAxis
                                  dependentAxis
                                  tickFormat={(t) => hlp.toShortThous( t )+'k'}
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

        <label className="bot-chart-com-sm pl-3">New Buyer: SOP participant without purchasing SOP related product in previous 12 months<br/>
          Non Loyal Buyer: SOP participant purchased SOP related product with 1~5 quantity in previous 12 months<br/>
          Loyal Buyer: SOP participant purchased SOP related product with ≥ 6 quantity in previous 12 months
        </label>
      </div>
})

export default BarDropDrillBuyLoy