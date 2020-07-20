import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Menus from "../ModifyKpi/Menus.js";
import Aaa from "../ModifyKpi/Aaa.js";

export default class Modify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArr: [
        { id: "sub1", name: "Sales Performance", item: [{ keys: 1, title: "YTD salesby city cluster" }, { keys: 2, title: "YTD Salse by FC" }] },
        { id: "sub2", name: "AGP KPI", item: [{ keys: 3, title: "Shape of the Business" }, { keys: 4, title: "Segment Trend" }, { keys: 5, title: "High PPV % of Sales" }, { keys: 6, title: "End of Month % of Sales" }] },
        { id: "sub3", name: "ABO Momentum & Goal Tracking", item: [{ keys: 7, title: "ABO force movement" }, { keys: 8, title: "First year ABO renewal rate" }, { keys: 9, title: "Monthly Q Months" }, { keys: 10, title: "YTD Q Month & PV per Q Month" }, { keys: 11, title: "Consecutive qualification rate" }, { keys: 12, title: "FAA" }, { keys: 13, title: "GAR by PIN" }, { keys: 14, title: "Monthly Income by PIN level" }, { keys: 15, title: "CSI" }, { keys: 16, title: "Prediction of Bonus Migration for Next 3 months" }] },
        { id: "sub4", name: "Customer Dynamics", item: [{ keys: 17, title: "FOA Sales" }, { keys: 18, title: "FOA Forcesize" }, { keys: 19, title: "FOA Buyer & Productivity" }, { keys: 20, title: "FOA Repeat Buyer" }, { keys: 21, title: "Referral" }, { keys: 22, title: "FOA Converted to ABO/PC" }] },
        { id: "sub5", name: "Daily Report", item: [{ keys: 23, title: "Daily Report" },] },
      ],
      id: "1",
      keys: "sub1",
    }
  }

  render() {

    const { Header, Content, Footer, Sider } = Layout;
    var { dataArr,id, keys } = this.state

    return (
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            // width="256"
            style={{
              // overflow: 'auto',
              // height: '90%',
              // position: 'fixed',
              // left: 0,
            }}
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            {/* <div className="logo" /> */}
            <Menus dataArr={dataArr} parameter={this.getParameter.bind(this)} />
          </Sider>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Aaa id={id} keys={keys} />
              </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2020-07-17 Created by Ant UED</Footer> */}
          </Layout>
        </Layout>
      </Router>
    )
  }
  getParameter(id, keys) {
    console.log(id, keys)
    this.setState({
      id,
      keys,
    })
  }
}
