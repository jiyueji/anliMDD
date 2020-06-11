import { observable, computed, action, runInAction, toJS } from 'mobx'
import ApiService from '../services/ApiService'
import * as jslinq from 'jslinq'
import _ from 'lodash'
import * as hlp from '../components/Helper'
import dLib from 'date-and-time'

const MONTHS_MAP = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const MONTHS_MAP_F = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

class ChartStoreDaily {
  @observable isLoading = true
  @observable isFailure = false
  @observable isPerfYear = false
  @observable isFiveDatePicker = ""//第五屏的时间选择
  @observable dailySalesData = []
  @observable dailyRecData = []
  @observable dailyTableSalData = []
  @observable dailyTableRecData = []
  @observable manualInputsData = []
  @observable dailyCommentsData = []
  @observable dailySalEventsData = []
  @observable queryDailySalesLine = []

  @observable queryDailySalesLine2ByMonth = []
  @observable dailySalesTableByMonth = []
  @observable dailyRecTableByMonth = []
  @observable dailySalEventsByMonth = []
  @observable dailyCommentsByMonth = []

  @action async fetchGetQueryDailyCommentsByMonth(params,send) {
    try {
      const data = await ApiService.get_dailyCommentsByMonth(params,send)
      runInAction(() => {
        this.isLoading = false
        this.dailyCommentsByMonth = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyCommentsByMonth = []
      })
    }
  }

  @action async fetchGetQueryDailySalEventsByMonth(params,send) {
    try {
      const data = await ApiService.get_dailySalEventsByMonth(params,send)
      runInAction(() => {
        this.isLoading = false
        this.dailySalEventsByMonth = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailySalEventsByMonth = []
      })
    }
  }

  @action async fetchGetQueryDailyRecTableByMonth(params,send) {
    try {
      const data = await ApiService.get_dailyRecTableByMonth(params,send)
      runInAction(() => {
        this.isLoading = false
        this.dailyRecTableByMonth = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyRecTableByMonth = []
      })
    }
  }

  @action async fetchGetQueryDailySalesTableByMonth(params,send) {
    try {
      const data = await ApiService.get_dailySalesTableByMonth(params,send)
      runInAction(() => {
        this.isLoading = false
        this.dailySalesTableByMonth = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailySalesTableByMonth = []
      })
    }
  }

  @action async fetchGetQueryQueryDailySalesLine2ByMonth(params,send) {
    try {
      const data = await ApiService.get_queryDailySalesLine2ByMonth(params,send)
      runInAction(() => {
        this.isLoading = false
        this.queryDailySalesLine2ByMonth = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.queryDailySalesLine2ByMonth = []
      })
    }
  }

  @action async fetchGetQueryDailySalesLine(params) {
    try {
      const data = await ApiService.get_query_daily_sales_line_2(params)
      runInAction(() => {
        this.isLoading = false
        this.queryDailySalesLine = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.queryDailySalesLine = []
      })
    }
  }

  @action async fetchManualInputsData(params) {
    try {
      const data = await ApiService.get_manual_inputs(params)
      runInAction(() => {
        this.isLoading = false
        this.manualInputsData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.manualInputsData = []
      })
    }
  }

