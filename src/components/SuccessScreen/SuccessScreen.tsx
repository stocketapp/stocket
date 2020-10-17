import React, { useRef, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { DARK_TEXT } from '@utils/colors'
import LoadingCheckmark from '../LoadingCheckmark/LoadingCheckmark'
import Text from '../Text'
import styles from './styles'

interface Props {
  loading: boolean
  successText: string
  onFinished: () => void
  bigText?: string
}

interface RefCurrent {
  current:
    | {
        play: (a: number, b: number) => void | undefined
      }
    | undefined
}

export default ({ loading, onFinished, successText, bigText }: Props) => {
  const ref: RefCurrent = useRef()

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.play(0, 90)
    }
  }, [loading, ref])

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: '10%' }}>
        <LoadingCheckmark size={150} forwardedRef={ref} loop={false} />
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
