import { View, Dimensions } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { scaleLinear, scaleTime } from 'd3-scale'
import * as shape from 'd3-shape'
import ChartCursor from './ChartCursor'
import ChartHeader from './ChartHeader'
import theme from '@theme'
import { useVector } from 'react-native-redash'
import { useSharedValue } from 'react-native-reanimated'

const n = (1 + Math.sqrt(9)) / 2
const { width, height: wHeight } = Dimensions.get('window')
const height = (1 - 1 / n) * wHeight
const strokeWidth = 4
const padding = strokeWidth / 2
const getDomain = (domain: number[]) => [Math.min(...domain), Math.max(...domain)]

export default function LineChart({ data, defaultValues }: GraphProps) {
  const translation = useVector()
  const active = useSharedValue(false)
  const domainX = getDomain(data.map(d => d.date))
  const domainY = getDomain(data.map(d => d.values.price))
  // const domainY2 = getDomain(data.map(d => d.values.change))
  const scaleX = scaleTime().domain(domainX).range([0, width])
  const scaleY = scaleLinear().domain(domainY).range([height, padding])
  const d = shape
    .line<DataPoint>()
    .x(p => scaleX(p.date))
    .y(p => scaleY(p.values.price))
    .curve(shape.curveBasis)(data) as string
  return (
    <View style={{ flex: 1 }}>
      <ChartHeader
        // data={{ domainX, domainY, domainY2 }}
        data={{ domainX, domainY }}
        translation={translation}
        active={active}
        defaultValues={defaultValues}
      />
      <View>
        <Svg width={width} height={height}>
          <Path d={`${d}L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
          <Path fill="transparent" stroke={theme.colors.GREEN} {...{ d, strokeWidth }} />
        </Svg>
        <ChartCursor d={d} translation={translation} active={active} />
      </View>
    </View>
  )
}
interface DataPoint {
  date: number
  values: { price: number; change: number }
}

interface GraphProps {
  data: DataPoint[]
  defaultValues: {
    price: number
    change: number
  }
}
