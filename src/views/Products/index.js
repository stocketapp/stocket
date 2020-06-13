// @flow
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { Dimensions, View, StyleSheet, Animated, Easing } from 'react-native'
import { Container, Text, LoadingCheckmark } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'
import IapHub from 'react-native-iaphub'
import { useSelector } from 'react-redux'
import { getProductValue } from 'utils/functions'
import firestore from '@react-native-firebase/firestore'
import transactionErrors from './transactionErrors'

type Props = {
  onClose: () => void,
  isOpen: boolean,
  ref: { current: any },
}

const { Value, timing } = Animated

function Products({ onClose, ref, isOpen }: Props) {
  const { products } = useSelector(({ iapProducts }) => iapProducts)
  const { uid } = useSelector(({ user }) => user?.currentUser)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [progress] = useState(new Value(0))
  const loadingMarkRef = useRef()

  useEffect(() => {
    if (isOpen) {
      ref.current.open()
    }
  }, [isOpen, ref])

  useEffect(() => {
    timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => setPurchaseLoading(false))
  }, [progress, purchaseLoading])

  const buyCash = async productId => {
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

  // console.log(purcha)
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

        {purchaseLoading && (
          <View style={styles.loadingmark}>
            <LoadingCheckmark
              size={105}
              ref={loadingMarkRef}
              loop={false}
              progress={progress}
            />
          </View>
        )}
      </Container>
    </Sheet>
  )
}

export default forwardRef<Props, React$Node>((props, ref) =>
  Products({ ref, ...props }),
)

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
  loadingmark: {
    position: 'absolute',
    top: '30%',
    height: 120,
    width: 120,
    backgroundColor: 'rgba(5, 6, 6, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
})
