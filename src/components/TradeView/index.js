import React from 'react'
import { View, Dimensions } from 'react-native'
import Sheet from 'react-native-raw-bottom-sheet'

export default (props, ref) => {
  return (
    <Sheet
      height={Dimensions.get('window').height - 40}
      customStyles={{ container: { borderRadius: 10 } }}
      ref={ref}
      closeOnDragDown
      dragFromTop
    >
      <View style={{ flex: 1 }} />
    </Sheet>
  )
}
