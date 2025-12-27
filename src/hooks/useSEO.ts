import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export function useSEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    if (description) updateMetaTag('og:description', description);
    if (image) updateMetaTag('og:image', image);
    if (url) updateMetaTag('og:url', url);

    // Update Twitter tags
    updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);
  }, [title, description, image, url]);
}

function updateMetaTag(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
  }

  if (meta) {
    meta.setAttribute('content', content);
  } else {
    const newMeta = document.createElement('meta');
    if (property.startsWith('og:')) {
      newMeta.setAttribute('property', property);
    } else {
      newMeta.setAttribute('name', property);
    }
    newMeta.content = content;
    document.head.appendChild(newMeta);
  }
}
