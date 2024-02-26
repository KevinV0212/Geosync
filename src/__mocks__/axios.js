// const exportedObject = {
//    get: jest.fn(() => Promise.resolve({ data: null })),
// };

// export default exportedObject;

export default {
   request: jest.fn(() => Promise.resolve({ data: {} })),
   get: jest.fn(() => Promise.resolve({ data: {} })),
};
