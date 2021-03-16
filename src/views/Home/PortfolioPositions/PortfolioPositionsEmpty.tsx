import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@components'
import { GREEN, DARK_TEXT, LABEL } from '@utils/colors'
import { useNavigation } from '@react-navigation/native'

const PortfolioPositionsEmpty = () => {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <Text color={LABEL} weight="Medium">
        Portfolio is empty
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigate('Search')}>
        <Text color={DARK_TEXT} weight="Black">
          Start Trading
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PortfolioPositionsEmpty

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  btn: {
    backgroundColor: GREEN,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 20,
  },
})
