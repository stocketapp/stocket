import { forwardRef, useEffect, useMemo, useState } from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import Sheet from 'react-native-raw-bottom-sheet'
import { useDispatch } from 'react-redux'
import { SUB_BACKGROUND, DARK_TEXT, GREEN } from '@utils/colors'
import { VirtualNumPad, Text, SuccessScreen } from '@components'
import TradeHeader from './TradeHeader'
import TradeDetails from './TradeDetails'
import TradeTotal from './TradeTotal'
import TradeAction from './TradeAction'
import { formatCurrency } from '@utils/functions'
import { useStockSelector, useUserSelector, useTradeSelector } from '@selectors'
import type { TradeDataType } from 'types'

type Props = {
  forwardedRef?: any
}

function TradeView({ forwardedRef }: Props) {
  // const { trade, user, stock } = useSelector(state => state)
  const {
    tradeViewIsOpen,
    stockQuantity,
    selectedTradeAction,
    tradeStock,
    stockPrice,
  } = useTradeSelector()
  const { selectedStockPosition } = useStockSelector()
  const { currentUser, userInfo } = useUserSelector()
  // const { tradeViewIsOpen, stockQuantity, selectedTradeAction, tradeStock, stockPrice } = trade
  // const { selectedStockPosition } = stock
  // const { currentUser, userInfo } = user
  const dispatch = useDispatch()
  const sharesOwned = selectedStockPosition?.shares?.length
  const maxShares = Math.floor(userInfo?.cash ?? 0 / stockPrice)
  const [isLoading, setIsLoading] = useState(false)
  const [goToSuccess, setGoToSuccess] = useState(false)

  useEffect(() => {
    if (forwardedRef && tradeViewIsOpen) {
      forwardedRef?.current?.open()
    } else {
      forwardedRef?.current?.close()
    }
  }, [tradeViewIsOpen, forwardedRef])

  useEffect(() => {
    if (stockQuantity === '') {
      dispatch({
        type: 'SET_QUANTITY',
        stockQuantity: '0',
      })
    }
  }, [stockQuantity, dispatch])

  const closeTradeView = () => {
    dispatch({
      type: 'TRADE_VIEW_IS_OPEN',
      tradeViewIsOpen: false,
    })
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: '0',
    })
    setGoToSuccess(false)
  }

  const setQuantity = (quantity: string) => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: stockQuantity.concat(quantity).replace(/^0/g, ''),
    })
  }

  const remove = () => {
    if (stockQuantity === '') {
      dispatch({
        type: 'SET_QUANTITY',
        stockQuantity: stockQuantity.concat(''),
      })
    }
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: stockQuantity.slice(0, -1),
    })
  }

  const setAction = (action: string) => {
    dispatch({
      type: 'SELECTED_TRADE_ACTION',
      selectedTradeAction: action,
    })
  }

  const total = useMemo(() => {
    return Number(stockQuantity) * stockPrice
  }, [stockQuantity, stockPrice])

  const createTradeTransaction = async () => {
    setIsLoading(true)
    setGoToSuccess(true)
    const obj: TradeDataType = {
      value: total,
      price: stockPrice,
      name: tradeStock?.quote.companyName,
      symbol: tradeStock?.quote.symbol,
      quantity: stockQuantity,
      action: selectedTradeAction,
      date: Date.now(),
    }
    if (currentUser?.uid && obj) {
      // await createTrade({ uid: currentUser?.uid, data: obj }, () => setIsLoading(false))
    }
  }

  const btnDisabled = useMemo(() => {
    const qtty = Number(stockQuantity)
    return (
      stockQuantity &&
      (selectedTradeAction === 'BUY'
        ? qtty <= maxShares && stockQuantity !== '0'
        : qtty <= (sharesOwned ?? 0) && stockQuantity !== '0')
    )
  }, [stockQuantity, selectedTradeAction, maxShares, sharesOwned])

  return (
    <Sheet
      height={Dimensions.get('window').height - 70}
      customStyles={{ container: styles.container }}
      ref={forwardedRef}
      onClose={closeTradeView}
      closeOnDragDown
      dragFromTopOnly
    >
      {goToSuccess ? (
        <SuccessScreen
          loading={isLoading}
          onFinished={closeTradeView}
          successText={
            selectedTradeAction === 'BUY'
              ? `Your successfully purchased ${stockQuantity} shares of ${tradeStock?.quote.symbol}`
              : `You successfully sold ${stockQuantity} shares of ${tradeStock?.quote.symbol}`
          }
          bigText={formatCurrency(total)}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ paddingHorizontal: 16 }}>
            <TradeHeader
              symbol={tradeStock?.quote?.symbol}
              isSell={selectedTradeAction === 'SELL'}
            />

            <TradeDetails
              // selectedStock={tradeStock?.quote}
              quantity={stockQuantity}
              maxShares={maxShares}
              isSell={selectedTradeAction === 'BUY'}
              owned={sharesOwned}
              price={stockPrice}
            />

            <TradeAction onActionChange={setAction} action={selectedTradeAction} />
          </View>

          <View style={{ paddingBottom: 40 }}>
            <TradeTotal total={total} />
            <VirtualNumPad onKeyPress={setQuantity} onDelete={remove} />

            <TouchableOpacity
              style={styles.touchable}
              onPress={createTradeTransaction}
              disabled={!btnDisabled}
            >
              <View style={[styles.actionBtn, { opacity: !btnDisabled ? 0.5 : 1 }]}>
                <Text type="title" color={DARK_TEXT} weight="Black">
                  {selectedTradeAction}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Sheet>
  )
}

export default forwardRef((props, forwardedRef) => TradeView({ forwardedRef, ...props }))

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: SUB_BACKGROUND,
  },
  actionBtn: {
    width: '78%',
    paddingVertical: 9,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
  touchable: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 5,
  },
})
