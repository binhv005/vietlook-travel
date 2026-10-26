import { useEffect } from 'react'
import { SITE_URL, site } from '@/data/site'
import { useI18n } from '@/i18n'

interface Props {
  title: string
  description?: string
  /** Locale-less path of this page, e.g. "/tours/abc". */
  path: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object | object[]
  noindex?: boolean
}

/** Per-page metadata. React 19 hoists these tags into <head>. */
export default function Seo({ title, description, path, image, type = 'website', jsonLd, noindex }: Props) {
  const { lang, t } = useI18n()
  const fullTitle = title === t.meta.siteTitle ? title : `${title} | ${t.meta.siteTitle}`
  const desc = description || t.meta.defaultDescription
  const url = (l: string) => `${SITE_URL}/${l}${path}`
  const ogImage = `${SITE_URL}${image || '/images/tours/khamphadanhthangvietnam.webp'}`

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en'
  }, [lang])

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url(lang)} />
      <link rel="alternate" hrefLang="en" href={url('en')} />
      <link rel="alternate" hrefLang="zh-Hans" href={url('zh')} />
      <link rel="alternate" hrefLang="x-default" href={url('en')} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url(lang)} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}
