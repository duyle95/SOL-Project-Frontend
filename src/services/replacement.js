export const areReplacersFound = (replace_shifts, basicUserList) => {
    // replacers: array of string
    // basicUserList: array of user obj: { full_name, _id }
    let result = false;
    replace_shifts
        .map(shift => shift.replacer_name)
        .forEach(replacer => {
            if (replacer === '') {
                result = true;
                return;
            }
            let existingUser = basicUserList.find(user => user.full_name === replacer);
            if (!existingUser) {
                result = false;
            } else {
                result = true;
            }
            return;
        })
    return result;
}

export const setupReplaceObject = (replace_shifts, basicUserList) => {
    return replace_shifts.map(shift => {
        let { shift_date, shift_type, replacer_name } = shift;
        shift_date = typeof shift_date === 'object' ? shift_date.format() : shift_date;
        if (replacer_name === '') {
            return { shift_date, shift_type, replacer_id: '' };
        }
        let existingUser = basicUserList.find(user => user.full_name === replacer_name);
        return {
            shift_date, shift_type, replacer_id: existingUser._id
        }
    })
}