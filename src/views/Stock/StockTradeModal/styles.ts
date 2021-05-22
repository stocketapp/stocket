import styled, { css } from '@emotion/native'
import { CARD_BACKGROUND } from '@utils/colors'
import leTheme from '../../../theme'

export const tradeViewcContainerStyles = css({
  borderRadius: 30,
  backgroundColor: CARD_BACKGROUND,
})

export const TradeContentContainer = styled.View(({ theme }) => ({
  flex: 1,
  paddingTop: theme.p.lg,
  backgroundColor: theme.colors.BG_DARK_CARD,
  // paddingBottom: theme.p.md,
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

export const StockLogo = styled.Image({
  height: 80,
  width: 80,
  borderRadius: 50,
})

export const purchaseDetails = css({
  paddingTop: leTheme.m.huge,
  paddingHorizontal: leTheme.p.screen,
})

export const totalContainerStyles = css({
  paddingTop: leTheme.m.huge,
  justifyContent: 'space-between',
})

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
}))

export const ButtonSell = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.RED,
  ...buttonStyle,
}))

export const companyVStackExtraStyles = css({
  paddingHorizontal: leTheme.p.screen,
  alignItems: 'center',
})

export const companyHStackExtraStyles = css({
  justifyContent: 'center',
  alignItems: 'center',
})

export const quantityContainer = css({
  justifyContent: 'center',
})

export const hStackSeparate = css({
  justifyContent: 'space-between',
})
