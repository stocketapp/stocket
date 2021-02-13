import styled from '@emotion/native'

export const Image = styled.Image({
  height: 44,
  width: 44,
  borderRadius: 22,
})

export const ImageContainer = styled.View({
  paddingHorizontal: 2,
})

export const ItemLeftContainer = styled.View({
  width: '100%',
  flex: 0.8,
  flexDirection: 'row',
})

export const ItemRightContainer = styled.View({
  justifyContent: 'space-between',
})

export const WatchlistItemContainer = styled.View({
  paddingVertical: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
})

export const SymbolAndName = styled.View({
  justifyContent: 'space-between',
  paddingLeft: 15,
})

export const Change = styled.View({
  paddingVertical: 2,
  paddingHorizontal: 6,
  minWidth: 70,
  borderRadius: 4,
  marginTop: 3,
})
