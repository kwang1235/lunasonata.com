---
title: "테스트 포스트: 완벽한 블로그 글 작성을 위한 통합 HTML 템플릿 검증"
description: "블로그 에디터 적용을 위한 테스트용 포스트입니다. 깔끔한 CSS 스타일링과 인라인 SVG, 반응형 구조를 포함한 본문 템플릿을 검증합니다."
pubDate: 2026-08-13T13:50:04
slug: "blog-post-template-test"
heroImage: "https://image.lunasonata.com/2026/08/blog-placeholder-about.webp"

draft: false
---

<!-- 전용 CSS 스타일 -->
<style>
  /* 최외각 컨테이너 패딩 0 필수 적용 */
  .blog-post-content {
    padding: 0 !important;
    width: 100%;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #333333;
    line-height: 1.7;
  }

  /* Typography & Layout Rules */
  .blog-post-content .post-h2 {
    font-size: 1.65rem;
    font-weight: 700;
    color: #111827;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f3f4f6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .blog-post-content .post-h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1f2937;
    margin-top: 1.8rem;
    margin-bottom: 0.75rem;
  }

  .blog-post-content .post-p {
    font-size: 1.05rem;
    color: #374151;
    margin-bottom: 1.25rem;
    word-break: keep-all;
  }

  /* Callout Box Style */
  .blog-post-content .post-callout {
    background-color: #f0f9ff;
    border-left: 4px solid #0284c7;
    padding: 1.25rem;
    border-radius: 0 0.5rem 0.5rem 0;
    margin: 1.5rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .blog-post-content .post-callout-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    fill: #0284c7;
  }

  .blog-post-content .post-callout-text {
    font-size: 0.975rem;
    color: #0369a1;
    margin: 0;
  }

  /* Quote Block Style */
  .blog-post-content .post-quote {
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
    text-align: center;
    position: relative;
  }

  .blog-post-content .post-quote p {
    font-size: 1.1rem;
    font-style: italic;
    color: #4b5563;
    margin: 0;
  }

  /* Image Area */
  .blog-post-content .post-image-container {
    margin: 0;
    text-align: center;
  }

  .blog-post-content .post-image {
    max-width: 100%;
    height: auto;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .blog-post-content .post-image-caption {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0;
  }

  /* Interactive Components */
  .blog-post-content .post-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-decoration: none;
    margin: 1rem 0;
  }

  .blog-post-content .post-button:hover {
    background-color: #1d4ed8;
  }

  .blog-post-content .post-svg-icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
</style>

<!-- 본문 HTML -->
<div class="blog-post-content">
  <p class="post-p">
    안녕하세요! 본 포스트는 블로그 에디터 및 디자인 스펙 검증을 위해 작성된 테스트용 글입니다. 
    스타일 구성, 인라인 SVG 아이콘의 정상 출력, 이미지 경로 연결, 레이아웃 반응형 동작을 전반적으로 점검합니다.
  </p>

  <h2 class="post-h2">
    <svg class="post-svg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
    시스템 사양 및 템플릿 구조 검증
  </h2>

  <p class="post-p">
    모든 글 요소는 최외각 <code>.blog-post-content</code> 컨테이너 내부에서 모듈화되어 관리됩니다. 
    가장 바깥쪽 패딩을 0으로 고정하여 렌더링 엔진과의 프레임 충돌을 방지합니다.
  </p>

  <div class="post-callout">
    <svg class="post-callout-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
    <p class="post-callout-text">
      <strong>테스트 안내:</strong> 모든 이모티콘 표시는 유니코드 이모지 대신 인라인 SVG 코드로 대체되어 시각적 일관성을 유지합니다.
    </p>
  </div>

  <h3 class="post-h3">이미지 파이프라인 테스트</h3>
  <p class="post-p">
    아래 이미지는 약속된 이미지 서버 경로 규격을 적용한 가상의 테스트 이미지 블록입니다.
  </p>

  <div class="post-image-container">
    <img src="https://image.lunasonata.com/2026/08/blog-placeholder-5.webp" alt="테스트 샘플 이미지" class="post-image" />
    <div class="post-image-caption">그림 1.1: WebP 포맷 인프라 테스트 이미지</div>
  </div>

  <blockquote class="post-quote">
    <p>"단순함이 완벽함의 조건이다. 더 이상 더할 것이 없을 때가 아니라, 더 이상 뺄 것이 없을 때 완벽함이 완성된다."</p>
  </blockquote>

  <p class="post-p">
    아래 버튼을 누르면 간단한 JavaScript 동작을 검증할 수 있습니다.
  </p>

  <button type="button" class="post-button" id="test-action-btn">
    <svg class="post-svg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    동작 테스트 실행하기
  </button>
</div>

<!-- 필요시 인터랙션용 JS 스크립트 -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var testBtn = document.getElementById('test-action-btn');
    if (testBtn) {
      testBtn.addEventListener('click', function() {
        alert('JS 인터랙션 테스트가 정상적으로 실행되었습니다.');
      });
    }
  });
</script>