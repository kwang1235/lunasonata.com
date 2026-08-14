import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  // 💡 1. 비공개(draft) 글은 RSS 피드에서 완벽하게 제외
  const posts = (await getCollection('blog', ({ data }) => {
    return data.draft !== true && String(data.draft).toLowerCase() !== 'true';
  })).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      // 💡 2. 블로그 실제 URL 규칙에 맞춰 슬러그(slug) 우선 연결
      link: `/${post.data.slug || post.id}/`,
    })),
  });
}