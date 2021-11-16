import styled, { css } from '@emotion/native'
import customTheme from '@theme'

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

export const ProfileButtonItemContainer = styled.TouchableOpacity(({ theme }) => ({
  width: '100%',
  paddingVertical: theme.spacing.lg,
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.BG_DARK_CARD,
}))

export const ProfileButtonItemInner = styled.View({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const reportBugButton = css({
  paddingVertical: customTheme.spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: customTheme.spacing.md,
  marginRight: customTheme.spacing.screen,
})
