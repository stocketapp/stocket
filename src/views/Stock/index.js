import React, { useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Graph } from 'components'
import { GREEN, BACKGROUND, DARK_TEXT, GRAY_DARKER } from 'utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { getStock } from 'api'

export default function Stock() {
  const { selectedStock, stockData } = useSelector(({ stock }) => stock)
  const dispatch = useDispatch()

  useEffect(() => {
    const getStockData = async () => {
      const res = await getStock(selectedStock?.symbol)
      // console.log(res[0].day_change)
      dispatch({
        type: 'SET_SELECTED_STOCK_DATA',
        stockData: res[0],
      })
    }

    getStockData()
  }, [selectedStock, dispatch])

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
        <View />
      </View>

      <View style={styles.bottom}>
        <View style={{ flexDirection: 'column' }}>
          <Text color={GRAY_DARKER}>Day change </Text>
          <Text
            weight="900"
            status={Number(stockData?.day_change) < 0 ? 'positive' : 'negative'}
            style={{ paddingTop: 2, fontSize: 15 }}
          >
            {stockData?.day_change}
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
