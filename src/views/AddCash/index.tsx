import { FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { sortBy } from 'lodash'
import { productsVar } from '@cache'
import { Text } from '@components'
import ProductItem from './ProductItem'
import ProductsIllustration from './ProductsIllustration'
import { Container, columnWrapperStyle, contentContainerStyle } from './styles'

export default function AddCash() {
  const products = useReactiveVar(productsVar)

  const onPurchase = (id: string) => console.info('ProductID ->', id)

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
