import { observable, computed, action, runInAction, toJS } from 'mobx'
import ApiService from '../services/ApiService'
import * as jslinq from 'jslinq'
import * as hlp from '../components/Helper'
import _ from 'lodash'

const MONTHS_MAP = { 1: 'Jan', 2: 'Feb', 3:'Mar', 4:'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const MONTHS_MAP_F = { 1: 'January', 2: 'February', 3:'March', 4:'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

class ChartStoreSocial {
    @observable isLoading = true
    @observable isFailure = false
    @observable isPerfYear = false
    @observable socialRepBuyData = []
    @observable socialFoaProdData = []
    @observable socialPopData = []
    @observable socialConvData = []
    @observable socialReferData = []

    @observable socialBusImpData = []
    @observable socialBusImp35Data = []
    @observable socialBusImpMonData = []
    @observable socialEarnSegData = []
    @observable socialEarnDurData = []
    @observable social3eSalData = []
    @observable socialEarnAttrData = []
    @observable socialBuyLoyData = []
    @observable socialBuyPenData = []
    @observable socialProdFirstData = []
    @observable socialAttrRateData = []
    @observable socialRndPartData = []
    @observable socialPartDistData = []
    @observable socialSopSalData = []

    @action async fetchSocialRepBuyData(params) {
      try {
          const data = await ApiService.get_social_repbuy_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialRepBuyData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialRepBuyData = []
          })
      }
    }

    @action async fetchSocialFoaProdData(params) {
      try {
          const data = await ApiService.get_social_foaprod_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialFoaProdData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialFoaProdData = []
          })
      }
    }

    @action async fetchSocialPopData(params) {
      try {
          const data = await ApiService.get_social_pop_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialPopData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialPopData = []
          })
      }
    }

    @action async fetchSocialConvData(params) {
      try {
          const data = await ApiService.get_social_conv_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialConvData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialConvData = []
          })
      }
    }

    @action async fetchSocialReferData(params) {
      try {
          const data = await ApiService.get_social_ref_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialReferData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialReferData = []
          })
      }
    }

    @action async fetchSocialBusImpData(params) {
      try {
          const data = await ApiService.get_social_busimp_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialBusImpData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialBusImpData = []
          })
      }
    }

    @action async fetchSocialBusImp35Data(params) {
      try {
          const data = await ApiService.get_social_busimp35_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialBusImp35Data = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialBusImp35Data = []
          })
      }
    }

    @action async fetchSocialBusImpMonData(params) {
      try {
          const data = await ApiService.get_social_busimpmon_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialBusImpMonData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialBusImpMonData = []
          })
      }
    }

    @action async fetchSocialEarnSegData(params) {
      try {
          const data = await ApiService.get_social_earnseg_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialEarnSegData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialEarnSegData = []
          })
      }
    }

    @action async fetchSocialEarnDurData(params) {
      try {
          const data = await ApiService.get_social_earndur_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialEarnDurData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialEarnDurData = []
          })
      }
    }

    @action async fetchSocial3eSalData(params) {
      try {
          const data = await ApiService.get_social_3esal_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.social3eSalData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.social3eSalData = []
          })
      }
    }

    @action async fetchSocialEarnAttrData(params) {
      try {
          const data = await ApiService.get_social_earnattr_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialEarnAttrData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialEarnAttrData = []
          })
      }
    }

    @action async fetchSocialBuyLoyData(params) {
      try {
          const data = await ApiService.get_social_buyloy_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialBuyLoyData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialBuyLoyData = []
          })
      }
    }

    @action async fetchSocialBuyPenData(params) {
      try {
          const data = await ApiService.get_social_buypen_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialBuyPenData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialBuyPenData = []
          })
      }
    }

    @action async fetchSocialProdFirstData(params) {
      try {
          const data = await ApiService.get_social_prodfirst_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialProdFirstData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialProdFirstData = []
          })
      }
    }

    @action async fetchSocialAttrRateData(params) {
      try {
          const data = await ApiService.get_social_attrrate_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialAttrRateData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialAttrRateData = []
          })
      }
    }

    @action async fetchSocialRndPartData(params) {
      try {
          const data = await ApiService.get_social_rndpart_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialRndPartData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialRndPartData = []
          })
      }
    }

    @action async fetchSocialPartDistData(params) {
      try {
          const data = await ApiService.get_social_partdist_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialPartDistData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialPartDistData = []
          })
      }
    }

    @action async fetchSocialSopSalData(params) {
      try {
          const data = await ApiService.get_social_sopsal_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.socialSopSalData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.socialSopSalData = []
          })
      }
    }

    @computed get socialRepBuy() {
      const jsArr = toJS(this.socialRepBuyData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr


      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      let num_foa_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_foa_repeated_buyers'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let num_foa_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_foa_repeated_buyers_ly'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let pct_foa_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['pct_foa_repeated_buyer'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let pct_foa_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['pct_foa_repeated_buyer_ly'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      pct_foa_data = _.map(pct_foa_data, (o)=>{
        o.y = Math.round(o.y * 100)
        return o
      })

      pct_foa_ly_data = _.map(pct_foa_ly_data, (o)=>{
        o.y = Math.round(o.y * 100)
        return o
      })


      // const months_data = _.map( dataState, (o)=>{
      //   return {
      //     x: MONTHS_MAP[o.month],
      //     y: 0,
      //     info: MONTHS_MAP[o.month]
      //   }
      // } )
      return {
        num_foa_data,
        num_foa_ly_data,
        pct_foa_data,
        pct_foa_ly_data,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get socialFoaProd() {
      const jsArr = toJS(this.socialFoaProdData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr, prevYear

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
        prevYear = maxYear-1
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      let avg_bv_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['avg_bv_per_person'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: maxYear
        }
      } ), 'rank')

      let avg_bv_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['avg_bv_per_person_ly'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: prevYear
        }
      } ), 'rank')


      const months_data = _.map( dataState, (o)=>{
        return {
          x: MONTHS_MAP[o.month],
          y: 0,
          info: MONTHS_MAP[o.month]
        }
      } )

      return {
        avg_bv_data,
        avg_bv_ly_data,
        months_data,
        maxYear: maxYear.toString(),
        prevYear: prevYear.toString(),
        isPerfYear: this.isPerfYear
      }
    }

    @computed get socialPopulation() {
      const jsArr = toJS(this.socialPopData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'


      let new_foa_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_new_foa_ly || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let new_foa_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_new_foa,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')
      
      let num_foa_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_existing_foa_ly || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let num_foa_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_existing_foa,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      // const months_data = _.map( dataState, (o)=>{
      //   return {
      //     x: MONTHS_MAP[o.month],
      //     y: 0,
      //     info: MONTHS_MAP[o.month]
      //   }
      // } )
      return {
        new_foa_data,
        new_foa_ly_data,
        num_foa_data,
        num_foa_ly_data,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get socialFoaSales() {
      const jsArr = toJS(this.socialPopData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'


      let total_3e_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_3e_sales_ly || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let total_3e_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_3e_sales,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')
      
      let total_non3e_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_non_3e_sales_ly || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let total_non3e_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_non_3e_sales || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let total_pct_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_sales_pct || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      total_pct_data = _.map(total_pct_data, (o)=>{
        o.y = Math.round(o.y * 100)
        return o
      })

      return {
        total_3e_data,
        total_3e_ly_data,
        total_non3e_data,
        total_non3e_ly_data,
        total_pct_data,
        maxYear
      }
    }

    @computed get socialConversion() {
      const jsArr = toJS(this.socialConvData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'


      let total_foa_data_ly = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_conversion_ly || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let total_foa_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.total_foa_conversion || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')
      
      let pct_foa_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.pct_foa_conversion || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      pct_foa_data = _.map(pct_foa_data, (o)=>{
        o.y = Math.round(o.y * 100)
        return o
      })

      // const months_data = _.map( dataState, (o)=>{
      //   return {
      //     x: MONTHS_MAP[o.month],
      //     y: 0,
      //     info: MONTHS_MAP[o.month]
      //   }
      // } )
      return {
        total_foa_data,
        total_foa_data_ly,
        pct_foa_data,
        isPerfYear: this.isPerfYear,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get socialReferral() {
      const jsArr = toJS(this.socialReferData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      let foa_ref_link_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_new_foa_referred_thru_link || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let foa_suc_ref_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_foa_w_success_referral || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      // const months_data = _.map( dataState, (o)=>{
      //   return {
      //     x: MONTHS_MAP[o.month],
      //     y: 0,
      //     info: MONTHS_MAP[o.month]
      //   }
      // } )
      return {
        foa_ref_link_data,
        foa_suc_ref_data,
        isPerfYear: this.isPerfYear,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get socialBusImp() {
      const jsArr = toJS(this.socialBusImpData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        maxMonthStr = dataState[0].max_n_month
      //  maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'


      let rc_only_earner_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.num_rc_only_earner || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let pct_rc_total_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.pct_rc_out_of_total || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      // const months_data = _.map( dataState, (o)=>{
      //   return {
      //     x: MONTHS_MAP[o.month],
      //     y: 0,
      //     info: MONTHS_MAP[o.month]
      //   }
      // } )
      return {
        rc_only_earner_data,
        pct_rc_total_data,
        isPerfYear: this.isPerfYear,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get socialBusImp35() {
      const jsArr = toJS(this.socialBusImp35Data) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        // maxMonthStr = dataState[0].max_n_month
        // maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      let new_abo_rc_data = _.sortBy( _.map( dataState, (o) => {
        const yVal = o['num_new_abo_rc_earner'] || null
        return {
          x: MONTHS_MAP[o.month],
          y: yVal,
          rank: o[MONTH_TYPE],
          labelTooltip: `${maxYear}: ${yVal}`
        }
      } ), 'rank')

      let num_u35_data = _.sortBy( _.map( dataState, (o) => {
        const yVal = o['num_u35_rc_earner'] || null
        return {
          x: MONTHS_MAP[o.month],
          y: yVal,
          rank: o[MONTH_TYPE],
          labelTooltip: `${maxYear}: ${yVal}`
        }
      } ), 'rank')

      let pct_new_abo_data = _.sortBy( _.map( dataState, (o) => {
        let yVal = o['pct_new_abo_rc_earner_of_total_new_abos'] || null
        yVal = yVal && Math.round(yVal * 100)
        return {
          x: MONTHS_MAP[o.month],
          y: yVal,
          rank: o[MONTH_TYPE],
          labelTooltip: `${maxYear} %New ABO RC Earner: ${yVal}%`
        }
      } ), 'rank')

      let pct_u35_abo_data = _.sortBy( _.map( dataState, (o) => {
        let yVal = o['pct_u35_abo_earning_rc'] || null
        yVal = yVal && Math.round(yVal * 100)
        return {
          x: MONTHS_MAP[o.month],
          y: yVal,
          rank: o[MONTH_TYPE],
          labelTooltip: `${maxYear} %U35 ABO RC Earner: ${yVal}%`
        }
      } ), 'rank')

      // const months_data = _.map( dataState, (o)=>{
      //   return {
      //     x: MONTHS_MAP[o.month],
      //     y: 0,
      //     info: MONTHS_MAP[o.month]
      //   }
      // } )

      return {
        new_abo_rc_data,
        num_u35_data,
        pct_new_abo_data,
        pct_u35_abo_data,
        maxYear
        // months_data: months_data,
      }
    }


    @computed get socialBusImpMon() {
      const jsArr = toJS(this.socialBusImpMonData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        // maxMonthStr = dataState[0].max_n_month
        // maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      let avg_first_in_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['avg_month_1st_income'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')


      let avg_income_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['avg_income'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')


      return {
        avg_first_in_data,
        avg_income_data,
        isPerfYear: this.isPerfYear,
        maxYear
      }
    }

    @computed get socialEarnSeg() {
      const jsArr = toJS(this.socialEarnSegData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        // maxMonthStr = dataState[0].max_n_month
        // maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'


      dataState=jslinq(dataState)
        .groupBy(function(el){
            return el.segment;
        })
        .toList()

      dataState = _.reduce(dataState, (obj,param)=>{
        obj[param.key] = param.elements
        return obj;
      }, {});

      const SEGMENTS_LIST = [
        'ABO Leader', 'Building ABO', 'Developing ABO'
      ]

      let abo_lead_data = _.sortBy( _.map( dataState[ SEGMENTS_LIST[0] ], (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `${SEGMENTS_LIST[0]}: ${o['num_rc_earner']} (${hlp.toPerc(o['pct_num_rc_earner'])})`
        }
      } ), 'rank')

      let abo_build_data = _.sortBy( _.map( dataState[ SEGMENTS_LIST[1] ], (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `${SEGMENTS_LIST[1]}: ${o['num_rc_earner']} (${hlp.toPerc(o['pct_num_rc_earner'])})`
        }
      } ), 'rank')

      let abo_dev_data = _.sortBy( _.map( dataState[ SEGMENTS_LIST[2] ], (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `${SEGMENTS_LIST[2]}: ${o['num_rc_earner']} (${hlp.toPerc(o['pct_num_rc_earner'])})`
        }
      } ), 'rank')


//       let tooltip_data = abo_lead_data.concat(abo_build_data, abo_dev_data, abo_lead_pct_data, abo_build_pct_data, abo_dev_pct_data)


//       tooltip_data=jslinq(tooltip_data)
//         .groupBy(function(el){
//             return el.x;
//         })
//         .toList()


//       tooltip_data = _.reduce(tooltip_data, (obj,param)=>{
//         obj[param.key] = param.elements
//         return obj;
//       }, {});
// console.log('tooltip_data ', tooltip_data)

      return {
        abo_lead_data,
        abo_dev_data,
        abo_build_data,
        //tooltip_data,
        isPerfYear: this.isPerfYear,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get socialEarnDur() {
      const jsArr = toJS(this.socialEarnDurData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        // maxMonthStr = dataState[0].max_n_month
        // maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'


      let numrc_within_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner_within_12mo'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `ABO < 12 Months: ${o['num_rc_earner_within_12mo']} (${hlp.toPerc(o['pct_num_rc_earner_within_12mo'])})`
        }
      } ), 'rank')

      let numrc_greater_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner_greater_12mo'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `ABO > 12 Months: ${o['num_rc_earner_greater_12mo']} (${hlp.toPerc(o['pct_num_rc_earner_greater_12mo'])})`
        }
      } ), 'rank')

      
      let numrc_a35_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner_a35'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `RC Earner A35: ${o['num_rc_earner_a35']} (${hlp.toPerc(o['pct_num_rc_earner_a35'])})`
        }
      } ), 'rank')

      let numrc_u35_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['num_rc_earner_u35'] || null,
          rank: o[MONTH_TYPE],
          labelTooltip: `RC Earner U35: ${o['num_rc_earner_u35']} (${hlp.toPerc(o['pct_num_rc_earner_u35'])})`
        }
      } ), 'rank')



      return {
        numrc_within_data,
        numrc_greater_data,
        numrc_a35_data,
        numrc_u35_data,
        isPerfYear: this.isPerfYear,
        maxYear
        // months_data: months_data,
      }
    }

    @computed get social3eSal() {
      const jsArr = toJS(this.social3eSalData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear, maxMonth, maxMonthStr

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
      if (dataState.length) {
        maxYear = dataState[0][`max_${YEAR_TYPE}`]
        // maxMonthStr = dataState[0].max_n_month
        // maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      dataState=_.filter(dataState, (o)=>{
        return o[YEAR_TYPE] === maxYear
      })

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      let sales_3e_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['sales_3e'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let foa_3e_sales_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['foa_3e_sales'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let pct_3e_sales_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['pct_3e_sales'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let pct_foa_3e_sales_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o['pct_foa_3e_sales'] || null,
          rank: o[MONTH_TYPE]
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      pct_3e_sales_data = _.map(pct_3e_sales_data, (o)=>{
        o.y = Math.round(o.y * 100)
        return o
      })

      pct_foa_3e_sales_data = _.map(pct_foa_3e_sales_data, (o)=>{
        o.y = Math.round(o.y * 100)
        return o
      })

      return {
        sales_3e_data,
        foa_3e_sales_data,
        pct_3e_sales_data,
        pct_foa_3e_sales_data,
        isPerfYear: this.isPerfYear,
        maxYear
      }
    }

    @computed get socialEarnAttr() {
      const jsArr = toJS(this.socialEarnAttrData) || 0
      if (!jsArr.length) {
        return false
      }
  
      let dataState = jsArr

      let maxYear
      if (dataState.length) {
        maxYear = dataState[0]['perf_yr']
      }

      let attrition_pct_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: o.month_gap,
          y: o.attrition_pct || null,
          rank: parseInt(o.rnk)
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

      let attrition_pct_ly_data = _.sortBy( _.map( dataState, (o) => {
        return {
          x: o.month_gap,
          y: o.attrition_pct_ly || null,
          rank: parseInt(o.rnk)
          //labelTooltip: 'Monthly sales ',
        }
      } ), 'rank')

//      const tickValues = _.map( attrition_pct_data, 'x' )
      return {
        attrition_pct_data,
        attrition_pct_ly_data,
        maxYear
  //      tickValues
      }
    }


    @computed get socialBuyLoy() {
    
        const jsArr = toJS(this.socialBuyLoyData)
        if (!jsArr.length) {
          return false
        }
  
        let dataState = jsArr
        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        let maxYear, maxMonth, maxMonthStr

        if (dataState.length) {
          maxYear = dataState[0][`max_${YEAR_TYPE}`]
          // maxMonthStr = dataState[0].max_n_month
          // maxMonth = parseInt(maxMonthStr.slice(4, 6))
        }
  
        dataState=_.filter(dataState, (o)=>{
          return o[YEAR_TYPE] === maxYear
        })
  
        const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'
          
        dataState=jslinq( dataState )
          .groupBy(function(el){
              return el.sop_code;
          })
          .toList()

        dataState = _.map(dataState, (oRt)=>{
          oRt.seg_name = oRt.key
          oRt.chartData = {}
          
          oRt.chartData.new_buyer_data = _.sortBy( _.map( oRt.elements, (o) => {
            return {
              x: MONTHS_MAP[o.month],
              y: o['num_new_buyer'] || null,
              rank: o[MONTH_TYPE],
              labelTooltip: `New Buyer: ${o['num_new_buyer']} (${hlp.toPerc(o['pct_new_buyer'])})`
            }
          } ), 'rank')

          oRt.chartData.non_loyal_buyer_data = _.sortBy( _.map( oRt.elements, (o) => {
            return {
              x: MONTHS_MAP[o.month],
              y: o['num_non_loyal_buyer'] || null,
              rank: o[MONTH_TYPE],
              labelTooltip: `Non-Loyal: ${o['num_non_loyal_buyer']} (${hlp.toPerc(o['pct_non_loyal_buyer'])})`
            }
          } ), 'rank')

          oRt.chartData.loyal_buyer_data = _.sortBy( _.map( oRt.elements, (o) => {
            return {
              x: MONTHS_MAP[o.month],
              y: o['num_loyal_buyer'] || null,
              rank: o[MONTH_TYPE],
              labelTooltip: `Loyal: ${o['num_loyal_buyer']} (${hlp.toPerc(o['pct_loyal_buyer'])})`
            }
          } ), 'rank')


          return oRt
        })
    
        return {
          segments: dataState,
          isPerfYear: this.isPerfYear,
          maxYear: maxYear
        }
      }

      @computed get socialBuyPen() {
    
        const jsArr = toJS(this.socialBuyPenData)
        if (!jsArr.length) {
          return false
        }
  
        let dataState = jsArr
        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        let maxYear, maxMonth, maxMonthStr

        if (dataState.length) {
          maxYear = dataState[0][`max_${YEAR_TYPE}`]
          // maxMonthStr = dataState[0].max_n_month
          // maxMonth = parseInt(maxMonthStr.slice(4, 6))
        }
  
        dataState=_.filter(dataState, (o)=>{
          return o[YEAR_TYPE] === maxYear
        })
  
        const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'
          


        dataState=jslinq( dataState )
          .groupBy(function(el){
              return el.product_type;
          })
          .toList()


        dataState = _.map(dataState, (oRt)=>{
          oRt.seg_name = oRt.key
          oRt.chartData = {}
          
          oRt.chartData.product_data = _.sortBy( _.map( oRt.elements, (o) => {
            return {
              x: MONTHS_MAP[o.month],
              y: o['product_penetration'] || null,
              rank: o[MONTH_TYPE],
              //labelTooltip: `New Buyer: ${o['num_new_buyer']} (${hlp.toPerc(o['pct_new_buyer'])})`
            }
          } ), 'rank')

          return oRt
        })
    
        return {
          segments: dataState,
          isPerfYear: this.isPerfYear,
          maxYear: maxYear
        }
      }

      @computed get socialProdFirst() {
    
        const jsArr = toJS(this.socialProdFirstData)
        if (!jsArr.length) {
          return false
        }
    
        let dataState = jsArr
  
        let maxYear, maxMonth, maxMonthStr
  
        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        if (dataState.length) {
          maxYear = dataState[0][`${YEAR_TYPE}`]
          maxMonthStr = dataState[0].max_month
        }
  
        dataState=_.filter(dataState, (o)=>{
          return o[YEAR_TYPE] === maxYear
        })
  
        //const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'
  
        let sales_per_buyer_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: o.month_gap,
            y: o['sales_per_buyer'] || null,
            rank: parseInt(o.mth_gap)
            //labelTooltip: `Sales per buyer: ${ Math.round(o['sales_per_buyer'])}`
          }
        } ), 'rank')

  
        return {
          sales_per_buyer_data,
          isPerfYear: this.isPerfYear,
          maxMonth: maxMonthStr,
          maxYear: maxYear
        }
      }

      @computed get socialAttrRate() {
        const jsArr = toJS(this.socialAttrRateData) || []
        if (!jsArr.length) {
          return false
        }
          
        let dataState = jsArr

        let maxYear, maxMonth, maxMonthStr

        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        if (dataState.length) {
          maxYear = dataState[0][`max_${YEAR_TYPE}`]
        //  maxMonthStr = dataState[0].max_n_month
        //  maxMonth = parseInt(maxMonthStr.slice(4, 6))
        }

        dataState=_.filter(dataState, (o)=>{
          return o[YEAR_TYPE] === maxYear
        })

        const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

        let pct_sop_attr_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o.pct_sop_attrition_rate || null,
            rank: o[MONTH_TYPE]
            //labelTooltip: 'Monthly sales ',
          }
        } ), 'rank')

        return {
          pct_sop_attr_data,
          isPerfYear: this.isPerfYear,
          maxYear
        }
      }

      @computed get socialRndPart() {
        const jsArr = toJS(this.socialRndPartData) || []
        if (!jsArr.length) {
          return false
        }
  
        let dataState = jsArr
  
        let maxYear, maxMonth

        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        if (dataState.length) {
          maxYear = dataState[0][`${YEAR_TYPE}`]
          maxMonth = dataState[0].max_month
        }

        let rnd_part_data = _.map( dataState, (o) => {
          return {
            x: o.program,
            y: o.pct_2nd_rnd_sop_continuation || null
          }
        } )
  
        return {
          rnd_part_data,
          maxYear,
          maxMonth
        }
      }

      @computed get socialPartDist() {
        const jsArr = toJS(this.socialPartDistData) || 0
        if (!jsArr.length) {
          return false
        }
    
        let dataState = jsArr
  
        let maxYear, maxMonth, maxMonthStr
  
        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        if (dataState.length) {
          maxYear = dataState[0][`max_${YEAR_TYPE}`]
          maxMonthStr = dataState[0].max_n_month
          maxMonth = parseInt(maxMonthStr.slice(4, 6))
        }
  
        dataState=_.filter(dataState, (o)=>{
          return o[YEAR_TYPE] === maxYear
        })
  
        const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'
  
  
        let num_abo_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o.num_sop_abo || null,
            rank: o[MONTH_TYPE]
          }
        } ), 'rank')
  
        let num_pc_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o.num_sop_pc,
            rank: o[MONTH_TYPE]
          }
        } ), 'rank')
        
        let num_foa_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o.num_sop_foa || null,
            rank: o[MONTH_TYPE]
          }
        } ), 'rank')
  
        // const months_data = _.map( dataState, (o)=>{
        //   return {
        //     x: MONTHS_MAP[o.month],
        //     y: 0,
        //     info: MONTHS_MAP[o.month]
        //   }
        // } )
        return {
          num_abo_data,
          num_pc_data,
          num_foa_data,
          maxYear
          // months_data: months_data,
        }
      }

      @computed get socialSopSal() {
        const jsArr = toJS(this.socialSopSalData) || 0
        if (!jsArr.length) {
          return false
        }
    
        let dataState = jsArr
  
        let maxYear, maxMonth, maxMonthStr
  
        const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'
        if (dataState.length) {
          maxYear = dataState[0][`max_${YEAR_TYPE}`]
          // maxMonthStr = dataState[0].max_n_month
          // maxMonth = parseInt(maxMonthStr.slice(4, 6))
        }
  
        dataState=_.filter(dataState, (o)=>{
          return o[YEAR_TYPE] === maxYear
        })
  
        const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'
  
        let sop_sales_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o['sop_sales'] || null,
            rank: o[MONTH_TYPE]
            //labelTooltip: 'Monthly sales ',
          }
        } ), 'rank')
  
  
        let sop_of_total_data = _.sortBy( _.map( dataState, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o['sop_sales_of_total_sales'] || null,
            rank: o[MONTH_TYPE]
            //labelTooltip: 'Monthly sales ',
          }
        } ), 'rank')
  
        sop_of_total_data = _.map(sop_of_total_data, (o)=>{
          o.y = Math.round(o.y * 100)
          return o
        })
  
        return {
          sop_sales_data,
          sop_of_total_data,
          isPerfYear: this.isPerfYear,
          maxYear
        }
      }
      

  }

  export default new ChartStoreSocial()
  export { ChartStoreSocial }