import { TradedStockHContainer, TradedStockVContainer, StockLogo } from './styles'
import { Text } from '@components'

const Company = ({ name, price, logo }: CompanyProps) => (
  <TradedStockHContainer>
    <StockLogo source={{ uri: logo }} />
    <TradedStockVContainer style={{ paddingLeft: 16 }}>
      <Text type="heading" weight="Bold">
        {name}
      </Text>
      <Text type="title" weight="Medium">
        ${price}
      </Text>
    </TradedStockVContainer>
  </TradedStockHContainer>
)

interface CompanyProps {
  name: string
  price: number
  logo: string
}

export default Company
