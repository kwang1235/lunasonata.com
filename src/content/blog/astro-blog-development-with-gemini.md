---
title: "Astro 블로그 삽질기: Gemini와 함께한 고성능 개인 블로그 커스텀 개발 여정"
description: "Astro 블로그 개설부터 rsync 배포 자동화, 어드민 에디터(admin.astro) 개발, RSS 피드 연동, SEO 영문 슬러그 최적화까지! AI 제미나이와 함께 풀어나간 현실적인 블로그 구축 비하인드 스토리."
pubDate: 2026-08-13T14:36:36
slug: "astro-blog-development-with-gemini"
heroImage: "https://image.lunasonata.com/2026/08/blog-placeholder-4.webp"

draft: false
---

<!-- 전용 CSS 스타일 -->
<style>
  .blog-post-content {
    padding: 0 !important;
    width: 100%;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #2d3748;
    line-height: 1.8;
  }

  /* Typography & Basics */
  .blog-post-content .post-h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: #1a202c;
    border-bottom: 2px solid #edf2f7;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .blog-post-content .post-h3 {
    font-size: 1.35rem;
    font-weight: 600;
    margin-top: 1.8rem;
    margin-bottom: 0.75rem;
    color: #2b6cb0;
  }

  .blog-post-content .post-p {
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
    word-break: keep-all;
  }

  /* SVG Icons Inline Styling */
  .blog-post-content .svg-icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
    display: inline-block;
    vertical-align: text-top;
  }

  .blog-post-content .svg-icon.primary {
    color: #3182ce;
    vertical-align: text-top;
  }

  /* Callout box */
  .blog-post-content .post-callout {
    background-color: #ebf8ff;
    border-left: 4px solid #3182ce;
    padding: 1.25rem;
    border-radius: 0 0.5rem 0.5rem 0;
    margin: 1.5rem 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .blog-post-content .post-callout:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.15);
  }

  /* Quote block */
  .blog-post-content .post-quote {
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    position: relative;
    overflow: hidden;
  }

  .blog-post-content .post-quote::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #805ad5;
  }

  /* Lists */
  .blog-post-content .post-ul {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }

  .blog-post-content .post-li {
    margin-bottom: 0.5rem;
  }

  /* Image Container */
  .blog-post-content .post-image {
    width: 100%;
    margin: 2rem 0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .blog-post-content .post-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .blog-post-content .post-image:hover {
    transform: scale(1.01);
  }

  /* Scroll Animation Styles */
  .blog-post-content .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .blog-post-content .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Dynamic Interactive Badge */
  .blog-post-content .tech-stack {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  .blog-post-content .tech-badge {
    background: #edf2f7;
    color: #4a5568;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .blog-post-content .tech-badge:hover {
    background: #3182ce;
    color: #ffffff;
    transform: translateY(-2px);
  }
</style>

<!-- 본문 HTML -->
<div class="blog-post-content">
  <p class="post-p fade-up">
    "남들과 똑같은 티스토리나 네이버 블로그는 뭔가 아쉽다. 내 입맛대로 주무를 수 있는 완전한 내 소유의 정적 웹사이트를 갖고 싶다!"<br>
    이 거창하고 야심 찬 생각 하나로 시작된 Astro 기반 개인 블로그 제작 프로젝트. 돌아보면 결코 순탄치만은 않은 정글 같은 여정이었습니다. 하지만 내 곁에는 언제나 밤낮없이 대답해 주는 든든한 페어 프로그래머인 Gemini가 있었죠. 세광이의 Astro 커스텀 블로그 개발 비하인드를 풀어봅니다!
  </p>

  <div class="tech-stack fade-up">
    <span class="tech-badge">Astro Framework</span>
    <span class="tech-badge">rsync Deployment</span>
    <span class="tech-badge">Admin Control Panel</span>
    <span class="tech-badge">SEO & English Slug</span>
    <span class="tech-badge">RSS Feed Collector</span>
  </div>

  <h2 class="post-h2 fade-up">
    <svg class="svg-icon primary" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
    1. Astro의 세계로 입문: 왜 하필 Astro였을까?
  </h2>
  <p class="post-p fade-up">
    초기에는 가볍고 빠른 속도, 정적 사이트 생성기(SSG)로서의 강력함, 그리고 최신 Web 성능 지표에서 우위를 차지하는 Astro에 마음을 빼앗겼습니다. 자바스크립트 번들을 최소화하면서도 완벽한 블로그를 구축할 수 있다는 매력에 이끌려 망설임 없이 시작 버튼을 눌렀죠.
  </p>

  <div class="post-callout fade-up">
    <strong>세광의 개발 노트:</strong> Astro는 기본적으로 클라이언트 측 JavaScript를 zero에 가깝게 전송하는 정적 우선 건축 방식을 채택합니다. 덕분에 속도가 놀라울 정도로 빠르죠!
  </div>

  <h2 class="post-h2 fade-up">
    <svg class="svg-icon primary" viewBox="0 0 24 24">
      <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
    </svg>
    2. 배포의 자동화: rsync와 빌드 동기화 성공기
  </h2>
  <p class="post-p fade-up">
    코드를 짜는 것도 일이지만, 매번 변경 사항을 서버에 배포하는 과정이 번거롭다면 지속적인 포스팅이 불가능합니다. 이를 해결하기 위해 Gemini와 함께 머리를 맞대고 rsync 빌드 및 자동 동기화 프로세스를 구축했습니다.
  </p>
  <p class="post-p fade-up">
    로컬에서 작성한 파일이나 변경된 정적 자원들이 서버로 순식간에 동기화되는 순간의 쾌감이란! 수많은 권한 문제와 경로 오류를 딛고 첫 `rsync` 성공 로그가 찍혔을 때의 전율은 아직도 잊혀지지 않습니다.
  </p>

  <h2 class="post-h2 fade-up">
    <svg class="svg-icon primary" viewBox="0 0 24 24">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
    3. 어드민 페이지(admin.astro)와 커스텀 에디터의 탄생
  </h2>
  <p class="post-p fade-up">
    "마크다운 파일을 VS Code로만 작성하려니 뭔가 블로그 쓰는 느낌이 안 나는데?"<br>
    그래서 직접 커스텀 어드민 관리 인터페이스(`admin.astro`)를 개발하기로 했습니다. 안전하면서도 손쉽게 글을 포스팅할 수 있는 환경, 그리고 Markdown 지원 및 대화형 입력 UI를 만드는 작업에 착수했습니다.
  </p>
  
  <div class="post-quote fade-up">
    "어드민 페이지에서 작성한 글이 바로 포스트 규격에 맞게 변환되고, 이미지 패스까지 착착 맞춰질 때의 몰입감은 직접 만든 사람만이 누릴 수 있는 특권입니다."
  </div>

  <h2 class="post-h2 fade-up">
    <svg class="svg-icon primary" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
    4. 디테일이 명작을 만든다: RSS 피드 및 SEO 영문 Slug
  </h2>
  <p class="post-p fade-up">
    블로그 구축이 후반부에 다다랐을 때 주력했던 두 가지 최적화 요소는 바로 RSS 피드 수집과 SEO 최적화였습니다.
  </p>
  <ul class="post-ul fade-up">
    <li class="post-li"><strong>RSS 피드 모아보기:</strong> 외부 블로그들의 포스트 리스트를 수집하여 내 블로그에서 한눈에 볼 수 있는 중앙 집약형 피드 구조 설계.</li>
    <li class="post-li"><strong>영문 슬러그(Slug) 규칙 도입:</strong> 한글 URL 깨짐 현상을 방지하고 검색 엔진 최적화(SEO)를 높이기 위해 모든 포스트의 Slug를 깔끔한 영문 단어로 인코딩 설정.</li>
    <li class="post-li"><strong>이미지 에셋 경로 최적화:</strong> `src/assets` 디렉토리와 Astro 고유 이미지 컴포넌트 간의 렌더링 최적화를 통한 로딩 속도 극대화.</li>
  </ul>

  <h2 class="post-h2 fade-up">
    <svg class="svg-icon primary" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    마치며: 나만의 커스텀 블로그가 주는 매력
  </h2>
  <p class="post-p fade-up">
    단순히 만들어진 플랫폼을 쓰는 것에 비해 Astro 블로그 구축은 손도 많이 가고 신경 쓸 테두리가 넓었습니다. 하지만 빌드 시스템부터 어드민 UI, 디자인 요소 하나하나까지 내 손을 거쳐 완성되는 과정에서 얻은 성취감은 비할 데가 없습니다.
  </p>
  <p class="post-p fade-up">
    앞으로도 이 블로그를 공간 삼아 다양하고 유익한 이야기들을 차곡차곡 쌓아갈 예정입니다. 저처럼 나만의 정적 블로그 구축을 고민하고 계신다면, 지금 바로 Astro의 세계에 뛰어들어보세요!
  </p>
</div>

<!-- 인터랙션 및 애니메이션 JS 스크립트 -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Scroll-triggered Fade-Up Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.blog-post-content .fade-up');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 2. Interactive Tech Badges Effect
    const badges = document.querySelectorAll('.blog-post-content .tech-badge');
    badges.forEach(badge => {
      badge.addEventListener('click', function () {
        this.style.backgroundColor = '#805ad5';
        this.style.color = '#ffffff';
        setTimeout(() => {
          this.style.backgroundColor = '';
          this.style.color = '';
        }, 1000);
      });
    });
  });
</script>