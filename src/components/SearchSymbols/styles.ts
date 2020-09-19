import { StyleSheet } from 'react-native'
import { SUB_BACKGROUND } from '@utils/colors'

export default StyleSheet.create({
  searchContainer: {
    paddingVertical: 3,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: SUB_BACKGROUND, // '#3F3F3F',
    width: '100%',
    borderRadius: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  searchBtn: {
    paddingVertical: 3,
    paddingHorizontal: 1,
  },
})
