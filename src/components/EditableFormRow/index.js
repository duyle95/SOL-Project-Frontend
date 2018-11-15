import React from 'react';
import { Form } from 'antd';

// Pass down this.props.form and index from Context API
// Each row will have an index/key, so that changing one cell of a row won't change the same cell in other rows
export const EditableContext = React.createContext();
 
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export default Form.create()(EditableRow);