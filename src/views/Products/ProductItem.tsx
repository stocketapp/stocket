import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import { CARD_BACKGROUND, GREEN, DARK_TEXT } from '@utils/colors'
import productImgs from '@products-assets'
import type { ProductValue } from 'types'

type Props = {
  product: ProductValue & { localizedPrice: string }
  onPurchase: (product: string) => void
}

export default ({ product, onPurchase }: Props) => (
  <TouchableOpacity
    style={styles.btnContainer}
    activeOpacity={0.6}
    onPress={() => onPurchase(product?.productId)}
  >
    {product?.productId && (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={productImgs[product?.productId]} style={styles.productImg} />
        </View>

        <View style={styles.textContainer}>
          <Text weight="Black" color={DARK_TEXT} style={{ textAlign: 'center' }} type="label">
            {product?.localizedPrice}
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
    shadowColor: CARD_BACKGROUND,
    shadowOffset: { height: 0, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    width: '100%',
    paddingTop: 5,
  },
  textContainer: {
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
    height: '85%',
    width: '85%',
    resizeMode: 'contain',
  },
  imgContainer: {
    paddingHorizontal: 10,
    height: 85,
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    padding: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
