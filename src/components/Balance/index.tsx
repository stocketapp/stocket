import React from 'react'
import { View } from 'react-native'
import { LABEL, GREEN, RED } from '@utils/colors'
import Text from '../Text'
import { formatCurrency } from '@utils/functions'
import styles from './styles'

interface Props {
  dayChange: {
    change: number
    changePct: number
    value: string | number
    date: string
  }
}

const Balance = ({ dayChange }: Props): JSX.Element => {
  const { change, changePct, value, date } = dayChange
  const color = changePct > 0 ? GREEN : changePct < 0 ? RED : 'white'

  return (
    <>
      <Text weight="Black" style={styles.value}>
        {typeof value !== 'number' ? value : formatCurrency(value)}
      </Text>
      <View style={styles.changeContainer}>
        <Text weight="Medium" color={color}>
          {changePct > 0 && '+'}
          {`${formatCurrency(change)} (${(changePct ?? 0)?.toFixed(2)}%)`}
        </Text>
        <Text weight="Light" color={LABEL}>
          {' '}
          {date}
        </Text>
      </View>
    </>
  )
}

export default Balance
