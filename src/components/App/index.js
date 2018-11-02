import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Landing from '../../pages/Landing';
import Signin from '../../pages/Signin';
import Signup from '../../pages/Signup';
import Dashboard from '../../pages/Dashboard';
import ReplacementForm from '../../pages/ReplacementForm';

import isAuthenticated from "../IsAuthenticated";
import redirectToDashboard from '../RedirectToDashboard';

import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Layout>
              <Route exact path="/" component={redirectToDashboard(Landing)} />
              <Route path="/signin" component={redirectToDashboard(Signin)} />
              <Route path="/signup" component={redirectToDashboard(Signup)} />
              <Route path="/dashboard" component={isAuthenticated(Dashboard)} />
              <Route path="/replacement/new" component={isAuthenticated(ReplacementForm)} />
          </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
