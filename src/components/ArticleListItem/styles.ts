import styled from '@emotion/native'

const imgStyles = {
  height: 95,
  width: 125,
  borderRadius: 4,
}

export const ArticleImage = styled.Image(imgStyles)

export const HeadlineContainer = styled.View({
  paddingLeft: 20,
  flex: 1,
  justifyContent: 'space-between',
})

export const NoImage = styled.View(({ theme }) => ({
  ...imgStyles,
  backgroundColor: theme.colors.GRAY,
}))

export const ArticleContainer = styled.View(({ theme }) => ({
  paddingVertical: theme.p.md,
  flexDirection: 'row',
}))
