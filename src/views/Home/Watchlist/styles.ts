import styled from '@emotion/native'

export const Image = styled.Image({
  height: 44,
  width: 44,
  borderRadius: 22,
})

export const ImageContainer = styled.View(({ theme }) => ({
  paddingRight: theme.p.md,
}))

export const Change = styled.View(({ theme }) => ({
  paddingVertical: theme.p.xsm,
  paddingHorizontal: theme.p.sm,
  width: 70,
  borderRadius: 4,
  marginTop: theme.m.sm,
}))
