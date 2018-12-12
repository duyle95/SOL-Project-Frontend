import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { authInitialize } from '../../modular/ducks/auth'
import PreferenceList from '../../pages/Admin/PreferenceList'
import PreferenceReply from '../../pages/Admin/PreferenceReply'
// Pages import
import AdminReplacementReply from '../../pages/Admin/ReplacementReply'
import Landing from '../../pages/App/Landing'
import Signin from '../../pages/App/Signin'
import Signup from '../../pages/App/Signup'
import PreferenceDetail from '../../pages/Basic/PreferenceDetail'
import PreferenceForm from '../../pages/Basic/PreferenceForm'
import BasicReplacementEdit from '../../pages/Basic/ReplacementEdit'
import ReplacementForm from '../../pages/Basic/ReplacementForm'
import Dashboard from '../../pages/Dashboard'
import ReplacementList from '../../pages/shared/ReplacementList'
// other imports
import history from '../../services/history'
import Authorization from '../Authorization'
import redirectToDashboard from '../RedirectToDashboard'

// setup roles
const Admin = Authorization(['admin'])
const Basic = Authorization(['basic'])
const User = Authorization(['admin', 'basic'])
// TODO: check if we can put our DashboardTemplate here
class App extends Component {
    componentDidMount() {
        this.props.authInitialize()
    }
    render() {
        return (
            <BrowserRouter>
                <Router history={history}>
                    <Layout>
                        <Route
                            exact
                            path="/"
                            component={redirectToDashboard(Landing)}
                        />
                        <Route
                            path="/signin"
                            component={redirectToDashboard(Signin)}
                        />
                        <Route
                            path="/signup"
                            component={redirectToDashboard(Signup)}
                        />

                        <Route path="/dashboard" component={User(Dashboard)} />
                        <Route
                            path="/admin/replacement/all"
                            component={Admin(ReplacementList)}
                        />
                        <Route
                            path="/admin/replacement/edit"
                            component={Admin(AdminReplacementReply)}
                        />
                        <Route
                            path="/admin/preference/all"
                            component={Admin(PreferenceList)}
                        />
                        <Route
                            path="/admin/preference/edit"
                            component={Admin(PreferenceReply)}
                        />
                        <Route
                            path="/basic/replacement/new"
                            component={Basic(ReplacementForm)}
                        />
                        <Route
                            path="/basic/replacement/all"
                            component={Basic(ReplacementList)}
                        />
                        <Route
                            path="/basic/replacement/edit"
                            component={Basic(BasicReplacementEdit)}
                        />
                        <Route
                            path="/basic/preference/new"
                            component={Basic(PreferenceForm)}
                        />
                        <Route
                            path="/basic/preference/detail"
                            component={Basic(PreferenceDetail)}
                        />
                    </Layout>
                </Router>
            </BrowserRouter>
        )
    }
}

export default connect(
    null,
    { authInitialize }
)(App)
