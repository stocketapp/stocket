import ContentLoader, { Rect } from 'react-content-loader/native'
import { useWindowDimensions } from 'react-native'
export default function HorizontalListLoader() {
  const { SUB_BACKGROUND, GRAY_DARKER } = require('@utils/colors')
  const { width } = useWindowDimensions()

  return (
    <>
      <ContentLoader
        viewBox={`0 0 ${width} 165`}
        speed={1}
        animate
        backgroundColor={SUB_BACKGROUND}
        foregroundColor={GRAY_DARKER}
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
