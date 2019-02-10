import { List, Spin } from 'antd'
import { isEmpty } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import getDayOfWeek from '../../helpers/getDayOfWeek'
import { getUserPreferenceDetail } from '../../modular/ducks/preference'

export class PreferenceDetail extends Component {
    componentDidMount() {
        this.props.getUserPreferenceDetail()
    }
    render() {
        return (
            <DashboardTemplate>
                {this.props.isFetching ? (
                    <Spin size="large" />
                ) : !isEmpty(this.props.preferenceDetail) ? (
                    <>
                        <h3>Your shift preference detail</h3>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.preferenceDetail}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={getDayOfWeek(item.date)}
                                        description={`Available: ${
                                            item.morning ? 'Morning' : ''
                                        } ${item.evening ? 'Evening' : ''}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </>
                ) : (
                    <h3>
                        Oops, it seems like you haven't submitted your shift
                        preference detail. Please do one immediately.
                    </h3>
                )}
            </DashboardTemplate>
        )
    }
}

const mapStateToProps = state => ({
    preferenceDetail: state.preference.preferenceDetail,
    isFetching: state.preference.isFetching,
})

const mapDispatchToProps = {
    getUserPreferenceDetail,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreferenceDetail)
