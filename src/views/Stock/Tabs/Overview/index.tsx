import { Container, Text } from '@components'
import { useQuery } from '@apollo/client'
import { useTheme } from '@emotion/react'
import { GET_COMPANY } from '../../queries'
import { LogoImage } from '../../styles'

export default function OverviewTab({ symbol }: OverviewTabProps) {
  const { data, error } = useQuery<{ company: CompanyType }>(GET_COMPANY, {
    variables: { symbol },
  })
  const company = data?.company
  const { p } = useTheme()
  console.log(error)

  return (
    <Container ph>
      <Container horizontal>
        <LogoImage source={{ uri: company?.logo }} />
        <Container style={{ flex: 1 }} left={p.md}>
          <Text type="heading" weight="Black" pb={p.md}>
            {company?.companyName}
          </Text>
          <Text type="subtext" weight="Medium" numberOfLines={10}>
            {company?.description}
          </Text>
        </Container>
      </Container>
    </Container>
  )
}

interface OverviewTabProps {
  symbol: string
}

interface CompanyType {
  ceo: string
  symbol: string
  website: string
  companyName: string
  description: string
  logo: string
}
