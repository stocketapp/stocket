import styled from '@emotion/native'

export const TradeButtonsContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: theme.p.screen,
  justifyContent: 'space-between',
  paddingVertical: theme.spacing.huge,
}))

export const TradeButton = styled.TouchableOpacity(({ theme }) => ({
  paddingVertical: theme.p.lg,
  borderRadius: 12,
  width: '45%',
  justifyContent: 'center',
  alignItems: 'center',
}))
