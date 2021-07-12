import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@components'
import { GREEN } from '@utils/colors'
import { useNavigation } from '@react-navigation/native'

const PortfolioPositionsEmpty = () => {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <Text color="LIGHT_GRAY" weight="Medium">
        Portfolio is empty
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigate('Search')}>
        <Text color="TEXT_DARK" weight="Black">
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
