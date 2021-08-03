import { Container, Text } from '@components'
import { useQuery } from '@apollo/client'
import { useTheme } from '@emotion/react'
import { GET_COMPANY } from '../../queries'

export default function OverviewTab({ symbol }: OverviewTabProps) {
  const { data } = useQuery<{ company: CompanyType }>(GET_COMPANY, {
    variables: { symbol },
  })
  const company = data?.company
  const { p } = useTheme()

  return (
    <Container ph>
      <Container horizontal>
        <Container style={{ flex: 1 }} left={p.md}>
          <Text type="label" weight="Medium" numberOfLines={10}>
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
