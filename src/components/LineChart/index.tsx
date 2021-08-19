import { View, Dimensions, StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { scaleLinear, scaleTime } from 'd3-scale'
import * as shape from 'd3-shape'
import ChartCursor from './ChartCursor'
import Animated, { useSharedValue } from 'react-native-reanimated'

const n = (1 + Math.sqrt(5)) / 2
const { width, height: wHeight } = Dimensions.get('window')
const height = (1 - 1 / n) * wHeight
const strokeWidth = 4
const padding = strokeWidth / 2
const getDomain = (domain: number[]) => [Math.min(...domain), Math.max(...domain)]

const fakeData = [
  { date: new Date(2021, 8, 1).getTime(), value: 1000 },
  { date: new Date(2021, 8, 2).getTime(), value: 978.67 },
  { date: new Date(2021, 8, 3).getTime(), value: 998.91 },
  { date: new Date(2021, 8, 4).getTime(), value: 1209.71 },
  { date: new Date(2021, 8, 5).getTime(), value: 1509.98 },
  { date: new Date(2021, 8, 6).getTime(), value: 1458.01 },
  { date: new Date(2021, 8, 7).getTime(), value: 858.01 },
  { date: new Date(2021, 8, 8).getTime(), value: 1878.01 },
  { date: new Date(2021, 8, 9).getTime(), value: 1878.01 },
  { date: new Date(2021, 8, 10).getTime(), value: 1778.01 },
  { date: new Date(2021, 8, 11).getTime(), value: 1978.01 },
]

export default function LineChart({ data = fakeData }: GraphProps) {
  const y = useSharedValue(0)
  const scaleX = scaleTime()
    // @ts-ignore
    .domain(getDomain(data.map(d => d.date)))
    .range([0, width])
  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d.value)))
    .range([height, padding])
  const d = shape
    .line<DataPoint>()
    .x(p => scaleX(p.date))
    .y(p => scaleY(p.value))
    .curve(shape.curveBasis)(data) as string
  return (
    <View style={{ width, height }}>
      <Svg style={StyleSheet.absoluteFill}>
        <Path d={`${d}L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
        <Path fill="transparent" stroke="#3977e3" {...{ d, strokeWidth }} />
      </Svg>
      <ChartCursor d={d} y={y} />
    </View>
  )
}
interface DataPoint {
  date: number
  value: number
}

interface GraphProps {
  data?: DataPoint[]
}

interface HeaderProps {
  data: Animated.SharedValue<{
    price: number
    change: number
    label: string
  }>
  y: Animated.SharedValue<number>
}
