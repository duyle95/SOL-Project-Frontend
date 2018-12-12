import {
    Button,
    DatePicker,
    Form,
    message,
    Popconfirm,
    Select,
    Table,
} from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import EditableFormRow, {
    EditableContext,
} from '../../components/EditableFormRow'
import { resetMessage } from '../../modular/ducks/message'
import {
    fetchBasicUsers,
    submitReplacementForm,
} from '../../modular/ducks/replacement'
import { setupReplacementArr } from '../../services/replacement'

// import './ReplacementForm.css'

const FormItem = Form.Item
const Option = Select.Option

class ReplacementForm extends React.Component {
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
                                        {form.getFieldDecorator(
                                            'replacer_name'
                                        )(
                                            <Select
                                                allowClear
                                                showSearch
                                                placeholder="Select a replacer"
                                                defaultActiveFirstOption={false}
                                                showArrow={false}
                                                filterOption={(
                                                    inputValue,
                                                    option
                                                ) =>
                                                    option.props.children
                                                        .toUpperCase()
                                                        .indexOf(
                                                            inputValue.toUpperCase()
                                                        ) !== -1
                                                }
                                                onChange={replacer_id =>
                                                    this.handleReplacerNameChange(
                                                        replacer_id,
                                                        record
                                                    )
                                                }
                                                notFoundContent={null}
                                                style={{ width: 100 }}
                                            >
                                                {this.props.basicUserList.map(
                                                    user => (
                                                        <Option key={user._id}>
                                                            {user.full_name}
                                                        </Option>
                                                    )
                                                )}
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
                                            initialValue: moment(),
                                        })(
                                            <DatePicker
                                                disabledDate={current =>
                                                    current <
                                                    moment().endOf('day')
                                                }
                                                onChange={(date, dateString) =>
                                                    this.handleDatePickerChange(
                                                        date,
                                                        dateString,
                                                        record
                                                    )
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
                            onConfirm={() => this.handleDelete(record.key)}
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
            shift_type: 'morning',
            loading: false,
            width: 0,
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
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
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.props.fetchBasicUsers()
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth })
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

    handleDelete = key => {
        const dataSource = [...this.state.dataSource]
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        })
    }

    handleAdd = () => {
        const { count, dataSource } = this.state
        const newData = {
            key: count,
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
        const index = newData.findIndex(item => row.key === item.key)
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
        this.props.submitReplacementForm({
            replace_shifts,
            shift_type: this.state.shift_type,
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

        if (window.innerWidth < 480) {
            return (
                <DashboardTemplate>
                    <h2>
                        The page will break at this size of screen. Please open
                        the page on your computer/laptop or put your mobile to
                        horizontal mode.
                    </h2>
                </DashboardTemplate>
            )
        }
        return (
            <DashboardTemplate>
                <span>Your Replacement Form for </span>
                <Select
                    defaultValue="morning"
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
    { fetchBasicUsers, submitReplacementForm, resetMessage }
)(ReplacementForm)
