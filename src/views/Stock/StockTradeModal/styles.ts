import styled, { css } from '@emotion/native'
import { CARD_BACKGROUND } from '@utils/colors'
import leTheme from '../../../theme'

export const tradeViewcContainerStyles = css({
  borderRadius: 30,
  backgroundColor: CARD_BACKGROUND,
})

export const TradeContentContainer = styled.View(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.p.screen,
  paddingTop: theme.p.xxlg,
  backgroundColor: theme.colors.BG_DARK_CARD,
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
  height: 58,
  width: 58,
  borderRadius: 35,
})

export const purchaseDetails = css({
  paddingTop: leTheme.m.huge,
})

export const totalContainerStyles = css({
  paddingTop: leTheme.m.xxlg,
})

const buttonStyle = css({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: leTheme.p.lg,
  borderRadius: 12,
  marginVertical: leTheme.m.huge,
})

export const ButtonBuy = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.GREEN,
  ...buttonStyle,
}))

export const ButtonSell = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.RED,
  ...buttonStyle,
}))
