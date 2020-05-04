import React, { forwardRef, useEffect } from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import Sheet from 'react-native-raw-bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { SUB_BACKGROUND } from 'utils/colors'
import TradeHeader from './TradeHeader'
import Text from '../Text'

export default forwardRef((props, ref) => {
  const { trade, stock } = useSelector(state => state)
  const { tradeViewIsOpen } = trade
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

  return (
    <Sheet
      height={Dimensions.get('window').height - 50}
      customStyles={{
        container: { borderRadius: 14, backgroundColor: SUB_BACKGROUND },
      }}
      ref={ref}
      onClose={closeTradeView}
      closeOnDragDown
      dragFromTop
    >
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity style={styles.btn}>
          <Text type="label" status="positive">
            X
          </Text>
        </TouchableOpacity> */}
        <TradeHeader symbol={selectedStock?.symbol} />
      </View>
    </Sheet>
  )
})

const styles = {
  btn: {
    position: 'absolute',
    left: 30,
    top: 5,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
}
