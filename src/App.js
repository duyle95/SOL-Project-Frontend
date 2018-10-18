import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Secret from './pages/Secret';
import isAuthenticated from "./HOC/isAuthenticated";
import redirectToDashboard from './HOC/redirectToDashboard'

import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Layout>
              <Route exact path="/" component={redirectToDashboard(Landing)} />
              <Route exact path="/signin" component={redirectToDashboard(Signin)} />
              <Route exact path="/signup" component={redirectToDashboard(Signup)} />
              <Route exact path="/dashboard" component={isAuthenticated(Dashboard)} />
          </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
