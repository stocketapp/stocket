import { FlatList } from 'react-native'
import { useReactiveVar, useMutation } from '@apollo/client'
import { sortBy } from 'lodash'
import { productsVar, balanceVar } from '@cache'
import { Text, SuccessScreen } from '@components'
import ProductItem from './ProductItem'
import ProductsIllustration from './ProductsIllustration'
import { Container, columnWrapperStyle, contentContainerStyle } from './styles'
import IapHub from 'react-native-iaphub'
import Analytics from 'appcenter-analytics'
import { IAPHUB_ENV as environment } from '../../../config'
import { ADD_CASH } from './queries'
import { useMemo, useState } from 'react'
import { getProductValue, formatCurrency } from '@utils/functions'
import { useNavigation } from '@react-navigation/core'

const onCompleted = (data: { addCash: AddCashType }) => {
  balanceVar({ cash: data?.addCash?.cash })
}

export default function AddCash() {
  const { goBack } = useNavigation()
  const products = useReactiveVar(productsVar)
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [success, setSuccess] = useState(true)
  const [mutate, { loading }] = useMutation<{ addCash: AddCashType }>(ADD_CASH, {
    onCompleted,
  })

  const productValue = useMemo(() => getProductValue(selectedProduct), [selectedProduct])

  const purchaseEvent = (product: string, status: string) =>
    Analytics.trackEvent('Purchase', { product, status, environment })

  const onPurchase = async (sku: string) => {
    try {
      purchaseEvent(sku, 'START')
      setSelectedProduct(sku)
      const transaction = await IapHub.buy(sku)
      await mutate({
        variables: { input: { sku, purchaseId: transaction?.purchase } },
      })
      setSuccess(true)
      purchaseEvent(sku, 'SUCCESS')
    } catch (err) {
      if (err.code) {
        purchaseEvent(sku, `FAILED - ${err.code}`)
      }
      console.error('Something went wrong while making a purchase', err)
    }
  }

  const onFinished = () => {
    setSelectedProduct('')
    setSuccess(false)
    goBack()
  }

  return (
    <Container>
      {!success ? (
        <>
          <ProductsIllustration />
          <Text
            type="label"
            weight="Medium"
            style={{ paddingTop: 42, paddingBottom: 15 }}
          >
            Add more cash to your account
          </Text>
          <FlatList
            data={sortBy(products, 'price')}
            renderItem={({ item }) => (
              <ProductItem product={item} onPurchase={onPurchase} />
            )}
            keyExtractor={(el, key) => key.toString()}
            numColumns={2}
            contentContainerStyle={contentContainerStyle}
            columnWrapperStyle={columnWrapperStyle}
          />
        </>
      ) : (
        <SuccessScreen
          successText={`Successfully added ${formatCurrency(
            productValue?.value ?? 0,
          )} to your account.`}
          bigText={formatCurrency(productValue?.price ?? 0)}
          onFinished={onFinished}
          loading={loading}
        />
      )}
    </Container>
  )
}

interface AddCashType {
  cash: number
}
