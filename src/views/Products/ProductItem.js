import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { CARD_BACKGROUND, GREEN, DARK_TEXT } from 'utils/colors'

export default ({ product, onPurchase }) => (
  <View style={styles.container}>
    <Text weight="Bold" type="heading">
      {product?.title}
    </Text>

    <TouchableOpacity
      onPress={() => onPurchase(product?.productId)}
      style={styles.touchable}
    >
      <View style={styles.btn}>
        <Text
          weight="Black"
          color={DARK_TEXT}
          style={{ textAlign: 'center' }}
          type="label"
        >
          {product?.localizedPrice}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: CARD_BACKGROUND,
    height: 140,
    paddingTop: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 6,
    width: '45%',
  },
  btn: {
    backgroundColor: GREEN,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})
