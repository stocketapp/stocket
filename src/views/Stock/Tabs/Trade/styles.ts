import styled from '@emotion/native'

export const TradeButtonsContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: theme.p.screen,
  justifyContent: 'space-between',
  paddingVertical: theme.p.lg,
}))

export const TradeButton = styled.TouchableOpacity(({ theme }) => ({
  paddingHorizontal: '18%',
  paddingVertical: theme.p.lg,
  borderRadius: 12,
}))
