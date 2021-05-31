// @ts-ignore
import { ChartDot, ChartPath } from '@rainbow-me/animated-charts'
import { Dimensions, View } from 'react-native'
import { GREEN } from '@utils/colors'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

const ChartPathWithDot = ({ setCurrentValues }: ChartProps) => (
  <View>
    <ChartPath
      setCurrentValues={setCurrentValues}
      stroke={GREEN}
      strokeWidth={2}
      selectedStrokeWidth={2}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT - WINDOW_HEIGHT / 1.8}
    />
    <ChartDot style={{ backgroundColor: GREEN }} />
  </View>
)

export default ChartPathWithDot

type ChartProps = {
  setCurrentValues?: (values: { x: string; y: string }) => void
}
