// @flow
import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { Container, Text } from 'components'
import { LABEL, CARD_BACKGROUND } from 'utils/colors'
import { useSelector } from 'react-redux'
import { formatCurrency, currencyToNumber } from 'utils/functions'
import ProfileItem from './ProfileItem'
import AddCash from './AddCash'
import LogoutButton from './LogoutButton'
import p from '../../../package.json'
import Products from '../Products'

export default function Profile() {
  const { userInfo } = useSelector(({ user }) => user)
  const { cash, portfolioValue } = userInfo
  const iapRef = useRef()
  const [isIapOpen, setIsIapOpen] = useState(false)

  return (
    <Container fullView ph style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        <Container style={styles.topBlock} ph safeAreaTop bottom={26}>
          <View>
            <Text type="heading" style={styles.name} weight="Bold">
              {userInfo?.name}
            </Text>
            <Text type="subtext" color={LABEL}>
              {userInfo?.email}
            </Text>
          </View>

          <View style={styles.cashContainer}>
            <View>
              <Text style={styles.value}>Cash</Text>
              <Text style={styles.cash} weight="Bold" type="title">
                {formatCurrency(cash)}
              </Text>
            </View>

            <View>
              <AddCash onPress={() => setIsIapOpen(true)} />
            </View>
          </View>
        </Container>

        <Container top={40}>
          <ProfileItem label="Portfolio" value={portfolioValue} />
          <ProfileItem
            label="Total Value"
            value={formatCurrency(currencyToNumber(portfolioValue) + cash)}
          />
        </Container>
      </View>

      <View style={{ width: '100%', alignItems: 'center', paddingBottom: 20 }}>
        <LogoutButton />
        <Text style={{ paddingTop: 10 }} type="subtext" color={LABEL}>
          {p.version}
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
