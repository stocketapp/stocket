// @flow
import React from 'react'
import { View } from 'react-native'
import { GRAY_DARKER, LABEL, GREEN, RED } from 'utils/colors'
import Text from './Text'
import { formatCurrency } from 'utils/functions'

type Props = {
  value: string,
  dayChange: {
    change: number,
    changePct: number,
    value: string | number,
  },
}

const Balance = ({ dayChange }: Props): React$Node => {
  const { change, changePct, value } = dayChange
  const color = changePct > 0 ? GREEN : changePct < 0 ? RED : 'white'
  return (
    <View>
      <Text color={GRAY_DARKER} type="label">
        Invested
      </Text>
      <Text weight="Black" style={styles.value}>
        {typeof value !== 'number' ? value : formatCurrency(value)}
      </Text>
      <View style={styles.changeContainer}>
        <Text weight="Medium" color={color}>
          {changePct > 0 && '+'}
          {`${formatCurrency(change)} (${changePct?.toFixed(2)}%)`}
        </Text>
        <Text weight="Light" color={LABEL}>
          {' '}
          Today
        </Text>
      </View>
    </View>
  )
}

const styles = {
  changeContainer: { flexDirection: 'row', paddingTop: 5 },
  value: { fontSize: 34, paddingTop: 10 },
}

export default Balance
