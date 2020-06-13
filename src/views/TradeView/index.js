import React, { forwardRef, useEffect, useMemo } from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import Sheet from 'react-native-raw-bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { SUB_BACKGROUND, DARK_TEXT, GREEN } from 'utils/colors'
import { VirtualNumPad, Text } from 'components'
import { createTrade } from 'api'
import TradeHeader from './TradeHeader'
import TradeDetails from './TradeDetails'
import TradeTotal from './TradeTotal'
import TradeAction from './TradeAction'
import find from 'lodash.find'

export default forwardRef((props, ref) => {
  const { trade, stock, user } = useSelector(state => state)
  const { tradeViewIsOpen, stockQuantity, selectedTradeAction } = trade
  const { selectedStock, positionsMktData } = stock
  const { currentUser, userInfo } = user
  const dispatch = useDispatch()
  const sharesOwned = selectedStock?.shares?.length
  const maxShares = Math.floor(userInfo?.cash / selectedStock?.price)

  useEffect(() => {
    if (tradeViewIsOpen) {
      ref.current.open()
    }
  }, [tradeViewIsOpen, ref])

  const closeTradeView = () => {
    dispatch({
      type: 'TRADE_VIEW_IS_OPEN',
      tradeViewIsOpen: false,
    })
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: '0',
    })
  }

  const setQuantity = quantity => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: stockQuantity.concat(quantity),
    })
  }

  const remove = () => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: stockQuantity.slice(0, -1),
    })
  }

  const setAction = action => {
    dispatch({
      type: 'SELECTED_TRADE_ACTION',
      selectedTradeAction: action,
    })
  }

  const total = useMemo(() => stockQuantity * selectedStock?.price, [
    stockQuantity,
    selectedStock,
  ])

  const createTradeTransaction = () => {
    const obj = {
      value: total,
      price: selectedStock?.price,
      name: selectedStock?.name,
      symbol: selectedStock?.symbol,
      quantity: stockQuantity,
      action: selectedTradeAction,
    }
    createTrade(currentUser?.uid, obj, () => {
      closeTradeView()
    })
  }

  const btnDisabled = useMemo(() => {
    return (
      stockQuantity &&
      (selectedTradeAction === 'BUY'
        ? stockQuantity <= maxShares && stockQuantity !== '0'
        : stockQuantity <= sharesOwned && stockQuantity !== '0')
    )
  }, [stockQuantity, selectedTradeAction, maxShares, sharesOwned])

  const stockData = useMemo(() => {
    const found = find(
      positionsMktData,
      el => el.quote.symbol === selectedStock?.symbol,
    )
    if (!found) {
      return selectedStock
    }

    return found
  }, [positionsMktData, selectedStock])

  return (
    <Sheet
      height={Dimensions.get('window').height - 80}
      customStyles={{ container: styles.container }}
      ref={ref}
      onClose={closeTradeView}
      closeOnDragDown
      dragFromTop
    >
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ paddingHorizontal: 16 }}>
          <TradeHeader
            symbol={stockData?.symbol}
            isSell={trade.selectedTradeAction === 'SELL'}
          />

          <TradeDetails
            selectedStock={stockData.quote}
            quantity={stockQuantity}
            maxShares={maxShares}
            isSell={selectedTradeAction === 'BUY'}
            owned={sharesOwned}
          />

          <TradeAction
            onActionChange={setAction}
            action={selectedTradeAction}
          />
        </View>

        <View style={{ paddingBottom: 40 }}>
          <TradeTotal total={total} />
          <VirtualNumPad onKeyPress={setQuantity} onDelete={remove} />

          <TouchableOpacity
            style={styles.touchable}
            onPress={createTradeTransaction}
            disabled={!btnDisabled}
          >
            <View
              style={[styles.actionBtn, { opacity: !btnDisabled ? 0.5 : 1 }]}
            >
              <Text type="title" color={DARK_TEXT} weight="Black">
                {trade.selectedTradeAction}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Sheet>
  )
})

const styles = {
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
}
