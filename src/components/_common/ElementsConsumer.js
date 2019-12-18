import React from 'react';
import DefaultContext from '../../DefaultContext';

const Consumer = ({ children, context }) => {
  let ctx = context || DefaultContext;
  const ContextConsumer = ctx.Consumer || ctx;

  return <ContextConsumer>{children}</ContextConsumer>;
};

export default Consumer;
