const productImgs: ProductImgs = {
  'com.corasan.stocket.5k_cash': require('./com.corasan.stocket.5k_cash.jpg'),
  'com.corasan.stocket.10k_cash': require('./com.corasan.stocket.10k_cash.jpg'),
  'com.corasan.stocket.40k_cash': require('./com.corasan.stocket.40k_cash.jpg'),
  'com.corasan.stocket.75k_cash': require('./com.corasan.stocket.75k_cash.jpg'),
}

type ProductImgs = {
  'com.corasan.stocket.5k_cash': string
  'com.corasan.stocket.10k_cash': string
  'com.corasan.stocket.40k_cash': string
  'com.corasan.stocket.75k_cash': string
  [key: string]: any
}

export default productImgs
