const mockMapContext = {
  on: () => jest.fn(),
  off: () => jest.fn(),
  once: () => jest.fn(),
  style: { style: 'test' },
  addControl: () => jest.fn(),
  loaded: jest.fn(() => {
    return true;
  })
};

export default mockMapContext;
