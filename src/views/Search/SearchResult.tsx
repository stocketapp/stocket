import { ScrollView, TouchableOpacity } from 'react-native'
import { Text, Container, AddToWatchlistButton } from '@components'
import { useTheme } from '@emotion/react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useCallback } from 'react'
import { AppStackNavigationProps } from 'navigation/AppStack'
import { useIsFocused } from '@react-navigation/native'

export default function SearchResult({ data, active }: SearchResultProps) {
  const { colors, spacing } = useTheme()
  const { navigate } = useNavigation<AppStackNavigationProps>()
  const height = useSharedValue(0)
  const padding = useSharedValue(0)
  const isFocused = useIsFocused()

  const style = useAnimatedStyle(() => ({
    height: height.value,
    width: '100%',
    backgroundColor: colors.BG_DARK_CARD,
    overflow: 'scroll',
    paddingTop: withSpring(padding.value, { damping: 10, mass: 0.5, stiffness: 50 }),
    top: -30,
    zIndex: -10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingHorizontal: spacing.lg,
  }))

  const close = useCallback(() => {
    height.value = withSpring(0, { damping: 10, mass: 0.7, stiffness: 60 })
    padding.value = 0
  }, [height, padding])

  const open = useCallback(() => {
    height.value = withSpring(data?.length * 60, {
      damping: 10,
      mass: 0.7,
      stiffness: 50,
    })
    padding.value = 20
  }, [data?.length, height, padding])

  useEffect(() => {
    if (active && data?.length > 0) {
      open()
    }
  }, [data, open, active])

  useEffect(() => {
    if (!active || !isFocused) {
      close()
    } else if (isFocused || active) {
      open()
    }
  }, [active, close, isFocused, open])

  return (
    <Animated.View style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {data?.map((item: ResultObj, i: number) => (
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

const ResultItem = ({ item, setStock }: ResultItemProps) => {
  const { p, colors } = useTheme()
  return (
    <TouchableOpacity onPress={setStock} style={{ width: '100%' }}>
      <Container
        separate
        horizontal
        pv={p.lg}
        style={{ backgroundColor: colors.BG_DARK_CARD }}
      >
        <Container style={{ width: '50%', backgroundColor: colors.BG_DARK_CARD }}>
          <Text weight="Black" type="label">
            {item?.symbol}
          </Text>
          <Text color="GRAY" style={{ paddingTop: p.sm }} weight="Medium">
            {item?.securityName}
          </Text>
        </Container>

        <AddToWatchlistButton symbol={item?.symbol} />
      </Container>
    </TouchableOpacity>
  )
}

interface SearchResultProps {
  data: ResultObj[]
  active: boolean
}

interface ResultItemProps {
  setStock: () => void
  item: ResultObj
}

interface ResultObj {
  securityName: string
  symbol: string
}
