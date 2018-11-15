import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;
const mobileDevice = '(min-width: 320px) and (max-width: 900px)';

const CustomMenu = styled(Menu)`
    li:last-child {
        display: none;
    }
`
const StyledLogout = styled.span`
  @media ${mobileDevice} {
    span {
      display: none !important;
    }
  }
`;

class CustomHeader extends React.Component {
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <CustomMenu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="noti">
                        <Icon type="notification" />
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={() => this.props.signoutUser()}>
                        <StyledLogout>
                            <Icon type="poweroff" />
                            <span>Logout</span>
                        </StyledLogout>
                    </Menu.Item>
                </CustomMenu>
            </Header>
        )
    }
    
}

CustomHeader.propTypes = {
    signoutUser: PropTypes.func.isRequired
}

export default CustomHeader;