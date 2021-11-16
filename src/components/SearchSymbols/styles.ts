import { css } from '@emotion/native'
import theme from '../../theme'

export const searchInputStyles = css({
  color: '#fff',
  fontSize: 20,
  flex: 1,
  letterSpacing: 0.5,
  fontFamily: 'SFProText-Medium',
})

export const searchInputContainerStyle = css({
  height: 50,
  backgroundColor: theme.colors.BG_DARK_CARD,
  borderRadius: 25,
  alignItems: 'center',
  flexDirection: 'row',
  zIndex: 10,
  width: '100%',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
})

export const searchResultContainerStyle = css({
  width: '100%',
  overflow: 'scroll',
  zIndex: 0,
  borderBottomEndRadius: 20,
  borderBottomStartRadius: 20,
  position: 'absolute',
  top: 20,
  left: 0,
  right: 0,
})
