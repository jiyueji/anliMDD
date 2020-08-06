import React, { Component } from 'react'
import { Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default class Menus extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4','sub5'];

    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    handleClick = e => {
        // console.log('click ', e);
        var id = e.keyPath[1] || "sub1"
        var keys = e.keyPath[0] || "1"
        this.props.parameter(id,keys)
    };

    render() {
        var { dataArr } = this.props
        return (
            <Menu
                // onClick={this.handleClick}
                onClick={this.handleClick.bind(this)}
                // style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
            >
                {
                    dataArr.map((item, index) => 
                        <SubMenu
                            key={item.id}
                            title={
                                <span>
                                    <span>{item.name}</span>
                                </span>
                            }
                        >
                            {
                                item.item.map((items,indexs) => 
                                    <Menu.Item key={items.keys}>{items.title}</Menu.Item>
                                )
                            }
                        </SubMenu>
                    )
                }
            </Menu>
        );
    }
}
