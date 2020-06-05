import React, { forwardRef, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { Container, Text } from 'components'
import Sheet from 'react-native-raw-bottom-sheet'
import { SUB_BACKGROUND, GREEN } from 'utils/colors'
import PurchaseIllustration from './PurchaseIllustration'

type PurchaseTypes = {
  onClose: () => void,
  isOpen: boolean,
  ref: { current: any },
}

function Purchase({ onClose, ref, isOpen }: PurchaseTypes) {
  useEffect(() => {
    if (isOpen) {
      ref.current.open()
    }
  }, [isOpen, ref])

  return (
    <Sheet
      height={Dimensions.get('window').height - 80}
      customStyles={{ container: styles.container }}
      ref={ref}
      onClose={onClose}
      closeOnDragDown
      dragFromTop
    >
      <Container ph fullView style={{ backgroundColor: SUB_BACKGROUND }}>
        <PurchaseIllustration />
        <Text>Purchases</Text>
      </Container>
    </Sheet>
  )
}

export default forwardRef((props, ref) => Purchase({ ref, ...props }))

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
