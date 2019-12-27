// @flow
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Container, Text } from 'stocket-components'
import { useDispatch, useSelector } from 'react-redux'
import { BLUE } from 'utils/colors'

export default function TradeAction() {
  const { selectedTradeAction: action } = useSelector(({ trade }) => trade)
  const dispatch = useDispatch()

  const selectType = (type: string) => {
    dispatch({
      type: 'SELECTED_TRADE_ACTION',
      selectedTradeAction: type,
      // selectedTradeAction: !action || type !== action ? type : null,
    })
  }

  const selectedStyles = (type: string) => ({
    borderBottomWidth: type === action ? 1.5 : 0,
    backgroundColor: type === action ? '#333333' : 'transparent',
  })

  return (
    <Container horizontal justifyContent="center" width="100%" top={30}>
      <TouchableOpacity
        style={{ ...styles.btn, ...selectedStyles('BUY') }}
        onPress={() => selectType('BUY')}>
        <Text type="label">BUY</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.btn, ...selectedStyles('SELL') }}
        onPress={() => selectType('SELL')}>
        <Text type="label">SELL</Text>
      </TouchableOpacity>
    </Container>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: '20%',
    paddingVertical: 8,
    // borderBottomWidth: 1.5,
    borderBottomColor: BLUE, // '#777777',
  },
})
