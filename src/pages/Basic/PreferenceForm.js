import { message, Spin } from 'antd'
import { isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import DashboardTemplate from '../../components/Dashboard'
import PreferenceFormTemplate from '../../components/PreferenceFormTemplate'
import { resetMessage } from '../../modular/ducks/message'
import {
    getCurrentPreferenceForm,
    submitPreferenceForm,
} from '../../modular/ducks/preference'

function composePreferenceDetail(morning, evening) {
    const preference_detail = []
    for (let i = 1; i <= 7; i++) {
        const workDay = {}
        workDay.date = i
        morning.includes(i)
            ? (workDay.morning = true)
            : (workDay.morning = false)
        evening.includes(i)
            ? (workDay.evening = true)
            : (workDay.evening = false)
        preference_detail.push(workDay)
    }
    return preference_detail
}

class PreferenceForm extends PureComponent {
    // state = {
    //     morning: [],
    //     evening: [],
    //     loading: false,
    // }
    componentDidMount() {
        // TODO: check if user already has pending shift preference form, then show something else
        this.props.getCurrentPreferenceForm()
    }

    componentDidUpdate(prevProps) {
        if (this.props.message.hasMessage) {
            const { detail, type } = this.props.message.messageDetail

            if (type === 'success') {
                message.success(detail)
            } else if (type === 'error') {
                message.error(detail)
            }
            this.props.history.replace('/dashboard')
        }
    }
    componentWillUnmount() {
        this.props.resetMessage()
    }

    // onMorningChange = checkedValues => {
    //     this.setState({ morning: checkedValues })
    // }
    // onEveningChange = checkedValues => {
    //     this.setState({ evening: checkedValues })
    // }

    // handleSubmit = () => {
    //     this.setState({ loading: true })
    //     const preference_detail = composePreferenceDetail(
    //         this.state.morning,
    //         this.state.evening
    //     )
    //     this.props.submitPreferenceForm(preference_detail)
    // }
    render() {
        if (this.props.loading) {
            return (
                <DashboardTemplate>
                    <Spin size="large" />
                </DashboardTemplate>
            )
        } else {
            // Basic users have to select at least 4 available shift slots
            return (
                <DashboardTemplate>
                    {isEmpty(this.props.preferenceForms) ? (
                        <PreferenceFormTemplate
                            submitPreferenceForm={
                                this.props.submitPreferenceForm
                            }
                        />
                    ) : (
                        <>
                            <h2>
                                You have already submitted a preference form.
                                Please wait for admin evaluation before
                                submitting a new one.
                            </h2>
                            <h5>Your current preference form</h5>
                            <p>
                                Status: {this.props.preferenceForms[0].status}
                            </p>
                            <p>
                                Admin Comment:{' '}
                                {this.props.preferenceForms[0].admin_comment ||
                                    'No comment from admin'}
                            </p>
                        </>
                    )}
                </DashboardTemplate>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.preference.isFetching,
        errorMessage: state.preference.errorMessage,
        preferenceForms: state.preference.preferenceForms,
        message: state.message,
    }
}

export default connect(
    mapStateToProps,
    { submitPreferenceForm, getCurrentPreferenceForm, resetMessage }
)(PreferenceForm)
