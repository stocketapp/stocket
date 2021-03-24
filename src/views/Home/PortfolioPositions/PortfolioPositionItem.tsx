import { GREEN, RED } from '@utils/colors'
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
  const { changePct, symbol, logo } = item
  const color = changePct > 0 ? GREEN : changePct < 0 ? RED : 'white'
  const bgColor = changePct > 0 ? '#71DB772A' : '#EB455A2A'
  const positiveOrNegative = changePct > 0 ? '+' : ''

  return (
    <PositionButton onPress={onPress}>
      <Container style={positionItemContainer}>
        <ImageContainer>
          <Image source={{ uri: logo }} />
        </ImageContainer>
        <Text type="title" weight="Black">
          {symbol}
        </Text>
        <ChangePctContainer style={{ backgroundColor: bgColor }}>
          <Text weight="Medium" color={color}>
            {positiveOrNegative}
            {changePct.toFixed(2)}%
          </Text>
        </ChangePctContainer>
      </Container>
    </PositionButton>
  )
}

export default PositionItem
