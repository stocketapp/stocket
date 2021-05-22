const theme: CustomTheme = {
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

export interface CustomTheme {
  colors: ThemeColors
  p: {
    xsm: 2
    sm: 5
    md: 10
    lg: 16
    xlg: 20
    xxlg: 28
    huge: 35
    screen: 18
  }
  m: {
    xsm: 2
    sm: 5
    md: 10
    lg: 16
    xlg: 20
    xxlg: 28
    huge: 35
    screen: 18
  }
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
