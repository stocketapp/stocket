import { View, StyleSheet } from 'react-native'
import { Container, Text } from '@components'
import { LABEL } from '@utils/colors'
import { formatCurrency } from '@utils/functions'
import { useBalance } from '@hooks'
// import BugIcon from '@assets/svg/bug.svg'
import ProfileItem from './ProfileItem'
import AddCash from './AddCash'
import LogoutButton from './LogoutButton'
import pckg from '../../../package.json'
import { useReactiveVar } from '@apollo/client'
import { userVar } from '@cache'
import { Content, Row } from './styles'
import { useNavigation } from '@react-navigation/native'
import { ProfileNavigationProps } from 'navigation/stacks/ProfileStack'

export default function Profile() {
  const { balance } = useBalance()
  const user = useReactiveVar(userVar)
  const { navigate } = useNavigation<ProfileNavigationProps>()
  // const { userInfo } = useUserSelector()
  // const iapRef = useRef(null)
  // const [isIapOpen, setIsIapOpen] = useState(false)
  // const portfolioValue = userInfo?.portfolioValue ?? '$0.00'
  // const cash = formatCurrency(userInfo?.cash ?? 0)
  // const { totalGains } = useTotalGains(portfolioValue ?? '$0.00')
  // const accountValue = formatCurrency(currencyToNumber(portfolioValue) + currencyToNumber(cash))

  return (
    <>
      <Container fullView ph safeAreaTop>
        <Container bottom={26}>
          <View>
            <Text type="heading" style={styles.name} weight="Bold">
              {user?.displayName}
            </Text>
            <Text type="label" color="GRAY" style={{ paddingTop: 5 }}>
              {user?.email}
            </Text>
          </View>

          <Row>
            <View>
              <Text style={styles.value}>Available Cash</Text>
              <Text style={styles.cash} weight="Bold" type="title">
                {formatCurrency(balance?.cash ?? 0)}
              </Text>
            </View>

            <View>
              <AddCash onPress={() => navigate('AddCash')} />
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
        {/* <TouchableOpacity
          style={styles.reportBugBtn}
          activeOpacity={0.5}
          onPress={() => Shake.show()}
        >
          <BugIcon height={18} width={18} stroke="#a0a0a0" style={{ marginRight: 5 }} />
          <Text style={styles.reportBug} weight="Medium">
            Report a bug
          </Text>
        </TouchableOpacity> */}
        <LogoutButton />
        <Text style={{ paddingTop: 10 }} type="subtext" color="GRAY">
          {pckg.version}
        </Text>
      </View>
      {/* <Products ref={iapRef} isOpen={isIapOpen} onClose={() => setIsIapOpen(false)} /> */}
    </>
  )
}

const styles = StyleSheet.create({
  name: {
    paddingTop: 15,
  },
  value: {
    fontSize: 15,
    color: LABEL,
  },
  cash: {
    paddingTop: 5,
  },
  cashContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 20,
  },
  reportBug: {
    color: LABEL,
  },
  reportBugBtn: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 18,
  },
})
