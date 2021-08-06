import { StocketTheme } from './theme'

declare module '@emotion/react' {
  export interface Theme extends StocketTheme {}
}
