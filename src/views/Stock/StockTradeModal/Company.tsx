import { HStack, VStack, StockLogo } from './styles'
import { Text } from '@components'

const Company = ({ name, price, logo }: CompanyProps) => (
  <HStack>
    <StockLogo source={{ uri: logo }} />
    <VStack style={{ paddingLeft: 16 }}>
      <Text type="heading" weight="Bold">
        {name}
      </Text>
      <Text type="title" weight="Medium">
        ${price}
      </Text>
    </VStack>
  </HStack>
)

interface CompanyProps {
  name: string
  price: number
  logo: string
}

export default Company
