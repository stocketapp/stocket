import { TouchableOpacity, View } from 'react-native'
import { Text, Container } from '@components'
import { GREEN, RED, SUB_BACKGROUND } from '@utils/colors'
import { Image, ImageContainer, Change } from './styles'
import { useTheme } from '@emotion/react'

type WatchlistItemProps = {
  item: WatchlistIexQuote
  onPress: (quote: WatchlistIexQuote) => void
}

const WatchlistItem = ({ item, onPress }: WatchlistItemProps) => {
  const { p } = useTheme()
  const changeBg = {
    backgroundColor:
      item?.change === 0.0 ? SUB_BACKGROUND : item?.change > 0 ? GREEN : RED,
  }

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Container horizontal separate pv={p.lg}>
        <View style={{ flexDirection: 'row' }}>
          <ImageContainer>
            <Image source={{ uri: item?.logo }} resizeMode="contain" />
          </ImageContainer>
          <View>
            <Text weight="Black" type="label">
              {item?.symbol}
            </Text>
            <Text color="GRAY" weight="Medium" type="label" pt={p.sm}>
              {item?.companyName}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: 'right' }} weight="Semibold" type="label">
            {item?.latestPrice?.toFixed(2)}
          </Text>
          <Change style={changeBg}>
            <Text style={{ textAlign: 'right' }} weight="Semibold">
              {item?.change > 0 && '+'}
              {item?.change?.toFixed(2)}
            </Text>
          </Change>
        </View>
      </Container>
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
