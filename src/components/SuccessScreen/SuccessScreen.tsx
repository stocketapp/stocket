import { useRef, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Text from '../Text'
import { SuccessScreenContainer, SucessBtn } from './styles'
import LottieView from 'lottie-react-native'

interface Props {
  loading: boolean
  successText: string
  onFinished: () => void
  bigText?: string
}

export default function SuccessScreen({
  loading,
  onFinished,
  successText,
  bigText,
}: Props) {
  const ref = useRef<any>()

  useEffect(() => {
    if (!loading) {
      ref?.current?.play(120, 200)
    }
  }, [loading, ref])

  return (
    <SuccessScreenContainer>
      <View style={{ paddingTop: '10%' }}>
        <LottieView
          source={require('../../assets/lottie/loading-checkmark.json')}
          style={{ height: 120, width: 120 }}
          loop={false}
          ref={ref}
        />
      </View>
      <Text
        style={{ textAlign: 'center' }}
        pt={20}
        weight="Medium"
        type="title"
        numberOfLines={2}
      >
        {successText}
      </Text>

      <Text weight="Black" pt={30} type="big">
        {bigText}
      </Text>
      <Text weight="Medium" color="GRAY">
        Price
      </Text>

      <TouchableOpacity style={{ marginTop: '18%' }} onPress={onFinished}>
        <SucessBtn>
          <Text weight="Black" color="TEXT_DARK">
            DONE
          </Text>
        </SucessBtn>
      </TouchableOpacity>
    </SuccessScreenContainer>
  )
}
