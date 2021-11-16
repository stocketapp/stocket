import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Container, Text } from '@components'
import { useReactiveVar } from '@apollo/client'
import { formatCurrency } from '@utils/functions'
import { useBalance } from '@hooks'
import BugIcon from '@assets/svg/bug.svg'
import { userVar } from '@cache'
import { ProfileNavigationProps } from 'navigation/stacks/ProfileStack'
import BugBattle from 'react-native-bugbattle-sdk'
import ProfileItem from './ProfileItem'
import ProfileButtonItem from './ProfileButtonItem'
import AddCashButton from './AddCashButton'
import LogoutButton from './LogoutButton'
import { Content, Row, reportBugButton } from './styles'
import pckg from '../../../package.json'
import { useTheme } from '@emotion/react'

export default function Profile() {
  const user = useReactiveVar(userVar)
  const { balance } = useBalance()
  const { navigate } = useNavigation<ProfileNavigationProps>()
  const { spacing } = useTheme()

  return (
    <>
      <Container fullView ph safeAreaTop>
        <Container bottom={26}>
          <View>
            <Text type="heading" weight="Bold" pt={spacing.lg}>
              {user?.displayName}
            </Text>
            <Text type="label" color="GRAY" pt={spacing.sm}>
              {user?.email}
            </Text>
          </View>

          <Row>
            <View>
              <Text color="GRAY">Available Cash</Text>
              <Text weight="Bold" type="title" pt={spacing.sm}>
                {formatCurrency(balance?.cash ?? 0)}
              </Text>
            </View>

            <View>
              <AddCashButton onPress={() => navigate('AddCash')} />
            </View>
          </Row>
        </Container>

        <Content>
          <ProfileItem
            label="Portfolio Value"
            value={formatCurrency(balance?.portfolio ?? 0)}
          />
          <ProfileItem
            label="Account Value"
            value={formatCurrency(balance?.total ?? 0)}
          />
        </Content>

        <Content style={{ paddingTop: spacing.xlg }}>
          <Text color="LIGHT_GRAY" weight="Light" type="title">
            History
          </Text>
          <ProfileButtonItem
            label="Purchases"
            onPress={() => navigate('PurchasesHistory')}
          />
          <ProfileButtonItem label="Trades" onPress={() => navigate('TradesHistory')} />
        </Content>
      </Container>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingBottom: 20,
          bottom: 0,
          position: 'absolute',
        }}
      >
        <TouchableOpacity
          style={reportBugButton}
          activeOpacity={0.5}
          onPress={() => BugBattle.startBugReporting()}
        >
          <BugIcon
            height={18}
            width={18}
            stroke="#a0a0a0"
            style={{ marginRight: spacing.sm }}
          />
          <Text weight="Medium" color="GRAY">
            Report a bug
          </Text>
        </TouchableOpacity>
        <LogoutButton />
        <Text style={{ paddingTop: spacing.md }} type="subtext" color="GRAY">
          {pckg.version}
        </Text>
      </View>
    </>
  )
}
