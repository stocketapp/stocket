import { CARD_BACKGROUND } from '@utils/colors'
import { Text, Container } from '@components'
import {
  Image,
  ImageContainer,
  PositionButton,
  ChangePctContainer,
  positionItemContainer,
} from './styles'
import { PortfolioPositionType } from '.'

interface PositionItemProps {
  item: PortfolioPositionType
  onPress: () => void
}

const PositionItem = ({ item, onPress }: PositionItemProps) => {
  const { change24hPct, symbol, logo } = item
  const color = change24hPct > 0 ? 'GREEN' : change24hPct < 0 ? 'RED' : 'WHITE'
  const bgColor =
    change24hPct > 0 ? '#71DB772A' : change24hPct < 0 ? '#EB455A2A' : CARD_BACKGROUND
  const positiveOrNegative = change24hPct > 0 ? '+' : ''

  return (
    <PositionButton onPress={onPress}>
      <Container style={positionItemContainer}>
        <ImageContainer>
          <Image source={{ uri: logo }} resizeMode="contain" />
        </ImageContainer>
        <Text type="title" weight="Black">
          {symbol}
        </Text>
        <ChangePctContainer style={{ backgroundColor: bgColor }}>
          <Text weight="Medium" color={color}>
            {positiveOrNegative}
            {change24hPct.toFixed(2)}%
          </Text>
        </ChangePctContainer>
      </Container>
    </PositionButton>
  )
}

export default PositionItem
