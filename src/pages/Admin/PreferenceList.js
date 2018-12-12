import { Table } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import {
    computedPreferenceForms,
    startPreferenceListView,
} from '../../modular/ducks/preference'
// FIXME: this component has 1 extra unnecessary re render
export class PreferenceList extends Component {
    componentDidMount() {
        this.props.startPreferenceListView()
    }

    render() {
        const columns = [
            {
                title: 'Employee Name',
                dataIndex: 'full_name',
                sorter: (a, b) => a.full_name.localeCompare(b.full_name),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                filters: [
                    {
                        text: 'Pending',
                        value: 'Pending',
                    },
                    {
                        text: 'Success',
                        value: 'Success',
                    },
                    {
                        text: 'Declined',
                        value: 'Declined',
                    },
                    {
                        text: 'Change Requested',
                        value: 'Change Requested',
                    },
                ],
                onFilter: (value, record) => record.status === value,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { status } = record
                    if (status === 'Pending') {
                        return (
                            <p
                                onClick={() =>
                                    this.props.history.push(
                                        '/admin/preference/edit',
                                        record
                                    )
                                }
                            >
                                Reply
                            </p>
                        )
                    } else {
                        return null
                    }
                    // TODO: 'Pending' or 'Change Requested': editable and deleteable, 'Declined' or 'Accepted: deleteable
                    // TODO: Change pointer: cursor to the p element
                    // TODO: admin should be 'reply' not 'edit'
                },
            },
        ]
        return (
            <DashboardTemplate>
                <Table
                    loading={this.props.isFetching}
                    columns={columns}
                    dataSource={this.props.preferenceForms}
                    rowKey={record => record._id}
                    pagination={{ pageSize: 10 }}
                />
            </DashboardTemplate>
        )
    }
}

const mapStateToProps = state => {
    return {
        preferenceForms: computedPreferenceForms(state),
        isFetching: state.preference.isFetching,
    }
}

const mapDispatchToProps = {
    startPreferenceListView,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreferenceList)
