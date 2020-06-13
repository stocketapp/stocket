import React, { forwardRef, useEffect } from 'react'
import { Dimensions, View, StyleSheet, Alert } from 'react-native'
import { Container, Text } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'
import IapHub from 'react-native-iaphub'
import { useSelector } from 'react-redux'
import { getProductValue } from 'utils/functions'
import firestore from '@react-native-firebase/firestore'

type ProductsType = {
  onClose: () => void,
  isOpen: boolean,
  ref: { current: any },
}

function Products({ onClose, ref, isOpen }: ProductsType) {
  const { products } = useSelector(({ iapProducts }) => iapProducts)
  const { uid } = useSelector(({ user }) => user?.currentUser)
  useEffect(() => {
    if (isOpen) {
      ref.current.open()
    }
  }, [isOpen, ref])

  const buyCash = async productId => {
    try {
      const transaction = await IapHub.buy(productId)
      await updateCash(transaction?.sku)
    } catch (err) {
      console.log(err)
      if (err.code === 'receipt_validation_failed') {
        Alert.alert(
          "We're having trouble validating your transaction",
          "Give us some time, we'll retry to validate your transaction ASAP!",
        )
      } else if (err.code === 'receipt_request_failed') {
        Alert.alert(
          "We're having trouble validating your transaction",
          'Please try to restore your purchases later (Button in the settings) or contact the support (support@myapp.com)',
        )
      } else {
        Alert.alert(
          'Purchase error',
          'We were not able to process your purchase, please try again later or contact the support (support@myapp.com)',
        )
      }
    }
  }

  const updateCash = async productId => {
    const value = getProductValue(productId).value
    return firestore()
      .collection('Users')
      .doc(uid)
      .update({
        cash: firestore.FieldValue.increment(value),
      })
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
        <Text type="label" style={{ paddingBottom: 40 }}>
          Add more cash to your account
        </Text>

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
