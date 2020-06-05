import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { BACKGROUND, GRAY_DARKER, GREEN } from 'utils/colors'

type SearchResultProps = {
  item: {
    securityName: string,
    symbol: string,
  },
  onPress: () => void,
  setStock: (symbol: string) => void,
  uid: string,
}

export default ({
  item: { securityName, symbol },
  onPress,
  setStock,
  uid,
}: SearchResultProps) => (
  <TouchableOpacity style={styles.resultItem} onPress={() => setStock(symbol)}>
    <View>
      <Text weight="Medium" type="label">
        {securityName}
      </Text>
      <Text color={GRAY_DARKER} type="subtext" style={{ paddingTop: 5 }}>
        {symbol}
      </Text>
    </View>

    <TouchableOpacity
      style={{ padding: 6 }}
      onPress={() => onPress(uid, { symbol })}
    >
      <View style={styles.plus}>
        <Text type="title" style={{ bottom: 3.8, left: 0.5 }} status="positive">
          +
        </Text>
      </View>
    </TouchableOpacity>
  </TouchableOpacity>
)

const styles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: GRAY_DARKER,
    paddingVertical: 12,
    alignItems: 'center',
  },
  plus: {
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 100,
    height: 22,
    width: 22,
    alignItems: 'center',
  },
}