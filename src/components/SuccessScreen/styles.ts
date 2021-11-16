import styled from '@emotion/native'

export const SuccessScreenContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: theme.p.xlg,
}))

export const SucessBtn = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.GREEN,
  paddingVertical: 8,
  paddingHorizontal: 25,
  borderRadius: 100,
}))
