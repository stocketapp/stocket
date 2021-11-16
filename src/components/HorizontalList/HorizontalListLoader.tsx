import { useWindowDimensions } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import theme from '@theme'

export default function HorizontalListLoader() {
  const { width } = useWindowDimensions()

  return (
    <>
      <ContentLoader
        viewBox={`0 0 ${width} 165`}
        speed={1}
        animate
        backgroundColor={theme.colors.BG_DARK_SECONDARY}
        foregroundColor={theme.colors.GRAY}
        width={width}
        height={185}
      >
        <Rect x="0" y="15" rx="12" ry="12" width="130" height="155" />
        <Rect x="145" y="15" rx="12" ry="12" width="130" height="155" />
        <Rect x="290" y="15" rx="12" ry="12" width="130" height="155" />
      </ContentLoader>
    </>
  )
}
