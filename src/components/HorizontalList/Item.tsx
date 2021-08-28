import { CARD_BACKGROUND } from '@utils/colors'
import { Text, Container } from '@components'
import {
  Image,
  ImageContainer,
  Button,
  ChangePctContainer,
  itemContainer,
} from './styles'

const Item = ({ onPress, change, symbol, logo }: ItemProps) => {
  const color = change > 0 ? 'GREEN' : change < 0 ? 'RED' : 'WHITE'
  const bgColor = change > 0 ? '#71DB772A' : change < 0 ? '#EB455A2A' : CARD_BACKGROUND
  const positiveOrNegative = change > 0 ? '+' : ''

  return (
    <Button onPress={onPress}>
      <Container style={itemContainer}>
        <ImageContainer>
          <Image source={{ uri: logo }} resizeMode="contain" />
          <Text style={{ position: 'absolute', zIndex: 0 }} type="subtext" weight="Bold">
            {symbol}
          </Text>
        </ImageContainer>
        <Text type="title" weight="Black">
          {symbol}
        </Text>
        <ChangePctContainer style={{ backgroundColor: bgColor }}>
          <Text weight="Medium" color={color}>
            {positiveOrNegative}
            {change?.toFixed(2)}%
          </Text>
        </ChangePctContainer>
      </Container>
    </Button>
  )
}

interface ItemProps {
  symbol: string
  change: number
  logo: string
  onPress: () => void
}

export default Item
