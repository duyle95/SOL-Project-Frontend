import React from 'react';
import { connect } from 'react-redux';
// import { toDashboard } from '../../actions/auth';
import { toDashboard } from '../../modular/ducks/auth';

export default function(ComposedComponent) {
    class redirectToDashboard extends React.Component {
        componentDidMount() {
            this.props.toDashboard();
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(null, {toDashboard})(redirectToDashboard);
}