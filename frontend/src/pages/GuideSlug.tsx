import { useParams } from 'react-router-dom'
import { getCategory, getPost } from '@/data/posts'
import GuideListing from '@/components/guide/GuideListing'
import PostDetail from '@/components/guide/PostDetail'
import NotFound from './NotFound'

/** /travel-guide/:slug resolves to a category listing first, then to an article. */
export default function GuideSlug() {
  const { slug = '' } = useParams()
  const category = getCategory(slug)
  if (category) return <GuideListing key={slug} category={category} />
  const post = getPost(slug)
  if (post) return <PostDetail key={slug} post={post} />
  return <NotFound />
}
