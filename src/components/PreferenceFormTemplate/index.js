import { Button, Checkbox, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

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

export default class PreferenceFormTemplate extends PureComponent {
    state = {
        morning: [],
        evening: [],
        loading: false,
    }

    onMorningChange = checkedValues => {
        this.setState({ morning: checkedValues })
    }
    onEveningChange = checkedValues => {
        this.setState({ evening: checkedValues })
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        const preference_detail = composePreferenceDetail(
            this.state.morning,
            this.state.evening
        )
        this.props.submitPreferenceForm(preference_detail)
    }

    render() {
        return (
            <>
                <h1>New Shift Preference Form</h1>
                <Row>
                    <Col span={3} />
                    <Col span={2}>
                        <h4>Mo</h4>
                    </Col>
                    <Col span={2}>
                        <h4>Tu</h4>
                    </Col>
                    <Col span={2}>
                        <h4>We</h4>
                    </Col>
                    <Col span={2}>
                        <h4>Th</h4>
                    </Col>
                    <Col span={2}>
                        <h4>Fr</h4>
                    </Col>
                    <Col span={2}>
                        <h4>Sa</h4>
                    </Col>
                    <Col span={2}>
                        <h4>Su</h4>
                    </Col>
                </Row>
                <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={this.onMorningChange}
                >
                    <Row>
                        <Col span={3}>
                            <h4>Mor</h4>
                        </Col>
                        <Col span={2}>
                            <Checkbox value={1} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={2} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={3} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={4} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={5} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={6} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={7} />
                        </Col>
                    </Row>
                </Checkbox.Group>
                <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={this.onEveningChange}
                >
                    <Row>
                        <Col span={3}>
                            <h4>Eve</h4>
                        </Col>
                        <Col span={2}>
                            <Checkbox value={1} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={2} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={3} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={4} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={5} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={6} />
                        </Col>
                        <Col span={2}>
                            <Checkbox value={7} />
                        </Col>
                    </Row>
                </Checkbox.Group>
                <Button
                    disabled={
                        [...this.state.morning, ...this.state.evening].length <
                        4
                    }
                    onClick={this.handleSubmit}
                    type="primary"
                    style={{ marginBottom: 16 }}
                    loading={this.state.loading}
                >
                    Submit
                </Button>
            </>
        )
    }
}

PreferenceFormTemplate.propTypes = {
    submitPreferenceForm: PropTypes.func.isRequired,
}
