import styled from '@emotion/native'

export const DetailContainer = styled.View(({ theme }) => ({
  paddingVertical: theme.p.md,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}))

export const ButtonTrade = styled.TouchableOpacity(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: theme.p.lg,
  borderRadius: 12,
  marginBottom: theme.m.xxlg,
  marginTop: theme.m.lg,
  marginHorizontal: theme.p.huge,
  width: '100%',
}))

export const StockLogo = styled.Image(({ theme }) => ({
  height: 48,
  width: 48,
  borderRadius: 100,
  marginRight: theme.p.lg,
}))
