import styled, { css } from '@emotion/native'
import { SUB_BACKGROUND } from '@utils/colors'
import cssTheme from '../../theme'

export const Image = styled.Image({
  height: 52,
  width: 52,
  borderRadius: 50,
  overflow: 'hidden',
  zIndex: 1,
})

export const ImageContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.xsm,
  backgroundColor: theme.colors.BG_DARK_CARD,
  borderRadius: 50,
  height: 52,
  width: 52,
  alignItems: 'center',
  justifyContent: 'center',
}))

export const Button = styled.TouchableOpacity(({ theme }) => ({
  marginRight: theme.m.sm,
}))

export const ChangePctContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.md,
  paddingVertical: theme.p.sm,
  borderRadius: 150,
}))

export const listStyle = css({
  minHeight: 100,
})

export const listContentStyle = css({
  paddingTop: cssTheme.p.lg,
})

export const listEmptyStyle = css({
  width: '100%',
  alignItems: 'center',
})

export const itemContainer = css({
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

export const EmptyContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  height: 150,
  width: '100%',
})
