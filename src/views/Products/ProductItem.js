import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from 'components'
import { CARD_BACKGROUND, GREEN, DARK_TEXT } from 'utils/colors'
import productImgs from '../../../assets/products'

export default ({ product, onPurchase }) => (
  <TouchableOpacity
    style={{ padding: 15 }}
    activeOpacity={0.6}
    onPress={() => onPurchase(product?.sku)}
  >
    {product?.sku && (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={productImgs[product?.sku]} style={styles.productImg} />
        </View>

        <View style={styles.btn}>
          <Text
            weight="Black"
            color={DARK_TEXT}
            style={{ textAlign: 'center' }}
            type="label"
          >
            {product?.price}
          </Text>
        </View>
      </View>
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222222',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: CARD_BACKGROUND,
    shadowOffset: { height: 0, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  btn: {
    backgroundColor: GREEN,
    opacity: 0.9,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 4,
  },
  productImg: {
    height: 100,
    width: 100,
  },
  imgContainer: {
    paddingHorizontal: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginVertical: 5,
  },
})
