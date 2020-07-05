// @flow
import React from 'react'
import { View } from 'react-native'
import { GRAY_DARKER, LABEL, GREEN, RED } from 'utils/colors'
import Text from './Text'
import Container from './Container'

type Props = {
  value: string,
  dayChange: number,
}

const Balance = ({ value, dayChange }: Props): React$Node => {
  const color = dayChange > 0 ? GREEN : dayChange < 0 ? RED : 'white'
  return (
    <Container ph top={16}>
      <Text color={GRAY_DARKER} type="label">
        Invested
      </Text>
      <Text weight="Black" style={styles.value}>
        {value || '$0.00'}
      </Text>
      <View style={styles.changeContainer}>
        <Text weight="Light" color={LABEL}>
          Today's change{' '}
        </Text>
        <Text weight="Bold" color={color}>
          {dayChange > 0 && '+'}
          {dayChange}
        </Text>
      </View>
    </Container>
  )
}

const styles = {
  changeContainer: { flexDirection: 'row', paddingTop: 5 },
  value: { fontSize: 34, paddingTop: 10 },
}

export default Balance
