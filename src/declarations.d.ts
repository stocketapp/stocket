import { CustomTheme } from 'theme'

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
