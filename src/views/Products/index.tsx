// @flow
import React, { forwardRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Dimensions, View, StyleSheet, FlatList } from 'react-native'
import { Text, SuccessScreen } from '@components'
import Sheet from 'react-native-raw-bottom-sheet'
import firestore from '@react-native-firebase/firestore'
import * as RNIap from 'react-native-iap'
import { sortBy } from 'lodash'
import { useIapProductsSelector, useUserSelector } from '@selectors'
import { useFocusEffect } from '@react-navigation/native'
import { SUB_BACKGROUND, GREEN } from '@utils/colors'
import { getProductValue, formatCurrency } from '@utils/functions'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'
import { APPSTORE_APP_SECRET } from '../../../config'

type Props = {
  onClose: () => void
  isOpen: boolean
  forwardedRef?: { current: any }
}

function Products({ onClose, forwardedRef, isOpen }: Props) {
  const { products } = useIapProductsSelector()
  const { currentUser } = useUserSelector()
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [purchasedProduct, setPurchasedProduct] = useState<string | null>(null)

  const productValues = useMemo(() => getProductValue(purchasedProduct), [purchasedProduct])

  useEffect(() => {
    if (isOpen) {
      forwardedRef?.current?.open()
    }
  }, [isOpen, forwardedRef])

  useFocusEffect(
    useCallback(() => {
      const userRef = firestore().collection('Users').doc(currentUser?.uid)
      const purchaseListener = RNIap.purchaseUpdatedListener(async purchase => {
        const receipt = purchase?.transactionReceipt
        const sku = purchase?.productId

        if (receipt) {
          try {
            const obj = {
              'receipt-data': receipt,
              password: APPSTORE_APP_SECRET,
            }
            await RNIap.validateReceiptIos(obj, __DEV__)
            const product = getProductValue(sku)
            setPurchasedProduct(sku)
            setSuccess(true)
            await userRef.update({
              cash: firestore.FieldValue.increment(product?.value ?? 0),
            })
            await RNIap.finishTransaction(purchase, true)
          } catch (err) {
            console.error('[ERROR] RNIap.purchaseUpdatedListener()', err)
          }
        }
      })

      return () => purchaseListener.remove()
    }, [currentUser?.uid]),
  )

  const requestBuy = async (sku: string) => {
    try {
      await RNIap.requestPurchase(sku, false)
    } catch (err) {
      console.error('requestPurchase', err)
    }
  }

  const onFinished = () => {
    setPurchaseLoading(false)
    setSuccess(false)
    setPurchasedProduct(null)
  }

  const close = () => {
    onClose()
    onFinished()
  }

  return (
    <Sheet
      height={Dimensions.get('window').height - 65}
      customStyles={{ container: styles.container }}
      ref={forwardedRef}
      onClose={close}
      closeOnDragDown
      dragFromTopOnly
    >
      {success ? (
        <SuccessScreen
          successText={`Successfully added ${formatCurrency(
            productValues?.value ?? 0,
          )} to your account.`}
          bigText={formatCurrency(productValues?.price ?? 0)}
          onFinished={onFinished}
          loading={purchaseLoading}
        />
      ) : (
        <View
          style={{
            backgroundColor: SUB_BACKGROUND,
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <ProductsIllustration />
          <Text type="label" style={{ paddingTop: 25, paddingBottom: 5 }}>
            Add more cash to your account
          </Text>

          {products && (
            <View style={styles.products}>
              <FlatList
                data={sortBy(products, 'price')}
                renderItem={({ item }) => <ProductItem product={item} onPurchase={requestBuy} />}
                keyExtractor={(el, key) => key.toString()}
                numColumns={2}
                contentContainerStyle={{ alignItems: 'center' }}
                columnWrapperStyle={styles.columnWrapperStyle}
              />
            </View>
          )}
        </View>
      )}
    </Sheet>
  )
}

export default forwardRef<Props, any>((props: Props, ref: any) => (
  <Products {...props} forwardedRef={ref} />
))

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: SUB_BACKGROUND,
    paddingBottom: '20%',
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
    width: '100%',
    justifyContent: 'space-between',
  },
  columnWrapperStyle: {
    justifyContent: 'flex-start',
    width: '100%',
  },
})
