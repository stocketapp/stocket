jest.mock('../../node_modules/@react-native-firebase/messaging', () => {
  return () => ({
    setBackgroundMessageHandler: jest.fn(),
  })
})
