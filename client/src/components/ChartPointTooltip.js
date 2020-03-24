import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from 'lodash'

// victory
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryTooltip,
  VictoryContainer,
  VictoryScatter,
  VictoryGroup,
  Flyout
} from "victory";

const colors = {
  "Light Gray": "#e7e7e7",
  "70Black": "#7e8385",
  "40Black": "#b5b8b9",
  "50Black": "#a3a6a8",
  "Green Highlight": "#00ba8b",
  "80 HGreen": "#33c8a2",
  "20 HGreen": "#ccf1e8",
  Blue: "#3190e9",
  "Dark Gray": "#474e51",
  "10Black": "#ededee",
  "5Black": "#f6f6f6",
  "30Black": "#c8cacb",
  "80Black": "#171a1c",
  White: "#ffffff",
  Black: "#171a1c",
  "20Black": "#dadcdc",
  Orange: "#ff5c38",
  Red: "#ff3838",
  "40 HGreen": "#99e3d1",
  Green: "#00946a",
  "80Green": "#33a988",
  "60Green": "#66bfa6",
  "40Green": "#99d4c3",
  "20Green": "#cceae1",
  "60Black": "#919597"
};


const CustomSVGTooltip = props => {
  const { width, centered, data, x, y, labelTooltip, info} = props;

  console.log('TOOLTIP DATA: ', _.find(data.actual_sales_ly_data, {x: x}) )
  //console.log('LABEL FOR CUR MONTH', )

  return (
    <foreignObject width="100%" height="100%" zindex={99999999}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          position: "relative",
          width: `100%`,
          maxWidth: `${width}px`,
          height: `auto`,
          padding: `16px 18px`,
          background: colors["Dark Gray"],
          color: colors["White"],
          border: `1px solid ${colors["Dark Gray"]}`,
          borderRadius: "3px",
          fontSize: "14px",
          top: "10px",
          left: "10px",
          zIndex: 9999999,
          transform: `translateX(${centered.x}px) translateY(${centered.y}px)`
        }}
      >
        <header style={{ margin: "0 0 12px" }}>{y}</header>
        <p style={{ fontSize: "10px" }}>
          <strong>Balance: </strong>
          {labelTooltip}<br/>
          {x}
        </p>
      </div>
    </foreignObject>
  );
};

// the tooltip box should be these dimensions
const chartTooltipDimensions = {
  width: 160,
  height: 165
};

// the custom point tooltip
class ChartPointTooltip extends Component {

  render() {
    const { x, y, pointSize } = this.props;

console.log('this.props ', this.props)

    const width = chartTooltipDimensions.width;
    const height = chartTooltipDimensions.height;
    const verticalOffset = 20;
    const centered = {
      x: x - width / 2,
      y: y - (height / 2)
    };

    return (
      <CustomSVGTooltip
        width={width}
        height={height}
        centered={centered}
        data={this.props.data}
        {...this.props.datum}
      />

    );
  }
}

export default ChartPointTooltip