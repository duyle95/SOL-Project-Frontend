import { Icon, Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'

const { Sider } = Layout
const { SubMenu } = Menu
const mobileDevice = '(min-width: 320px) and (max-width: 900px)'

const Logo = styled.div`
    height: 32px;
    line-height: 32px;
    margin: 14px;
    margin-left: 30px;
    font-variant: small-caps;
    font-family: arial;
    font-size: 22px;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
`

const StyledSider = styled(Sider)`
    @media ${mobileDevice} {
        position: fixed !important;
        height: 100vh !important;
        z-index: 2;
    }
`

const SiderTrigger = styled.div`
    position: absolute;
    top: 65px;
    right: -32px;
    width: 36px;
    font-size: 18px;
    background: #001529;
    color: white;
    padding: 5px;
    text-align: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    display: inline-block;
`

class CustomSider extends React.Component {
    state = {
        collapsed: false,
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    renderMenuItems = () => {
        switch (this.props.auth.user.role) {
            case 'admin':
                return [
                    // <Menu.Item key="1">
                    //     <Icon type="schedule" />
                    //     <span>Scheduler</span>
                    // </Menu.Item>,
                    <Menu.Item
                        key="2"
                        onClick={() =>
                            this.props.history.push('/admin/replacement/all')
                        }
                    >
                        <Icon type="form" />
                        <span>Employees' replacement</span>
                    </Menu.Item>,
                    <Menu.Item
                        key="3"
                        onClick={() =>
                            this.props.history.push('/admin/preference/all')
                        }
                    >
                        <Icon type="file-text" />
                        <span>Employees' shift preference</span>
                    </Menu.Item>,
                    // <Menu.Item key="4">
                    //     <Icon type="project" />
                    //     <span>Events</span>
                    // </Menu.Item>,
                ]
            // https://github.com/ant-design/ant-design/issues/6576#issuecomment-398355506
            case 'basic':
                return [
                    // <Menu.Item key="1">
                    //     <Icon type="schedule" />
                    //     <span>Shifts</span>
                    // </Menu.Item>,
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="form" />
                                <span>Shift Replacement</span>
                            </span>
                        }
                    >
                        <Menu.Item
                            key="2"
                            onClick={() =>
                                this.props.history.push(
                                    '/basic/replacement/new'
                                )
                            }
                        >
                            Fill in Replacement Form
                        </Menu.Item>
                        <Menu.Item
                            key="3"
                            onClick={() =>
                                this.props.history.push(
                                    '/basic/replacement/all'
                                )
                            }
                        >
                            Your replacement requests
                        </Menu.Item>
                    </SubMenu>,
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="form" />
                                <span>Shift Preference</span>
                            </span>
                        }
                    >
                        <Menu.Item
                            key="4"
                            onClick={() =>
                                this.props.history.push('/basic/preference/new')
                            }
                        >
                            Change your shift preference
                        </Menu.Item>
                        <Menu.Item
                            key="5"
                            onClick={() =>
                                this.props.history.push(
                                    '/basic/preference/detail'
                                )
                            }
                        >
                            Your current shift preference
                        </Menu.Item>
                    </SubMenu>,
                    // <Menu.Item key="6">
                    //     <Icon type="project" />
                    //     <span>Events</span>
                    // </Menu.Item>,
                ]
            default:
                return []
        }
    }

    render() {
        return (
            <StyledSider
                collapsedWidth={0}
                trigger={null}
                width={250}
                collapsed={this.state.collapsed}
            >
                <SiderTrigger
                    onClick={this.toggle}
                    collapsed={this.state.collapsed}
                >
                    <Icon
                        type={
                            this.state.collapsed ? 'menu-unfold' : 'menu-fold'
                        }
                    />
                </SiderTrigger>

                <Logo
                    collapsed={this.state.collapsed}
                    onClick={() => this.props.history.push('/dashboard')}
                >
                    SOL PROJECT
                </Logo>
                <Menu theme="dark" mode="inline">
                    {this.renderMenuItems()}
                </Menu>
            </StyledSider>
        )
    }
}

CustomSider.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            role: PropTypes.string,
        }),
    }),
}

export default withRouter(CustomSider)
