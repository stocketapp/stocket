import { TouchableOpacity } from 'react-native'
import { Text, Container, AddToWatchlistButton } from '@components'
import { useTheme } from '@emotion/react'

interface SearchResultProps {
  item: {
    securityName: string
    symbol: string
  }
  setStock: () => void
}

export default function SearchResult({ item, setStock }: SearchResultProps) {
  const { p } = useTheme()

  return (
    <TouchableOpacity onPress={setStock} style={{ width: '100%' }}>
      <Container separate horizontal pv={p.lg}>
        <Container style={{ width: '50%' }}>
          <Text weight="Black" type="label">
            {item?.symbol}
          </Text>
          <Text color="GRAY" style={{ paddingTop: p.sm }} weight="Medium">
            {item?.securityName}
          </Text>
        </Container>

        <AddToWatchlistButton symbol={item?.symbol} />
      </Container>
    </TouchableOpacity>
  )
}
