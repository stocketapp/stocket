import { useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text as RNText } from 'react-native'
import { Text, ModalWebview } from '@components'
import { GRAY_DARKER } from '@utils/colors'
import type { ArticleType } from 'types'

const ArticleItem = ({ article }: { article: ArticleType }) => {
  const ref = useRef(null)
  const noArticle = /http/g.test(article?.image)

  return (
    <>
      <TouchableOpacity onPress={() => (ref.current as any).open()} disabled={!noArticle}>
        <View style={styles.articleContainer}>
          <RNText>hi</RNText>
          <View>
            {noArticle ? (
              <Image source={{ uri: article?.image }} style={styles.img} />
            ) : (
              <View style={{ ...styles.img, backgroundColor: 'gray' }} />
            )}
          </View>
          <View
            style={{
              paddingLeft: 20,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 17 }} weight="Black" numberOfLines={3} ellipsizeMode="tail">
              {article?.headline}
            </Text>
            <Text color={GRAY_DARKER}>{article?.source}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ModalWebview ref={ref} uri={article?.url} />
    </>
  )
}

export default function StockNews({ articles }: { articles: Array<ArticleType> }) {
  return (
    <View style={styles.container}>
      <Text type="heading" weight="Black" style={{ paddingBottom: 10 }}>
        News
      </Text>

      {articles.map((article, i) => (
        <ArticleItem article={article} key={i} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
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
})
