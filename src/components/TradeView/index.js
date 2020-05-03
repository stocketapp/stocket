import React, { forwardRef, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import Sheet from 'react-native-raw-bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'

export default forwardRef((props, ref) => {
  const { tradeViewIsOpen } = useSelector(({ trade }) => trade)
  const dispatch = useDispatch()

  useEffect(() => {
    if (tradeViewIsOpen) {
      ref.current.open()
    }
  }, [tradeViewIsOpen, ref])

  const openTradeView = () => {
    dispatch({
      type: 'TRADE_VIEW_IS_OPEN',
      tradeViewIsOpen: true,
    })
  }

  return (
    <Sheet
      height={Dimensions.get('window').height - 40}
      customStyles={{ container: { borderRadius: 10 } }}
      ref={ref}
      onClose={openTradeView}
      closeOnDragDown
      dragFromTop
    >
      <View style={{ flex: 1 }} />
    </Sheet>
  )
})
