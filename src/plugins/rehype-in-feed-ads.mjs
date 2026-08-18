// src/plugins/rehype-in-feed-ads.mjs
import { fromHtml } from 'hast-util-from-html';

// 본문 중간 광고 단위 HTML 코드
const AD_HTML = `
<div class="in-feed-ads ads-container" style="margin: 2rem 0; text-align: center; overflow: hidden; clear: both;">
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-4839414905225875"
       data-ad-slot="7884232550"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
`;

function createAdNode() {
  const parsed = fromHtml(AD_HTML, { fragment: true });
  return parsed.children[0];
}

function replaceInChildren(children) {
  const result = [];
  for (const child of children) {
    // 1) raw HTML 텍스트 내부에 <!-- ad -->가 포함되어 있는 경우 분할 치환
    if (child.type === 'raw' && child.value && child.value.includes('<!-- ad -->')) {
      const parts = child.value.split('<!-- ad -->');
      for (let i = 0; i < parts.length; i++) {
        if (parts[i]) {
          result.push({ type: 'raw', value: parts[i] });
        }
        if (i < parts.length - 1) {
          result.push(createAdNode());
        }
      }
    }
    // 2) 주석(comment) 형태로 단독 파싱된 ad 처리
    else if (
      child.type === 'comment' &&
      child.value &&
      child.value.trim() === 'ad'
    ) {
      result.push(createAdNode());
    } 
    // 3) 그 외 하위 요소 재귀 순회
    else {
      if (child.children) {
        child.children = replaceInChildren(child.children);
      }
      result.push(child);
    }
  }
  return result;
}

export default function rehypeInFeedAds() {
  return (tree) => {
    if (!tree.children) return;
    tree.children = replaceInChildren(tree.children);
  };
}