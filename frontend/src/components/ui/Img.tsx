import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Above-the-fold image: load eagerly with high priority (LCP). */
  priority?: boolean
}

/** Image with lazy loading by default and a neutral fallback if the file is missing. */
export default function Img({ src, alt, priority, className = '', ...rest }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}>
        <ImageOff className="size-8" aria-hidden />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
