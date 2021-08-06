import styled from '@emotion/native'

export const ScrollView = styled.ScrollView(({ theme }) => ({
  paddingVertical: theme.spacing.lg,
}))

export const StatsListItemContainer = styled.View(({ theme }) => ({
  width: 260,
  height: 160,
  backgroundColor: theme.colors.BG_DARK_CARD,
  borderRadius: 12,
  padding: theme.p.lg,
  marginRight: theme.m.md,
  justifyContent: 'space-between',
}))

export const StatLineContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: theme.spacing.sm,
  width: '100%',
}))

export const PositionDetailContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  paddingVertical: theme.p.md,
}))
