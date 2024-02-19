const exportedObject = {
   get: jest.fn(() => Promise.resolve({ data: null })),
};
