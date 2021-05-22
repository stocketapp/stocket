import { Dimensions } from 'react-native'
import styled from '@emotion/native'

const { width } = Dimensions.get('window')

export const Row = styled.View({
  flexDirection: 'row',
})

export const PadBtn = styled.TouchableOpacity({
  width: width / 3,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: '4%',
})
