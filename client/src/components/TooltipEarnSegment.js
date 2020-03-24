import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from 'lodash'


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

//  console.log('TOOLTDATA x y', x, y, data[x])

  const tData = data[x] || {}

  //console.log('TOOLTIP DATA: ', _.find(data.actual_sales_ly_data, {x: x}) )
  //console.log('LABEL FOR CUR MONTH', )
  const eventsData = tData.events || []
  const rowsHtml = eventsData.map((o)=>{
    return <div className="row row-data" key={o}>
      <div className="col-md-4">
          <i className="far fa-star"></i> Event
      </div>
      <div className="col-md-8 text-right">{o}</div>
    </div>
  })

  return (
    <foreignObject width="100%" height="100%" zindex={99999999}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          position: "relative",
          width: `100%`,
          maxWidth: `${width}px`,
          height: `auto`,
          // padding: `16px 18px`,
          padding: `0px 0px`,
          background: colors["Dark Gray"],
          color: colors["White"],
          border: `1px solid ${colors["Dark Gray"]}`,
          borderRadius: "3px",
          fontSize: "10px",
          // top: "10px",
          // left: "10px",
          overflow: 'visible',
          opacity: 0.8,
          zIndex: 9999999,
          transform: `translateX(${centered.x}px) translateY(${centered.y}px)`
        }}
      >


      <div className="tooltip-main">
        <div className="tooltip-header">
            <h5 className="title">{tData.monthName}</h5>
        </div>
        <div className="tooltip-body">
            {tData.actual_sales && <div className="row row-data">
                <div className="col-md-8">
                    <div className="data-title">
                        <div className="icon-title red"></div> Monthly Sales
                    </div>
                </div>
                <div className="col-md-4 text-right">{tData.actual_sales}</div>
            </div>}

            {tData.sales_forecast && <div className="row row-data">
                <div className="col-md-8">
                  <div className="data-title">
                      <div className="icon-title icon-tile-dash red">
                          <div className="dash-component"></div>
                          <div className="dash-component"></div>
                          <div className="dash-component"></div>
                          <div className="dash-component"></div>
                      </div> Sales Forecast 
                  </div>
                </div>
                <div className="col-md-4 text-right">{tData.sales_forecast}</div>
            </div>}

            <div className="row row-data">
                <div className="col-md-8">
                    <div className="data-title">
                        <div className="icon-title green"></div> Monthly Sales Last Year
                    </div>
                </div>
                <div className="col-md-4 text-right">{tData.actual_sales_ly}</div>
            </div>

        </div>
        <div className="tooltip-footer">
            {rowsHtml}
        </div>
      </div>
        
      </div>
    </foreignObject>
  );
};

// the tooltip box should be these dimensions
const chartTooltipDimensions = {
  width: 300,
  height: 250
};
// !TODO: path here parent component width and height, compare it with current component dimension
// the custom point tooltip
class TooltipEarnSegment extends Component {

  render() {
    const { x, y, pointSize } = this.props;
    const width = chartTooltipDimensions.width;
    const height = chartTooltipDimensions.height;
//console.log('HEIGHT ', height)
    const P_WIDTH = 700
    const P_HEIGHT = 300

//console.log('X Y POS ', x, y)
    let calcX = x - width / 2,
      calcY = y - (height / 2)

    if (calcX < 0) {
      calcX = 0
    }
    if (calcY < 0) {
      calcY = 0
    }
    const maxX = P_WIDTH - width
    const maxY = P_HEIGHT - height /2 - 100

//console.log('calcYcalcY', calcX, calcY, maxX, maxY)

    if (calcX > maxX) {
      calcX = maxX
    }
    if (calcY > maxY) {
      calcY = maxY
    }

    const verticalOffset = 20;
    const centered = {
      x: calcX,
      y: calcY
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

export default TooltipEarnSegment