// Create here any components that should be inside Sider
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Menu, Icon, Layout } from 'antd';

const { Sider } = Layout;
const mobileDevice = '(min-width: 320px) and (max-width: 900px)';

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
`;

const StyledSider = styled(Sider)`
    @media ${mobileDevice} {
        position: absolute !important;
        height: 100vh !important;
        z-index: 1;
    }
`;

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
`;

class CustomSider extends React.Component {
    state = {
        collapsed: false
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    renderMenuItems = () => {
        switch(this.props.auth.user.role) {
            case "admin":
                return [
                    <Menu.Item key="1">
                        <Icon type="schedule" />
                        <span>Scheduler</span>
                    </Menu.Item>,
                    <Menu.Item key="2">
                        <Icon type="form" />
                        <span>Employees' replacement</span>
                    </Menu.Item>,
                    <Menu.Item key="3">
                        <Icon type="file-text" />
                        <span>Employees'shift preference</span>
                    </Menu.Item>,
                    <Menu.Item key="4">
                        <Icon type="project" />
                        <span>Events</span>
                    </Menu.Item>
                ];
            case "basic":
                return [
                    <Menu.Item key="1">
                        <Icon type="schedule" />
                        <span>Shifts</span>
                    </Menu.Item>,
                    <Menu.Item key="2">
                        <Icon type="form" />
                        <span>Shift Replacement</span>
                    </Menu.Item>,
                    <Menu.Item key="3">
                        <Icon type="form" />
                        <span>Shift Preference</span>
                    </Menu.Item>,
                    <Menu.Item key="4">
                        <Icon type="project" />
                        <span>Events</span>
                    </Menu.Item>
                ]
            default: return [];
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
                <SiderTrigger onClick={this.toggle} collapsed={this.state.collapsed}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </SiderTrigger>
                
                <Logo collapsed={this.state.collapsed}>
                    SOL PROJECT
                </Logo>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {this.renderMenuItems()}
                </Menu>
            </StyledSider>
        )
    }
}

CustomSider.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            role: PropTypes.string
        })
    })
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(CustomSider);