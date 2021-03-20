export const StockHeaderLoader = () => {
  const { SUB_BACKGROUND, GRAY_DARKER } = require('@utils/colors')
  const ContentLoader = require('react-content-loader/native').default
  const { Circle, Rect } = require('react-content-loader/native')

  return (
    <ContentLoader
      viewBox="0 0 430 800"
      speed={1}
      animate
      backgroundColor={SUB_BACKGROUND}
      foregroundColor={GRAY_DARKER}
    >
      {/* <Circle cx="40" cy="40" r="40" /> */}
      <Rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
      <Rect x="0" y="40" rx="4" ry="4" width="100" height="40" />
    </ContentLoader>
  )
}
