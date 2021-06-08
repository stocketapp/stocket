import { StyleSheet } from 'react-native'
import { SUB_BACKGROUND } from '@utils/colors'

export default StyleSheet.create({
  searchContainer: {
    paddingVertical: 6,
    paddingLeft: 20,
    paddingRight: 12,
    backgroundColor: SUB_BACKGROUND, // '#3F3F3F',
    width: '100%',
    borderRadius: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
    letterSpacing: 0.5,
    fontFamily: 'SFProText-Bold',
  },
  searchBtn: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
})
