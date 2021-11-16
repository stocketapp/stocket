import styled from '@emotion/native'

export const LogoImage = styled.Image({
  width: 50,
  height: 50,
  borderRadius: 50,
})

export const StockNavHeaderContainer = styled.View(({ theme }) => ({
  width: '100%',
  paddingTop: theme.p.md,
  paddingHorizontal: theme.p.lg,
  backgroundColor: theme.colors.BG_DARK,
  justifyContent: 'space-between',
  flexDirection: 'row',
}))

export const StockNavHeaderInner = styled.View({
  alignItems: 'center',
  justifyContent: 'space-between',
})
