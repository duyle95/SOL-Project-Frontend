import React from 'react'
import { connect } from 'react-redux'

const Authorization = allowedRoles => WrappedComponent => {
    class WithAuthorization extends React.Component {
        render() {
            // FIXME: when user first signup, redirect them to landing page and prompt them to sign in
            const role = this.props.user.role
            if (allowedRoles.includes(role)) {
                return <WrappedComponent {...this.props} />
            } else {
                return <div />
            }
        }
    }
    const mapStateToProps = state => ({ user: state.auth.user })

    return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
