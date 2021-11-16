import { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { useReactiveVar, useMutation } from '@apollo/client'
import { sortBy } from 'lodash'
import { balanceVar, userVar } from '@cache'
import { Text, SuccessScreen } from '@components'
import IapHub from 'react-native-iaphub'
import Analytics from 'appcenter-analytics'
import { getProductValue, formatCurrency } from '@utils/functions'
import { useNavigation } from '@react-navigation/core'
import ProductsIllustration from './ProductsIllustration'
import { ADD_CASH } from './queries'
import ProductItem from './ProductItem'
import { Container, columnWrapperStyle, contentContainerStyle } from './styles'
import { IAPHUB_ENV as environment } from '../../../config'
import { useIapProducts } from '@hooks'
import LottieView from 'lottie-react-native'

const onCompleted = (data: { addCash: AddCashType }) => {
  balanceVar({ cash: data?.addCash?.cash })
}

export default function AddCash() {
  const { goBack } = useNavigation()
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const productValue = useMemo(() => getProductValue(selectedProduct), [selectedProduct])
  const [mutate, { loading }] = useMutation<{ addCash: AddCashType }>(ADD_CASH, {
    onCompleted,
  })
  const user = useReactiveVar(userVar)
  const products = useIapProducts(user?.uid ?? '')

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
      if (err) {
        purchaseEvent(sku, `FAILED - ${err}`)
      }
      console.error('Something went wrong while making a purchase', err)
    }
  }

  const onFinished = () => {
    setSelectedProduct('')
    setSuccess(false)
    goBack()
  }

  if (products.length === 0) {
    return (
      <Container>
        <LottieView
          source={require('../../assets/lottie/loading.json')}
          style={{ height: 120, width: 120 }}
          autoPlay
          loop
        />
      </Container>
    )
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
