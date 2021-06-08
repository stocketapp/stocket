import { Text, Container } from '@components'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from '@icons'
import theme from '@theme'

const ReviewHeader = ({ goBack, symbol }: ReviewHeaderProps) => (
  <Container
    horizontal
    bgColor={theme.colors.BG_DARK_CARD}
    items="center"
    content="center"
    ph
  >
    <TouchableOpacity
      style={{
        position: 'absolute',
        left: theme.p.xlg,
        paddingVertical: theme.p.sm,
      }}
      onPress={goBack}
    >
      <ArrowLeftIcon size={34} color={theme.colors.GREEN} />
    </TouchableOpacity>
    <Text weight="Black" type="heading">
      Buy {symbol}
    </Text>
  </Container>
)

export default ReviewHeader

export interface ReviewHeaderProps {
  symbol: string
  goBack: () => void
}
