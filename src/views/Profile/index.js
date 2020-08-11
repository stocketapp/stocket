// @flow
import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { Container, Text } from 'components'
import { LABEL, CARD_BACKGROUND } from 'utils/colors'
import { useSelector } from 'react-redux'
import { formatCurrency, currencyToNumber } from 'utils/functions'
import { useTotalGains } from 'hooks'
import ProfileItem from './ProfileItem'
import AddCash from './AddCash'
import LogoutButton from './LogoutButton'
import pckg from '../../../package.json'
import Products from '../Products'

export default function Profile() {
  const { userInfo } = useSelector(({ user }) => user)
  const iapRef = useRef()
  const [isIapOpen, setIsIapOpen] = useState(false)
  const portfolioValue = userInfo?.portfolioValue
  const cash = formatCurrency(userInfo?.cash)
  const { totalGains } = useTotalGains(portfolioValue ?? '$0.00')
  const accountValue = formatCurrency(
    currencyToNumber(portfolioValue) + userInfo?.cash,
  )

  return (
    <Container fullView ph style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        <Container style={styles.topBlock} ph safeAreaTop bottom={26}>
          <View>
            {/* <Text type="heading" style={styles.name} weight="Bold">
              {userInfo?.name}
            </Text> */}
            <Text type="subtext" color={LABEL} style={{ paddingTop: 15 }}>
              {userInfo?.email}
            </Text>
          </View>

          <View style={styles.cashContainer}>
            <View>
              <Text style={styles.value}>Cash</Text>
              <Text style={styles.cash} weight="Bold" type="title">
                {cash}
              </Text>
            </View>

            <View>
              <AddCash onPress={() => setIsIapOpen(true)} />
            </View>
          </View>
        </Container>

        <Container top={40}>
          <ProfileItem label="Portfolio Value" value={portfolioValue} />
          <ProfileItem label="Portfolio Gains" value={`${totalGains}`} />
          <ProfileItem label="Account Value" value={accountValue} />
        </Container>
      </View>

      <View style={{ width: '100%', alignItems: 'center', paddingBottom: 20 }}>
        <LogoutButton />
        <Text style={{ paddingTop: 10 }} type="subtext" color={LABEL}>
          {pckg.version}
        </Text>
      </View>
      <Products
        ref={iapRef}
        isOpen={isIapOpen}
        onClose={() => setIsIapOpen(false)}
      />
    </Container>
  )
}

const styles = {
  topBlock: {
    width: '100%',
    height: '32%',
    backgroundColor: CARD_BACKGROUND,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
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
  },
}
