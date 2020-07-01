from flask_restful import Resource, reqparse
from models import UserModel, RevokedTokenModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

import psycopg2
from psycopg2.extras import RealDictCursor
import json

DATABASE = "dashboard"
USER = "master"
PASSWORD = "Eiunasfjn314"
HOST = "bcg-redshift-beijing-2.c1x8rz4gupte.cn-north-1.redshift.amazonaws.com.cn"
PORT = "5439"
SCHEMA = "public"


parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)

parser2 = reqparse.RequestParser()
parser2.add_argument('username', help = 'This field cannot be blank', required = True)

parser3 = reqparse.RequestParser()
parser3.add_argument('month', help = 'This field cannot be blank', required = True)

def performQuery(queryStr):
  try:
    con=psycopg2.connect(dbname= DATABASE, host=HOST, port= PORT, user= USER, password= PASSWORD)
    cur = con.cursor(cursor_factory=RealDictCursor)
    results = cur.execute(queryStr)
    return json.dumps(cur.fetchall()) #json.dumps(cur.fetchall(), indent=2)
  except (Exception, psycopg2.Error) as error :
    print ("Error while fetching data from AWS Redshift", error)
  finally:
    #closing database connection.
    if(con):
      cur.close()
      con.close()
      print("PostgreSQL connection is closed")



class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        
        if UserModel.find_by_username(data['username']):
            return {'message': 'User {} already exists'.format(data['username'])}
        
        new_user = UserModel(
            username = data['username'],
            password = UserModel.generate_hash(data['password'])
        )
        
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {
                'message': 'User {} was created'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'username': data['username']
                }
        except:
            return {'message': 'Something went wrong'}, 500

class UserDeleteByUsername(Resource):
    def post(self):
        data = parser2.parse_args()
        UserModel.delete_by_username(data['username'])
        try:
            delete_user_res = UserModel.delete_by_username(data['username'])
            return { 'res': delete_user_res }
        except:
            return {'message': 'Something went wrong'}, 500

class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['username'])}
        
        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {
                'message': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'username': data['username']
            }
        else:
            return {'message': 'Wrong credentials'}


# class UserGet(Resource):
#     def get(self):
#         data = parser.parse_args()
#         current_user = UserModel.find_by_username(data['username'])

#         if not current_user:
#             return {'message': 'User {} doesn\'t exist'.format(data['username'])}
        
#         if UserModel.verify_hash(data['password'], current_user.password):
#             access_token = create_access_token(identity = data['username'])
#             refresh_token = create_refresh_token(identity = data['username'])
#             return {
#                 'message': 'Logged in as {}'.format(current_user.username),
#                 'access_token': access_token,
#                 'refresh_token': refresh_token
#                 }
#         else:
#             return {'message': 'Wrong credentials'}


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}


class AllUsers(Resource):
    def get(self):
        return UserModel.return_all()
    
    def delete(self):
        return UserModel.delete_all()

class TestData(Resource):
    def get(self):
        return performQuery("select * from \"public\".dchen_test;")

class SalesFirst(Resource):
    def get(self):

        queryStr = '''select * from public.query_sales_1_sales_by_fc'''
        return performQuery(queryStr)

class SalesSecond(Resource):
    def get(self):

        queryStr = '''select * from query_sales_2_sales_vs_target'''
        return performQuery(queryStr)

class SalesThird(Resource):
    def get(self):

        queryStr = '''select * from public.query_sales_3_sales_by_city'''
        return performQuery(queryStr)

class SalesSecondTT(Resource):
    def get(self):

        queryStr = '''select * from public.query_sales_5_promo_calendar'''
        return performQuery(queryStr)

class SalesSecondCom(Resource):
    def get(self):

        queryStr = '''select * from public.query_sales_50_monthly_sales_comments'''
        return performQuery(queryStr)

