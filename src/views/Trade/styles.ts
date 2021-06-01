import styled, { css } from '@emotion/native'
import leTheme from '../../theme'

export const TradeContentContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.BG_DARK_CARD,
  justifyContent: 'space-between',
}))

export const HStack = styled.View({
  width: '100%',
  flexDirection: 'row',
})

export const VStack = styled.View({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const StockLogo = styled.Image(({ theme }) => ({
  height: 48,
  width: 48,
  borderRadius: 100,
  marginRight: theme.p.lg,
}))

const buttonStyle = css({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: leTheme.p.lg,
  borderRadius: 12,
  marginBottom: leTheme.m.xxlg,
  marginTop: leTheme.m.lg,
})

export const ButtonTrade = styled.TouchableOpacity(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: theme.p.lg,
  borderRadius: 12,
  marginBottom: theme.m.xxlg,
  marginTop: theme.m.lg,
  marginHorizontal: theme.p.huge,
}))

export const ButtonSell = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.RED,
  ...buttonStyle,
}))

export const quantityContainer = css({
  justifyContent: 'center',
})

export const TradeModalTitleContainer = styled.View({
  flexDirection: 'column',
  alignItems: 'center',
})

export const TradeModalTop = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  paddingHorizontal: theme.p.screen,
  paddingBottom: theme.p.sm,
}))
export const TradeModalNameAndPrice = styled.View({
  flexDirection: 'column',
})

export const TradeModalKeyboardContainer = styled.View(({ theme }) => ({
  justifyContent: 'space-between',
  paddingBottom: theme.p.lg,
}))

export const TradeAccountBalanceContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.huge,
  width: '100%',
  top: theme.p.xxlg,
}))

export const TradeAccountBalanceInner = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.lg,
  paddingVertical: theme.p.xlg,
  borderWidth: 1,
  borderRadius: 12,
  borderColor: theme.colors.BG_DARK_SECONDARY,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

export const TradeAccountBalanceLabels = styled.View({
  flexDirection: 'column',
})
