import { ScrollView } from 'react-native'
import { useTheme } from '@emotion/react'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { AppStackNavigationProps } from 'navigation/AppStack'
import ResultItem from './ResultItem'
import { searchResultContainerStyle } from './styles'
import { SearchResultType } from 'types'

export default function SearchResult({
  data,
  height,
  padding,
  display,
}: SearchResultsProps) {
  const { colors, spacing } = useTheme()
  const { navigate } = useNavigation<AppStackNavigationProps>()

  const style = useAnimatedStyle(() => ({
    height: withSpring(height.value, { damping: 10, mass: 0.7, stiffness: 55 }),
    backgroundColor: colors.BG_DARK_CARD,
    paddingTop: withSpring(padding.value, { damping: 10, mass: 0.7, stiffness: 55 }),
    paddingHorizontal: spacing.lg,
    zIndex: 1,
    display: display.value === 0 ? 'none' : 'flex',
  }))

  return (
    <Animated.View style={[searchResultContainerStyle, style]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {data?.map((item: SearchResultType, i: number) => (
          <ResultItem
            item={item}
            setStock={() =>
              navigate('StockStack', {
                screen: 'Stock',
                params: {
                  symbol: item?.symbol,
                  companyName: item?.securityName,
                  logo: '',
                },
              })
            }
            key={i}
          />
        ))}
      </ScrollView>
    </Animated.View>
  )
}

interface SearchResultsProps {
  data: SearchResultType[]
  height: Animated.SharedValue<number>
  padding: Animated.SharedValue<number>
  display: Animated.SharedValue<number>
}
