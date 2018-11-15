export const setupReplacementArr = (replace_shifts) => {
    return replace_shifts.map(shift => {
        let { shift_date, replacer_id } = shift;
        return {
            shift_date: typeof shift_date === 'object' ? shift_date.format() : shift_date , replacer_id: !replacer_id ? null : replacer_id
        }
    });
}