import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import {Layout, Menu} from 'antd';

const { Content, Footer, Header } = Layout;
const mobileDevice = '(min-width: 320px) and (max-width: 900px)';

const Wrapper = styled.div`
    height: 100vh;

    @media ${mobileDevice} {
        min-height: calc(100vh - 50px);

        > .ant-layout {
            height: auto !important;
        }
    }
`;
const Logo = styled.div`
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);  
    margin: 16px 28px 16px 0;
    float: left;
`;
const CustomMenu = styled(Menu)`
    li:last-child {
        display: none;
    }
`

const Landing = (props) => (
    <Wrapper>
        <Layout style={{height: '100%'}}>
            <Header className="header" style={{ paddingRight: "0"}}>
                <Logo />
                <CustomMenu 
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: "right"}}
                >
                    <Menu.Item key="1" onClick={() => props.history.push('/signin')}>Sign in</Menu.Item>
                    <Menu.Item key="2" onClick={() => props.history.push('/signup')}>Sign up</Menu.Item>
                </CustomMenu>
            </Header>
            <Content style={{ background: 'lightblue', padding: 24, margin: 0, minHeight: 280 }}>
                Landing Page
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    </Wrapper>
)

export default withRouter(Landing);