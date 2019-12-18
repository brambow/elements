import mapExists from './mapExists';

const blankMap = {};
const notMap = { a: 'x', b: 9 };

describe('mapExists function', () => {
  it('returns false for blank object', () => {
    expect(mapExists(blankMap)).toBe(false);
  });
  it('returns false for non-map object', () => {
    expect(mapExists(notMap)).toBe(false);
  });
});
