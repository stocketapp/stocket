import { Alert } from 'react-native'

export default function (err: string) {
  switch (err) {
    case 'user_cancelled':
      break
    case 'receipt_validation_failed':
      Alert.alert(
        "We're having trouble validating your transaction",
        "Give us some time, we'll retry to validate your transaction ASAP!",
      )
      break
    case 'receipt_request_failed':
      Alert.alert(
        "We're having trouble validating your transaction",
        'Please try to restore your purchases later (Button in the settings) or contact the support (support@myapp.com)',
      )
      break
    default:
      Alert.alert(
        'Purchase error',
        'We were not able to process your purchase, please try again later or contact the support (support@myapp.com)',
      )
  }
}
