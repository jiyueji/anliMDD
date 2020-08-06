import React, { Component, Fragment } from 'react'
import { Input, Button } from 'antd';

export default class ModifyText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remarks: "",
            oldRemarks:"",
            oldParentid:"",
            oldNmonth:"",
        }
    }

    render() {
        const { TextArea } = Input;
        var { remarks } = this.state
        return (
            <Fragment>
                <TextArea type='text' value={remarks} allowClear onChange={this.onChangeHandle.bind(this)} style={{ width: '100%', height: '100%' }} />
                {/* <textarea type='text' value={remarks} onChange={this.onChangeHandle.bind(this)} style={{width:'100%',height:'100%' }}/> */}
                <Button type="primary" style={{position:"absolute"}} className="ModifyTextButton" onClick={this.onClickHandle.bind(this)}>modify</Button>
                {/* <div className="ModifyTextButton">修改</div> */}
            </Fragment>
        )
    }
    // componentWillReceiveProps(nextProps) {
    //     // var chartRemarksRemarks = this.props.chartRemarks.remarksMonthGet.remarks
    //     var { data } = nextProps
    //     this.dataShowHandle(data)
    //     // this.dataShowHandle(data)
    // }
    shouldComponentUpdate(nextProps, nextState) {
        var {oldRemarks,oldParentid,oldNmonth} = this.state
        // console.log(oldParentid,"nextProps")
        if(oldRemarks && nextProps.data && nextProps.data.remarks == oldRemarks){
            return true
        }else if(nextProps.data && nextProps.data.remarks !== oldRemarks){
            var { data } = nextProps
            this.dataShowHandle(data)
            return true
        }else if(!nextProps.data.remarks && ((oldParentid && nextProps.parentid !== oldParentid) || (oldNmonth && nextProps.n_month !== oldNmonth))){
            var {parentid, n_month} = nextProps
            this.setState({
                remarks:"",
                oldRemarks:"",
                oldParentid:parentid,
                oldNmonth:n_month,
            })
            return true
        }else{
            return true
        }
    }
    componentDidMount() {
        // var { data } = this.props
        // this.dataShowHandle(data)
    }
    dataShowHandle(data) {
        var { remarks, } = data
        var { id, parentid, n_month} = this.props
        // console.log(data, remarks,id, parentid, n_month ,"remarks")
        this.setState({
            remarks,
            id,
            parentid,
            n_month,
            oldRemarks:remarks,
            oldParentid:parentid,
            oldNmonth:n_month,
        })
    }
    onChangeHandle(e) {//双向绑定实现输入框可读写
        this.setState({
            remarks: e.target.value
        })
    }
    onClickHandle(e) {//点击按钮时发生
        var { id, parentid, n_month, remarks } = this.state
        // console.log(remarks,"remarks")
        this.props.updateHandle(id, parentid, n_month, remarks)
    }
}