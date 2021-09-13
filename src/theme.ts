const theme: StocketTheme = {
  colors: {
    BG_DARK: '#020808',
    BG_DARK_SECONDARY: '#131818',
    BG_DARK_CARD: '#091111',
    TEXT_DARK: '#020607',
    GREEN_STOCKET: '#8cd782',
    GREEN: '#71DB77',
    GRAY: '#a4a4a4',
    RED: '#eb455a',
    WHITE: '#FFFFFF',
    LIGHT_GRAY: '#a4a4a46f',
  },
  spacing: {
    xsm: 2,
    sm: 5,
    md: 10,
    lg: 16,
    xlg: 20,
    xxlg: 28,
    huge: 35,
    screen: 18,
  },
  p: {
    xsm: 2,
    sm: 5,
    md: 10,
    lg: 16,
    xlg: 20,
    xxlg: 28,
    huge: 35,
    screen: 18,
  },
  m: {
    xsm: 2,
    sm: 5,
    md: 10,
    lg: 16,
    xlg: 20,
    xxlg: 28,
    huge: 35,
    screen: 18,
  },
}
export default theme

export interface StocketTheme {
  colors: ThemeColors
  p: Spacing
  m: Spacing
  spacing: Spacing
}

export interface ThemeColors {
  BG_DARK: '#020808'
  BG_DARK_SECONDARY: '#131818'
  BG_DARK_CARD: '#091111'
  TEXT_DARK: '#020607'
  GREEN_STOCKET: '#8cd782'
  GREEN: '#71DB77'
  GRAY: '#a4a4a4'
  RED: '#eb455a'
  WHITE: '#FFFFFF'
  LIGHT_GRAY: '#a4a4a46f'
  [key: string]: string
}

export interface Spacing {
  xsm: 2
  sm: 5
  md: 10
  lg: 16
  xlg: 20
  xxlg: 28
  huge: 35
  screen: 18
}
