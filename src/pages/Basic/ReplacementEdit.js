import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button,
  Popconfirm,
  Form,
  DatePicker,
  Select,
  message,
} from 'antd'
import moment from 'moment'

import EditableFormRow, {
  EditableContext,
} from '../../components/EditableFormRow'
import { updateReplacementFormBasic } from '../../modular/ducks/replacement'
import { resetMessage } from '../../modular/ducks/message'
import DashboardTemplate from '../../components/Dashboard'
import { setupReplacementArr } from '../../services/replacement'

const FormItem = Form.Item
const Option = Select.Option

class ReplacementEdit extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: 'Replacer Name',
        dataIndex: 'replacer_name',
        width: '30%',
        render: (text, record) => {
          return (
            <EditableContext.Consumer>
              {form => {
                this.form = form
                return (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator('replacer_name', {
                      initialValue: record.replacer_id,
                    })(
                      <Select
                        allowClear
                        showSearch
                        placeholder="Select a replacer"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={(inputValue, option) =>
                          option.props.children
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={replacer_id =>
                          this.handleReplacerNameChange(replacer_id, record)
                        }
                        notFoundContent={null}
                        style={{ width: '10em' }}
                      >
                        {this.props.basicUserList.map(user => (
                          <Option key={user._id}>{user.full_name}</Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                )
              }}
            </EditableContext.Consumer>
          )
        },
      },
      {
        title: 'Shift Date',
        dataIndex: 'shift_date',
        render: (text, record) => {
          return (
            <EditableContext.Consumer>
              {form => {
                this.form = form
                return (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator('shift_date', {
                      rules: [
                        {
                          required: true,
                          message: `Shift date is required.`,
                        },
                      ],
                      initialValue: moment(record.shift_date),
                    })(
                      <DatePicker
                        disabledDate={current =>
                          current < moment().endOf('day')
                        }
                        onChange={(date, dateString) =>
                          this.handleDatePickerChange(date, dateString, record)
                        }
                      />
                    )}
                  </FormItem>
                )
              }}
            </EditableContext.Consumer>
          )
        },
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record._id)}
            >
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null
        },
      },
    ]

    this.state = {
      dataSource: [],
      count: 0,
      shift_type: '',
      loading: false,
    }
  }

  componentWillUnmount() {
    this.props.resetMessage()
  }

  componentDidUpdate(prevProps) {
    if (this.props.message.hasMessage) {
      const { detail, type } = this.props.message.messageDetail

      if (type === 'success') {
        message.success(detail)
      } else if (type === 'error') {
        message.error(detail)
      }
      this.props.history.replace('/basic/replacement/all')
    }
  }

  componentDidMount() {
    if (!this.props.location.state || this.props.basicUserList.length === 0) {
      message.error('Please select a form to edit!')
      this.props.history.replace('/basic/replacement/all')
    } else {
      this.setState({
        dataSource: this.props.location.state.replace_shifts,
        count: this.props.location.state.replace_shifts.length,
        shift_type: this.props.location.state.shift_type,
      })
    }
  }

  handleReplacerNameChange = (replacer_id, record) => {
    this.handleSave({
      ...record,
      replacer_id,
    })
  }

  handleDatePickerChange = (date, dateString, record) => {
    this.handleSave({
      ...record,
      shift_date: !date ? null : date.format(),
    })
  }

  handleShiftTypeChange = shift_type => {
    this.setState({ shift_type })
  }

  handleDelete = _id => {
    const dataSource = [...this.state.dataSource]
    this.setState({
      dataSource: dataSource.filter(item => item._id !== _id),
      count: this.state.count - 1,
    })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      _id: count,
      replacer_id: '',
      name: '',
      shift_date: moment(),
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    })
  }

  handleSave = row => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row._id === item._id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ dataSource: newData })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    const replace_shifts = setupReplacementArr(this.state.dataSource)
    console.log({ replace_shifts, shift_type: this.state.shift_type })
    this.props.updateReplacementFormBasic({
      replace_shifts,
      shift_type: this.state.shift_type,
      form_id: this.props.location.state._id,
    })
  }

  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableFormRow,
      },
    }
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          basicUserList: this.props.basicUserList,
        }),
      }
    })
    return (
      <DashboardTemplate>
        <span>Your Replacement Form for </span>
        <Select
          defaultValue={this.state.shift_type}
          style={{ width: 150 }}
          onChange={this.handleShiftTypeChange}
        >
          <Option value="morning">Morning - Amorella</Option>
          <Option value="evening">Evening - Grace</Option>
        </Select>
        <br />
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a shift
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          rowKey={record => record._id}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Button
          disabled={this.state.dataSource.length === 0}
          onClick={this.handleSubmit}
          type="primary"
          style={{ marginBottom: 16 }}
          loading={this.state.loading}
        >
          Submit
        </Button>
      </DashboardTemplate>
    )
  }
}

const mapStateToProps = state => {
  return {
    basicUserList: state.replacement.basicUserList,
    message: state.message,
  }
}

export default connect(
  mapStateToProps,
  { updateReplacementFormBasic, resetMessage }
)(ReplacementEdit)
