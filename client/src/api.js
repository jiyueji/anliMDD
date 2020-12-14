const AUTH = '/rest-auth'
const API = '/api'

const api = {
    login: '/login',
    logout: '/logout/access',  
    verify_token: AUTH + '/token-verify/',
    sign_up: '/registration',
    users: API + '/users/',
    user: API + '/user',
    current_user: API + '/current_user/',
    search: API + '/search/',
    performance_data1: '/performance_data1',
    performance_data2: '/performance_data2',
    performance_data2_tt: '/performance_data2_tt',
    performance_data2_com: '/performance_data2_com',
    performance_data3: '/performance_data3',
    abo_renewal_data: '/abo_renewal_data',
    abo_pin_data: '/abo_pin_data',
    abo_non_pin_data: '/abo_non_pin_data',
    abo_retention_data: '/abo_retention_data',
    abo_qualification_data: '/abo_qualification_data',
    abo_newqual_data: '/abo_new_qual_data',
    abo_leader_data1: '/abo_leader_data1',
    growth_sust_data: '/growth_sust_data',
    growth_sales_seg_data: '/growth_seg_sales_data',
    growth_pop_seg_data: '/growth_seg_pop_data',
    growth_buyer_data: '/growth_buyer_data',
    growth_table_data: '/growth_table_data',
    abo_bonus_data: '/abo_bonus_data',
    abo_qmonth_pv_data: '/abo_qmonth_pv_data',
    abo_gar1_data: '/gar_track1',
    abo_gar2_data: '/gar_track2',
    abo_migtop_data: '/abo_mig_top_data',
    abo_migbot_data: '/abo_mig_bot_data',
    abo_pinpop_data: '/abo_pin_pop_data',
    daily_sales_data: '/abo_sal_imp_data',
    daily_rec_data: '/abo_rec_imp_data',
    daily_tab_sal_data: '/daily_tab_sal_data',
    daily_tab_rec_data: '/daily_tab_rec_data',
    daily_comments_data: '/daily_comments_data',
    daily_sal_events_data: '/daily_sal_events_data',
    social_rep_buy_data: '/social_rep_buy_data',
    social_foa_prod_data: '/social_foa_prod_data',
    social_pop_data: '/social_pop_data',
    social_conv_data: '/social_conv_data',
    social_ref_data: '/social_ref_data',
    key_driver_data: '/key_driver_data',
    social_bus_imp_data: '/social_bus_imp_data',
    social_bus_imp35_data: '/social_bus_imp35_data',
    social_bus_impmon_data: '/social_bus_impmon_data',
    social_earn_seg_data: '/social_earn_seg_data',
    social_earn_dur_data: '/social_earn_dur_data',
    social_3e_sal_data: '/social_3e_sal_data',
    social_earn_attr_data: '/social_earn_attr_data',
    social_buy_loy_data: '/social_buy_loy_data',
    social_buy_pen_data: '/social_buy_pen_data',
    social_prod_first_data: '/social_prod_first_data',
    social_attr_rate_data: '/social_attr_rate_data',
    social_rnd_part_data: '/social_rnd_part_data',
    social_part_dist_data: '/social_part_dist_data',
    social_sop_sal_data: '/social_sop_sal_data',
    manual_inputs: '/manual_inputs',
//二期开发内容
    abo_cis_kpi_data:'/abo_cis_kpi_data',
    query_daily_sales_line_2:'/query_daily_sales_line_2',
    queryDailySalesLine2ByMonth:'/queryDailySalesLine2ByMonth',//get请求发送月份获取第五屏折线图的历史数据
    dailySalesTableByMonth:'/dailySalesTableByMonth',//
    dailyRecTableByMonth:'/dailyRecTableByMonth',
    dailySalEventsByMonth:'/dailySalEventsByMonth',
    dailyCommentsByMonth:'/dailyCommentsByMonth',
    aboQualificationDataByMonth:'/aboQualificationDataByMonth',
    aboBonusByMonth:'/aboBonusByMonth',
    garTracking1ByMonth:'/garTracking1ByMonth',
    garTracking2ByMonth:'/garTracking2ByMonth',
    aboPinDataByMonth:'/aboPinDataByMonth',
    aboNonPinDataByMonth:'/aboNonPinDataByMonth',
    aboCsiKpiByMonth:'/aboCsiKpiByMonth',
    qMonthPvByMonth:'/qMonthPvByMonth',
    salesSecondComByMonth:'/salesSecondComByMonth',//一屏四图
    growthTableByMonth:'/growthTableByMonth',//二屏表格
    aboMigrationBotByMonth:'/aboMigrationBotByMonth',//三屏鱼骨
    aboRenewalRateByMonth:'/aboRenewalRateByMonth',//三屏二图
    updateRemarks:'/updateRemarks',//更新备注
    remarksMonth:'/remarksMonth',//读取备注
    social_foa_prod_data_new:'/social_foa_prod_data_new',//第四屏新加数据表格内容
    social_pop_data_new:'/social_pop_data_new',
    social_rep_buy_data_new:'/social_rep_buy_data_new',
    social_ref_data_new:'/social_ref_data_new',
    social_conv_data_new:'/social_conv_data_new',
    query_user:"/query_user",//匹配用户名
}

export default api
