import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@components'

type Props = {
  onPress?: () => void
  label: string
  value: string
}

export default function ({ onPress, label, value }: Props) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={styles.item}>
        <Text type="label" weight="Regular" color="GRAY">
          {label}
        </Text>
        <Text type="label" weight="Semibold">
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 15,
  },
})
