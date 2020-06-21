import React, { forwardRef } from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import Sheet from 'react-native-raw-bottom-sheet'

export default forwardRef(({ uri }, ref) => {
  return (
    <Sheet
      height={Dimensions.get('window').height - 40}
      customStyles={{ container: { borderRadius: 10 } }}
      ref={ref}
      closeOnDragDown
      dragFromTopOnly
    >
      <WebView source={{ uri }} style={{ flex: 1 }} />
    </Sheet>
  )
})
