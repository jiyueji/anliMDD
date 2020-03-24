import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboBarLineEcharts extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>CSI</div>
                <div id="aboBarLineEcharts" style={{ width: "100%", height: "400px" }}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data;

        this.setState({
            
        },()=>{
            this.aboBarLineEchartsHandle()
        })

    }
    aboBarLineEchartsHandle() {
        //页面自适应
        var aboBarLineEchartsWidth = document.getElementById('aboBarLineEcharts')
        aboBarLineEchartsWidth.style.width = (window.innerWidth * 0.32) + "px"

        var aboBarLineEcharts = echarts.init(document.getElementById('aboBarLineEcharts'));
        window.addEventListener('resize', function () {
            aboBarLineEcharts.resize()
        });
        aboBarLineEcharts.setOption({

        })
    }
}