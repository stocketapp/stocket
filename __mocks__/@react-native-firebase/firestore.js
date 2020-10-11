jest.mock('../../node_modules/@react-native-firebase/firestore', () => {
  return () => ({
    default: jest.fn(),
    collection: jest.fn(),
  })
})
