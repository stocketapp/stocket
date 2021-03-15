import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { GREEN, RED, LABEL } from '@utils/colors'
import {
  Image,
  ImageContainer,
  ItemLeftContainer,
  ItemRightContainer,
  WatchlistItemContainer,
  SymbolAndName,
  Change,
} from './styles'

type WatchlistItemProps = {
  item: WatchlistIexQuote
  onPress: (quote: WatchlistIexQuote) => void
}

const WatchlistItem = ({ item, onPress }: WatchlistItemProps) => {
  const { symbol, change, latestPrice, companyName, logo } = item
  const changeBg = { backgroundColor: change >= 0 ? GREEN : RED }

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <WatchlistItemContainer>
        <ItemLeftContainer>
          <ImageContainer>
            <Image source={{ uri: logo }} />
          </ImageContainer>
          <SymbolAndName>
            <Text weight="Black" type="label">
              {symbol}
            </Text>
            <Text color={LABEL} weight="Medium" type="label">
              {companyName}
            </Text>
          </SymbolAndName>
        </ItemLeftContainer>

        <ItemRightContainer>
          <Text style={{ textAlign: 'right' }} weight="Semibold" type="label">
            {latestPrice}
          </Text>
          <Change style={changeBg}>
            <Text style={{ textAlign: 'right' }} weight="Semibold">
              {change > 0 && '+'}
              {change}
            </Text>
          </Change>
        </ItemRightContainer>
      </WatchlistItemContainer>
    </TouchableOpacity>
  )
}

export interface WatchlistIexQuote {
  symbol: string
  companyName: string
  change: number
  latestPrice: number
  logo: string
  changePercent: number
  id: number
}

export default WatchlistItem
