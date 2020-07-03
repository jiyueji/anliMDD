from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'

db = SQLAlchemy(app)

@app.before_first_request
def create_tables():
    db.create_all()

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return models.RevokedTokenModel.is_jti_blacklisted(jti)

import views, models, resources

api.add_resource(resources.UserRegistration, '/registration')
api.add_resource(resources.UserDeleteByUsername, '/delete_by_username')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.UserLogoutAccess, '/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(resources.TokenRefresh, '/token/refresh')
api.add_resource(resources.AllUsers, '/users')
api.add_resource(resources.SalesFirst, '/performance_data1')
api.add_resource(resources.SalesSecond, '/performance_data2')
api.add_resource(resources.SalesSecondTT, '/performance_data2_tt')
api.add_resource(resources.SalesSecondCom, '/performance_data2_com')
api.add_resource(resources.SalesThird, '/performance_data3')
api.add_resource(resources.AboRenewalRate, '/abo_renewal_data')
api.add_resource(resources.AboPinData, '/abo_pin_data')
api.add_resource(resources.AboNonPinData, '/abo_non_pin_data')
api.add_resource(resources.AboRetentionData, '/abo_retention_data')
api.add_resource(resources.AboQualificationData, '/abo_qualification_data')

api.add_resource(resources.AboLeaderFirst, '/abo_leader_data1')

api.add_resource(resources.GrowthSust, '/growth_sust_data')
api.add_resource(resources.GrowthTable, '/growth_table_data')
api.add_resource(resources.GrowthSegSales, '/growth_seg_sales_data')
api.add_resource(resources.GrowthSegPopulation, '/growth_seg_pop_data')
api.add_resource(resources.GrowthBuyer, '/growth_buyer_data')

api.add_resource(resources.AboBonus, '/abo_bonus_data')

api.add_resource(resources.QMonthPv, '/abo_qmonth_pv_data')
api.add_resource(resources.AboMigrationTop, '/abo_mig_top_data')
api.add_resource(resources.AboMigrationBot, '/abo_mig_bot_data')

api.add_resource(resources.GarTracking1, '/gar_track1')
api.add_resource(resources.GarTracking2, '/gar_track2')
api.add_resource(resources.AboPinPop, '/abo_pin_pop_data')
api.add_resource(resources.AboNewQualification, '/abo_new_qual_data')

api.add_resource(resources.AboSaleImpact, '/abo_sal_imp_data')
api.add_resource(resources.AboRecruitmentImpact, '/abo_rec_imp_data')
api.add_resource(resources.DailySalesTable, '/daily_tab_sal_data')
api.add_resource(resources.DailyRecTable, '/daily_tab_rec_data')
# !!! new not used API
api.add_resource(resources.DailyComments, '/daily_comments_data')
api.add_resource(resources.DailySalEvents, '/daily_sal_events_data')


api.add_resource(resources.SocialRepBuyer, '/social_rep_buy_data')
api.add_resource(resources.SocialFoaProd, '/social_foa_prod_data')
api.add_resource(resources.SocialPopulation, '/social_pop_data')
api.add_resource(resources.SocialConv, '/social_conv_data')
api.add_resource(resources.SocialReferral, '/social_ref_data')
api.add_resource(resources.KeyDrivers, '/key_driver_data')

api.add_resource(resources.SocialBusImpact, '/social_bus_imp_data')
api.add_resource(resources.SocialBusImpactU35, '/social_bus_imp35_data')
api.add_resource(resources.SocialBusImpactMon, '/social_bus_impmon_data')
api.add_resource(resources.SocialEarnSegment, '/social_earn_seg_data')
api.add_resource(resources.SocialEarnDuration, '/social_earn_dur_data')
api.add_resource(resources.Social3eSales, '/social_3e_sal_data')
api.add_resource(resources.SocialEarnAttrition, '/social_earn_attr_data')
api.add_resource(resources.SocialEarnBuyLoyality, '/social_buy_loy_data')
api.add_resource(resources.SocialEarnBuyPenetration, '/social_buy_pen_data')
api.add_resource(resources.SocialProductivityFirst, '/social_prod_first_data')
api.add_resource(resources.SocialAttritionRate, '/social_attr_rate_data')
api.add_resource(resources.SocialRndPart, '/social_rnd_part_data')
api.add_resource(resources.SocialPartDist, '/social_part_dist_data')
api.add_resource(resources.SocialSopSales, '/social_sop_sal_data')

api.add_resource(resources.ManualInputs, '/manual_inputs')

api.add_resource(resources.SecretResource, '/secret')


api.add_resource(resources.AboCsiKpi, '/abo_cis_kpi_data')
api.add_resource(resources.QueryDailySalesLine2, '/query_daily_sales_line_2')

api.add_resource(resources.QueryDailySalesLine2ByMonth, '/queryDailySalesLine2ByMonth')
api.add_resource(resources.DailySalesTableByMonth, '/dailySalesTableByMonth')
api.add_resource(resources.DailyRecTableByMonth, '/dailyRecTableByMonth')
api.add_resource(resources.DailySalEventsByMonth, '/dailySalEventsByMonth')
api.add_resource(resources.DailyCommentsByMonth, '/dailyCommentsByMonth')
api.add_resource(resources.AboQualificationDataByMonth, '/aboQualificationDataByMonth')
api.add_resource(resources.AboBonusByMonth, '/aboBonusByMonth')
api.add_resource(resources.GarTracking1ByMonth, '/garTracking1ByMonth')
api.add_resource(resources.GarTracking2ByMonth, '/garTracking2ByMonth')
api.add_resource(resources.AboPinDataByMonth, '/aboPinDataByMonth')
api.add_resource(resources.AboNonPinDataByMonth, '/aboNonPinDataByMonth')
api.add_resource(resources.AboCsiKpiByMonth, '/aboCsiKpiByMonth')
api.add_resource(resources.QMonthPvByMonth, '/qMonthPvByMonth')
api.add_resource(resources.SalesSecondComByMonth, '/salesSecondComByMonth')
api.add_resource(resources.AboMigrationBotByMonth, '/aboMigrationBotByMonth')
api.add_resource(resources.GrowthTableByMonth, '/growthTableByMonth')
if __name__ == '__main__':
      app.run(host='0.0.0.0', port=80)