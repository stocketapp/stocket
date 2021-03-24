import { TouchableOpacity } from 'react-native'
import { Text, Container } from '@components'
import { GREEN, RED, LABEL } from '@utils/colors'
import { Image, ImageContainer, Change } from './styles'
import { useTheme } from '@emotion/react'

type WatchlistItemProps = {
  item: WatchlistIexQuote
  onPress: (quote: WatchlistIexQuote) => void
}

const WatchlistItem = ({ item, onPress }: WatchlistItemProps) => {
  const changeBg = { backgroundColor: item?.change >= 0 ? GREEN : RED }
  const { p } = useTheme()

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Container pv={p.lg}>
        <Container horizontal>
          <ImageContainer>
            <Image source={{ uri: item?.logo }} />
          </ImageContainer>

          <Container>
            <Container horizontal separate alignItems="center">
              <Text weight="Black" type="label">
                {item?.symbol}
              </Text>
              <Text style={{ textAlign: 'right' }} weight="Semibold" type="label">
                {item?.latestPrice?.toFixed(2)}
              </Text>
            </Container>

            <Container horizontal separate alignItems="flex-end">
              <Text color={LABEL} weight="Medium" type="label">
                {item?.companyName}
              </Text>
              <Change style={changeBg}>
                <Text style={{ textAlign: 'right' }} weight="Semibold">
                  {item?.change > 0 && '+'}
                  {item?.change?.toFixed(2)}
                </Text>
              </Change>
            </Container>
          </Container>
        </Container>
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
