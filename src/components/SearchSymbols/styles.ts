import { css } from '@emotion/native'
import theme from '../../theme'

export const searchInputStyles = css({
  color: '#fff',
  fontSize: 20,
  flex: 1,
  letterSpacing: 0.5,
  fontFamily: 'SFProText-Semibold',
})

export const searchInputContainerStyle = css({
  height: 50,
  backgroundColor: theme.colors.BG_DARK_CARD,
  borderRadius: 25,
  alignItems: 'center',
  flexDirection: 'row',
})
