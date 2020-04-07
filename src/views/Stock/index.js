import React, { useMemo } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, LineChart } from 'components'
import { GREEN, BACKGROUND, DARK_TEXT, GRAY_DARKER } from 'utils/colors'
import { ArrowLeftIcon } from 'components/Icons'
import { useSelector } from 'react-redux'
import StockDetails from './StockDetails'
import { useNavigation } from '@react-navigation/native'
import StockPosition from './StockPosition'
import StockNews from './StockNews'
import find from 'lodash.find'

export default function Stock() {
  const { goBack } = useNavigation()
  const { selectedStock, positionsMktData } = useSelector(({ stock }) => stock)

  const stockData = useMemo(
    () =>
      find(positionsMktData, el => el.quote.symbol === selectedStock?.symbol),
    [positionsMktData, selectedStock],
  )

  const graphData = useMemo(
    () =>
      stockData?.chart.map((el, index) => ({
        value: el.close,
        label: el.label,
        date: el.date,
      })),
    [stockData],
  )

  return (
    <View style={styles.container} ph>
      <TouchableOpacity
        style={{ paddingLeft: 15, paddingVertical: 5 }}
        onPress={goBack}
      >
        <ArrowLeftIcon size={30} color={GREEN} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
            <Text weight="900" style={{ fontSize: 30 }}>
              {stockData?.quote.companyName}
            </Text>
            <Text
              style={{ paddingTop: 5 }}
              color={GRAY_DARKER}
              weight="700"
              type="label"
            >
              {stockData?.quote.symbol}
            </Text>
          </View>

          {/* {graphData.datasets && <Graph data={graphData} />} */}
          {graphData && <LineChart data={graphData} />}

          <StockDetails data={stockData?.quote} />

          {stockData && <StockPosition data={selectedStock} />}

          {stockData.news && <StockNews articles={stockData?.news} />}
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <View style={{ flexDirection: 'column' }}>
          <Text color={GRAY_DARKER}>Day change </Text>
          <Text
            weight="900"
            status={Number(stockData?.day_change) < 0 ? 'positive' : 'negative'}
            style={{ paddingTop: 2, fontSize: 15 }}
          >
            {stockData?.quote.change}
          </Text>
        </View>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text color={DARK_TEXT} weight="800" style={{ fontSize: 18 }}>
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
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    backgroundColor: BACKGROUND,
    width: '100%',
  },
  button: {
    backgroundColor: GREEN,
    paddingHorizontal: 35,
    paddingVertical: 8,
    borderRadius: 100,
  },
}
