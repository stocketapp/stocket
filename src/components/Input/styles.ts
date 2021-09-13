import styled, { css } from '@emotion/native'
import { GREEN } from '@utils/colors'

export const InputContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.BG_DARK_SECONDARY,
  paddingVertical: theme.p.md,
  paddingHorizontal: theme.p.md,
  borderRadius: 6,
  width: '100%',
  marginBottom: 10,
}))

export const CustomInput = styled.TextInput(({ theme }) => ({
  fontFamily: 'SFProText-Medium',
  fontSize: 20,
  paddingVertical: theme.p.sm,
  color: 'white',
}))

export const animatedLineStyles = css({
  backgroundColor: GREEN,
  height: 1.5,
  borderRadius: 12,
  width: '100%',
  marginTop: 2,
})
