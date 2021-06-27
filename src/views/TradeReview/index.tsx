import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Container, Button } from '@components'
import { TradeStackParamsList } from 'navigation/stacks/TradeStack'
import { useTheme } from '@emotion/react'
import { useState, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { StockNavigationProps } from 'navigation/stacks/StockStack'
import { userVar } from '@cache'
import ReviewDetails from './ReviewDetails'
import ReviewHeader from './ReviewHeader'
import ReviewDone from './ReviewDone'
import { USER_QUERY } from '../../hooks/useAuthState'
import { CREATE_TRADE } from './queries'

export default function TradeReview() {
  const { colors, p } = useTheme()
  const { params } = useRoute<RouteProp<TradeStackParamsList, 'TradeModalReview'>>()
  const { symbol, size, price, orderType } = params
  const { goBack, reset } = useNavigation<StockNavigationProps>()
  const [finalized, setFinalized] = useState<boolean>(false)
  const [mountDoneAnimation, setMountDoneAnimation] = useState(false)
  const [mutate, { loading }] = useMutation(CREATE_TRADE)
  const { refetch } = useQuery(USER_QUERY)

  const finalizeTrade = useCallback(async () => {
    const variables = {
      input: { symbol, size, price, orderType },
    }
    try {
      await mutate({ variables })
      const { data: userData } = await refetch()
      userVar(userData)
      setFinalized(true)
      setMountDoneAnimation(true)
    } catch (error) {
      setFinalized(false)
      setMountDoneAnimation(false)
      console.error(error)
    }
  }, [mutate, orderType, price, refetch, size, symbol])

  const close = () => {
    reset({
      index: 1,
      routes: [
        {
          name: 'Stock',
          params: {
            companyName: params.companyName,
            symbol: params.symbol,
            logo: params.logo,
          },
        },
      ],
    })
  }

  // TODO: SHOW REMINDER TEXT THAT THE PURCHASE IS A SIMULATION, NOT ACTUAL STOCKS

  return (
    <Container
      fullView
      items="center"
      bgColor={colors.BG_DARK_CARD}
      safeAreaBottom
      top={p.lg}
      separate
    >
      {!loading && !finalized && (
        <ReviewHeader
          symbol={params?.symbol}
          orderType={params?.orderType}
          goBack={goBack}
        />
      )}
      <ReviewDetails {...params} animate={finalized} />

      <ReviewDone {...params} animate={mountDoneAnimation} />

      <Button
        label={finalized ? 'Done' : params?.orderType}
        onPress={finalized ? close : finalizeTrade}
        loading={loading}
        disabled={loading}
      />
    </Container>
  )
}
