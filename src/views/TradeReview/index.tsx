import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Container, Button } from '@components'
import { TradeStackParamsList } from 'navigation/stacks/TradeStack'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import ReviewDetails from './ReviewDetails'
import ReviewHeader from './ReviewHeader'
import ReviewDone from './ReviewDone'

export default function StockTradeModalReview() {
  const { colors, p } = useTheme()
  const { params } = useRoute<RouteProp<TradeStackParamsList, 'TradeModalReview'>>()
  const { goBack } = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)
  const [finalized, setFinalized] = useState<boolean>(false)
  const [mountDoneAnimation, setMountDoneAnimation] = useState(false)

  const finalizeTrade = () => {
    setLoading(true)
    setMountDoneAnimation(true)
    setFinalized(true)
  }

  return (
    <Container
      fullView
      items="center"
      bgColor={colors.BG_DARK_CARD}
      safeAreaBottom
      top={p.lg}
      separate
    >
      {!loading && !finalized && <ReviewHeader symbol={params?.symbol} goBack={goBack} />}
      <ReviewDetails {...params} animate={finalized} />

      <ReviewDone {...params} animate={mountDoneAnimation} />

      <Button label={finalized ? 'Done' : params?.orderType} onPress={finalizeTrade} />
    </Container>
  )
}
