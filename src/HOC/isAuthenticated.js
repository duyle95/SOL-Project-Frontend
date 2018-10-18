import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions';

export default function(ComposedComponent) {
    class isAuthenticated extends React.Component {
        state = {};
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/');
            } else if (Object.keys(this.props.user).length === 0){
                this.props.getCurrentUser();
            }
        }

        // static getDerivedStateFromProps(nextProps, prevState) {
        //     if (!nextProps.isAuthenticated) {
        //         nextProps.history.push('/');
        //     }
        //     return null;
        // }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            user: state.auth.user,
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps, { getCurrentUser })(isAuthenticated);
}