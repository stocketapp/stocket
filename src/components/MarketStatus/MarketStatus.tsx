import React from 'react'
import { View } from 'react-native'
import Text from '../Text'
import { useSubscribeMarketHours } from '@hooks'
import { GREEN, LABEL } from '@utils/colors'
import styles from './styles'

interface Props {
  label: string
  status: boolean
}

const MarketStatus = ({ label }: Props) => {
  const status = useSubscribeMarketHours()
  const statusLabel = `Market is ${status ? 'open' : 'closed'}` ?? label
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 12 }} weight={status ? 'Medium' : 'Light'}>
        {statusLabel}
      </Text>
      <View
        style={{ ...styles.dot, backgroundColor: status ? GREEN : LABEL }}
      />
    </View>
  )
}

export default MarketStatus
