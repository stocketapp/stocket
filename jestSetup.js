/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import './__mocks__/@react-native-firebase/messaging'
import './__mocks__/@react-native-firebase/auth'
import './__mocks__/@react-native-firebase/firestore'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