class AboRenewalRate(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_4_firstyr_renewal'''
        return performQuery(queryStr)

class AboPinData(Resource):
    def get(self):

        queryStr = '''select * from query_abo_8_income_by_pin'''
        return performQuery(queryStr)

class AboNonPinData(Resource):
    def get(self):

        queryStr = '''select  *  from query_abo_21_nopin_income'''
        return performQuery(queryStr)

class AboRetentionData(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_6_retention'''
        return performQuery(queryStr)

class AboQualificationData(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_7_q_month'''
        return performQuery(queryStr)

class AboLeaderFirst(Resource):
    def get(self):

        queryStr = '''
            with all_month as ( 
            select distinct n_month,buyer_type from public.new_sp_gp_dd
            union
            select distinct n_month,buyer_type from public.new_sp_gp_dd_prediction
            )

            ,base as (
            SELECT a.n_month,a.buyer_type,population
            ,case when CAST(right(a.n_month,2) AS int)>=9
            then CAST(left(a.n_month,4) AS int)+1
            else CAST(left(a.n_month,4) AS int)
            end as perf_yr
            ,CAST(left(a.n_month,4) AS int) as calendar_yr
            ,CAST(right(a.n_month,2) AS int) as month
            ,case when CAST(right(a.n_month,2) AS int)=9 then 1
            when CAST(right(a.n_month,2) AS int)=10 then 2
                when CAST(right(a.n_month,2) AS int)=11 then 3
            when CAST(right(a.n_month,2) AS int)=12 then 4
            else CAST(right(a.n_month,2) AS int)+4
            end as nth_month_of_perf_yr
            FROM all_month a 
            left join public.new_sp_gp_dd b
            on a.n_month = b.n_month and a.buyer_type=b.buyer_type
            )

            ,monthly_population as (
            select calendar_yr,month,buyer_type,population 
            from base
            )

            select a.*
            ,b.population as population_ly
            ,population_prediction
            from base a 
            left join monthly_population b on a.calendar_yr-1=b.calendar_yr and a.month=b.month and a.buyer_type = b.buyer_type
            left join public.new_sp_gp_dd_prediction c on a.n_month = c.n_month and a.buyer_type = c.buyer_type
            order by a.n_month ,buyer_type
            '''
        return performQuery(queryStr)

class GrowthSust(Resource):
    def get(self):

        queryStr = '''select * from public.query_sustainability_14_highppv_eom'''
        return performQuery(queryStr)

class GrowthSegSales(Resource):
    def get(self):

        queryStr = '''select * from public.query_growth_11_sales_by_seg'''
        return performQuery(queryStr)

class GrowthSegPopulation(Resource):
    def get(self):

        queryStr = '''select * from public.query_growth_12_pop_bv_by_seg'''
        return performQuery(queryStr)

class GrowthTable(Resource):
    def get(self):

        queryStr = '''select * from public.query_agp_15_growth_summary'''
        return performQuery(queryStr)

class GrowthBuyer(Resource):
    def get(self):

        queryStr = '''select * from public.query_growth_13_pop_bv_by_seg_buyer'''
        return performQuery(queryStr)

class AboBonus(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_18_gar_pie_chart'''
        return performQuery(queryStr)

class QMonthPv(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_23_pv_per_q'''
        return performQuery(queryStr)

class AboMigrationTop(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_19_pin_migration_tree'''
        return performQuery(queryStr)

class AboMigrationBot(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_20_bns_migration_tree'''
        return performQuery(queryStr)

class GarTracking1(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_16_gar_summary'''
        return performQuery(queryStr)

class GarTracking2(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_17_gar_detail'''
        return performQuery(queryStr)

class AboPinPop(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_24_pin_distr'''
        return performQuery(queryStr)

class AboNewQualification(Resource):
    def get(self):

        queryStr = '''select * from query_abo_22_migrtn_speed'''
        return performQuery(queryStr)

class AboSaleImpact(Resource):
    def get(self):

        queryStr = '''select * from public.query_daily_27_daily_sales_line'''
        return performQuery(queryStr)

class AboRecruitmentImpact(Resource):
    def get(self):

        queryStr = '''select * from public.query_daily_28_daily_recruit_line'''
        return performQuery(queryStr)

class DailySalesTable(Resource):
    def get(self):

        queryStr = '''select * from public.query_daily_25_daily_sales'''
        return performQuery(queryStr)

class DailyRecTable(Resource):
    def get(self):

        queryStr = '''select * from dashboard.public.query_daily_26_daily_recruit'''
        return performQuery(queryStr)

class DailyComments(Resource):
    def get(self):

        queryStr = '''select * from public.query_daily_49_daily_comments'''
        return performQuery(queryStr)

class DailySalEvents(Resource):
    def get(self):

        queryStr = "select * from public.query_daily_48_promotions"
        return performQuery(queryStr)

class SocialRepBuyer(Resource):
    def get(self):

        queryStr = '''select * from public.query_foa_10_foa_repeated_buyer'''
        return performQuery(queryStr)
        
class SocialFoaProd(Resource):
    def get(self):

        queryStr = '''select * from public.query_foa_29_foa_prod'''
        return performQuery(queryStr)

class SocialPopulation(Resource):
    def get(self):

        queryStr = '''select * from public.query_foa_30_foa_new_pop_sales'''
        return performQuery(queryStr)

class SocialConv(Resource):
    def get(self):

        queryStr = '''select * from public.query_foa_31_foa_conversion'''
        return performQuery(queryStr)

class SocialReferral(Resource):
    def get(self):

        queryStr = '''select * from public.query_foa_32_foa_refer'''
        return performQuery(queryStr)

class KeyDrivers(Resource):
    def get(self):

        queryStr = '''select * from public.query_abo_47_feature_importance'''
        return performQuery(queryStr)

class SocialBusImpact(Resource):
    def get(self):

        queryStr = '''select * from query_3e_33_rc_earner_summary'''
        return performQuery(queryStr)

class SocialBusImpactU35(Resource):
    def get(self):

        queryStr = '''select * from public.query_3e_34_rc_earner_brkdn'''
        return performQuery(queryStr)

class SocialBusImpactMon(Resource):
    def get(self):

        queryStr = '''select * from public.query_3e_35_time_to_1st_income'''
        return performQuery(queryStr)

class SocialEarnSegment(Resource):
    def get(self):

        queryStr = '''select * from public.query_3e_36_rc_earner_by_seg'''
        return performQuery(queryStr)

class SocialEarnDuration(Resource):
    def get(self):

        queryStr = '''select * from public.query_3e_37_rc_earner_by_age_tenure'''
        return performQuery(queryStr)
        
class Social3eSales(Resource):
    def get(self):

        queryStr = '''select * from public.query_3e_38_3e_foa_sales'''
        return performQuery(queryStr)

class SocialEarnAttrition(Resource):
    def get(self):

        queryStr = '''select * from public.query_3e_39_1st_income_attrition'''
        return performQuery(queryStr)

class SocialEarnBuyLoyality(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_40_parti_brkdn'''
        return performQuery(queryStr)

class SocialEarnBuyPenetration(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_41_prd_penetr'''
        return performQuery(queryStr)

class SocialProductivityFirst(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_42_prod_effect'''
        return performQuery(queryStr)

class SocialAttritionRate(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_43_attrition'''
        return performQuery(queryStr)

class SocialRndPart(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_44_2nd_rnd_parti'''
        return performQuery(queryStr)

class SocialPartDist(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_45_sop_distr_type'''
        return performQuery(queryStr)

class SocialSopSales(Resource):
    def get(self):

        queryStr = '''select * from public.query_sop_46_sop_sales'''
        return performQuery(queryStr)

class ManualInputs(Resource):
    def get(self):

        queryStr = "select *  from public.manual_input"
        return performQuery(queryStr)

class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }

# 二期开发内容
class AboCsiKpi(Resource):
    def get(self):

        queryStr = "select *  from public.MD_ABO_21_CSI_KPI_M_F_V"
        return performQuery(queryStr)

class QueryDailySalesLine2(Resource):
    def get(self):

        queryStr = "select *  from public.query_daily_27_daily_type_line"
        return performQuery(queryStr)

class QueryDailySalesLine2ByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']
        
        queryStr = "select *  from qa_test.query_daily_27_daily_sales_line where " + "n_date like '" +month + "%'"
        return performQuery(queryStr)
        
class DailySalesTableByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_daily_25_daily_sales where n_date='"+month+"'"
        return performQuery(queryStr)

class DailyRecTableByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from dashboard.qa_test.query_daily_26_daily_recruit where n_date='"+month+"'"
        return performQuery(queryStr)

class DailySalEventsByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_daily_48_promotions where " + "n_month like '" +month + "%'"
        return performQuery(queryStr)

class DailyCommentsByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from dashboard.qa_test.query_daily_49_daily_comments where date='"+month+"'"
        return performQuery(queryStr)

class AboQualificationDataByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_abo_7_q_month where n_month like "+"'"+month+"%'"
        return performQuery(queryStr)

class AboBonusByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_abo_18_gar_pie_chart where update_month like "+"'"+month+"%'"
        return performQuery(queryStr)

class GarTracking1ByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_abo_16_gar_summary where update_month like "+"'"+month+"%'"
        return performQuery(queryStr)

class GarTracking2ByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_abo_17_gar_detail where update_month like "+"'"+month+"%'"
        return performQuery(queryStr)

class AboPinDataByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select * from qa_test.query_abo_8_income_by_pin where n_month like "+"'"+month+"%'"
        return performQuery(queryStr)

class AboNonPinDataByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']

        queryStr = "select  *  from qa_test.query_abo_21_nopin_income where n_month like "+"'"+month+"%'"
        return performQuery(queryStr)

class AboCsiKpiByMonth(Resource):
    def get(self):
        data = parser3.parse_args()
        month = data['month']
        
        queryStr = "select *  from public.MD_ABO_21_CSI_KPI_M_F_V where clnd_month like "+"'"+month+"%'"
        return performQuery(queryStr)