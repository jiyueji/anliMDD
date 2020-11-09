import React, { Component, Fragment } from 'react'
import { Input, Button } from 'antd';
import E from 'wangeditor'

export default class ModifyText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',//富文本编辑器
            oldRemarks: "",
            oldParentid: "",
            oldNmonth: "",
        }
    }

    render() {
        const { TextArea } = Input;
        var { editorContent } = this.state
        return (
            <Fragment>
                {/* <TextArea type='text' value={editorContent} allowClear onChange={this.onChangeHandle.bind(this)} style={{ width: '100%', height: '100%' }} /> */}
                {/* <textarea type='text' value={editorContent} onChange={this.onChangeHandle.bind(this)} style={{width:'100%',height:'100%' }}/> */}
                <div className="text-area" >
                    <div ref="editorElemMenu"
                        style={{ backgroundColor: '#f1f1f1', border: "1px solid #ccc" }}
                        className="editorElem-menu">
                    </div>
                    <div
                        style={{
                            padding: "0 10px",
                            overflowY: "scroll",
                            height: 300,
                            border: "1px solid #ccc",
                            borderTop: "none"
                        }}
                        ref="editorElemBody" className="editorElem-body">

                    </div>
                </div>
                <Button type="primary" style={{ position: "absolute", zIndex: "101" }} className="ModifyTextButton" onClick={this.onClickHandle.bind(this)}>modify</Button>
                {/* <div className="ModifyTextButton">修改</div> */}
            </Fragment>

        )
    }
    componentWillReceiveProps(nextProps) {
        // var chartRemarksRemarks = this.props.chartRemarks.remarksMonthGet.remarks
        var { data } = nextProps
        this.dataShowHandle(data)
        // this.dataShowHandle(data)
    }

    componentDidMount() {
        var elemMenu = this.refs.editorElemMenu;
        var elemBody = this.refs.editorElemBody;
        var editor = new E(elemMenu, elemBody)
        editor.customConfig.pasteTextHandle = function (content) {// 自定义处理粘贴的文本内容
            // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
            if (content == '' && !content) return ''
            let str = content;
            //处理的标签里的多余代码
            str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '');
            str = str.replace('/(\\n|\\r| class=(")?Mso[a-zA-Z]+(")?)/g', '');
            let reg = new RegExp('<!--(.*?)-->', 'g')
            str = str.replace(reg, '');
            //str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
            //str = str.replace(/<\/?[^>]*>/g, '')
            // str = str.replace(/[ | ]*\n/g, '\n')
            // str = str.replace(/&nbsp;/ig, '')
            // console.log('富文本的content', JSON.parse(JSON.stringify(content)))
            // console.log('****str修改后的content str', str)
            return str
        }
        editor.customConfig.pasteFilterStyle = false// 关闭粘贴内容中的样式
        editor.customConfig.onchange = html => {        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
            // console.log(this.state.editorContent,"this.state.editorContent")
            // console.log(editor.txt.html(), "editor.txt.html()")
            this.setState({
                editorContent: editor.txt.html()
            })
        }
        editor.customConfig.zIndex = 100

        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            // 'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            // 'quote',  // 引用
            // 'emoticon',  // 表情
            // 'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            // 'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
        this.editor = editor
    }
    dataShowHandle(data) {
        var { remarks, } = data
        var { id, parentid, n_month } = this.props
        // var editorElem_body = document.getElementsByClassName("editorElem-body")[0]
        // console.log(editorElem_body)
        // editorElem_body.innerHTML = remarks
        var remarksStr = remarks
        // console.log(remarks,"remarks")
        if (remarks) {
            // 对base64转编码
            var remarksDecode = atob(remarks);
            // 编码转字符串
            var remarksStr = decodeURI(remarksDecode);
        }
        this.editor.txt.html(remarksStr)//html 初始化内容remarks,
        this.setState({
            // editorContent:remarks,
            id,
            parentid,
            n_month,
            // oldRemarks: editorContent,
            // oldParentid: parentid,
            // oldNmonth: n_month,
        })
    }
    // onChangeHandle(e) {//双向绑定实现输入框可读写
    //     this.setState({
    //         editorContent: e.target.value
    //     })
    // }
    onClickHandle(e) {//点击按钮时发生
        var { id, parentid, n_month, editorContent } = this.state
        var reg = /\<p\>\<br\>\<\/p\>/g;
        editorContent = editorContent.replace(reg, '');
        //字符串转base64
        var editorContentEncode = encodeURI(editorContent);
        // 对编码的字符串转化base64
        var editorContentBase64 = btoa(editorContentEncode);
        // console.log(editorContentBase64, "editorContentBase64")
        this.props.updateHandle(id, parentid, n_month, editorContentBase64)
    }
}






    // shouldComponentUpdate(nextProps, nextState) {//之前对数据的处理
    //     console.log("2222")
    //     var {oldRemarks,oldParentid,oldNmonth} = this.state
    //     // console.log(oldParentid,"nextProps")
    //     if(oldRemarks && nextProps.data && nextProps.data.editorContent == oldRemarks){
    //         return true
    //     }else if(nextProps.data && nextProps.data.editorContent !== oldRemarks){
    //         var { data } = nextProps
    //         this.dataShowHandle(data)
    //         return true
    //     }else if(!nextProps.data.editorContent && ((oldParentid && nextProps.parentid !== oldParentid) || (oldNmonth && nextProps.n_month !== oldNmonth))){
    //         var {parentid, n_month} = nextProps
    //         this.setState({
    //             editorContent:"",
    //             oldRemarks:"",
    //             oldParentid:parentid,
    //             oldNmonth:n_month,
    //         })
    //         return true
    //     }else{
    //         return true
    //     }
    // }