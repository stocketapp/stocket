import React from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import functions from '@react-native-firebase/functions'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Text, Container, Loader } from '@components'
import { RefreshIcon } from '@icons'
import type { PositionType } from 'types'
import StockItem from './StockItem'
import StockEmpty from './StockEmpty'
import useStateSelector from '@selector'

type StockHorizontalListProps = {
  data: Array<any>
  loading: boolean
}

export default function StockHorizontalList(props: StockHorizontalListProps) {
  const { data, loading } = props
  const onUpdateGainsCall = functions().httpsCallable('onUpdateGainsCall')
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const user = useStateSelector('user')
  const { currentUser } = user

  const refreshGains = () => {
    onUpdateGainsCall({
      uid: currentUser?.uid,
    })
  }

  const goToStock = (selectedStock: PositionType) => {
    dispatch({
      type: 'SELECTED_STOCK_POSITION',
      selectedStockPosition: selectedStock,
    })
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: selectedStock?.symbol,
    })
    navigate('Stock')
  }

  return (
    <Container style={styles.container} ph>
      <Container horizontal separate>
        <Text type="title" weight="Bold">
          Stocks
        </Text>

        {data?.length > 0 && (
          <TouchableOpacity onPress={() => refreshGains()}>
            <RefreshIcon />
          </TouchableOpacity>
        )}
      </Container>

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <StockItem item={item} onPress={() => goToStock(item)} />
          )}
          keyExtractor={(index, key) => key.toString()}
          style={styles.list}
          horizontal
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.listLoader}>
              <StockEmpty />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  list: {
    minHeight: 100,
  },
  listContent: {
    paddingVertical: 10,
  },
  listLoader: {
    width: '100%',
    alignItems: 'center',
  },
})
