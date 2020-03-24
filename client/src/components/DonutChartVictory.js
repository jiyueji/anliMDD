
import React from 'react'
import { observer, useLocalStore } from 'mobx-react'

const DonutChart = observer((props) => {
 
  const local = useLocalStore(() => ({
    isScaled: false,
  }))

  const getRadians = (degrees) => {
    return (Math.PI/180)*(degrees-90);
  }

  const canvasRef = React.useRef(null)

  const drawChart = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    // ctx.restore();


    const degreesVal = Math.round( 360 * props.percentVal / 100 )

    const RADIUS = 40
    const CX = 70,
      CY = 50

    ctx.beginPath();
    ctx.arc(CX, CY, RADIUS, getRadians(0), getRadians(360));
    ctx.strokeStyle = 'bfc6d0';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(CX, CY, RADIUS, getRadians(0), getRadians(degreesVal));
    ctx.strokeStyle = degreesVal < 180 ? '0e2a4f' : 'green';
    ctx.lineWidth = 20; 
    ctx.stroke();



    const TEXT_OFFSET = 7;
    ctx.font = '14pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'green';
    ctx.fillText(`${props.metricVal}k`, CX, CY+TEXT_OFFSET);

  }
 
 

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const SCALE = 2

    if (!local.isScaled) {
      ctx.scale(SCALE, SCALE)
      local.isScaled = true  
    }

    drawChart( ctx, canvas )
  })
  const x=200, y=200
  return (
    <React.Fragment>
      <canvas style={{width: x, height: y}}
        ref={canvasRef}
        width={400}
        height={400}
      />
      {/* <label className="donut-clabel">54K</label> */}
    </React.Fragment>
  )
})
export default DonutChart