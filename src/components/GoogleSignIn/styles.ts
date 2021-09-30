import styled from '@emotion/native'

export const GoogleButton = styled.TouchableOpacity({
  width: '70%',
  height: 45,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 6,
  marginVertical: 15,
})

export const ButtonText = styled.Text({
  color: 'black',
  fontFamily: 'SFProText-SemiBold',
  fontSize: 16,
  paddingLeft: 5,
})

export const Container = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '66%',
})
