import React from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import ReplacementFormList from '../../components/ReplacementFormList'
import {
    computedReplacementForms,
    startReplacementListView,
} from '../../modular/ducks/replacement'

class ReplacementList extends React.Component {
    componentDidMount() {
        this.props.startReplacementListView(this.props.user.role)
    }

    render() {
        return (
            <DashboardTemplate>
                {/* when the replacement form database gets larger, use pagination and limit api call for better performance */}
                <ReplacementFormList
                    forms={this.props.replacementForms}
                    basicUserList={this.props.basicUserList}
                    role={this.props.user.role}
                    isFetching={this.props.isFetching}
                />
            </DashboardTemplate>
        )
    }
}

const mapStateToProps = state => {
    return {
        replacementForms: computedReplacementForms(state),
        basicUserList: state.replacement.basicUserList,
        isFetching: state.replacement.isFetching,
    }
}

export default connect(
    mapStateToProps,
    { startReplacementListView }
)(ReplacementList)
