import styled, { css } from '@emotion/native'

export const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.BG_DARK_CARD,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing.lg,
}))

export const columnWrapperStyle = css({
  justifyContent: 'flex-start',
  width: '100%',
})

export const contentContainerStyle = css({
  alignItems: 'center',
  justifyContent: 'center',
})
