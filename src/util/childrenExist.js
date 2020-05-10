/**
 * Tests if children exist in React.
 * @param {Object} children The children prop of a component.
 * @returns {Boolean}
 */

const childrenExist = (children) => {
  if (children === null || children === undefined) return false;
  // eslint-disable-next-line no-restricted-globals
  if (typeof children === 'number') return !isNaN(children);

  if (Array.isArray(children)) return children.length > 0;

  return !!children;
};

export default childrenExist;
