import theme from '@theme'

export default function OverviewLoader({ withPosition }: { withPosition?: boolean }) {
  const { Rect, default: ContentLoader } = require('react-content-loader/native')
  const { Dimensions } = require('react-native')
  const { width } = Dimensions.get('screen')
  const { G } = require('react-native-svg')

  return (
    <ContentLoader
      viewBox="0 0 430 800"
      speed={1}
      animate
      backgroundColor={theme.colors.BG_DARK_SECONDARY}
      foregroundColor={theme.colors.GRAY}
    >
      <G x="0">
        <Rect y="10" rx="12" ry="12" width="200" height="40" />
        <Rect y="80" rx="12" ry="12" width={width + 56} height="240" />
      </G>

      <G y="350">
        <Rect x="0" rx="12" ry="12" width="260" height="160" />
        <Rect x="270" rx="12" ry="12" width="260" height="160" />
      </G>

      {withPosition && (
        <G>
          <Rect y="540" rx="12" ry="12" width="200" height="36" />
          <G x="0">
            <Rect y="600" rx="12" ry="12" width="120" height="26" />
            <Rect y="640" rx="12" ry="12" width="130" height="26" />
            <Rect y="680" rx="12" ry="12" width="110" height="26" />
          </G>
          <G>
            <Rect x={width - 126} y="600" rx="12" ry="12" width="180" height="26" />
            <Rect x={width - 86} y="640" rx="12" ry="12" width="140" height="26" />
            <Rect x={width - 86} y="680" rx="12" ry="12" width="140" height="26" />
          </G>
        </G>
      )}
    </ContentLoader>
  )
}
