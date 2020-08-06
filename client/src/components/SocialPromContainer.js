//第四个页面
import React from "react";

import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import _ from 'lodash'

import BarChartSocialProm from './BarChartSocialProm'
import BarChartSocialPop from './BarChartSocialPop'
import BarSocialFoaSales from './BarSocialFoaSales'
import BarChartSocialConv from './BarChartSocialConv'
import BarChartSocialRef from './BarChartSocialRef'
import LineChartFoaProd from './LineChartFoaProd'
import BarSocialBusImp from './BarSocialBusImp'
import LineSocialBusImp from './LineSocialBusImp'
import BarSocialBusImp35 from './BarSocialBusImp35'
import BarSocialBusImpMon from './BarSocialBusImpMon'
import BarSocialEarnSeg from './BarSocialEarnSeg'
import BarSocialEarnDur from "./BarSocialEarnDur"
import BarSocialEarnAge from "./BarSocialEarnAge"
import BarSocial3eSal from './BarSocial3eSal'
import BarSocial3eSal2 from './BarSocial3eSal2'
import LineSocialEarnAttr from './LineSocialEarnAttr'
import BarDropDrillBuyLoy from './BarDropDrillBuyLoy'
import LineDropDrillBuyPen from "./LineDropDrillBuyPen"
import BarSocialProdFirst from './BarSocialProdFirst'
import LineSocialAttrRate from './LineSocialAttrRate'
import BarSocialRndPart from './BarSocialRndPart'
import BarSocialPartDist from './BarSocialPartDist'
import FoaSalesLineBar from '../SocialProFour/FoaSalesLineBar'
import FoaForcesize from '../SocialProFour/FoaForcesize'
import FoaBuyerProductivity from '../SocialProFour/FoaBuyerProductivity'
import FoaRepeat from '../SocialProFour/FoaRepeat'
import FoaReferral from '../SocialProFour/FoaReferral'
import FoaConvertedToAbo from '../SocialProFour/FoaConvertedToAbo'



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'


