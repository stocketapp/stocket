import { FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { sortBy } from 'lodash'
import { productsVar } from '@cache'
import { Text } from '@components'
import ProductItem from './ProductItem'
import ProductsIllustration from './ProductsIllustration'
import { Container, columnWrapperStyle, contentContainerStyle } from './styles'
import IapHub from 'react-native-iaphub'
import Analytics from 'appcenter-analytics'
import { IAPHUB_ENV as environment } from '../../../config'

export default function AddCash() {
  const products = useReactiveVar(productsVar)

  const purchaseEvent = (product: string, status: string) =>
    Analytics.trackEvent('Purchase', { product, status, environment })

  const onPurchase = async (sku: string) => {
    try {
      purchaseEvent(sku, 'START')
      await IapHub.buy(sku)
      purchaseEvent(sku, 'SUCCESS')
    } catch (err) {
      if (err.code) {
        purchaseEvent(sku, `FAILED - ${err.code}`)
      }
      console.error('Something went wrong while making a purchase', err)
    }
  }

  return (
    <Container>
      <ProductsIllustration />
      <Text type="label" weight="Medium" style={{ paddingTop: 42, paddingBottom: 15 }}>
        Add more cash to your account
      </Text>
      <FlatList
        data={sortBy(products, 'price')}
        renderItem={({ item }) => <ProductItem product={item} onPurchase={onPurchase} />}
        keyExtractor={(el, key) => key.toString()}
        numColumns={2}
        contentContainerStyle={contentContainerStyle}
        columnWrapperStyle={columnWrapperStyle}
      />
    </Container>
  )
}
