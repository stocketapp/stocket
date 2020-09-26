import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { BACKGROUND, GRAY_DARKER, GREEN } from '@utils/colors'
import { FavoriteIcon } from '@components/Icons'

type SearchResultProps = {
  item: {
    companyName: string,
    symbol: string,
  },
  onPress: () => void,
  setStock: (symbol: string) => void,
  uid: string,
  isFaved: (symbol: string) => void,
}

export default function SearchResult({
  item,
  onPress,
  setStock,
  uid,
  isFaved,
}: SearchResultProps) {
  const isFav = isFaved(item?.symbol)
  return (
    <TouchableOpacity style={styles.resultItem} onPress={setStock}>
      <View style={{ flex: 1 }}>
        <Text weight="Medium" type="label">
          {item?.securityName}
        </Text>
        <Text color={GRAY_DARKER} type="subtext" style={{ paddingTop: 5 }}>
          {item?.symbol}
        </Text>
      </View>

      <TouchableOpacity
        style={{ padding: 6 }}
        onPress={() => onPress(uid, item?.symbol, isFav)}
      >
        <FavoriteIcon size={26} color={GREEN} filled={isFav} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

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
