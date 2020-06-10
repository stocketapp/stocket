import React, { forwardRef, useEffect, useState } from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { Container, Text } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import * as RNIap from 'react-native-iap'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'

type ProductsType = {
  onClose: () => void,
  isOpen: boolean,
  ref: { current: any },
}

const productIds = [
  'com.corasan.stocket.5k_cash',
  'com.corasan.stocket.10k_cash',
]

function Products({ onClose, ref, isOpen }: ProductsType) {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    if (isOpen) {
      ref.current.open()
    }
  }, [isOpen, ref])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await RNIap.getProducts(productIds)
        setProducts(res)
      } catch (err) {
        console.warn(err) // standardized err.code and err.message available
      }
    }
    getProducts()
  }, [])

  const buyCash = async sku => {
    try {
      await RNIap.requestPurchase(sku, false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Sheet
      height={Dimensions.get('window').height - 80}
      customStyles={{ container: styles.container }}
      ref={ref}
      onClose={onClose}
      closeOnDragDown
      dragFromTop
    >
      <Container
        ph
        fullView
        style={{
          backgroundColor: SUB_BACKGROUND,
          alignItems: 'center',
          paddingTop: 20,
        }}
      >
        <ProductsIllustration />
        <Text>Products</Text>

        <View style={styles.products}>
          {products &&
            products.map((el, i) => (
              <ProductItem product={el} key={i} onPurchase={buyCash} />
            ))}
        </View>
      </Container>
    </Sheet>
  )
}

export default forwardRef((props, ref) => Products({ ref, ...props }))

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: SUB_BACKGROUND,
  },
  actionBtn: {
    width: '78%',
    paddingVertical: 9,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
  touchable: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 5,
  },
  products: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
  },
})
