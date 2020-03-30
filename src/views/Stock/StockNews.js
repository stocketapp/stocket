import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'components'
import { GRAY_DARKER } from 'utils/colors'

const ArticleItem = ({ article }) => (
  <View style={styles.articleContainer}>
    <View>
      <Image source={{ uri: article?.image }} style={styles.img} />
    </View>
    <View style={{ paddingLeft: 20, flex: 1, justifyContent: 'space-between' }}>
      <Text type="title" weight="500" numberOfLines={3} ellipsizeMode="tail">
        {article?.headline}
      </Text>
      <Text color={GRAY_DARKER}>{article?.source}</Text>
    </View>
  </View>
)

export default ({ articles }) => (
  <View style={styles.container}>
    <Text type="heading" weight="900" style={{ paddingBottom: 10 }}>
      News
    </Text>

    {articles.map((article, i) => (
      <ArticleItem article={article} key={i} />
    ))}
  </View>
)

const styles = {
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  articleContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  img: {
    height: 95,
    width: 125,
    borderRadius: 4,
  },
}
