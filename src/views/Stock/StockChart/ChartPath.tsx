// @ts-ignore
import { ChartDot, ChartPath } from '@rainbow-me/animated-charts'
import { Dimensions, View } from 'react-native'
import { GREEN } from '@utils/colors'
const { width: SIZE } = Dimensions.get('window')

export default ({ setCurrentValues }: Props) => (
  <View>
    <ChartPath
      setCurrentValues={setCurrentValues}
      height={300}
      stroke={GREEN}
      strokeWidth={2}
      selectedStrokeWidth={2}
      width={SIZE}
    />
    <ChartDot style={{ backgroundColor: GREEN }} />
  </View>
)

type Props = {
  setCurrentValues?: (values: { x: string; y: string }) => void
}