@inject('chartStoreSocial') @observer
class SocialPromContainer extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const chartStoreSocial = this.props.chartStoreSocial
    //console.log('socialBuyPen', chartStoreSocial.socialBuyPen)

    return (
      <div>

        <div className="page-block" style={{paddingBottom:"10px"}}>
          <label className="tab-cont-title">
            FOA
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="SocialLeftCss">
              {/* 柱状加折线 */}
              <FoaSalesLineBar data={chartStoreSocial.socialFoaSales} />
            </div>
            <div className="SocialRightCss">
              {/* 弯曲柱状 */}
              <FoaForcesize data={chartStoreSocial.socialFoaSales} />
            </div>
          </div>
          <label className="tab-cont-title">
            Buyer & Repeat Buyer
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="SocialLeftCss">
              {/* 两个柱状重叠加折线 */}
              <FoaBuyerProductivity datas={chartStoreSocial.socialFoaProd} data={chartStoreSocial.socialFoaSales}/>
            </div>
            <div className="SocialRightCss">
              {/* 弯曲柱状加折线 */}
              <FoaRepeat data={chartStoreSocial.socialRepBuy} />
            </div>
          </div>
          <label className="tab-cont-title">
            Referral
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="SocialLeftCss">
              {/* 两个柱状图 */}
              <FoaReferral data={chartStoreSocial.socialReferral} />
            </div>
            <div className="SocialRightCss">
              {/* 最后一个弯曲柱状加折线 */}
              <FoaConvertedToAbo data={chartStoreSocial.socialConversion} />
            </div>
          </div>
        </div >


        {/* <div className="page-block">
          <label className="tab-cont-title">
            FOA
          </label>
          <Row>
            <Col>
              <div className="sb-wrap-sm">
                <BarChartSocialPop data={chartStoreSocial.socialPopulation}/>
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col>
              <div className="sb-wrap-sm">
                <BarChartSocialProm data={chartStoreSocial.socialRepBuy}/>
              </div>
            </Col>
            <Col>
              <div className="sb-wrap-sm">
                <LineChartFoaProd data={chartStoreSocial.socialFoaProd}/>
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col>
              <div className="sb-wrap-sm">
                <BarSocialFoaSales data={chartStoreSocial.socialFoaSales}/>
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col>
              <div className="sb-wrap-sm">
                <BarChartSocialConv data={chartStoreSocial.socialConversion}/>
              </div>
            </Col>
            <Col> */}
        {/* <div className="sb-wrap-sm">
                <LineChartFoaProd data={chartStoreSocial.socialFoaProd}/>
              </div>
            </Col>
          </Row>

        </div >

      <div className="page-block">
        <label className="tab-cont-title">
          Referral
          </label>
        <Row>
          <Col>
            <div className="sb-wrap-sm">
              <BarChartSocialRef data={chartStoreSocial.socialReferral}
                dataPropName={'foa_ref_link_data'}
                title={'# of New FOA buyers referred by FOA through sharing linkage'} />
            </div>
          </Col>
          <Col>
            <div className="sb-wrap-sm">
              <BarChartSocialRef data={chartStoreSocial.socialReferral}
                dataPropName={'foa_suc_ref_data'}
                title={'# of FOA who referred other FOA successfully'} />
            </div>
          </Col>
        </Row>
      </div>


      <div className="page-block">
        <label className="tab-cont-title">
          3E : Business
          </label>
        <Row>
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialBusImp data={chartStoreSocial.socialBusImp}
                dataPropName={'rc_only_earner_data'}
                title={'RC-Only Earners By Month'} />
            </div>
          </Col>
          <Col>
            <div className="sb-wrap-sm">
              <LineSocialBusImp data={chartStoreSocial.socialBusImp}
                title={'RC Earner of Total Income Earner'} lineDataName={'pct_rc_total_data'} />
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialBusImp35 data={chartStoreSocial.socialBusImp35}
                dataPropNames={['new_abo_rc_data', 'pct_new_abo_data']}
                title={'Number of New ABO RC Earner'}
                legendTitle={'%New ABO RC Earner'}
                botComments={'New ABO : New sig-up ABO in rolling 12 months'} />
            </div>
          </Col>
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialBusImp35 data={chartStoreSocial.socialBusImp35}
                dataPropNames={['num_u35_data', 'pct_u35_abo_data']}
                title={'Number of U35 ABO RC Earner'}
                legendTitle={'%U35 ABO RC Earner'}
                botComments={'% New ABO RC Earner：New ABO RC earner count / Total New ABO count '} />
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialBusImpMon data={chartStoreSocial.socialBusImpMon}
                dataPropNames={['avg_first_in_data', 'avg_income_data']}
                title={'1st Income Earner Speed'}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="page-block">
        <label className="tab-cont-title">
          3E : Improvement
          </label>
        <Row>
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialEarnSeg data={chartStoreSocial.socialEarnSeg}
                title={'RC Earners by Segment'} />
            </div>
          </Col>
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialEarnDur data={chartStoreSocial.socialEarnDur}
                title={'RC Earners by Seniority'} />
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialEarnAge data={chartStoreSocial.socialEarnDur}
                title={'RC Earner by Age Group'} />
            </div>
          </Col>
        </Row>
      </div>

      <div className="page-block">
        <label className="tab-cont-title">
          3E : Overview
          </label>
        <Row>
          <Col>
            <div className="sb-wrap-sm">
              <BarSocial3eSal data={chartStoreSocial.social3eSal}
                dataPropNames={['sales_3e_data', 'pct_3e_sales_data']}
                title={'3E Sales'}
              />
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="sb-wrap-sm">
              <BarSocial3eSal2 data={chartStoreSocial.social3eSal}
                dataPropNames={['foa_3e_sales_data', 'pct_foa_3e_sales_data']}
                title={'3E Sales($)'}
              />
            </div>
          </Col>
          <Col>
            <div className="sb-wrap-sm">
              <LineSocialEarnAttr data={chartStoreSocial.socialEarnAttr}
                title={'1st Time Income Earner Monthly Attrition%'} />
            </div>
          </Col>
        </Row>
      </div>

      <div className="page-block">
        <label className="tab-cont-title">
          SOP : Business Impact
            </label>
        <Row>
          <Col>
            <BarDropDrillBuyLoy data={chartStoreSocial.socialBuyLoy} />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <LineDropDrillBuyPen data={chartStoreSocial.socialBuyPen} />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialProdFirst data={chartStoreSocial.socialProdFirst}
                title={'Productivity after First SOP Participation'} />
            </div>
          </Col>
        </Row>
      </div>

      <div className="page-block">
        <label className="tab-cont-title">
          SOP : Improvement
            </label>
        <Row>
          <Col>
            <div className="sb-wrap-sm">
              <LineSocialAttrRate data={chartStoreSocial.socialAttrRate}
                title={'SOP Attrition Rate'}
                lineDataName={'pct_sop_attr_data'} />
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="sb-wrap-sm">
              <BarSocialRndPart data={chartStoreSocial.socialRndPart} />
            </div>
          </Col>
          <Col>
            {/* <div className="sb-wrap-sm">
              </div> */}
        {/* </Col>
        </Row>
      <Row className="pt-4">
        <Col>
          <div className="sb-wrap-sm">
            <BarSocial3eSal data={chartStoreSocial.socialSopSal}
              dataPropNames={['sop_sales_data', 'sop_of_total_data']}
              title={'SOP Sales'}
              customColors={["#EEBC3A", "#59B961"]}
              legendsText={['SOP Sales', 'SOP Sales of Total Sales']}
            />
          </div>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <div className="sb-wrap-sm">
            <BarSocialPartDist data={chartStoreSocial.socialPartDist} />
          </div>
        </Col>
      </Row> */}
      </div >
    );
  }
}

export default SocialPromContainer;