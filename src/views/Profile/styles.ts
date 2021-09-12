import styled from '@emotion/native'

export const Content = styled.View({
  width: '100%',
})

export const Row = styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: theme.spacing.xlg,
}))

export const AddCashButtonContainer = styled.TouchableOpacity(({ theme }) => ({
  paddingVertical: 8,
  paddingHorizontal: 10,
  borderRadius: 1000,
  backgroundColor: theme.colors.GREEN,
}))
