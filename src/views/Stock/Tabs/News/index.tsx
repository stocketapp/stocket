import { View, FlatList } from 'react-native'
import { useNews } from '@hooks'
import { ArticleListItem, Text } from '@components'
import { useTheme } from '@emotion/react'
import NewsLoader from '../../ContentLoaders/NewsLoader'

export default function NewsTab({ symbol }: StockNewsTabProps) {
  const { data, loading } = useNews(symbol)
  const { p } = useTheme()

  return (
    <View style={{ paddingHorizontal: p.screen, paddingBottom: p.huge }}>
      <Text type="big" weight="Black" pb={p.md}>
        Latest
      </Text>
      {loading ? (
        <NewsLoader />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <ArticleListItem article={item} />}
          keyExtractor={(i, key) => key.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

interface StockNewsTabProps {
  activeTab: number
  symbol: string
}
