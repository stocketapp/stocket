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
}))

export const TradedStockHContainer = styled.View({
  width: '100%',
  flexDirection: 'row',
})

export const TradedStockVContainer = styled.View({
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
