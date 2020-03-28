import React from 'react';
import { Label, Radio } from 'theme-ui';

const RadioGroupItem = props => {
  const { name, item, defaultChecked, checkedChanged } = props;

  return (
    <Label
      className="cl-radio-group-item"
      {...props}
      sx={{
        // color: 'text',
        fontSize: '12px',
        marginRight: '2px',
        '>span': {
          paddingTop: '3px'
        }
      }}
    >
      <Radio
        color="primary"
        name={name}
        id={item.name}
        value={item.value}
        defaultChecked={defaultChecked}
        sx={{
          'input:checked ~ &': {
            color: 'primary'
          },
          'input:focus ~ &': {
            bg: 'highlight'
          }
        }}
        onChange={e => checkedChanged(e, item)}
      />
      <span>{item.label}</span>
    </Label>
  );
};

export default RadioGroupItem;
