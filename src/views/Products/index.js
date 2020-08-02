// @flow
import React, {
  forwardRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { Dimensions, View, StyleSheet, FlatList } from 'react-native'
import { Text, SuccessScreen } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import { getProductValue, formatCurrency } from 'utils/functions'
import firestore from '@react-native-firebase/firestore'
import {
  requestPurchase,
  purchaseUpdatedListener,
  validateReceiptIos,
  endConnection,
} from 'react-native-iap'
import { sortBy } from 'lodash'
import ProductsIllustration from './ProductsIllustration'
import ProductItem from './ProductItem'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
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
    endConnection()
    if (isOpen) {
      forwardedRef?.current?.open()
    }
  }, [isOpen, forwardedRef])

  useFocusEffect(
    useCallback(() => {
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
            await validateReceiptIos(obj, __DEV__)
            setSuccess(true)
            const value = getProductValue(sku).value
            await firestore()
              .collection('Users')
              .doc(uid)
              .update({
                cash: firestore.FieldValue.increment(value),
              })
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
    }, [uid]),
  )

  const requestBuy = async sku => {
    try {
      await requestPurchase(sku, false)
    } catch (err) {
      console.log('requestPurchase', err)
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
                renderItem={({ item }) => (
                  <ProductItem product={item} onPurchase={requestBuy} />
                )}
                keyExtractor={(el, key) => key.toString()}
                numColumns={2}
                contentContainerStyle={{ alignItems: 'center' }}
                columnWrapperStyle={{ justifyContent: 'center' }}
              />
            </View>
          )}
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
})
