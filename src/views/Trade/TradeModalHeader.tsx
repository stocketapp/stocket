import {
  StockLogo,
  TradeModalTitleContainer,
  TradeModalTop,
  TradeModalNameAndPrice,
} from './styles'
import { Text } from '@components'

const TradeModalHeader = ({ name, price, logo }: CompanyProps) => (
  <TradeModalTitleContainer>
    <TradeModalTop>
      <StockLogo source={{ uri: logo }} />
      <TradeModalNameAndPrice>
        <Text type="title" weight="Bold" pb={5}>
          {name}
        </Text>
        <Text type="label" weight="Semibold" color="GRAY" pb={8}>
          ${price}
        </Text>
      </TradeModalNameAndPrice>
    </TradeModalTop>
  </TradeModalTitleContainer>
)

interface CompanyProps {
  name: string
  price: number
  logo?: string
}

export default TradeModalHeader
