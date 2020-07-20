import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
//import * as numeral from 'numeral'
import * as hlp from './Helper'


const DonutChart = observer((props) => {
  // console.log(props)
  const local = useLocalStore(() => ({
    isScaled: false,
  }))


  const getRadians = (degrees) => {
    return (Math.PI/180)*(degrees-90);
  }

  const canvasRef = React.useRef(null)
  const canvasRef2 = React.useRef(null)

  let percentVal1, percentVal2, totalSales, title
  if (props.data) {
    percentVal1 = props.data['percentVal']
    percentVal2 = props.data['percentVal2']
    totalSales = props.data['totalSales']
    title = props.data['title']
    // console.log(props.data,"props.data")
  }

  if(props.dataFalg){
    var dataFalg = props.dataFalg.isPerfYear
  }

  if (totalSales) {
    totalSales =  hlp.toShortMil( totalSales )+'m'
  }

  const drawChart = (ctx, canvas, percentVal, centerText,flag) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    // ctx.restore();

//    const MAIN_COLOR = props.isMonth ? '#EC3260' : '#64CF6C'
    const degreesVal = Math.round( 360 * percentVal / 100 )

    const RADIUS = 40
    const CX = 47,
      CY = 60

    ctx.beginPath();
    ctx.arc(CX, CY, RADIUS, getRadians(0), getRadians(360));
    // ctx.strokeStyle = '#E6E6ED';
    ctx.strokeStyle = '#f4f4f4';
    ctx.lineWidth = 9;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(CX, CY, RADIUS, getRadians(0), getRadians(degreesVal));
    const MAX_RED_VAL = 99.99
    // console.log(flag)
    if(flag){
      if(props.isMonth){
        ctx.strokeStyle = percentVal < MAX_RED_VAL ? '#559aec' : '#64CF6C'; 
      }else{
        ctx.strokeStyle = percentVal < MAX_RED_VAL ? '#ff9c46' : '#64CF6C'; 
      }
    }else{
      if(props.isMonth){
        ctx.strokeStyle = percentVal < MAX_RED_VAL ? '#b2e0f5' : '#64CF6C'; 
      }else{
        ctx.strokeStyle = percentVal < MAX_RED_VAL ? '#fee3b7' : '#64CF6C'; 
      }
    }
    // ctx.strokeStyle = percentVal < MAX_RED_VAL ? '#EC3260' : '#64CF6C';  

    ctx.lineWidth = 9; 
    ctx.stroke();



    const TEXT_OFFSET = 12;
    ctx.font = '13pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff' // MAIN_COLOR //'#3366CC';
    ctx.fillText(`${percentVal}%\n`, CX+3, CY);
    ctx.font = '10pt Calibri';
    ctx.fillText(centerText, CX, CY+TEXT_OFFSET);
  }
 
 

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const SCALE = 2

    const canvas2 = canvasRef2.current
    const ctx2 = canvas2.getContext('2d')

    if (!local.isScaled) {
      ctx.scale(SCALE, SCALE)
      ctx2.scale(SCALE, SCALE)
      local.isScaled = true  
    }

    drawChart( ctx, canvas, percentVal1, 'on target',false)
    drawChart( ctx2, canvas2, percentVal2, 'on SPLY' ,true)
  })
  const x=100, y=135
  return (
    <React.Fragment>
      <div className="row align-items-center" style={{paddingLeft:"50px"}}>
          {
            props.isMonth ? "" : <label className="st-card-tl-sub-dn">{dataFalg ? 'By Performance Year' : 'By Calendar Year'}</label>
          }
          <div className="col-lg-5 col-md-5" style={{marginTop:'22px'}}>
              {/* {props.isMonth ? 'donut-tl-month' : 'donut-tl-year'}>  */}
              <h4 className="donut-tl-month"> 
                {props.isMonth ? 'Current Month Sales' : 'YTD Sales'}
                <label className="st-card-tl-sub">{title}</label>
              </h4>
            
              <div className="block-value text-blue font-weight-bold">
                  ${totalSales}
              </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <canvas style={{width: x, height: y,paddingTop:'10px'}}
                ref={canvasRef}
                width={200}
                height={250}
              />
          </div>
          <div className="col-lg-4 col-md-4">
            <canvas style={{width: x, height: y,paddingTop:'10px'}}
                ref={canvasRef2}
                width={200}
                height={250}
              />
          </div>
      </div>

    </React.Fragment>
  )
})
export default DonutChart