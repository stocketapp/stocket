import { VStack, StockLogo, companyVStackExtraStyles } from './styles'
import { Text } from '@components'

const Company = ({ name, price, logo }: CompanyProps) => (
  <VStack style={companyVStackExtraStyles}>
    <Text type="title" weight="Bold" pb={5} pt={5}>
      {name}
    </Text>
    <Text type="title" weight="Medium" color="GRAY" pb={20}>
      ${price}
    </Text>
    <StockLogo source={{ uri: logo }} />
  </VStack>
)

interface CompanyProps {
  name: string
  price: number
  logo: string
}

export default Company
