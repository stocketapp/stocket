import { Text } from '@components'
import moment from 'moment'
import { KeyStatsType } from '.'
import { StatsListItemContainer, ScrollView, StatLineContainer } from './styles'

export default function StatsList({ data }: StatsListProps) {
  const {
    marketCap,
    avg10Volume,
    peRatio,
    ttmEps,
    week52Change,
    week52High,
    week52Low,
    ytdChangePercent,
    dividendYield,
    ttmDividendRate,
    nextDividendDate,
    nextEarningsDate,
  } = data
  const formatDate = (date: string | undefined) => {
    return moment(date).format('L')
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <StatsListItemContainer>
        <StatLine label="Market Cap" value={marketCap} />
        <StatLine label="Avg 10 day Vol" value={avg10Volume} />
        <StatLine label="P/E" value={peRatio} />
        <StatLine label="EPS" value={ttmEps} />
      </StatsListItemContainer>
      <StatsListItemContainer>
        <StatLine label="52 Week High" value={week52High} />
        <StatLine label="52 Week Low" value={week52Low} />
        <StatLine label="52 Week Change" value={week52Change} />
        <StatLine label="YTD Change" value={ytdChangePercent} />
      </StatsListItemContainer>
      <StatsListItemContainer>
        <StatLine label="Dividend Yield" value={dividendYield} />
        <StatLine label="Dividend Rate" value={ttmDividendRate} />
        <StatLine
          label="Dividend Date"
          value={nextDividendDate === '' ? 'N/A' : formatDate(nextDividendDate)}
        />
        <StatLine label="Earnings Date" value={formatDate(nextEarningsDate)} />
      </StatsListItemContainer>
    </ScrollView>
  )
}

interface StatsListProps {
  data: KeyStatsType
}

const StatLine = ({ label, value }: StatLineProp) => (
  <StatLineContainer>
    <Text weight="Regular" color="GRAY">
      {label}
    </Text>
    <Text weight="Bold">{value}</Text>
  </StatLineContainer>
)

interface StatLineProp {
  label: string
  value: string | number | undefined | any
}
