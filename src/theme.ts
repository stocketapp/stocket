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
    xsm: 2,
    sm: 5,
    md: 10,
    lg: 15,
    xlg: 20,
    xxlg: 26,
    huge: 35,
  },
  m: {
    xsm: 2,
    sm: 5,
    md: 10,
    lg: 15,
    xlg: 20,
    xxlg: 26,
    huge: 35,
  },
}
export default theme

export interface CustomTheme {
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
    xsm: 2
    sm: 5
    md: 10
    lg: 15
    xlg: 20
    xxlg: 26
    huge: 35
  }
  m: {
    xsm: 2
    sm: 5
    md: 10
    lg: 15
    xlg: 20
    xxlg: 26
    huge: 35
  }
}
