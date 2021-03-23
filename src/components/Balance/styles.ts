import styled, { css } from '@emotion/native'

export const ChangeContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  paddingTop: theme.p.sm,
  flexWrap: 'wrap',
}))

export const BalanceContaienr = styled.View(() => ({
  // paddingBottom: theme.p.xlg,
}))

export const valueStyle = css({
  fontSize: 35,
})
