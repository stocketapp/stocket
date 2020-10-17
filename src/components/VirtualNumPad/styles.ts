import { ViewStyle, TextStyle, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

interface Styles {
  row: ViewStyle
  padBtn: ViewStyle
  numText: TextStyle
}
const styles: Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  padBtn: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '4%',
  },
  numText: {
    fontSize: 24,
    fontWeight: '300',
  },
})

export default styles
