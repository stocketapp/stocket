import styled, { css } from '@emotion/native'

export const chartLabel = css({
  fontSize: 32,
  color: '#fff',
  fontFamily: 'SFProText-Black',
})

export const StockChartRangeTabsContainer = styled.View({
  height: 40,
  width: '100%',
  flexDirection: 'row',
  paddingHorizontal: 40,
  justifyContent: 'space-between',
  marginBottom: '6%',
})

export const Tab = styled.View({
  borderRadius: 50,
  width: 40,
  height: 20,
  justifyContent: 'center',
  alignItems: 'center',
})

export const TabPressable = styled.Pressable({
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: 55,
})
