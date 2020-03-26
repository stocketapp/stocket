import React from 'react'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { BACKGROUND } from 'utils/colors'

export default function Graph() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  }

  return (
    <View style={{ left: -62 }}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={256}
        verticalLabelRotation={30}
        withDots={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{
          backgroundColor: BACKGROUND,
          backgroundGradientFrom: BACKGROUND,
          backgroundGradientTo: BACKGROUND,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => 'rgba(113, 219, 119, 1)',
          style: {
            borderRadius: 16,
            left: -100,
          },
          // propsForDots: {
          //   r: '6',
          //   strokeWidth: '2',
          //   stroke: '#ffa726',
          // },
        }}
        bezier
      />
    </View>
  )
}
