import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon, Select, DatePicker, AutoComplete  } from 'antd';

const Option = Select.Option;

const RemoveIcon = styled(Icon)`
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 1s;

    &:hover {
        color: #000;
    }
`
// NOTE: make a constant file for these
const mobileDevice = '(min-width: 320px) and (max-width: 800px)';
const StyledAutoComplete = styled(AutoComplete)`
    @media ${mobileDevice} {
        min-width: 100%;
        marginRight: 0;
    }
`

const StyledSelect = styled(Select)`
    @media ${mobileDevice} {
        min-width: 100%;
        marginRight: 0;
    }
`

const StyledDatePicker = styled(DatePicker)`
    margin-right: 8px;
    min-width: 80%;
    @media ${mobileDevice} {
        width: 100%;
    }
`

class ShiftInfo extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
          return {
            ...(nextProps.value || {}),
          };
        }
        return null;
    }

    state = {
        replacer_name: '',
        shift_type: 'morning',
        shift_date: ""
    }

    handleReplacerNameChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ replacer_name: value });
        }
        this.triggerChange({ replacer_name: value });
    }

    handleShiftTypeChange = (shift_type) => {
        if (!('value' in this.props)) {
            this.setState({ shift_type });
        }
        this.triggerChange({ shift_type });
    }

    handleShiftDateChange = shift_date => {
        const obj = { shift_date: !shift_date ? null : shift_date.format() };
        if (!('value' in this.props)) {
            this.setState(obj);
        }
        this.triggerChange(obj);
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(Object.assign({}, this.state, changedValue));
        }
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    render() {
        return (
            <span>
                <StyledDatePicker 
                    disabledDate={this.disabledDate}
                    format={'DD/MM/YYYY'} 
                    defaultValue={moment(new Date(), 'DD/MM/YYYY')}
                    onChange={this.handleShiftDateChange} 
                />
                <StyledSelect
                    style={{ width: '80%' }}
                    defaultValue="morning"
                    onChange={this.handleShiftTypeChange}
                >
                    <Option value="morning">Amorella-Morning</Option>
                    <Option value="evening">Grace-Evening</Option>
                </StyledSelect>
                <StyledAutoComplete
                    dataSource={this.props.basicUserList.map(user => user.full_name)}
                    style={{ width: '80%' }}
                    onChange={this.handleReplacerNameChange} // save to component state and update with form values
                    value={this.state.replacer_name}
                    placeholder="Who will replace you?"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                >
                    {/* <Input 
                        type="text"
                        value={this.state.replacer_name} 
                        placeholder="Who will replace you?" 
                        onChange={this.handleReplacerNameChange} 
                    /> */}
                    {/* {this.props.basicUserList.map(user => {
                        return <AutoComplete.Option key={user._id}>{user.email}</AutoComplete.Option>
                    })} */}
                </StyledAutoComplete>
                {this.props.keys.length > 1 ? (
                    <RemoveIcon
                        type="minus-circle-o"
                        disabled={this.props.keys.length === 1}
                        onClick={() => this.props.remove(this.props.kElement)}
                    />
                ) : null} 
            </span>
        )
    }
}

export default ShiftInfo;