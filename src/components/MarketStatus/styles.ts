import { StyleSheet } from 'react-native'
import { SUB_BACKGROUND, GREEN } from '@utils/colors'

export default StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: GREEN,
    marginLeft: 4,
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: SUB_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.7,
    maxHeight: 38,
    marginBottom: 2,
  },
})
