import type { Theme } from '@emotion/react/types'

const theme: CustomTheme = {
  colors: {
    BG_DARK: '#020808',
    BG_DARK_SECONDARY: '#131818',
    BG_DARK_CARD: '#091111',
    TEXT_DARK: '#020607',
    GREEN_STOCKET: '#8cd782',
    GREEN: '#71DB77',
    GRAY: '#a0a0a0',
    RED: '#eb455a',
    WHITE: '#FFFFFF',
  },
  p: {
    sm: 4,
    md: 10,
    lg: 14,
    'lg-20': 20,
    'lg-26': 26,
    screen: 16,
  },
}
export default theme

export interface CustomTheme extends Theme {
  colors: {
    BG_DARK: string
    BG_DARK_SECONDARY: string
    BG_DARK_CARD: string
    TEXT_DARK: string
    GREEN_STOCKET: string
    GREEN: string
    GRAY: string
    RED: string
    WHITE: string
  }
  p: {
    sm: number
    md: number
    lg: number
    'lg-20': number
    'lg-26': number
    screen: number
  }
}
