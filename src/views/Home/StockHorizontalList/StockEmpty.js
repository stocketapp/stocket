import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { BLUE } from 'utils/colors'
import { useNavigation } from '@react-navigation/native'

export default function StockEmpty() {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <Text cap>Portfolio is empty</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigate('Search')}>
        <Text>Start Trading</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  btn: {
    backgroundColor: BLUE,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 100,
    marginTop: 20,
  },
}
