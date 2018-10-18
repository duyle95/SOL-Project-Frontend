// create Wrapper componenet
import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import Sider from './Sider';
import StyledHeader from './Header';

const { Content } = Layout;
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
const StyledContent = styled(Content)`
    margin: 24px 16px;
    padding: 24px;
    background: '#fff';
    min-height: 280px;

    @media ${mobileDevice} {
        min-height: calc(100vh - 110px);
    }
`;

class DashboardTemplate extends React.Component {
    render() {
        return (
            <Wrapper>
                <Layout style={{ height: '100%' }}>
                    <Sider />
                    <Layout>
                        <StyledHeader />
                        <StyledContent>
                            {this.props.children}
                        </StyledContent>
                    </Layout>
                </Layout>
            </Wrapper>
        )
    }
}

export default (DashboardTemplate);