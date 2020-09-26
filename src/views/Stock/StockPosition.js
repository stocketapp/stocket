import React from 'react'
import { View } from 'react-native'
import { Text, Container } from '@components'
import { GRAY_DARKER } from '@utils/colors'
import { formatCurrency } from '@utils/functions'

export default ({ data }) => (
  <Container ph top={40}>
    <Text type="heading" weight="Black">
      Position
    </Text>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
      }}
    >
      <View style={styles.posData}>
        <View style={{ paddingTop: 15 }}>
          <Text color={GRAY_DARKER}>Today's Return</Text>
          <Text style={styles.postDataValue}>
            {formatCurrency(data?.todayGains)}
          </Text>
        </View>

        <View style={{ paddingTop: 15 }}>
          <Text color={GRAY_DARKER}>Total Return</Text>
          <Text style={styles.postDataValue}>
            {formatCurrency(data?.gains)}
          </Text>
        </View>
      </View>

      <View style={styles.posData}>
        <View style={{ paddingTop: 15 }}>
          <Text color={GRAY_DARKER}>Shares</Text>
          <Text style={styles.postDataValue}>{data?.shares.length}</Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text color={GRAY_DARKER}>Equity</Text>
          <Text style={styles.postDataValue}>
            {formatCurrency(data?.value)}
          </Text>
        </View>
      </View>
    </View>

    <Text />
  </Container>
)

const styles = {
  posData: {
    justifyContent: 'space-between',
    width: '49%',
  },
  postDataValue: {
    paddingTop: 2,
    fontSize: 22,
  },
}
