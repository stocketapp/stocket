import styled, { css } from '@emotion/native'

export const ChangeContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  paddingTop: theme.p.sm,
  flexWrap: 'wrap',
}))

export const BalanceContaienr = styled.View(({ theme }) => ({
  paddingTop: theme.p.lg,
}))

export const valueStyle = css({
  fontSize: 35,
})
