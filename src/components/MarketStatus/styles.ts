import { SUB_BACKGROUND } from '@utils/colors'
import { css } from '@emotion/native'

export const containerStyles = css({
  flexDirection: 'row',
  backgroundColor: SUB_BACKGROUND,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  overflow: 'hidden',
  height: 32,
  paddingHorizontal: 16,
})

export const dotStyles = css({
  height: 12,
  width: 12,
  borderRadius: 6,
})
