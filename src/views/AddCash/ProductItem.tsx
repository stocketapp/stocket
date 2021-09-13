import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import { CARD_BACKGROUND, GREEN } from '@utils/colors'
import productImgs from '@products-assets'
import { IapHubProductInformation } from 'react-native-iaphub'

export default ({ product, onPurchase }: Props) => (
  <TouchableOpacity
    style={styles.btnContainer}
    activeOpacity={0.6}
    onPress={() => onPurchase(product?.sku)}
  >
    {product?.sku && (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={productImgs[product?.sku]} style={styles.productImg} />
        </View>

        <View style={styles.textContainer}>
          <Text
            weight="Black"
            color="TEXT_DARK"
            style={{ textAlign: 'center' }}
            type="label"
          >
            {product?.price}
          </Text>
        </View>
      </View>
    )}
  </TouchableOpacity>
)

interface Props {
  product: IapHubProductInformation
  onPurchase: (id: string) => void
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222222',
    borderRadius: 12,
    shadowColor: CARD_BACKGROUND,
    shadowOffset: { height: 0, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    width: '100%',
    paddingTop: 5,
  },
  textContainer: {
    backgroundColor: GREEN,
    opacity: 0.9,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 5,
  },
  productImg: {
    height: '85%',
    width: '85%',
    resizeMode: 'contain',
  },
  imgContainer: {
    paddingHorizontal: 10,
    height: 85,
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    padding: 10,
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