  @action async fetchDailySalesData(params) {
    try {
      const data = await ApiService.get_daily_sales_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailySalesData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailySalesData = []
      })
    }
  }

  @action async fetchDailyRecData(params) {
    try {
      const data = await ApiService.get_daily_rec_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailyRecData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyRecData = []
      })
    }
  }

  @action async fetchDailyTableSalData(params) {
    try {
      const data = await ApiService.get_daily_tab_sal_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailyTableSalData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyTableSalData = []
      })
    }
  }

  @action async fetchDailyTableRecData(params) {
    try {
      const data = await ApiService.get_daily_tab_rec_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailyTableRecData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyTableRecData = []
      })
    }
  }

  @action async fetchDailyTableRecData(params) {
    try {
      const data = await ApiService.get_daily_tab_rec_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailyTableRecData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyTableRecData = []
      })
    }
  }

  @action async fetchDailyCommentsData(params) {
    try {
      const data = await ApiService.get_daily_com_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailyCommentsData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailyCommentsData = []
      })
    }
  }

  @action async fetchDailySalEventsData(params) {
    try {
      const data = await ApiService.get_daily_salevents_data(params)
      runInAction(() => {
        this.isLoading = false
        this.dailySalEventsData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.dailySalEventsData = []
      })
    }
  }


  @computed get queryDailySalesLineHandle() {

    const jsArr = toJS(this.queryDailySalesLine2ByMonth) || [] //新接口
    // const jsArr = toJS(this.queryDailySalesLine) || []//旧的
    const jsArr2 = toJS(this.dailySalEventsData) || []

    if (!jsArr.length || !jsArr2.length) {
      return false
    }

    // console.log(this.isFiveDatePicker)

    let dataState = jsArr
    let dataStateCom = jsArr2

    // var isFiveDatePickerLine = this.isFiveDatePicker.slice(0,6)
    let maxYear, maxMonth, maxMonthStr = 0, maxYearStr, prevYearStr

    if (dataState.length) {
      dataState.map((item, index) => {
        var maxMonthStrIf = item.n_month
        maxMonthStr = this.isFiveDatePicker ? this.isFiveDatePicker.slice(0,6) : maxMonthStr > maxMonthStrIf ? maxMonthStr : maxMonthStrIf
      })
      // maxMonthStr = dataState[0].n_month
      maxYear = parseInt(maxMonthStr.slice(0, 4))
      maxMonth = parseInt(maxMonthStr.slice(4, 6))
      maxYearStr = maxYear.toString()
      prevYearStr = (maxYear - 1).toString()
    }

    // add n_date_ly for each data element
    dataState = _.map(dataState, (o) => {
      o.n_date_ly = String(parseInt(o.n_date) - 10000)
      return o
    })
    dataStateCom = _.map(dataStateCom, (o) => {
      o.isPrevYear = String(o.start_day).indexOf(prevYearStr) === 0
      return o
    })

    let dataStateComLy = _.filter(dataStateCom, o => o.isPrevYear)
    dataStateCom = _.filter(dataStateCom, o => !o.isPrevYear)

    dataStateComLy = jslinq(dataStateComLy)
      .groupBy(function (el) {
        return el['start_day'];
      })
      .toList()

    dataStateCom = jslinq(dataStateCom)
      .groupBy(function (el) {
        return el['start_day'];
      })
      .toList()

    dataStateComLy = _.reduce(dataStateComLy, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataStateCom = _.reduce(dataStateCom, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});


    // add current year or last year events to data
    var sales_data = []
    var sales_ly_data = []
    dataState.map((o, index) => {
      if (o.n_month == maxMonthStr) {
        const ttObj = dataStateCom[o['n_date']]
        let tooltipPref = ttObj && (ttObj[0]['activity'] + ':\n' + ttObj[0]['promotion_desc']) || ''
        tooltipPref = `\n${tooltipPref}\n`
        let labelToolTip = maxYearStr + ' - ' + hlp.toShortMil(o.sales) + 'm' + tooltipPref
        var sales_data_obj = {
          x: o.day,
          y: o.sales,
          type: o.type,
          labelTooltip: labelToolTip //maxYearStr
        }
        sales_data.push(sales_data_obj)

        const ttObj_ly = dataStateComLy[o['n_date_ly']]
        let tooltipPref_ly = ttObj_ly && (ttObj_ly[0]['activity'] + ':\n' + ttObj_ly[0]['promotion_desc']) || ''
        tooltipPref_ly = `\n${tooltipPref_ly}\n`
        let labelToolTip_ly = prevYearStr + ' - ' + hlp.toShortMil(o.sales_ly) + 'm' + tooltipPref_ly
        var sales_ly_data_obj = {
          x: o.day,
          y: o.sales_ly,
          type: o.type,
          labelTooltip: labelToolTip_ly//prevYearStr
        }
        sales_ly_data.push(sales_ly_data_obj)
      }
    })

    // let sales_data = _.map(dataState, (o) => {
    //   if (o.n_month == maxMonthStr) {
    //     // const ttObj = dataStateCom[o['n_date']]
    //     // let tooltipPref = ttObj && (ttObj[0]['activity'] + ':\n' + ttObj[0]['promotion_desc']) || ''
    //     // tooltipPref = `\n${tooltipPref}\n`
    //     // let labelToolTip = maxYearStr + ' - ' + hlp.toShortMil(o.sales) + 'm' + tooltipPref
    //     return {
    //       x: o.day,
    //       y: o.sales,
    //       type: o.type,
    //       // labelTooltip: labelToolTip //maxYearStr
    //     }
    //   }
    // })

    // console.log(maxMonthStr,"maxMonthStr")
    // console.log(dataState,sales_data,sales_ly_data)

    // let sales_ly_data = _.map(dataState, (o) => {
    //   if (o.n_month == maxMonthStr) {
    //     const ttObj = dataStateComLy[o['n_date_ly']]
    //     let tooltipPref = ttObj && (ttObj[0]['activity'] + ':\n' + ttObj[0]['promotion_desc']) || ''
    //     tooltipPref = `\n${tooltipPref}\n`
    //     let labelToolTip = prevYearStr + ' - ' + hlp.toShortMil(o.sales_ly) + 'm' + tooltipPref
    //     return {
    //       x: o.day,
    //       y: o.sales_ly,
    //       type: o.type,
    //       labelTooltip: labelToolTip//prevYearStr
    //     }
    //   }
    // })

    // const months_data = _.map( dataState, (o)=>{
    //   return {
    //     x: MONTHS_MAP[o.month],
    //     y: 0,
    //     info: MONTHS_MAP[o.month]
    //   }
    // } )
    var pageUpDate = 0

    sales_data.map((item, index) => {//根据数据的多少算出日期
      if (item.type && item.type == "NET_SALES" && item.y) {
        pageUpDate++
      }
    })
    if(pageUpDate < 10){//给日期补0
      pageUpDate = "0" + pageUpDate
    }
    // var pageUpShowDate = hlp.yearMonthFiveTooltipToStr(maxMonth) + "." + pageUpDate + " " + maxYearStr
    var pageUpShowDate = this.isFiveDatePicker ? hlp.yearMonthFiveTooltipToStr(maxMonth) + "." + this.isFiveDatePicker.slice(6, 8) + " " + maxYearStr : hlp.yearMonthFiveTooltipToStr(maxMonth) + "." + pageUpDate + " " + maxYearStr
    var dateChangeOld = this.isFiveDatePicker ? maxYear + "/" + maxMonthStr.slice(4, 6) + "/" + this.isFiveDatePicker.slice(6, 8) : maxYear + "/" + maxMonthStr.slice(4, 6) + "/" + pageUpDate
    return {
      sales_data,
      sales_ly_data,
      maxYearStr,
      prevYearStr,
      maxMonth,
      pageUpDate,
      pageUpShowDate,
      dateChangeOld,
      // months_data: months_data,
    }
    // const jsArr = toJS(this.queryDailySalesLine) || 0
    // if (!jsArr.length) {
    //   return false
    // }

    // let dataState = jsArr
    // dataState = _.reduce(dataState, (obj,param)=>{
    //   obj[param.input_type] = param.input_text
    //   return obj;
    // }, {});

    // return dataState
  }



  @computed get dailySales() {
    const jsArr = toJS(this.dailySalesData) || []
    const jsArr2 = toJS(this.dailySalEventsData) || []

    if (!jsArr.length || !jsArr2.length) {
      return false
    }

    let dataState = jsArr
    let dataStateCom = jsArr2

    let maxYear, maxMonth, maxMonthStr, maxYearStr, prevYearStr
    // console.log(dataState,"1")
    if (dataState.length) {
      maxMonthStr = dataState[0].n_month
      maxYear = parseInt(maxMonthStr.slice(0, 4))
      maxMonth = parseInt(maxMonthStr.slice(4, 6))
      maxYearStr = maxYear.toString()
      prevYearStr = (maxYear - 1).toString()
    }

    // add n_date_ly for each data element
    dataState = _.map(dataState, (o) => {
      o.n_date_ly = String(parseInt(o.n_date) - 10000)
      return o
    })
    // console.log(dataState,"2")
    dataStateCom = _.map(dataStateCom, (o) => {
      o.isPrevYear = String(o.start_day).indexOf(prevYearStr) === 0
      return o
    })


    let dataStateComLy = _.filter(dataStateCom, o => o.isPrevYear)
    dataStateCom = _.filter(dataStateCom, o => !o.isPrevYear)

    dataStateComLy = jslinq(dataStateComLy)
      .groupBy(function (el) {
        return el['start_day'];
      })
      .toList()

    dataStateCom = jslinq(dataStateCom)
      .groupBy(function (el) {
        return el['start_day'];
      })
      .toList()


    dataStateComLy = _.reduce(dataStateComLy, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataStateCom = _.reduce(dataStateCom, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    // add current year or last year events to data
    let sales_data = _.map(dataState, (o) => {
      const ttObj = dataStateCom[o['n_date']]
      let tooltipPref = ttObj && (ttObj[0]['activity'] + ':\n' + ttObj[0]['promotion_desc']) || ''
      tooltipPref = `\n${tooltipPref}\n`
      let labelToolTip = maxYearStr + ' - ' + hlp.toShortMil(o.sales) + 'm' + tooltipPref
      return {
        x: o.day,
        y: o.sales,
        labelTooltip: labelToolTip //maxYearStr
      }
    })

    let sales_ly_data = _.map(dataState, (o) => {
      const ttObj = dataStateComLy[o['n_date_ly']]
      let tooltipPref = ttObj && (ttObj[0]['activity'] + ':\n' + ttObj[0]['promotion_desc']) || ''
      tooltipPref = `\n${tooltipPref}\n`
      let labelToolTip = prevYearStr + ' - ' + hlp.toShortMil(o.sales_ly) + 'm' + tooltipPref
      return {
        x: o.day,
        y: o.sales_ly,
        labelTooltip: labelToolTip//prevYearStr
      }
    })

    // const months_data = _.map( dataState, (o)=>{
    //   return {
    //     x: MONTHS_MAP[o.month],
    //     y: 0,
    //     info: MONTHS_MAP[o.month]
    //   }
    // } )

    return {
      sales_data,
      sales_ly_data,
      maxYearStr,
      prevYearStr,
      maxMonth
      // months_data: months_data,
    }
  }

  @computed get dailyRecruit() {
    const jsArr = toJS(this.dailyRecData) || 0
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    let maxYear, maxMonth, maxMonthStr, maxYearStr, prevYearStr

    if (dataState.length) {
      maxMonthStr = dataState[0].n_month
      maxYear = parseInt(dataState[0].n_month.slice(0, 4))
      maxMonth = parseInt(dataState[0].n_month.slice(4, 6))
      maxYearStr = maxYear.toString()
      prevYearStr = (maxYear - 1).toString()
    }

    let num_recruitment_data = _.map(dataState, (o) => {
      return {
        x: o.day,
        y: o.num_recruitment,
        labelTooltip: maxYearStr
      }
    })

    let num_recruitment_ly_data = _.map(dataState, (o) => {
      return {
        x: o.day,
        y: o.num_recruitment_ly,
        labelTooltip: prevYearStr
      }
    })

    // const months_data = _.map( dataState, (o)=>{
    //   return {
    //     x: MONTHS_MAP[o.month],
    //     y: 0,
    //     info: MONTHS_MAP[o.month]
    //   }
    // } )
    return {
      num_recruitment_data,
      num_recruitment_ly_data,
      maxYearStr,
      prevYearStr,
      maxMonth
      // months_data: months_data,
    }
  }

  @computed get dailyTableSales() {
    // const jsArr = toJS(this.dailyTableSalData) || 0
    const jsArr = this.isFiveDatePicker ? toJS(this.dailySalesTableByMonth) || 0 : toJS(this.dailyTableSalData) || 0
    if (!jsArr.length) {
      return false
    }

    const ROWS_ORDER_MAP = {
      'Net Sales': 1,
      'ACCL': 2,
      '3E': 3,
      'ECOM': 4,
      'Order BV Sales': 5
    }
    // console.log(jsArr,"11")
    let dataState = _.sortBy(jsArr, (o) => {
      return ROWS_ORDER_MAP[o.agg_type]
    })

    let maxDateStr, maxDateTitle,
      maxDateRaw, maxDMin1, maxDMin2

    const getSubtitleDate = (dateStr) => {
      const maxMonth = parseInt(dateStr.slice(4, 6))
      const maxDay = parseInt(dateStr.slice(6, 8))
      return `${maxMonth}/${maxDay}`
    }

    if (dataState.length) {
      maxDateStr = dataState[0].n_date
      maxDateTitle = getSubtitleDate(maxDateStr)
      maxDateRaw = dLib.parse(maxDateStr, 'YYYYMMDD')

      maxDMin1 = dLib.format(dLib.addDays(maxDateRaw, -1), 'YYYYMMDD')
      maxDMin2 = dLib.format(dLib.addDays(maxDateRaw, -2), 'YYYYMMDD')

      maxDMin1 = getSubtitleDate(maxDMin1)
      maxDMin2 = getSubtitleDate(maxDMin2)
    }

    return {
      tableData: dataState,
      maxDateTitle: maxDateTitle,
      maxDMin1,
      maxDMin2
    }
  }

  @computed get dailyTableRecruit() {
    // const jsArr = toJS(this.dailyTableRecData) || 0
    const jsArr = this.isFiveDatePicker ? toJS(this.dailyRecTableByMonth) || 0 : toJS(this.dailyTableRecData) || 0
    if (!jsArr.length) {
      return false
    }

    const ROWS_ORDER_MAP = {
      'Recruitment': 1,
      'ABO': 2,
      'PC': 3,
      'FOA': 4,
      'Buyer Counts': 5,
      'ABO buyer count': 6,
      'PC buyer count': 7,
      'FOA buyer count': 8
    }

    let dataState = _.sortBy(jsArr, (o) => {
      return ROWS_ORDER_MAP[o.type]
    })

    let maxDateStr, maxDateTitle,
      maxDateRaw, maxDMin1, maxDMin2

    const getSubtitleDate = (dateStr) => {
      const maxMonth = parseInt(dateStr.slice(4, 6))
      const maxDay = parseInt(dateStr.slice(6, 8))
      return `${maxMonth}/${maxDay}`
    }
    // console.log(dataState)
    if (dataState.length) {
      maxDateStr = dataState[0].n_date
      maxDateTitle = getSubtitleDate(maxDateStr)
      maxDateRaw = dLib.parse(maxDateStr, 'YYYYMMDD')

      maxDMin1 = dLib.format(dLib.addDays(maxDateRaw, -1), 'YYYYMMDD')
      maxDMin2 = dLib.format(dLib.addDays(maxDateRaw, -2), 'YYYYMMDD')

      maxDMin1 = getSubtitleDate(maxDMin1)
      maxDMin2 = getSubtitleDate(maxDMin2)
    }

    return {
      tableData: dataState,
      maxDateTitle: maxDateTitle,
      maxDMin1,
      maxDMin2
    }
  }

  @computed get dailySalesEvents() {
    // const jsArr = toJS(this.dailySalEventsData) || []
    const jsArr = toJS(this.dailySalEventsByMonth) || []  //新接口
    
    if (!jsArr.length) {
      return false
    }
    // console.log(jsArr,"jsArr")
    const dataState = _.map(jsArr, (o) => {
      o.start_day = dLib.format(dLib.parse(o.start_day, 'YYYYMMDD'), 'MMM. DD YYYY')
      return o
    })
    return { tableData: dataState }
  }

  @computed get manualInputs() {
    const jsArr = toJS(this.manualInputsData) || 0
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.input_type] = param.input_text
      return obj;
    }, {});

    return dataState
  }

  @computed get dailyComments() {
    // const jsArr = toJS(this.dailyCommentsData) || []
    const jsArr = this.isFiveDatePicker ? toJS(this.dailyCommentsByMonth) || [] : toJS(this.dailyCommentsData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr
    const maxDateRaw = dataState.length && dataState[0].date || 0
    const maxMonth = parseInt(maxDateRaw)
    const maxDate = dLib.parse(maxDateRaw, 'YYYYMMDD')
    const maxDateStr = dLib.format(maxDate, 'MMM.DD YYYY')

    dataState = _.sortBy(dataState, (o) => parseInt(o.order_row));
    dataState = _.map(dataState, 'comment_row')
    return {
      tableData: dataState,
      maxMonth: maxMonth,
      maxDate: maxDateStr
    }
  }


}

export default new ChartStoreDaily()
export { ChartStoreDaily }