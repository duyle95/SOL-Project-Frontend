import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Icon, Button, Row, Col, Alert } from 'antd';
import { isEqual } from 'lodash';

import { fetchBasicUsers, submitReplacementForm } from '../actions/replacement';
import { areReplacersFound, setupReplaceObject } from '../services/replacement';
import ShiftInfo from '../components/ShiftInfo';
import DashboardTemplate from '../components/Dashboard';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};  
let uuid = 1;

class ReplacementForm extends React.Component {
    state = {
        isFetching: true,
        errorMessage: ''
    }

    componentDidMount() {
        this.props.fetchBasicUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(this.props.basicUserList, prevProps.basicUserList)) {
            this.setState({ isFetching: false });
        }
    }

    onErrorAlertClose = (e) => {
        this.setState({ errorMessage: '' });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log('Received values from form: ', values);
            if (!err) {
                if (!areReplacersFound(values.replace_shifts, this.props.basicUserList)) {
                    this.setState({ errorMessage: 'One of the replacer\'s names is not found in the system. Please check your input.' })
                } else {
                    this.setState({ errorMessage: '' });
                    const final_replace_shifts = setupReplaceObject(values.replace_shifts, this.props.basicUserList);
                    this.props.submitReplacementForm(final_replace_shifts);
                }
            }
        })
    }

    add = () => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;

        form.setFieldsValue({
            keys: nextKeys
        });
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        })
    }

    checkReplacementInfo = (rule, value, callback) => {
        if (!value.shift_date) {
            callback("Please select a date!");
        }
        callback();
        return;
    }

    renderFormItems = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        return keys.map((k, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={`Shift`}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`replace_shifts[${k}]`, {
                        initialValue: { replacer_name: '', shift_type: 'morning', shift_date: moment(new Date(), 'DD/MM/YYYY')},
                        rules: [{ validator: this.checkReplacementInfo }]
                    })(<ShiftInfo keys={keys} kElement={k} remove={this.remove} basicUserList={this.props.basicUserList} />)}
                    {/*  */}
                </FormItem>
            )
        })
    }

    render() {
        if (this.state.isFetching) {
            return (
                <DashboardTemplate>
                    <Row>
                        <Col offset={12} span={4}><Icon type="loading" theme="outlined" /></Col>
                    </Row>
                </DashboardTemplate>
            )
        } else {
            return (
                <DashboardTemplate>
                    <Form onSubmit={this.handleSubmit}>
                        {this.renderFormItems()}
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%'}}>
                                <Icon type="plus" /> Add field
                            </Button>
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                        {this.state.errorMessage && <Alert
                            message={this.state.errorMessage}
                            type="error"
                            closable
                            onClose={this.onErrorAlertClose}
                            showIcon
                        /> }
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </FormItem>
                    </Form>
                </DashboardTemplate>   
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        basicUserList: state.replacement.basicUserList
    }
}

export default connect(mapStateToProps, { fetchBasicUsers, submitReplacementForm })(Form.create()(ReplacementForm));