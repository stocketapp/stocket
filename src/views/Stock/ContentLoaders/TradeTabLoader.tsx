export default function TradeTabLoader() {
  const { SUB_BACKGROUND, GRAY_DARKER } = require('@utils/colors')
  const { Rect, default: ContentLoader } = require('react-content-loader/native')

  return (
    <ContentLoader
      viewBox="0 0 495 800"
      speed={1.1}
      animate
      backgroundColor={SUB_BACKGROUND}
      foregroundColor={GRAY_DARKER}
    >
      {/* First */}
      <Rect x="24" y="00" rx="4" ry="4" width="180" height="52" />
      <Rect x="24" y="65" rx="4" ry="4" width="130" height="32" />

      <Rect x="0" y="120" rx="4" ry="4" width="100%" height="500" />
    </ContentLoader>
  )
}
