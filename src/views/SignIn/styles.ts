import styled, { css } from '@emotion/native'
import customTheme from '@theme'

export const SignInContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.BG_DARK,
}))

export const appleButtonStyles = css({
  shadowColor: customTheme.colors.BG_DARK,
  shadowOffset: { height: 1, width: 0 },
  shadowOpacity: 1,
  shadowRadius: 4,
  width: '70%',
  height: 45,
})

export const appleLogoImgStyles = css({
  resizeMode: 'contain',
  height: 160,
  marginBottom: '40%',
})
