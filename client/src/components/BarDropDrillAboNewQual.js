import React from 'react'

import { inject, observer, useLocalStore } from 'mobx-react'

import { VictoryChart, VictoryScatter, VictoryLine, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'


const BarDropDrillAboNewQual = inject('chartStoreGrowth')(observer((props) => {
  const local = useLocalStore(() => ({
    selSegment: '',
  }))

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  local.selSegment = local.selSegment || chartData.segments && chartData.segments.length && chartData.segments[0]['key']

  const selSegmentData = _.find(chartData.segments, (o)=>{
    return o.key === local.selSegment
  })

  const { newAboData, newAboLyData, firstMigUpData } = selSegmentData.chartData

  const getMaxima = (dataset) => Math.max(...dataset.map((d) => d.y))


  const roundClosestTop = (val, num) => Math.ceil((val+1) / num) * num
  

  const maxNewAbo = getMaxima(newAboData)
  const maxNewAboLy = getMaxima(newAboLyData)
  const maxFirstMig = roundClosestTop( getMaxima(firstMigUpData), 10 )
  const maxFirstAxisVal = roundClosestTop( Math.max( maxNewAbo, maxNewAboLy ), 100 )
  const maxYearStr = String( chartData.maxYear ),
    prevMaxYearStr = String( chartData.maxYear - 1 )

  const maxMonthStr = String( hlp.yearMonthToStr( chartData.maxMonth ) )

  const onClickSegment = (segmentName) => {
    local.selSegment = segmentName
  }
  
  const TICK_VALUES = [0.25, 0.5, 0.75, 1]

  const segmentsHtml = chartData.segments.map((item)=>{
    return  <div className={'info-row ' + (local.selSegment===item.key?'active':'') } key={item.key} onClick={onClickSegment.bind(null, item.key)}>
        <div className="info-title">{item.key}</div>
        <div className="info-data2">{ item.firstTimeMigUp ? (needFormatThous ? hlp.toShortThous( item.firstTimeMigUp )+'k' : Math.round( item.firstTimeMigUp )) : 'none' }</div>
        <div className="info-data">{ item.avgAgeAbo ? (needFormatThous ? hlp.toShortThous( item.avgAgeAbo )+'k' : Math.round( item.avgAgeAbo )) : 'none' }</div>
    </div>
  });

  const extraSegmentsHtml = chartData.extraSegments.map((item)=>{
    return  <div className={'info-row'} key={item.buyer_type}>
        <div className="info-title">{item.buyer_type}</div>
        <div className="info-data2">{ needFormatThous ? hlp.toShortThous( item.first_time_migrate_up_months )+'k' : Math.round( item.first_time_migrate_up_months ) }</div>
        <div className="info-data-empty">{ needFormatThous ? hlp.toShortThous( item.avg_age_abo )+'k' : Math.round( item.avg_age_abo ) }</div>
    </div>
  });

  const needFormatThous = !!props.formatThous

  const COLOR_SCALE = [ "#7A90A8", "#032D57", "#59B961" ]
  const BAR_WIDTH = 20
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
                            <div className="header-title"></div>
                            <div className="header-sorting header-sort-qual text-center">PF YTD Average months to first time migrate</div>
                            <div className="header-sorting header-sort-qual text-center">PF YTD Average age</div>
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
                            {extraSegmentsHtml}
                        </div>
                        <div className="table-content">


                            <div className="table-content-title">{props.subtitle}</div>

                            <VictoryChart width={700} height={300} 
                              theme={hlp.smallChartTheme}
                              domainPadding={{x: [20, 0], y: 50}} 
                              padding={{left: 60, top: 5, right: 45, bottom: 60}}

                              domain={{ y: [0, 1] }}

                              containerComponent={
                                <VictoryVoronoiContainer voronoiDimension="x"
                                  labels={({ datum }) => datum.y }
                                  // labels={({ datum }) => {
                                  //   return datum.y !== 0 ? `${datum.labelTooltip} ${ needFormatThous ? hlp.toShortThous( datum.y )+'k' : hlp.numberWithCommas( datum.y ) }` : datum.info
                                  // }}
                                  labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
                                />
                              }>

                              <VictoryLegend x={25} y={270}

                                orientation="horizontal"
                                gutter={3}
                                style={{ border: { stroke: "none" }, labels: { fontSize: 16 } }}
                                colorScale={[COLOR_SCALE[0], COLOR_SCALE[1] ]}
                                data={[
                                  // { name: `Average time to Migrate`, symbol: {type: 'minus'} },
                                  { name: `${prevMaxYearStr} New Qualifier`, symbol: {type: 'square'} },
                                  { name: `${maxYearStr} New Qualifier`, symbol: {type: 'square'} }
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

                              <VictoryGroup offset={20}>
                
                                <VictoryBar barWidth={BAR_WIDTH}
                                  data={newAboLyData}
                                  style={{
                                    labels: {fill: COLOR_SCALE[0]},
                                    data: {fill: COLOR_SCALE[0]} }
                                  }
                                  y={(datum) => datum.y / maxFirstAxisVal}

                                />

                                <VictoryBar barWidth={BAR_WIDTH}
                                  data={newAboData}
                                  style={{
                                    labels: {fill: COLOR_SCALE[1]},
                                    data: {fill: COLOR_SCALE[1]} }
                                  }
                                  y={(datum) => datum.y / maxFirstAxisVal}

                                />
          
                              </VictoryGroup>

                              {/* <VictoryLine
                                name="sc-11"
                                data={firstMigUpData}
                                style={{
                                  data: { stroke: COLOR_SCALE[2], strokeWidth: ({ active }) => active ? 3 : 2},
                                  labels: {fill: COLOR_SCALE[2], lineHeight: 1
                                  },
                                  parent: { border: "1px solid #ccc"}
                                }}
                                // normalize data for additional axis
                                y={(datum) => datum.y / maxFirstMig}
                                /> */}


                                <VictoryAxis
                                  dependentAxis
                                  //tickFormat={(t) => hlp.numberWithCommas( t ) }
                                  style={{ grid: {
                                      stroke: "none",
                                    },
                                    axis: {
                                      stroke: "none"
                                    }
                                  }}

                                  tickValues={TICK_VALUES}
                                  // Re-scale ticks by multiplying by correct maxima
                                  tickFormat={(t) => Math.round( t * maxFirstAxisVal ) }

                                />

{/* // TODO: remove this exis, temporary fix with offsetX={905} */}
                                <VictoryAxis dependentAxis
                                  offsetX={905}
                                  style={{ grid: {
                                      stroke: "none"
                                    },
                                    axis: {
                                      stroke: "none",
                                    }}
                                  }
                                  // style={{
                                  //   axis: { stroke: colors[i] },
                                  //   ticks: { padding: tickPadding[i] },
                                  //   tickLabels: { fill: colors[i], textAnchor: anchors[i] }
                                  // }}
                                  // Use normalized tickValues (0 - 1)
                                  tickValues={TICK_VALUES}
                                  // Re-scale ticks by multiplying by correct maxima
                                  tickFormat={(t) => Math.round( t * maxFirstMig) }
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

export default BarDropDrillAboNewQual