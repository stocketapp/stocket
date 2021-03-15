import styled from '@emotion/native'

export const HeaderContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  width: '100%',
  paddingTop: theme.p.md,
}))

export const StatusContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingBottom: theme.p.md,
}))
