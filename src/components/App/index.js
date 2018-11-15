import React, { Component } from 'react'
import { Router } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'

// import { authInitialize } from '../../actions/auth';
import { authInitialize } from '../../modular/ducks/auth'
import history from '../../services/history'

import Landing from '../../pages/App/Landing'
import Signin from '../../pages/App/Signin'
import Signup from '../../pages/App/Signup'
import Dashboard from '../../pages/Dashboard'
import ReplacementForm from '../../pages/Basic/ReplacementForm'
// import BasicReplacementList from '../../pages/Basic/ReplacementList';
import ReplacementList from '../../pages/shared/ReplacementList'
import BasicReplacementEdit from '../../pages/Basic/ReplacementEdit'
// import AdminReplacementList from '../../pages/Admin/ReplacementList';
import AdminReplacementReply from '../../pages/Admin/ReplacementReply'

import redirectToDashboard from '../RedirectToDashboard'
import Authorization from '../Authorization'

import 'antd/dist/antd.css'

// setup roles
const Admin = Authorization(['admin'])
const Basic = Authorization(['basic'])
const User = Authorization(['admin', 'basic'])

class App extends Component {
  componentDidMount() {
    this.props.authInitialize()
  }
  render() {
    return (
      <BrowserRouter>
        <Router history={history}>
          <Layout>
            <Route exact path="/" component={redirectToDashboard(Landing)} />
            <Route path="/signin" component={redirectToDashboard(Signin)} />
            <Route path="/signup" component={redirectToDashboard(Signup)} />
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
