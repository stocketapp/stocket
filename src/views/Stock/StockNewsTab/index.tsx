import { View, FlatList } from 'react-native'
import { useNews } from '@hooks'
import { ArticleListItem, Text } from '@components'
import { useTheme } from '@emotion/react'

export default function StockNewsTab({ symbol }: StockNewsTabProps) {
  const { data } = useNews(symbol)
  const { p } = useTheme()

  return (
    <View style={{ paddingHorizontal: p.screen, paddingBottom: p.huge }}>
      <Text type="big" weight="Black" pb={p.md}>
        Latest
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <ArticleListItem article={item} />}
        keyExtractor={(i, key) => key.toString()}
      />
    </View>
  )
}

interface StockNewsTabProps {
  activeTab: number
  symbol: string
}
