import { Container, Text } from '@components'
import { useQuery } from '@apollo/client'
import ViewMoreText from 'react-native-view-more-text'
import { PositionType } from 'types'
import { GET_COMPANY, GET_KEY_STATS } from '../../queries'
import StatList from './StatsList'
import Position from './Position'

export default function OverviewTab({ symbol, position }: OverviewTabProps) {
  const { data } = useQuery<{ company: CompanyType }>(GET_COMPANY, {
    variables: { symbol },
  })
  const company = data?.company
  const { data: statsData } = useQuery<{ stats: KeyStatsType }>(GET_KEY_STATS, {
    variables: { symbol },
  })
  const stats = statsData?.stats

  const renderViewMore = (onPress: () => void) => (
    <Text weight="Black" onPress={onPress} pb={4} pt={4}>
      More
    </Text>
  )
  const renderViewLess = (onPress: () => void) => (
    <Text weight="Black" onPress={onPress} pb={4} pt={4}>
      Less
    </Text>
  )

  return (
    <Container ph fullView scrollable>
      <Container horizontal>
        {company?.description && (
          <Container style={{ flex: 1 }}>
            <Text type="title" weight="Black" pb={10}>
              {company?.companyName}
            </Text>
            <ViewMoreText
              numberOfLines={8}
              textStyle={{ color: 'white' }}
              renderViewMore={renderViewMore}
              renderViewLess={renderViewLess}
            >
              <Text type="label" weight="Light">
                {company?.description}
              </Text>
            </ViewMoreText>
          </Container>
        )}
      </Container>
      {stats && <StatList data={stats} />}
      <Position position={position} />
    </Container>
  )
}

interface OverviewTabProps {
  symbol: string
  position: PositionType
}

interface CompanyType {
  ceo: string
  symbol: string
  website: string
  companyName: string
  description: string
  logo: string
}
export interface KeyStatsType {
  companyName: string
  marketCap: number
  week52Low: number
  week52High: number
  week52Change: number
  avg10Volume: number
  ttmEps: number
  peRatio: number
  dividendYield: number
  ttmDividendRate: number
  ytdChangePercent: number
  nextDividendDate: string
  nextEarningsDate: string
}
