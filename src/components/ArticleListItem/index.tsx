import { useRef } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, ModalWebview, Container } from '@components'
import type { ArticleType } from 'types'
import { HeadlineContainer, ArticleImage, NoImage } from './styles'

export default function ArticleListItem({ article }: { article: ArticleType }) {
  const ref = useRef(null)
  const noArticle = /http/g.test(article?.image)

  return (
    <>
      <TouchableOpacity onPress={() => (ref.current as any).open()} disabled={!noArticle}>
        <Container pv={10} horizontal>
          <View>
            {noArticle ? <ArticleImage source={{ uri: article?.image }} /> : <NoImage />}
          </View>
          <HeadlineContainer>
            <Text weight="Black" numberOfLines={3} ellipsizeMode="tail">
              {article?.headline}
            </Text>
            <Text color="GRAY">{article?.source}</Text>
          </HeadlineContainer>
        </Container>
      </TouchableOpacity>
      <ModalWebview ref={ref} uri={article?.url} />
    </>
  )
}
