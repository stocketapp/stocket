// @flow
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import {
  Dimensions,
  View,
  StyleSheet,
  Animated,
  Easing,
  Vibration,
} from 'react-native'
import { Container, Text, LoadingCheckmark } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN, LABEL } from 'utils/colors'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'
import IapHub from 'react-native-iaphub'
import { useSelector } from 'react-redux'
import { getProductValue, formatCurrency } from 'utils/functions'
import firestore from '@react-native-firebase/firestore'
import transactionErrors from './transactionErrors'

type Props = {
  onClose: () => void,
  isOpen: boolean,
  forwardedRef?: { current: any },
}

const { Value, timing } = Animated

function Products({ onClose, forwardedRef, isOpen }: Props) {
  const { products } = useSelector(({ iapProducts }) => iapProducts)
  const { uid } = useSelector(({ user }) => user?.currentUser)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [progress] = useState(new Value(0))
  const [selectedProduct, setSelectedProduct] = useState(null)
  const loadingMarkRef = useRef()

  useEffect(() => {
    if (isOpen) {
      forwardedRef?.current?.open()
    }
  }, [isOpen, forwardedRef])

  useEffect(() => {
    if (purchaseLoading && selectedProduct) {
      timing(progress, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        Vibration.vibrate(500)
        reset()
      })
    }
  }, [progress, purchaseLoading, selectedProduct])

  const buyCash = async productId => {
    setSelectedProduct(productId)
    try {
      const transaction = await IapHub.buy(productId)
      setPurchaseLoading(true)
      await updateCash(transaction?.sku)
    } catch (err) {
      console.log(err)
      transactionErrors(err.code)
    }
  }

  const updateCash = async productId => {
    const value = getProductValue(productId).value
    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        cash: firestore.FieldValue.increment(value),
      })
  }

  const reset = () => {
    setPurchaseLoading(false)
    setSelectedProduct(null)
  }

  return (
    <Sheet
      height={Dimensions.get('window').height - 70}
      customStyles={{ container: styles.container }}
      ref={forwardedRef}
      onClose={onClose}
      closeOnDragDown
      dragFromTop
    >
      <View
        style={{
          backgroundColor: SUB_BACKGROUND,
          alignItems: 'center',
          paddingTop: 10,
          flex: 1,
        }}
      >
        <ProductsIllustration />
        <Text type="label" style={{ paddingVertical: 10 }}>
          Add more cash to your account
        </Text>

        <View style={styles.products}>
          {products &&
            products.map((el, i) => (
              <ProductItem product={el} key={i} onPurchase={buyCash} />
            ))}
        </View>

        {purchaseLoading && selectedProduct && (
          <View style={styles.loadingmark}>
            <LoadingCheckmark
              size={110}
              ref={loadingMarkRef}
              loop={false}
              progress={progress}
            />
            <Text color={LABEL} type="label">
              +{formatCurrency(getProductValue(selectedProduct).value)}
            </Text>
          </View>
        )}
      </View>
    </Sheet>
  )
}

export default forwardRef<Props, React$Node>((props: Props, ref: any) => (
  <Products {...props} forwardedRef={ref} />
))

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: SUB_BACKGROUND,
  },
  actionBtn: {
    width: '78%',
    paddingVertical: 10,
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
    justifyContent: 'space-between',
    paddingHorizontal: '9%',
  },
  loadingmark: {
    position: 'absolute',
    top: '30%',
    height: '22%',
    minWidth: '42%',
    backgroundColor: 'rgba(5, 6, 6, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
})
