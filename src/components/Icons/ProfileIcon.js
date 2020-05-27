import React from 'react'
import Icon from './Icon'
import { Path } from 'react-native-svg'
import type { IconProps } from '../Types'

const ProfileIcon = ({ size, color = '#fff' }: IconProps) => (
  <Icon size={size} color={color}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7ZM15.8 7C15.8 9.09868 14.0987 10.8 12 10.8C9.90132 10.8 8.2 9.09868 8.2 7C8.2 4.90132 9.90132 3.2 12 3.2C14.0987 3.2 15.8 4.90132 15.8 7ZM3 21C3 16.5817 6.58172 13 11 13H13C17.4183 13 21 16.5817 21 21C21 21 18 22 12 22C6 22 3 21 3 21ZM10.9958 14.2C7.65616 14.2 4.81083 16.6251 4.28168 19.9226L4.25 20.12C4.25 20.12 7 20.8 12 20.8C17 20.8 19.75 20.12 19.75 20.12L19.7073 19.8674C19.1546 16.5953 16.3208 14.2 13.0023 14.2H10.9958Z"
      fill="#ffffff"
    />
  </Icon>
)

export default ProfileIcon
