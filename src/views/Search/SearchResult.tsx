import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { GRAY_DARKER, GREEN } from '@utils/colors'
import { FavoriteIcon } from '@icons'
import styles from './styles'

interface SearchResultProps {
  item: {
    securityName: string
    symbol: string
  }
  onPress: (symbol: string, isFav: boolean) => void
  setStock: () => void
  isFaved: (symbol: string) => boolean
}

export default function SearchResult({ item, onPress, setStock, isFaved }: SearchResultProps) {
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
        onPress={() => onPress(item?.symbol, isFaved(item?.symbol))}
      >
        <FavoriteIcon size={26} color={GREEN} filled={isFav} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
