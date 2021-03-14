import styled, { css } from '@emotion/native'
import { SUB_BACKGROUND } from '@utils/colors'

export const Image = styled.Image({
  height: 46,
  width: 46,
  borderRadius: 22,
})

export const ImageContainer = styled.View({
  paddingHorizontal: 2,
})

export const PositionButton = styled.TouchableOpacity({
  marginRight: 15,
})

export const ChangePctContainer = styled.View({
  paddingHorizontal: 15,
  paddingVertical: 5,
  borderRadius: 150,
})

export const portfolioListStyle = css({
  minHeight: 100,
})

export const portfolioListContentStyle = css({
  paddingVertical: 10,
})

export const portfolioListEmptyStyle = css({
  width: '100%',
  alignItems: 'center',
})

export const positionItemContainer = css({
  width: 130,
  minHeight: 152,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: SUB_BACKGROUND,
  borderRadius: 12,
  marginRight: 10,
})

export const containerListStyle = css({
  marginTop: 40,
})
