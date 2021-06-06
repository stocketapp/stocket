import styled from '@emotion/native'

export const CustomButton = styled.TouchableOpacity(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: theme.p.lg,
  paddingHorizontal: theme.p.xxlg,
  borderRadius: 12,
  marginVertical: theme.m.md,
}))
