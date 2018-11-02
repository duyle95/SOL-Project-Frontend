import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class redirectToDashboard extends React.Component {
        state = {};
        componentDidMount() {
            if (this.props.isAuthenticated) {
                this.props.history.push('/dashboard');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps, null)(redirectToDashboard);
}