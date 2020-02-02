import React, { useEffect } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Container, Text } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { GRAY_DARKER } from 'utils/colors'

export default function StockAmount() {
  const {
    stockQuantity,
    stockPrice,
    maxShares,
    selectedTradeAction,
  } = useSelector(({ trade }) => trade)
  const { cash } = useSelector(({ user }) => user.userInfo)
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
      {selectedTradeAction !== 'SELL' && (
        <Text style={styles.maxShares} color={GRAY_DARKER}>
          Max shares {maxShares}
        </Text>
      )}
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
