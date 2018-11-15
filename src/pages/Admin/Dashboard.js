import React from 'react';
// import { Link } from 'react-router-dom';
import DashboardTemplate from '../components/Dashboard/';

class Dashboard extends React.PureComponent {
    render() {
        return (
            <DashboardTemplate>
                <div>Main Dashboard</div>
            </DashboardTemplate>
        )
    }
}

export default (Dashboard);