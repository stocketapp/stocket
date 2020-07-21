// @flow
import React, { forwardRef, useEffect, useState, useMemo } from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { Text, SuccessScreen } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
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

function Products({ onClose, forwardedRef, isOpen }: Props) {
  const { products } = useSelector(({ iapProducts }) => iapProducts)
  const { uid } = useSelector(({ user }) => user?.currentUser)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [purchasedProduct, setPurchasedProduct] = useState(null)

  useEffect(() => {
    if (isOpen) {
      forwardedRef?.current?.open()
    }
  }, [isOpen, forwardedRef])

  const buyCash = async productId => {
    try {
      setPurchaseLoading(true)
      const transaction = await IapHub.buy(productId)
      setSuccess(true)
      setPurchasedProduct(transaction)
      await updateCash(transaction?.sku)
    } catch (err) {
      console.log('[ERROR] buyCash()', err)
      transactionErrors(err.code)
    } finally {
      setPurchaseLoading(false)
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
    setSuccess(false)
    setPurchasedProduct(null)
  }

  const onFinished = () => {
    reset()
    forwardedRef?.current?.close()
  }

  const purchasedValues = useMemo(
    () => getProductValue(purchasedProduct?.sku),
    [purchasedProduct?.sku],
  )

  console.log(success)

  return (
    <Sheet
      height={Dimensions.get('window').height - 70}
      customStyles={{ container: styles.container }}
      ref={forwardedRef}
      onClose={onClose}
      closeOnDragDown
      dragFromTop
    >
      {/* <SuccessScreen
        successText={`Successfully added ${formatCurrency(
          purchasedValues?.value,
        )} to your account.`}
        bigText={purchasedValues?.price}
        onFinished={onFinished}
        loading={purchaseLoading}
      /> */}
      {success ? (
        <SuccessScreen
          successText={`Successfully added ${formatCurrency(
            purchasedValues?.value,
          )} to your account.`}
          bigText={purchasedValues.price}
          onFinished={onFinished}
          loading={purchaseLoading}
        />
      ) : (
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
        </View>
      )}
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
