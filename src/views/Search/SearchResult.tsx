import { TouchableOpacity } from 'react-native'
import { Text, Container, AddToWatchlistButton } from '@components'
import { GRAY_DARKER } from '@utils/colors'
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
    <Container>
      <TouchableOpacity onPress={setStock}>
        <Container separate horizontal top={p.md} bottom={p.md}>
          <Container>
            <Text weight="Black" type="label">
              {item?.symbol}
            </Text>
            <Text color={GRAY_DARKER} style={{ paddingTop: p.sm }} weight="Medium">
              {item?.securityName}
            </Text>
          </Container>

          <AddToWatchlistButton symbol={item?.symbol} />
        </Container>
      </TouchableOpacity>
    </Container>
  )
}
