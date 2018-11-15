import React from 'react';
import { connect } from 'react-redux';
import { Table, Form, Input, Button, Radio, message } from 'antd';
import moment from 'moment';

import { updateReplacementFormAdmin } from '../../modular/ducks/replacement';
import { resetMessage } from '../../modular/ducks/message';
import DashboardTemplate from '../../components/Dashboard';

const FormItem = Form.Item;

class ReplacementReply extends React.Component {
    state = {
        loading: false,
        replace_shifts: [],
        replacee_name: null,
        shift_type: null,
        status: null,
        submitted_at: null        
    }

    componentWillUnmount() {
        this.props.resetMessage();
    }
    componentDidUpdate(prevProps) {
        if (this.props.message.hasMessage) {
            const { detail, type } = this.props.message.messageDetail;

            if (type === 'success') {
                message.success(detail);
            } else if (type === 'error') {
                message.error(detail);
            }
            this.props.history.replace('/admin/replacement/all');
        }
    }

    componentDidMount() {
        if (!this.props.location.state || this.props.basicUserList.length === 0) {
            message.error('Please select a form to reply to!');
            this.props.history.replace('/admin/replacement/all');
        } else {
            const { replace_shifts, replacee_name, shift_type, status, submitted_at } = this.props.location.state;
            this.setState({ 
                replace_shifts, replacee_name, shift_type, status, submitted_at
            })
        }    
    }

    enterSubmitting = () => {
        this.setState({ loading: true });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.enterSubmitting();
                this.props.updateReplacementFormAdmin({ ...values, admin_comment: this.input.textAreaRef.value, form_id: this.props.location.state._id });
            }
        });
    }

    render() {
        const columns = [{
            title: 'Shift Date',
            dataIndex: 'shift_date',
            key: 'shift_date'
        }, {
            title: 'Replacer Name',
            dataIndex: 'replacer_name',
            key: 'replacer_name',
            render: (text, record) => {
                if (!record.replacer_id) {
                    return 'No replacer for this shift';
                }
                let replacer_name = this.props.basicUserList.find(user => record.replacer_id === user._id).full_name;
                return replacer_name;
            }
        }]
        
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const { replacee_name, shift_type, status, submitted_at, replace_shifts } = this.state;
        const data = replace_shifts.map((shift, i) => ({ key: i, shift_date: moment(shift.shift_date).format('DD/MM/YYYY'), replacer_id: shift.replacer_id}))
        return (
            <DashboardTemplate>
                <p>Employee name: {replacee_name}</p>
                <p>Shift type: {shift_type}</p>
                <p>Status: {status}</p>
                <p>Date submit: {moment(submitted_at).format('DD/MM/YYYY')}</p>
                <Table columns={columns} dataSource={data} />
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="How do you want to reply ?"
                    >
                        {getFieldDecorator('status', {
                            rules: [
                                { required: true, message: 'Please select one option!'}
                            ]
                        })(
                            <Radio.Group>
                                <Radio.Button value="Accepted">Accept</Radio.Button>
                                <Radio.Button value="Declined">Decline</Radio.Button>
                                <Radio.Button value="Change Requested">Request for change</Radio.Button>
                            </Radio.Group>
                        )}  
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Your comment/suggestion"
                    >
                        {/* make the textarea uncontrolled input using ref, as wrapping it with getFieldDecorator will trigger re-render every letter admin types */}
                        <Input.TextArea ref={node => (this.input = node)} />
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 12, offset: 6 }}
                    >
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            Submit
                        </Button>
                        &nbsp;
                        <Button type="danger" onClick={() => this.props.history.push('/admin/replacement/all')}>
                            Cancel
                        </Button>
                    </FormItem>
                </Form>
            </DashboardTemplate>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.message,
        basicUserList: state.replacement.basicUserList
    }
}

export default connect(mapStateToProps, {updateReplacementFormAdmin, resetMessage})(Form.create()(ReplacementReply));