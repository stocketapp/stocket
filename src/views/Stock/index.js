import React, { useMemo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Graph } from 'components'
import { GREEN, BACKGROUND, DARK_TEXT, GRAY_DARKER } from 'utils/colors'
import { useSelector } from 'react-redux'
import StockDetails from './StockDetails'

export default function Stock() {
  const { selectedStock, positionsMktData } = useSelector(({ stock }) => stock)
  const position = useMemo(
    () => positionsMktData.find(el => el.symbol === selectedStock.symbol),
    [selectedStock, positionsMktData],
  )

  return (
    <View style={styles.container} ph>
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text type="heading" weight="900">
            {selectedStock?.name}
          </Text>
          <Text style={{ paddingTop: 5 }}>{selectedStock?.symbol}</Text>
        </View>

        <Graph />

        <StockDetails data={position} />
      </View>

      <View style={styles.bottom}>
        <View style={{ flexDirection: 'column' }}>
          <Text color={GRAY_DARKER}>Day change </Text>
          <Text
            weight="900"
            status={Number(position?.day_change) < 0 ? 'positive' : 'negative'}
            style={{ paddingTop: 2, fontSize: 15 }}
          >
            {position?.day_change}
          </Text>
        </View>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text color={DARK_TEXT} weight="800">
              Trade
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: GREEN,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 100,
  },
}
