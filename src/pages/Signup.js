import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Icon, Input, Button, Layout, Radio, Alert, Divider, Tooltip } from 'antd';

import { signupUser } from '../actions/auth';
const FormItem = Form.Item;

const Wrapper = styled(Layout)`
    justify-content: center;
    align-items: center;
    min-height: 100vh !important;
`;

const SignupFormItems = ({ userRole: role, getFieldDecorator, comparePassword }) => {
    if (role === 'basic') {
        return (
            <div>
                <FormItem label={
                    (
                        <span>
                            Company code&nbsp;
                            <Tooltip title="Not sure what this is? Ask your company admin for the code">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('company_code', {
                        rules: [{ required: true, message: 'Please input your company code!' }],
                    })(
                        <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Company code" />
                    )}
                </FormItem>
                <FormItem label="Full name">
                    {getFieldDecorator('full_name', {
                        rules: [{ required: true, message: 'Please input your name!'}],
                    })(
                        <Input prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your fullname" />
                    )}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem label="Confirm password">
                    {getFieldDecorator('confirm', {
                        rules: [{ required: true, message: 'Please confirm your Password!' }, { validator: comparePassword }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" />
                    )}
                </FormItem>
            </div>
        )
    } else if (role === 'admin') {
        return (
            <div>
                <FormItem label="Company name">
                    {getFieldDecorator('company_name', {
                        rules: [{ required: true, message: 'Please input the company name!' }],
                    })(
                        <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Company name" />
                    )}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem label="Confirm password">
                    {getFieldDecorator('confirm', {
                        rules: [{ required: true, message: 'Please confirm your Password!' }, { validator: comparePassword }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" />
                    )}
                </FormItem>
            </div>
        )
    } else {
        // NOTE: return error or something here
    }
}

class Signup extends React.Component {
    state = {
        role: 'basic',
        isFetching: false
    }

    static getDerivedStateFromProps(props, state) {
        return {
            isFetching: props.auth.isFetching
        }
    }


    handleRoleChange = e => {
        this.setState({ role: e.target.value });
    }

    comparePassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password, company_code, company_name, full_name } = values;
                this.props.signupUser({ user: {full_name, email, password, role: this.state.role, company_code }, company: { company_name }}, () => this.props.history.push("/dashboard"));
            }
        });
    }
    // NOTE: use antd Message to show some indications that sign up is successful
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Wrapper>
                <Form onSubmit={this.handleSubmit} className="login-form" style={{ maxWidth: "300px" }}>
                    <FormItem>
                        <h1>Sign up form</h1>
                        <h4>Please choose your type of user !</h4>
                    </FormItem>
                    <Divider />
                    <FormItem>
                    <Radio.Group value={this.state.role} onChange={this.handleRoleChange}>
                        <Radio.Button value="basic">Employee (basic)</Radio.Button>
                        <Radio.Button value="admin">Employer (admin)</Radio.Button>
                    </Radio.Group>
                    </FormItem>
                    { this.state.role === 'basic' ? <SignupFormItems userRole="basic" getFieldDecorator={getFieldDecorator} comparePassword={this.comparePassword} /> : <SignupFormItems userRole="admin" getFieldDecorator={getFieldDecorator} comparePassword={this.comparePassword} />}
                    <FormItem>
                        { this.props.auth.errorMessage && <Alert
                            message={this.props.auth.errorMessage}
                            type="error"
                            closable
                        /> }
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "5px", width: "100%"}} loading={this.state.isFetching}>
                            Sign up
                        </Button>
                    </FormItem>
                    <FormItem>
                        Already registered? <a href="/signin">Sign in here!</a>
                    </FormItem>
                </Form>
            </Wrapper>
        )
    }
}

Signup.propTypes = {
    form: PropTypes.object.isRequired,
    auth: PropTypes.shape({
        errorMessage: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired
    }),
    signupUser: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { signupUser })(Form.create()(Signup));