import { TouchableOpacity } from 'react-native'
import { Text, Container } from '@components'
import { GRAY_DARKER, GREEN } from '@utils/colors'
import { FavoriteIcon } from '@icons'
import { useTheme } from '@emotion/react'

interface SearchResultProps {
  item: {
    securityName: string
    symbol: string
  }
  onPress: (symbol: string) => void
  setStock: () => void
  isFaved: boolean
}

export default function SearchResult({ item, onPress, setStock, isFaved }: SearchResultProps) {
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

          <TouchableOpacity style={{ padding: p.sm }} onPress={() => onPress(item?.symbol)}>
            <FavoriteIcon size={26} color={GREEN} filled={isFaved} />
          </TouchableOpacity>
        </Container>
      </TouchableOpacity>
    </Container>
  )
}
