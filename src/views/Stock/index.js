import React, { useMemo, useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Graph } from 'components'
import { GREEN, BACKGROUND, DARK_TEXT, GRAY_DARKER } from 'utils/colors'
import { ArrowLeftIcon } from 'components/Icons'
import { useSelector } from 'react-redux'
import StockDetails from './StockDetails'
import { useNavigation } from '@react-navigation/native'
import StockPosition from './StockPosition'
import StockNews from './StockNews'
import { getNewsArticle } from 'api'

export default function Stock() {
  const { goBack } = useNavigation()
  const { selectedStock, positionsMktData } = useSelector(({ stock }) => stock)
  const [articles, setArticles] = useState([])

  const position = useMemo(
    () => positionsMktData.find(el => el.symbol === selectedStock.symbol),
    [selectedStock, positionsMktData],
  )

  const currentData = useMemo(
    () => positionsMktData.find(el => el.symbol === selectedStock?.symbol),
    [positionsMktData, selectedStock],
  )

  useEffect(() => {
    const getArticles = async () => {
      const res = await getNewsArticle(selectedStock?.symbol)
      console.log(res)
      setArticles(res.filter(el => el.lang === 'en'))
    }

    if (selectedStock) {
      getArticles()
    }
  }, [selectedStock])

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
          <View style={{ paddingHorizontal: 16, paddingTop: 30 }}>
            <Text weight="900" style={{ fontSize: 30 }}>
              {currentData?.name}
            </Text>
            <Text
              style={{ paddingTop: 5 }}
              color={GRAY_DARKER}
              weight="700"
              type="label"
            >
              {selectedStock?.symbol}
            </Text>
          </View>

          <Graph />

          <StockDetails data={position} />

          {currentData && <StockPosition data={selectedStock} />}

          <StockNews articles={articles} />
        </View>
      </ScrollView>

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
