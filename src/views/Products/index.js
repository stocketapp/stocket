import React, { forwardRef, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Container, Text } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import * as RNIap from 'react-native-iap'
import ProductsIllustration from './ProductsIllustration'
import productsArr from './products'

type ProductsType = {
  onClose: () => void,
  isOpen: boolean,
  ref: { current: any },
}

function Products({ onClose, ref, isOpen }: ProductsType) {
  const [products, setProductss] = useState(null)
  useEffect(() => {
    if (isOpen) {
      ref.current.open()
    }
  }, [isOpen, ref])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await RNIap.getProducts(['5k_buying_power'])
        console.log(res)
      } catch (err) {
        console.warn(err) // standardized err.code and err.message available
      }
    }
    getProducts()
    setProductss(productsArr)
  }, [])

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
        <Text>Productss</Text>

        {products && products.map(el => <Text>{el.title}</Text>)}
      </Container>
    </Sheet>
  )
}

export default forwardRef((props, ref) => Products({ ref, ...props }))

const styles = {
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
}
