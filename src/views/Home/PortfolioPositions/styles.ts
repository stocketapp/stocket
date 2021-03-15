import styled, { css } from '@emotion/native'
import { SUB_BACKGROUND } from '@utils/colors'
import cssTheme from '../../../theme'

export const Image = styled.Image({
  height: 46,
  width: 46,
  borderRadius: 22,
})

export const ImageContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.xsm,
}))

export const PositionButton = styled.TouchableOpacity(({ theme }) => ({
  marginRight: theme.m.sm,
}))

export const ChangePctContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.md,
  paddingVertical: theme.p.sm,
  borderRadius: 150,
}))

export const portfolioListStyle = css({
  minHeight: 100,
})

export const portfolioListContentStyle = css({
  paddingTop: cssTheme.p.lg,
})

export const portfolioListEmptyStyle = css({
  width: '100%',
  alignItems: 'center',
})

export const positionItemContainer = css({
  width: 130,
  minHeight: 155,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: cssTheme.p.xlg,
  paddingBottom: cssTheme.p.xlg,
  backgroundColor: SUB_BACKGROUND,
  borderRadius: 12,
  marginRight: cssTheme.m.md,
})
