// @flow
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Divider } from 'components'
import { GREEN, LABEL } from 'utils/colors'

type TradeActionPropTypes = {
  onActionChange: (action: string) => void,
  action: string,
}

export default ({ onActionChange, action }: TradeActionPropTypes) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onActionChange('BUY')}>
      <Text color={action === 'BUY' ? GREEN : LABEL} weight="900" type="label">
        BUY
      </Text>
    </TouchableOpacity>

    <Divider vertical />

    <TouchableOpacity onPress={() => onActionChange('SELL')}>
      <Text color={action === 'SELL' ? GREEN : LABEL} weight="900" type="label">
        SELL
      </Text>
    </TouchableOpacity>
  </View>
)

const styles = {
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingTop: 20,
  },
}
