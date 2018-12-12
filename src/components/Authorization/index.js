import React from 'react'
import { connect } from 'react-redux'

const Authorization = allowedRoles => WrappedComponent => {
    class WithAuthorization extends React.Component {
        render() {
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
