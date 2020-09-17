import React, { forwardRef } from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import Sheet from 'react-native-raw-bottom-sheet'

export default forwardRef(({ uri }: { uri: string }, ref: any) => {
  return (
    <Sheet
      height={Dimensions.get('window').height - 70}
      customStyles={{ container: { borderRadius: 10 } }}
      ref={ref}
      closeOnDragDown
      dragFromTopOnly
    >
      <WebView source={{ uri }} style={{ flex: 1 }} />
    </Sheet>
  )
})
