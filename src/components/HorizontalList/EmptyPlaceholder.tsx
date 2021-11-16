import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { Text } from '@components'
import { EmptyContainer } from './styles'

const EmptyPlaceholder = ({
  text = 'Nothing to see here',
  svg,
  onPress,
}: EmptyPlaceholderProps) => (
  <TouchableOpacity onPress={onPress} disabled={!onPress}>
    <EmptyContainer>
      {!!svg && svg}
      <Text color="LIGHT_GRAY" weight="Medium">
        {text}
      </Text>
    </EmptyContainer>
  </TouchableOpacity>
)

interface EmptyPlaceholderProps {
  text?: string
  svg?: React.FC<SvgProps>
  onPress?: () => void
}

export default EmptyPlaceholder
