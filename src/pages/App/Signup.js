import { Alert, Button, Divider, Form, Layout, message, Radio } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SignupFormItem from '../../components/SignupFormItem'
import { signupUser } from '../../modular/ducks/auth'

const FormItem = Form.Item

const Wrapper = styled(Layout)`
    justify-content: center;
    align-items: center;
    min-height: 100vh !important;
`

class Signup extends React.Component {
    state = {
        role: 'basic',
        isFetching: false,
    }

    static getDerivedStateFromProps(props, state) {
        return {
            isFetching: props.auth.isFetching,
        }
    }

    handleRoleChange = e => {
        this.setState({ role: e.target.value })
    }

    comparePassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    email,
                    password,
                    company_code,
                    company_name,
                    full_name,
                } = values
                this.props.signupUser(
                    {
                        user: {
                            full_name,
                            email,
                            password,
                            role: this.state.role,
                            company_code,
                        },
                        company: { company_name },
                    },
                    m => message.success(m)
                )
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Wrapper>
                <Form
                    onSubmit={this.handleSubmit}
                    className="login-form"
                    style={{ maxWidth: '300px' }}
                >
                    <FormItem>
                        <h1>Sign up form</h1>
                        <h4>Please choose your type of user !</h4>
                    </FormItem>
                    <Divider />
                    <FormItem>
                        <Radio.Group
                            value={this.state.role}
                            onChange={this.handleRoleChange}
                        >
                            <Radio.Button value="basic">
                                Employee (basic)
                            </Radio.Button>
                            <Radio.Button value="admin">
                                Employer (admin)
                            </Radio.Button>
                        </Radio.Group>
                    </FormItem>
                    {this.state.role === 'basic' ? (
                        <SignupFormItem
                            userRole="basic"
                            getFieldDecorator={getFieldDecorator}
                            comparePassword={this.comparePassword}
                        />
                    ) : (
                        <SignupFormItem
                            userRole="admin"
                            getFieldDecorator={getFieldDecorator}
                            comparePassword={this.comparePassword}
                        />
                    )}
                    <FormItem>
                        {this.props.auth.errorMessage && (
                            <Alert
                                message={this.props.auth.errorMessage}
                                type="error"
                                closable
                            />
                        )}
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginTop: '5px', width: '100%' }}
                            loading={this.state.isFetching}
                        >
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
        isFetching: PropTypes.bool.isRequired,
    }),
    signupUser: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default connect(
    mapStateToProps,
    { signupUser }
)(Form.create()(Signup))
