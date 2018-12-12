import { Table } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import history from '../../services/history';

// https://coolors.co/001529-f0f2f5-afc2d5-ccddd3-dfefca
class ReplacementFormList extends React.Component {
  handleExpandedRowRender = record => {
    return (
      <div>
        {record.replace_shifts.map(shift => {
          let replacer_name = ''

          if (!shift.replacer_id) {
            replacer_name = 'No replacer for this shift'
          } else {
            replacer_name = this.props.basicUserList.find(
              user => shift.replacer_id === user._id
            ).full_name
          }

          return (
            <p key={shift._id}>
              {replacer_name} - {moment(shift.shift_date).format('YYYY/MM/DD')}
            </p>
          )
        })}
        {record.admin_comment ? (
          <p>Admin: {record.admin_comment}</p>
        ) : (
          <p>No feedback from admin</p>
        )}
      </div>
    )
  }

  render() {
    const columns = {
      admin_columns: [
        {
          title: 'Employee Name',
          dataIndex: 'replacee_name',
          sorter: (a, b) => a.replacee_name.localeCompare(b.replacee_name),
        },
        {
          title: 'Shift Type',
          dataIndex: 'shift_type',
          filters: [
            {
              text: 'Morning - Amorella',
              value: 'morning',
            },
            {
              text: 'Evening - Grace',
              value: 'evening',
            },
          ],
          onFilter: (value, record) => record.shift_type === value,
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
                    history.push('/admin/replacement/edit', record)
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
      ],
      basic_columns: [
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
          title: 'Shift Type',
          dataIndex: 'shift_type',
          filters: [
            {
              text: 'Morning - Amorella',
              value: 'morning',
            },
            {
              text: 'Evening - Grace',
              value: 'evening',
            },
          ],

          onFilter: (value, record) => record.shift_type === value,
        },
        {
          title: 'Date Submitted',
          dataIndex: 'submitted_at',
          render: (text, record) => {
            // TODO: apply default margin-top for p element
            return <p>{moment(record.submitted_at).format('YYYY/MM/DD')}</p>
          },
          sorter: (a, b) => a.submitted_at - b.submitted_at,
        },
        {
          title: 'Operation',
          dataIndex: 'operation',
          render: (text, record) => {
            const { status } = record
            switch (status) {
              case 'Pending':
                return (
                  <p
                    onClick={() =>
                      history.push('/basic/replacement/edit', record)
                    }
                  >
                    Edit
                  </p>
                )
              case 'Change Requested':
                return (
                  <p
                    onClick={() =>
                      history.push('/basic/replacement/edit', record)
                    }
                  >
                    Edit
                  </p>
                )
              default:
                return null
            }
            // TODO: 'Pending' or 'Change Requested': editable and deleteable, 'Declined' or 'Accepted: deleteable
            // TODO: Change pointer: cursor to the p element
          },
        },
      ],
    }
    return (
      <Table
        columns={columns[`${this.props.role}_columns`]}
        dataSource={this.props.forms}
        expandedRowRender={this.handleExpandedRowRender}
        rowKey={record => record._id}
        pagination={{ pageSize: 10 }}
        loading={this.props.isFetching}
      />
    )
  }
}

ReplacementFormList.propTypes = {
  forms: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  basicUserList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
}

export default ReplacementFormList
