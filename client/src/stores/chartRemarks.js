import { observable, computed, action, runInAction, toJS } from 'mobx'
import ApiService from '../services/ApiService'
import * as jslinq from 'jslinq'
import * as hlp from '../components/Helper'
import _ from 'lodash'

class chartRemarks {
  @observable modifyLoading = true
  @observable updateShowFlag = false
  @observable isLoading = true
  @observable isFailure = false

  //全数据接口
  @observable remarksMonthDate = []
  @observable updateRemarksDate = []

  @action async fetchRemarksMonth(params,parentid, id,n_month) {
    try {
      this.modifyLoading = true
      const data = await ApiService.get_remarksMonth(params, parentid,id,  n_month)
      runInAction(() => {
        this.isLoading = false
        this.modifyLoading = false
        this.updateShowFlag = true
        this.remarksMonthDate = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.remarksMonthDate = []
      })
    }
  }

  @action async fetchUpdateRemarks(params,parentid, id,  n_month, remarks) {
    try {
      this.modifyLoading = true
      const data = await ApiService.get_updateRemarks(params,parentid, id,  n_month, remarks)
      runInAction(() => {
        this.isLoading = false
        this.modifyLoading = false
        this.updateShowFlag = false
        this.updateRemarksDate = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.updateRemarksDate = []
      })
    }
  }

  @computed get remarksMonthGet() {
    const jsArr = toJS(this.remarksMonthDate) || []
    // if (!jsArr.length) {
    //   return false
    // }
    var dataState = {
      remarks : jsArr[0] && jsArr[0].remarks || "",
      id : jsArr[0] && jsArr[0].id || "",
      parentid : jsArr[0] && jsArr[0].parentid || "",
      n_month : jsArr[0] && jsArr[0].n_month || "",
    }
    // console.log(jsArr,"jsArr")
    // id: "sub1", parentid: "YTD_Salse_by_FC", n_month: "202006", remarks: "text two"
    // const remarks = jsArr[0] && jsArr[0].remarks
    // const id = jsArr[0] && jsArr[0].id
    // const parentid = jsArr[0] && jsArr[0].parentid
    // const n_month = jsArr[0] && jsArr[0].n_month
    return {
      // remarks,
      // id,
      // parentid,
      // n_month,
      dataState,
      modifyLoading: this.modifyLoading,
      updateShowFlag:this.updateShowFlag,
    }
  }
  @computed get loadingHandle() {
    return {
      modifyLoading: this.modifyLoading,
    }
  }
}

export default new chartRemarks()
export { chartRemarks }