import React from 'react';
import { Box } from 'theme-ui';
import RadioGroupItem from './RadioGroupItem';
import childrenExist from '../../util/childrenExist';

/**
 * @class RadioGroup
 * @param {Array} items
 * @param {String} name
 * @param {String} checkedValue
 * @param {Func} checkedValueChange
 */

const RadioGroup = props => {
  const { children, items, name, checkedValue, checkedValueChange } = props;
  const style = {
    bg: 'transparent',
    color: 'primary',
    display: 'flex',
    padding: 0
  };

  if (childrenExist(children)) {
    return (
      <Box {...props} className="cl-radio-group" sx={style}>
        {children}
      </Box>
    );
  }

  return (
    <Box {...props} className="cl-radio-group" sx={style}>
      {items.map(item => {
        return (
          <RadioGroupItem
            key={item.value}
            name={name}
            item={item}
            checkedChanged={checkedValueChange}
          />
        );
      })}
    </Box>
  );
};

export default RadioGroup;
