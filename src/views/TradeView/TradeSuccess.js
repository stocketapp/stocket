// @flow
import React, { useRef, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { LoadingCheckmark, Text } from 'components'
import { GREEN, DARK_TEXT } from 'utils/colors'
import { formatCurrency } from 'utils/functions'

type Props = {
  loading: boolean,
  tradeType: string,
  symbol: string,
  amount: number,
  total: number,
  onFinished: () => void,
}
const TradeSuccess = ({
  loading,
  onFinished,
  tradeType,
  symbol,
  amount,
  total,
}: Props) => {
  const ref = useRef()

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.play(0, 90)
    }
  }, [loading, ref])

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: '10%' }}>
        <LoadingCheckmark size={150} ref={ref} loop={false} />
      </View>
      {!loading && (
        <>
          <Text style={{ textAlign: 'center' }}>
            {tradeType === 'BUY'
              ? `Your successfully purchased ${amount} shares of ${symbol}`
              : `You successfully sold ${amount} shares of ${symbol}`}
          </Text>

          <Text weight="Bold" style={{ paddingTop: 30, fontSize: 28 }}>
            {formatCurrency(total)}
          </Text>

          <TouchableOpacity style={{ marginTop: '18%' }} onPress={onFinished}>
            <View style={styles.btn}>
              <Text weight="Heavy" color={DARK_TEXT}>
                DONE
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  btn: {
    backgroundColor: GREEN,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
}

export default TradeSuccess
