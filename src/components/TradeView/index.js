import React, { forwardRef, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import Sheet from 'react-native-raw-bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { SUB_BACKGROUND } from 'utils/colors'
import TradeHeader from './TradeHeader'
import TradeDetails from './TradeDetails'
import { VirtualNumPad } from 'components'

export default forwardRef((props, ref) => {
  const { trade, stock } = useSelector(state => state)
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
      stockQuantity: trade.stockQuantity.concat(quantity),
    })
  }

  const remove = () => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: trade.stockQuantity.slice(0, -1),
    })
  }

  return (
    <Sheet
      height={Dimensions.get('window').height - 50}
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
        </View>

        <View style={{ paddingBottom: 60 }}>
          <VirtualNumPad onKeyPress={setQuantity} onDelete={remove} />
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
}
