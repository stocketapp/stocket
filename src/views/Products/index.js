// @flow
import React, { forwardRef, useEffect, useState, useMemo } from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { Text, SuccessScreen } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'
import { useSelector } from 'react-redux'
import { getProductValue, formatCurrency } from 'utils/functions'
import firestore from '@react-native-firebase/firestore'
import {
  requestPurchase,
  purchaseUpdatedListener,
  validateReceiptIos,
} from 'react-native-iap'
import { APPSTORE_APP_SECRET } from '../../../config'

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

  const purchasedValues = useMemo(() => getProductValue(purchasedProduct), [
    purchasedProduct,
  ])

  useEffect(() => {
    if (isOpen) {
      forwardedRef?.current?.open()
    }
  }, [isOpen, forwardedRef])

  useEffect(() => {
    let purchaseReq = purchaseUpdatedListener(async purchase => {
      try {
        const receipt = purchase?.transactionReceipt
        const sku = purchase?.productId
        setPurchasedProduct(sku)
        setPurchaseLoading(true)
        if (receipt) {
          const obj = {
            'receipt-data': receipt,
            password: APPSTORE_APP_SECRET,
          }
          await validateReceiptIos(obj, true)
          setSuccess(true)
          await updateCash(sku)
          setPurchaseLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    })

    return () => {
      purchaseReq.remove()
      purchaseReq = null
    }
  })

  const buyCash = async sku => {
    try {
      await requestPurchase(sku, false)
    } catch (err) {
      console.log('requestPurchase', err)
    }
  }

  const updateCash = async sku => {
    const value = getProductValue(sku).value
    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        cash: firestore.FieldValue.increment(value),
      })
  }

  const onFinished = () => {
    setPurchaseLoading(true)
    setSuccess(false)
    setPurchasedProduct(null)
  }

  const close = () => {
    onClose()
    onFinished()
  }

  return (
    <Sheet
      height={Dimensions.get('window').height - 70}
      customStyles={{ container: styles.container }}
      ref={forwardedRef}
      onClose={close}
      closeOnDragDown
      dragFromTop
    >
      {success ? (
        <SuccessScreen
          successText={`Successfully added ${formatCurrency(
            purchasedValues?.value,
          )} to your account.`}
          bigText={formatCurrency(purchasedValues?.price)}
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
