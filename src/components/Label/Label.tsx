import { View, ViewStyle } from 'react-native'
import Container from '../Container'
import Text from '../Text'
import type { LabelProps } from 'types'

const styles: ViewStyle = {
  flex: 0.5,
}

const Label = ({ title, value, children, style }: LabelProps) => (
  <Container separate style={[styles, style]}>
    <Text type="label" color="GRAY">
      {title}
    </Text>
    <View>{!value ? children : <Text type="label">{value}</Text>}</View>
  </Container>
)

export default Label
