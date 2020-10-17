jest.mock('../../node_modules/@react-native-firebase/auth', () => {
  return () => ({
    onAuthStateChanged: jest.fn(),
  })
})
