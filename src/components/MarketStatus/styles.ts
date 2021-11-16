import theme from '@theme'
import { css } from '@emotion/native'

export const containerStyles = css({
  flexDirection: 'row',
  backgroundColor: theme.colors.BG_DARK_SECONDARY,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  overflow: 'hidden',
  height: 32,
  paddingHorizontal: 16,
})

export const dotStyles = css({
  height: 10,
  width: 10,
  borderRadius: 6,
})
