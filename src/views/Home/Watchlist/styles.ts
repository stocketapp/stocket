import styled from '@emotion/native'

export const Image = styled.Image({
  height: 44,
  width: 44,
  borderRadius: 22,
})

export const ImageContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.p.xsm,
}))

export const ItemLeftContainer = styled.View({
  flex: 0.8,
  flexDirection: 'row',
})

export const ItemRightContainer = styled.View({
  justifyContent: 'space-between',
  alignItems: 'flex-end',
})

export const WatchlistItemContainer = styled.View(({ theme }) => ({
  paddingVertical: theme.p.lg,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}))

export const SymbolAndName = styled.View(({ theme }) => ({
  justifyContent: 'space-between',
  paddingLeft: theme.p.md,
}))

export const Change = styled.View(({ theme }) => ({
  paddingVertical: theme.p.xsm,
  paddingHorizontal: theme.p.sm,
  width: 72,
  borderRadius: 4,
  marginTop: theme.m.sm,
}))
