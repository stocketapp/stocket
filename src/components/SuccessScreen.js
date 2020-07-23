// @flow
import React, { useRef, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { LoadingCheckmark, Text } from 'components'
import { GREEN, DARK_TEXT } from 'utils/colors'

type Props = {
  loading: boolean,
  successText: string,
  onFinished: () => void,
  bigText?: string,
}

export default ({ loading, onFinished, successText, bigText }: Props) => {
  const ref = useRef()

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.play(0, 90)
    }
  }, [loading, ref])

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: '10%' }}>
        <LoadingCheckmark size={150} ref={ref} loop={false} />
      </View>
      <>
        <Text style={{ textAlign: 'center' }}>{successText}</Text>

        <Text weight="Bold" style={{ paddingTop: 30, fontSize: 28 }}>
          {bigText}
        </Text>

        <TouchableOpacity style={{ marginTop: '18%' }} onPress={onFinished}>
          <View style={styles.btn}>
            <Text weight="Heavy" color={DARK_TEXT}>
              DONE
            </Text>
          </View>
        </TouchableOpacity>
      </>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: GREEN,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
}
