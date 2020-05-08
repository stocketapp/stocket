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

export default forwardRef((props, ref) => {
  const { trade, stock, user } = useSelector(state => state)
  const { tradeViewIsOpen, stockQuantity } = trade
  const { selectedStock } = stock
  const dispatch = useDispatch()

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
  }

  const setQuantity = quantity => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: trade?.stockQuantity.concat(quantity),
    })
  }

  const remove = () => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: trade?.stockQuantity.slice(0, -1),
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
    createTrade(user?.currentUser?.uid, {
      value: total,
      price: selectedStock?.price,
      name: selectedStock?.name,
      symbol: selectedStock?.symbol,
      quantity: trade?.stockQuantity,
      action: trade?.selectedTradeAction,
    })
  }

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
          <TradeHeader symbol={selectedStock?.symbol} />

          <TradeDetails
            selectedStock={selectedStock}
            quantity={stockQuantity}
          />

          <TradeAction
            onActionChange={setAction}
            action={trade?.selectedTradeAction}
          />
        </View>

        <View style={{ paddingBottom: 60 }}>
          <TradeTotal total={total} />
          <VirtualNumPad onKeyPress={setQuantity} onDelete={remove} />

          <TouchableOpacity style={styles.touchable}>
            <View style={styles.actionBtn}>
              <Text type="title" color={DARK_TEXT}>
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
    width: '80%',
    paddingVertical: 8,
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
