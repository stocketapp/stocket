import { Text } from '@components'
import { ProfileButtonItemContainer, ProfileButtonItemInner } from './styles'
import ChevronRight from '@svg/chevron-right.svg'
import theme from '@theme'

export default function ProfileButtonItem({ label, onPress }: ProfileButtonItemProps) {
  return (
    <ProfileButtonItemContainer onPress={onPress}>
      <ProfileButtonItemInner>
        <Text type="label" color="GRAY">
          {label}
        </Text>
        <ChevronRight height={22} width={22} stroke={theme.colors.GRAY} />
      </ProfileButtonItemInner>
    </ProfileButtonItemContainer>
  )
}
interface ProfileButtonItemProps {
  label: string
  onPress: () => void
}
