import React, { useEffect, useMemo } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Container, Text } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { GRAY_DARKER } from 'utils/colors'
import { find } from 'lodash'

export default function StockAmount() {
  const {
    stockQuantity,
    stockPrice,
    maxShares,
    selectedTradeAction,
    sharesOwned,
    tradeData: { symbol },
  } = useSelector(({ trade }) => trade)
  const { cash } = useSelector(({ user }) => user?.userInfo)
  const { positions } = useSelector(({ portfolio }) => portfolio)
  const dispatch = useDispatch()

  const setQuantity = (quantity: string) => {
    dispatch({
      type: 'SET_QUANTITY',
      stockQuantity: quantity,
    })
  }

  useEffect(() => {
    dispatch({
      type: 'MAX_SHARES',
      maxShares: Math.floor(cash / stockPrice),
    })
  }, [cash, stockPrice, dispatch])

  useEffect(() => {
    const result = find(positions, ['symbol', symbol])
    dispatch({
      type: 'SHARES_OWNED',
      sharesOwned: result?.shares.length,
    })
  }, [symbol, positions, dispatch])

  return (
    <Container width="100%" top={30}>
      <Text color={GRAY_DARKER} type="label">
        Quantity
      </Text>
      <TextInput
        placeholderTextColor="#afafaf"
        value={stockQuantity}
        onChangeText={setQuantity}
        style={styles.input}
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <Text style={styles.maxShares} color={GRAY_DARKER}>
        {selectedTradeAction !== 'SELL'
          ? `Max shares ${maxShares}`
          : `Shares owned ${sharesOwned}`}
      </Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Futura',
    fontSize: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: '#777777',
    color: '#fff',
  },
  maxShares: {
    marginTop: 5,
  },
})
