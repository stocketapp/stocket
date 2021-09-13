import styled from '@emotion/native'

export const Item = styled.View(({ theme }) => ({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  paddingVertical: theme.spacing.lg,
  alignItems: 'flex-end',
}))
