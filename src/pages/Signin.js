import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signinUser } from '../actions';

import { Form, Icon, Input, Button, Layout, Alert } from 'antd';
const FormItem = Form.Item;

const Wrapper = styled(Layout)`
    justify-content: center;
    align-items: center;
    min-height: 100vh !important;
`

class Signin extends React.Component {
    state = { 
        isFetching: false
    }

    static getDerivedStateFromProps(props, state) {
        return {
            isFetching: props.auth.isFetching
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values from form: ', values);
                const { email, password } = values;
                this.props.signinUser({email, password}, () => {
                    this.props.history.push("/dashboard");
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Wrapper>
                <Form onSubmit={this.handleSubmit} className="login-form" style={{ maxWidth: "280px" }}>
                    <FormItem>
                        <h1>Welcome !</h1>
                        <h3>Please sign in...</h3>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        { this.props.auth.errorMessage && <Alert
                            message={this.props.auth.errorMessage}
                            type="error"
                            closable
                        /> }
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "5px", width: "100%"}} loading={this.state.isFetching}>
                            Sign in
                        </Button>
                        <a className="login-form-forgot" href="/#" style={{ textAlign: 'center'}}>Forgot password?</a>
                    </FormItem>
                    <FormItem>
                        <a href="/#">Register as user</a> or <a href="/#">register for your company</a>
                    </FormItem>
                </Form>
            </Wrapper>
        )
    }
}

Signin.propTypes = {
    form: PropTypes.object.isRequired,
    auth: PropTypes.shape({
        errorMessage: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired
    }),
    signinUser: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { signinUser })(Form.create()(Signin));