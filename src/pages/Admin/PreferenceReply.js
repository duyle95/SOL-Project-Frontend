import { Button, Form, Input, List, message, Radio } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import getDayOfWeek from '../../helpers/getDayOfWeek'
import { resetMessage } from '../../modular/ducks/message'
import { updatePreferenceFormAdmin } from '../../modular/ducks/preference'

const FormItem = Form.Item

export class PreferenceReply extends Component {
    state = {
        full_name: null,
        preference_detail: [],
        status: null,
        submitted_at: null,
        loading: false,
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
            this.props.history.replace('/admin/preference/all')
        }
    }
    componentDidMount() {
        if (!this.props.location.state) {
            message.error('Please select a form to reply to!')
            this.props.history.replace('/admin/preference/all')
        } else {
            const {
                preference_detail,
                full_name,
                status,
                submitted_at,
            } = this.props.location.state
            this.setState({
                preference_detail,
                full_name,
                status,
                submitted_at,
            })
        }
    }

    enterSubmitting = () => {
        this.setState({ loading: true })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.enterSubmitting()
                this.props.updatePreferenceFormAdmin({
                    ...values,
                    admin_comment: this.input.textAreaRef.value,
                    form_id: this.props.location.state._id,
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        const {
            preference_detail,
            full_name,
            status,
            submitted_at,
        } = this.state
        return (
            <DashboardTemplate>
                <p>Employee name: {full_name}</p>
                <p>Status: {status}</p>
                <p>Date submit: {moment(submitted_at).format('DD/MM/YYYY')}</p>
                <List
                    itemLayout="horizontal"
                    dataSource={preference_detail}
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
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="How do you want to reply ?"
                    >
                        {getFieldDecorator('status', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select one option!',
                                },
                            ],
                        })(
                            <Radio.Group>
                                <Radio.Button value="Accepted">
                                    Accept
                                </Radio.Button>
                                <Radio.Button value="Declined">
                                    Decline
                                </Radio.Button>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Your comment/suggestion"
                    >
                        <Input.TextArea ref={node => (this.input = node)} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.loading}
                        >
                            Submit
                        </Button>
                        &nbsp;
                        <Button
                            type="danger"
                            onClick={() =>
                                this.props.history.push('/admin/preference/all')
                            }
                        >
                            Cancel
                        </Button>
                    </FormItem>
                </Form>
            </DashboardTemplate>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
})

const mapDispatchToProps = {
    resetMessage,
    updatePreferenceFormAdmin,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(PreferenceReply))
