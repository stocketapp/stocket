export default function NewsLoader() {
  const theme = require('@theme')
  const { Rect, default: ContentLoader } = require('react-content-loader/native')

  return (
    <>
      <ContentLoader
        viewBox="0 0 430 800"
        speed={1}
        animate
        backgroundColor={theme.colors.BG_DARK_SECONDARY}
        foregroundColor={theme.colors.GRAY}
      >
        {/* First */}
        <Rect x="10" y="60" rx="4" ry="4" width="160" height="125" />
        <Rect x="190" y="60" rx="4" ry="4" width="200" height="32" />
        <Rect x="190" y="100" rx="4" ry="4" width="230" height="32" />
        {/* Second */}
        <Rect x="10" y="210" rx="4" ry="4" width="160" height="125" />
        <Rect x="190" y="210" rx="4" ry="4" width="200" height="32" />
        <Rect x="190" y="250" rx="4" ry="4" width="230" height="32" />

        {/* Third */}
        <Rect x="10" y="360" rx="4" ry="4" width="160" height="125" />
        <Rect x="190" y="360" rx="4" ry="4" width="200" height="32" />
        <Rect x="190" y="400" rx="4" ry="4" width="230" height="32" />

        {/* Fourth */}
        <Rect x="10" y="510" rx="4" ry="4" width="160" height="125" />
        <Rect x="190" y="510" rx="4" ry="4" width="200" height="32" />
        <Rect x="190" y="550" rx="4" ry="4" width="230" height="32" />
      </ContentLoader>
    </>
  )
}
