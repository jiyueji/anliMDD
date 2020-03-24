import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryGroup, VictoryLabel, VictoryLine } from "victory";

/**
 * QDistribution chart
 * @param {object} props 
 */
const HorizontalBar = inject('authStore')(observer((props) => {
    const title = props.title || 'STAT NAME'

    const sampleData = [
      {x: 1, y: 1800},
      {x: 2, y: 1325},
      {x: 3, y: 1500},
      {x: 4, y: 1200}
    ];

    return   <div className="sb-wrap">
      <VictoryGroup>
        <VictoryBar
          horizontal 
          style={{ data: { fill: "#2028AE" } }}
          alignment="start"
          data={sampleData}
          cornerRadius={{top: 15, bottom: 15}}
          barWidth={30}
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" }
          }}
          data={[
            { x: 1, y: 100 },
            { x: 2, y: 300 },
            { x: 3, y: 500 },
            { x: 4, y: 400 }
          ]}
        />

        {/* <VictoryAxis
            dependentAxis
            style={{ axis: {stroke: "none"} }}
        />
        <VictoryAxis
            crossAxis
            style={{ axis: {stroke: "none"} }}
        /> */}
        
      </VictoryGroup>
    </div>
}))

export default HorizontalBar
