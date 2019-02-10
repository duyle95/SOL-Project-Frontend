// create Wrapper componenet
import { Layout } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { signoutUser } from '../../modular/ducks/auth'
import StyledHeader from './Header'
import Sider from './Sider'

const { Content } = Layout
const mobileDevice = '(min-width: 320px) and (max-width: 900px)'
const Wrapper = styled.div`
    height: 100vh;

    @media ${mobileDevice} {
        min-height: calc(100vh - 50px);

        > .ant-layout {
            height: auto !important;
        }
    }
`
const StyledContent = styled(Content)`
    margin: 24px 16px;
    padding: 24px;
    background: '#fff';
    min-height: 280px;

    @media ${mobileDevice} {
        min-height: calc(100vh - 110px);
    }
`

class DashboardTemplate extends React.Component {
    render() {
        // TODO: store sider collapsed state in redux store
        return (
            <Wrapper>
                <Layout style={{ height: '100%' }}>
                    <Sider auth={this.props.auth} />
                    <Layout>
                        <StyledHeader signoutUser={this.props.signoutUser} />
                        <StyledContent>{this.props.children}</StyledContent>
                    </Layout>
                </Layout>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(
    mapStateToProps,
    { signoutUser }
)(DashboardTemplate)
