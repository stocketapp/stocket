import * as React from 'react'
import { View, ViewStyle, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { BACKGROUND, GREEN } from '@utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from '@icons'
import { useNavigation } from '@react-navigation/core'

const { width: windowWidth } = Dimensions.get('window')

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  justifyContent = 'flex-start',
  horizontal = false,
  separate = false,
  ph = false,
  top = 0,
  bottom = 0,
  right = 0,
  left = 0,
  width = '100%',
  fullView = false,
  safeAreaTop = false,
  safeAreaBottom = false,
  alignItems = 'flex-start',
  useNavBar = false,
  scrollable = false,
  pv = null,
}) => {
  const { top: insetTop, bottom: insetBottom } = useSafeAreaInsets()
  const { goBack, canGoBack } = useNavigation()

  const defaultStyles: ViewStyle = {
    width,
    justifyContent: separate ? 'space-between' : justifyContent,
    alignItems,
    flexDirection: horizontal ? 'row' : 'column',
    paddingHorizontal: ph ? 18 : 0,
    paddingRight: ph ? 18 : right,
    paddingLeft: ph ? 18 : left,
    ...(ph ? { paddingHorizontal: 18 } : { paddingRight: right, paddingLeft: left }),
    backgroundColor: BACKGROUND,
    ...(fullView && { flex: 1 }),
    ...(pv
      ? { paddingVertical: pv }
      : {
          paddingTop: safeAreaTop ? insetTop : top,
          paddingBottom: safeAreaBottom ? insetBottom : bottom,
        }),
  }

  return (
    <>
      <ScrollView
        scrollEnabled={scrollable}
        style={{ backgroundColor: BACKGROUND }}
        contentContainerStyle={{
          paddingBottom: scrollable ? 20 : 0,
          width: scrollable ? windowWidth : '100%',
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[defaultStyles, style]}>
          {canGoBack() && useNavBar && (
            <Container ph>
              <TouchableOpacity
                style={{ paddingVertical: 5, paddingRight: 5 }}
                onPress={goBack}
              >
                <ArrowLeftIcon size={34} color={GREEN} />
              </TouchableOpacity>
            </Container>
          )}
          {children}
        </View>
      </ScrollView>
    </>
  )
}

export interface ContainerProps {
  children: React.ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  horizontal?: boolean
  separate?: boolean
  ph?: boolean
  top?: number
  bottom?: number
  right?: number
  left?: number
  width?: string | number
  style?: ViewStyle | {}
  fullView?: boolean
  safeAreaTop?: boolean
  safeAreaBottom?: boolean
  useNavBar?: boolean
  scrollable?: boolean
  pv?: number
}

export default Container
