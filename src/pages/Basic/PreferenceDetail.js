import { Spin, Table, Tag } from 'antd'
import { isEmpty } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import { getUserPreferenceDetail } from '../../modular/ducks/preference'

function makePreferenceData(a) {
    const b = {
        mon: 2,
        tue: 3,
        wed: 4,
        thur: 5,
        fri: 6,
        sat: 7,
        sun: 1,
    }
    return a.reduce(
        (a, day) => {
            Object.keys(b).forEach(d => {
                if (b[d] === day.date) {
                    if (day.morning) a[d].push('M')
                    if (day.evening) a[d].push('E')
                }
            })
            return a
        },
        {
            key: 1,
            mon: [],
            tue: [],
            wed: [],
            thur: [],
            fri: [],
            sat: [],
            sun: [],
        }
    )
}
export class PreferenceDetail extends Component {
    componentDidMount() {
        this.props.getUserPreferenceDetail()
    }

    renderTag = (record, day) => {
        let tags = []
        if (record[day].includes('E')) {
            tags.push(
                <Tag color={'peachpuff'} key={1}>
                    {'E'}
                </Tag>
            )
        }
        if (record[day].includes('M')) {
            tags.push(
                <Tag color={'lightblue'} key={2}>
                    {'M'}
                </Tag>
            )
        }
        if (record[day].length === 0) {
            return (
                <span>
                    <Tag color={'red'} key={2}>
                        {'X'}
                    </Tag>
                </span>
            )
        }
        return <span>{tags}</span>
    }

    render() {
        // [{morning: bool, evening: bool, _id, date: number},...]

        const columns = [
            {
                title: 'Mon',
                key: 'mon',
                dataIndex: 'mon',
                render: (text, record) => this.renderTag(record, 'mon'),
            },
            {
                title: 'Tue',
                key: 'tue',
                dataIndex: 'tue',
                render: (text, record) => this.renderTag(record, 'tue'),
            },
            {
                title: 'Wed',
                key: 'wed',
                dataIndex: 'wed',
                render: (text, record) => this.renderTag(record, 'wed'),
            },
            {
                title: 'Thurs',
                key: 'thur',
                dataIndex: 'thur',
                render: (text, record) => this.renderTag(record, 'thur'),
            },
            {
                title: 'Fri',
                key: 'fri',
                dataIndex: 'fri',
                render: (text, record) => this.renderTag(record, 'fri'),
            },
            {
                title: 'Sat',
                key: 'sat',
                dataIndex: 'sat',
                render: (text, record) => this.renderTag(record, 'sat'),
            },
            {
                title: 'Sun',
                key: 'sun',
                dataIndex: 'sun',
                render: (text, record) => this.renderTag(record, 'sun'),
            },
        ]
        const data = makePreferenceData(this.props.preferenceDetail)
        return (
            <DashboardTemplate>
                {this.props.isFetching ? (
                    <Spin size="large" />
                ) : !isEmpty(this.props.preferenceDetail) ? (
                    <>
                        <h1>Your shift preference detail</h1>
                        <h3>
                            Morning -{' '}
                            <Tag color={'lightblue'} key={2}>
                                {'M'}
                            </Tag>
                        </h3>
                        <h3>
                            Evening -{' '}
                            <Tag color={'peachpuff'} key={2}>
                                {'E'}
                            </Tag>
                        </h3>
                        <Table
                            columns={columns}
                            pagination={false}
                            dataSource={[data]}
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
