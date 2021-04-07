export const StockHeaderLoader = () => {
  const { SUB_BACKGROUND, GRAY_DARKER } = require('@utils/colors')
  const { Rect, default: ContentLoader } = require('react-content-loader/native')
  const { Dimensions } = require('react-native')

  const { width } = Dimensions.get('screen')

  return (
    <ContentLoader
      viewBox="0 0 430 800"
      speed={1}
      animate
      backgroundColor={SUB_BACKGROUND}
      foregroundColor={GRAY_DARKER}
    >
      <Rect x="0" y="80" rx="4" ry="4" width="200" height="42" />
      <Rect x="0" y="130" rx="4" ry="4" width="100" height="36" />

      <Rect x="0" y="190" rx="4" ry="4" width={width + 56} height="320" />
    </ContentLoader>
  )
}
