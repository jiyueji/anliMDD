import { assign } from "lodash";

export const numberWithCommas = (x) => {
  if (x === null || x === undefined) {
    return ''
  }
  let parts = x.toString().split(".");
  parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
  return parts.join(",");
}

export const numberWithDots = (x) => {
  let parts = x.toString().split(".");
  parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
  return parts.join(".");
}

const ID_TO_MONTH_MAP = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const ID_TO_MONTH_MAP_F = { 1: 'January', 2: 'February', 3:'March', 4:'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

// convert 201909 to 2019 Oct
export const yearMonthToStr = (val) => {
  const monthId = parseInt( String(val).slice(4, 6))
  return `${String(val).slice(0, 4)} ${ID_TO_MONTH_MAP[monthId]}`
}

export const yearMonthToStrNowFinsg = (val) => {
  // console.log(val)
  var monthId = parseInt( String(val).slice(4, 6))
  var yearId = parseInt( String(val).slice(0, 4))
  if(monthId > 12 && monthId < 18){
    var monthId = Number(monthId) - 12
    var yearId = Number(yearId) + 1
  }else if(monthId == 0){
    var monthId = Number(monthId) + 12
    var yearId = Number(yearId) - 1
  }else if(monthId >60){
    var monthId = Number(monthId) - 88
  }
  return `${ID_TO_MONTH_MAP[monthId]}.${String(yearId).slice(2, 4)}`
}

export const yearMonthToStrFull = (val) => {
  const monthId = parseInt( String(val).slice(4, 6))
  return `${String(val).slice(0, 4)} ${ID_TO_MONTH_MAP_F[monthId]}`
}

export const roundToMil = (val) => {
  return Math.round( val / 1000000 )
}

export const roundToThous = (val) => {
  return Math.round( val / 1000 )
}

export const toShortMil = (val) => {
  return numberWithCommas( roundToMil( val ) )
}

export const formatMilFirstDec = (val) => {
  return (Math.round(val*100)/100000000).toFixed(1)
}

export const toShortThous = (val) => {
  return numberWithCommas( roundToThous( val ) )
}

export const toPerc = (val) => {
  return `${Math.round( val * 100 )}%`
}

export const toPerc1Dec = (val) => {
  return `${Math.round( val * 1000 )/10}%`
}

export const yearToPfPref = (val) => {
  const mid = String(val).slice(2,4)
  return `PF${mid} avg`
}

export const yearToPfPref2 = (val) => {
  const mid = String(val).slice(2,4)
  return `PF${mid}`
}

// subtract month from YYYYMM
export const subtractMonth = (year_month) => {
  year_month = parseInt(year_month);
  if(year_month%100 == 1) return year_month-89;
  return String(year_month-1)
}



export const CALENDAR_YEAR_MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

export const PERFORMANCE_YEAR_MONTHS = [ 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug' ]



export const DEFAULT_FONT = "'poppins-regular-webfont'"





// chart theme section
const colors = [
  "#252525",
  "#525252",
  "#737373",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
  "#f0f0f0"
];

const charcoal = "#848485";// "#252525";
const grey = "#969696";
// *
// * Typography
// *
const sansSerif = "'poppins-regular-webfont', 'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 18;
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: "transparent"
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";

export const smallChartTheme =  {
  area: assign({
    style: {
      data: {
        fill: charcoal
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  axis: assign({
    style: {
      axis: {
        fill: "transparent",
        stroke: charcoal,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: assign({}, centeredLabelStyles, {
        padding: 25
      }),
      grid: {
        fill: "none",
        stroke: "none",
        pointerEvents: "painted"
      },
      ticks: {
        fill: "transparent",
        size: 1,
        stroke: "transparent"
      },
      tickLabels: baseLabelStyles
    }
  }, baseProps),
  bar: assign({
    style: {
      data: {
        fill: charcoal,
        padding: 8,
        strokeWidth: 0
      },
      labels: baseLabelStyles
    }
  }, baseProps),
  boxplot: assign({
    style: {
      max: { padding: 8, stroke: charcoal, strokeWidth: 1 },
      maxLabels: baseLabelStyles,
      median: { padding: 8, stroke: charcoal, strokeWidth: 1 },
      medianLabels: baseLabelStyles,
      min: { padding: 8, stroke: charcoal, strokeWidth: 1 },
      minLabels: baseLabelStyles,
      q1: { padding: 8, fill: grey },
      q1Labels: baseLabelStyles,
      q3: { padding: 8, fill: grey },
      q3Labels: baseLabelStyles
    },
    boxWidth: 20
  }, baseProps),
  candlestick: assign({
    style: {
      data: {
        stroke: charcoal,
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: "#ffffff",
      negative: charcoal
    }
  }, baseProps),
  chart: baseProps,
  errorbar: assign({
    borderWidth: 8,
    style: {
      data: {
        fill: "transparent",
        stroke: charcoal,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  group: assign({
    colorScale: colors
  }, baseProps),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 })
    }
  },
  line: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: charcoal,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: "transparent",
        strokeWidth: 1
      },
      labels: assign({}, baseLabelStyles, { padding: 20 })
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50
  },
  scatter: assign({
    style: {
      data: {
        fill: charcoal,
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  stack: assign({
    colorScale: colors
  }, baseProps),
  tooltip: {
    style: assign({}, centeredLabelStyles, { padding: 5, pointerEvents: "none", fill: "#ff0000" }),
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: assign({}, centeredLabelStyles, { padding: 5, pointerEvents: "none" }),
      flyout: {
        stroke: charcoal,
        strokeWidth: 1,
        fill: "#f0f0f0",
        pointerEvents: "none"
      }
    }
  }, baseProps)
};
