import { Form, Icon, Input, Tooltip } from 'antd'
import React from 'react'

const FormItem = Form.Item

export default function SignupFormItem({
    userRole: role,
    getFieldDecorator,
    comparePassword,
}) {
    if (role === 'basic') {
        return (
            <div>
                <FormItem
                    label={
                        <span>
                            Company code&nbsp;
                            <Tooltip title="Not sure what this is? Ask your company admin for the code">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('company_code', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your company code!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="code"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Company code"
                        />
                    )}
                </FormItem>
                <FormItem label="Full name">
                    {getFieldDecorator('full_name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user-add"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Your fullname"
                        />
                    )}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Email"
                        />
                    )}
                </FormItem>
                <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem label="Confirm password">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your Password!',
                            },
                            { validator: comparePassword },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>
            </div>
        )
    } else if (role === 'admin') {
        return (
            <div>
                <FormItem label="Company name">
                    {getFieldDecorator('company_name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input the company name!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="team"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Company name"
                        />
                    )}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Email"
                        />
                    )}
                </FormItem>
                <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem label="Confirm password">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your Password!',
                            },
                            { validator: comparePassword },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>
            </div>
        )
    }
}
