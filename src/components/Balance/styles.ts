import styled, { css } from '@emotion/native'

export const ChangeContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  paddingTop: theme.p.sm,
  flexWrap: 'wrap',
}))

export const BalanceContaienr = styled.View(() => ({
  minHeight: 70,
}))

export const valueStyle = css({
  fontSize: 35,
})
