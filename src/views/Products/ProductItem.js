import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { CARD_BACKGROUND, GREEN, DARK_TEXT } from 'utils/colors'

export default ({ product, onPurchase }) => (
  <View style={styles.container}>
    <Text weight="Bold" type="heading">
      {product?.title}
    </Text>

    <TouchableOpacity onPress={() => onPurchase(product?.productId)}>
      <View style={styles.btn}>
        <Text weight="Black" color={DARK_TEXT}>
          {product?.localizedPrice}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: CARD_BACKGROUND,
    height: 120,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    width: '47%',
  },
  btn: {
    backgroundColor: GREEN,
    paddingHorizontal: 14,
    paddingVertical: 7,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 120,
  },
})
