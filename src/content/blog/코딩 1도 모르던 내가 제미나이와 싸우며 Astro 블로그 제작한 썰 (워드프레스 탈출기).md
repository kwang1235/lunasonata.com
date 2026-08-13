---
title: "코딩 1도 모르던 내가 제미나이와 싸우며 Astro 블로그 제작한 썰 (워드프레스 탈출기)"
description: "네이버, 티스토리, 워드프레스를 거쳐 Astro 정적 블로그와 자체 백엔드 어드민까지! 코딩 지식 제로 상태에서 제미나이 AI와 밤새 씨름하며 나만의 블로그를 무에서 유로 구축한 생생한 개발 일기."
pubDate: 2026-08-13T21:59:44
slug: "코딩 1도 모르던 내가 제미나이와 싸우며 Astro 블로그 제작한 썰 (워드프레스 탈출기)"
heroImage: "https://image.lunasonata.com/2026/08/blog-thumbnail.webp"

categories:
  - "일상"
  - "개발"
  - "블로그"
draft: false
---

<!-- 전용 CSS 스타일 -->
<style>
  /* 최외각 컨테이너 패딩 0 및 텍스트 줄바꿈 필수 적용 */
  .blog-post-content {
    padding: 0 !important;
    width: 100%;
    box-sizing: border-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.85;
    color: #2d3748;
  }

  /* Typography */
  .blog-post-content .post-h2 {
    font-size: 1.65rem;
    font-weight: 700;
    margin-top: 2.8rem;
    margin-bottom: 1.2rem;
    color: #1a202c;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.6rem;
  }

  .blog-post-content .post-h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 1.8rem;
    margin-bottom: 0.8rem;
    color: #2d3748;
  }

  .blog-post-content .post-p {
    margin-bottom: 1.3rem;
    font-size: 1.05rem;
    color: #4a5568;
  }

  /* SVG 수직 중앙 정렬 스타일 정밀 설정 */
  .blog-post-content svg {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
    flex-shrink: 0;
  }

  /* Interactive Quote */
  .blog-post-content .post-quote {
    position: relative;
    margin: 2rem 0;
    padding: 1.5rem 1.5rem 1.5rem 2rem;
    background-color: #f7fafc;
    border-left: 4px solid #3182ce;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #2d3748;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
    cursor: pointer;
  }

  .blog-post-content .post-quote:hover {
    transform: translateX(6px);
    box-shadow: 0 6px 16px rgba(49, 130, 206, 0.15);
    border-left-color: #2b6cb0;
  }

  /* Callout Box */
  .blog-post-content .post-callout {
    margin: 1.8rem 0;
    padding: 1.25rem 1.5rem;
    background-color: #ebf8ff;
    border: 1px solid #bee3f8;
    border-radius: 8px;
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
  }

  .blog-post-content .post-callout-icon {
    color: #3182ce;
    margin-top: 0.2rem;
  }

  /* Link Styling */
  .blog-post-content .post-link {
    color: #3182ce;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px dashed #3182ce;
    transition: color 0.2s ease, border-bottom-style 0.2s ease;
  }

  .blog-post-content .post-link:hover {
    color: #2b6cb0;
    border-bottom-style: solid;
  }

  /* Timeline / Steps */
  .blog-post-content .timeline-item {
    padding: 1.5rem;
    margin-bottom: 1.2rem;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .blog-post-content .timeline-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }

  /* Dynamic Badge */
  .blog-post-content .badge {
    display: inline-block;
    padding: 0.25rem 0.65rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: #2b6cb0;
    background-color: #e2e8f0;
    border-radius: 4px;
    margin-bottom: 0.6rem;
    letter-spacing: 0.5px;
  }

  /* Scroll Fade-up Animation Setup */
  .blog-post-content .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .blog-post-content .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<!-- 본문 HTML ("~했다" 서술체 어조) -->
<div class="blog-post-content">
  <p class="post-p fade-up">
    나만의 아늑한 공간을 가꾸는 것을 워낙 좋아하는 편이라, 수년 전부터 소소하게 개인 블로그 활동을 이어왔다. 매일같이 꾸준히 글을 올린 건 아니었지만, 나의 소소한 일상을 기록으로 남겨두는 것 자체가 참 좋았다. 나만의 일기장 같은 개념이었다. 처음에는 네이버 블로그로 시작해서 티스토리 블로그까지 넘어가며 글을 쌓아갔다.
  </p>

  <div class="post-quote fade-up">
    "고수는 장비를 탓하지 않는다지만... 나는 완전 초보인지라 유난히 장비 탓을 많이 했던 것 같다."
  </div>

  <p class="post-p fade-up">
    사실 그 시간에 글쓰기 실력을 더 갈고닦았어야 했다. 아무튼 블로그를 운영하면서 더 많은 사람들이 내 글을 읽어주길 바라는 마음과 함께, 블로그를 내 손으로 구석구석 직접 꾸미고 싶다는 욕심이 점점 커져만 갔다. 그러다 구글 애드센스라는 존재를 알게 되었고, 수익형 블로그의 양대 산맥이라는 티스토리와 워드프레스 이야기를 접하게 되었다.
  </p>

  <p class="post-p fade-up">
    티스토리도 조금씩 하고 있었지만 그 시스템 자체에 큰 흥미를 느끼지 못했고, 결국 워드프레스 블로그로 바로 건너뛰었다. 이때까지만 해도 나는 HTML, CSS, JS가 대체 뭔지 1도 모르는 까막눈이었다. 그저 내 개인 도메인을 가질 수 있고, 마음대로 홈페이지를 제작할 수 있으며, 네이버나 티스토리 같은 외부 플랫폼의 정책 변화에 휘둘리지 않는다는 사실 하나에 매료되었다. <em>"그래, 바로 이거지!"</em>라는 마음으로 망설임 없이 워드프레스를 택했다.
  </p>

  <h2 class="post-h2 fade-up">
    시놀로지 NAS 기반 워드프레스 구축과 완벽주의의 늪
  </h2>

  <p class="post-p fade-up">
    마침 몇 년 전에 약 70만 원 정도 투자해서 사둔 시놀로지 NAS가 있어서 매달 나가는 서버 비용은 굳었다. 그렇게 나만의 자체 호스팅 서버를 올리고 세팅을 시작했다. 하지만 모든 일이 그렇듯 내 뜻대로 쉽게 흘러가지 않았다.
  </p>

  <p class="post-p fade-up">
    가장 큰 문제는 바로 나 자신이었다. 완벽주의인 건지, 아니면 게으른 완벽주의인 건지... 홈페이지 디자인이 내 마음에 차게 예쁘지 않으면 글이 도무지 써지지 않는 병에 걸린 것이다. 결국 본격적인 글쓰기는 뒷전으로 미뤄둔 채 무작정 워드프레스를 꾸미기 시작했다. 그러나 코딩 지식이 제로인 상태에서 디자인을 바꾼다는 건 너무나도 험난했다.
  </p>

  <p class="post-p fade-up">
    그렇게 꾸미는 둥 마는 둥 시간을 보내던 무렵, 세상에 AI가 짠 하고 등장했다. 글쓰기는 물론이고 더 나아가 AI가 코딩까지 대신해 주는 시대가 열린 것이다. 메인 도메인을 가지고 있던 나는 CNAME 설정을 통해 서브 도메인을 추가로 개설했다. 1년 사용료를 더 낼 수 있다면 아예 새 도메인을 샀겠지만, 지금 가지고 있는 메인 도메인도 피나는 노력 끝에 겨우 구글 애드센스 승인을 받은 터라 다시 승인 도전을 하고 싶진 않았다.
  </p>

  <div class="post-callout fade-up">
    <div class="post-callout-icon">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
    </div>
    <div>
      <strong>블로그 재도전:</strong> 방치해두었던 메인 도메인 대신 서브 도메인을 활용해 <a href="https://blog.lunasonata.com/%EC%83%88%EB%A1%9C%EC%9A%B4-%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%97%88%EB%8B%A4/" class="post-link" target="_blank" rel="noopener">blog.lunasonata.com</a>으로 워드프레스를 새로 시작했다. 이번에는 제미나이(Gemini)와 손잡고 디자인에 공을 들였고, 글도 13개쯤 다듬어 발행했다. (관련 포스팅: <a href="https://blog.lunasonata.com/how-i-got-gemini-advanced-for-free/" class="post-link" target="_blank" rel="noopener">제미나이 프로 공짜로 쓰는 황당한 후기</a>)
    </div>
  </div>

  <h2 class="post-h2 fade-up">
    속도 지옥과 커스텀의 한계, 그리고 Astro와의 만남
  </h2>

<figure style="margin: 1.5rem 0; text-align: center;">
  <img src="https://image.lunasonata.com/2026/08/astro-migration.webp" alt="워드프레스에서 아스트로 전환 이유"  style="border-radius: 8px; max-width: 100%;" />
</figure>


  <p class="post-p fade-up">
    나는 워드프레스가 세상에서 제일 좋은 플랫폼인 줄만 알았다. 하지만 내 자체 NAS 서버에서는 속도가 미치도록 느렸다. 수년 전에 사둔 70만 원짜리 NAS 사양의 한계였겠지만, 그렇다고 호스팅 비용을 새로 들여 서버를 빌리고 싶지는 않았다. 이미 투자한 장비가 있는데 돈을 더 쓸 수는 없는 노릇이었고, 이제는 정말 수익을 내야 할 타이밍이었다.
  </p>

  <p class="post-p fade-up">
    다시 마음을 다잡고 제미나이와 함께 워드프레스 커스텀에 돌입했다. 테마 고유의 CSS 상속을 받지 않으려고 차일드 테마(Child Theme)까지 만들어가며 수많은 시도를 했다. 내가 글을 쓸 때 HTML, CSS, JS를 직접 사용해서 작성하는 편인데, 자꾸 부모 테마의 스타일 간섭을 받았다. 개발 지식이 없다 보니 이 문제를 완전히 끊어낼 수가 없었다.
  </p>

  <p class="post-p fade-up">
    글 쓰기는 결국 또 뒷전이 되었고, 내가 원하는 모양 그대로 완전히 제어할 수 있는 사이트를 만들고 싶다는 갈증만 더욱 커져갔다. 답답한 마음에 제미나이에게 <em>"워드프레스 말고, 아예 처음부터 내 손으로 직접 제작할 수 있는 프레임워크가 없을까?"</em>라고 물었다. 제미나이가 몇 가지 대안을 추천해 주었는데, 그중 내 눈을 단번에 사로잡은 것이 바로 <strong>아스트로(Astro) 블로그</strong>였다.
  </p>

  <h2 class="post-h2 fade-up">
    신세계의 열림: 무에서 유를 만들어내다
  </h2>

  <p class="post-p fade-up">
    Astro의 세계로 발을 들이자마자 생소한 개발 용어들이 머릿속으로 쏟아져 들어왔다. 정적 웹사이트(Static Site), 깃(Git), 깃허브(GitHub)... 파면 팔수록 신기하면서도 머리가 아팠다. 개발 지식이 0인 나는 순전히 제미나이에게 1부터 10까지 물어보고, 코드를 복사해서 적용해 보고, 에러가 나면 복구하는 정직한 노가다를 수없이 반복했다.
  </p>



  <p class="post-p fade-up">
    워드프레스가 이미 완성된 집에 들어가 인테리어를 고치는 느낌이었다면, Astro는 아예 아무것도 없는 맨땅에 기둥을 세우고 벽돌을 쌓아 올리는 느낌이었다. 처음엔 정말 막막했다. 어렵사리 Astro를 설치하긴 했는데, 이걸 내 시놀로지 NAS와 어떻게 연동해야 인터넷상에 띄울 수 있는지부터 시작해서, 메인 화면과 포스트 뼈대는 어떻게 디자인할지, 기존 워드프레스 글과 이미지는 또 어떻게 옮길지... 머리가 지끈거렸다.
  </p>

  <p class="post-p fade-up">
    그럼에도 불구하고 고민을 하나씩 풀어가는 과정이 기가 막히게 재밌었다. 온종일 노트북을 붙잡고 앉아 구현하고 싶었던 기능이 실제로 작동할 때마다 엄청난 희열이 몰려왔다. 제미나이한테 다 물어봐서 만든 거라 내 진짜 실력이 된 건 아니지만, 내가 머릿속으로 그린 구상을 내 손으로 직접 실현해 내고 있다는 사실 자체만으로도 마치 개발자가 된 듯한 기분이었다.
  </p>

  <div class="timeline-item fade-up">
    <span class="badge">SYSTEM 1</span>
    <h3 class="post-h3">배포 자동화 파이프라인 (Webhook + Docker)</h3>
    <p class="post-p">
      처음엔 그냥 로컬에서 md 파일을 만들고 빌드해서 <code>dist</code> 결과물 폴더를 NAS에 일일이 수동으로 옮길 생각이었다. 그런데 매번 옮기는 작업이 너무 귀찮아지면서 <em>'아, 이래서 백엔드 자동화가 필요한 거구나'</em> 싶었다. 결국 NAS 컨테이너에 웹훅(Webhook)을 구축하고, VS Code에서 수정 사항을 <code>commit & push</code> 하면 NAS 웹스테이션 연동 폴더로 자동 덮어쓰기가 되도록 자동화 환경을 만들었다. 말은 간단해 보이지만 이 시스템을 잡는 데만 꼬박 1주일이 걸렸다.
    </p>
  </div>

  <div class="timeline-item fade-up">
    <span class="badge">SYSTEM 2</span>
    <h3 class="post-h3">이미지 최적화 서버 및 자동 WebP 변환</h3>
    <p class="post-p">
      이미지 파일들을 Git 레포지토리에 전부 올려두면 용량이 너무 커질 것 같았다. 그래서 NAS에 이미지 전용 저장 폴더를 만들고, 서브 도메인을 하나 더 파서 연결했다. 거기에 <code>index.html</code>을 얹어 독립적인 이미지 서버 URL 구조를 만들었다. 웹 페이지 로딩 속도를 올리기 위해 이미지를 올려두면 자동으로 <code>.webp</code> 포맷으로 압축 변환되고 원본 파일은 삭제되는 로직까지 구현했다. 중간에 코드가 꼬여 전체 에러가 나는 바람에 처음부터 다시 세팅하느라 여기서도 꼬박 1주일이 날아갔다.
    </p>
  </div>

  <div class="timeline-item fade-up">
    <span class="badge">SYSTEM 3</span>
    <h3 class="post-h3">웹 기반 백엔드 어드민(Admin) 사이트 개발</h3>
    <p class="post-p">
      매번 로컬에서 mdx 파일을 만드는 것도 번거로워서, 아예 웹상에서 HTML을 입력하고 즉시 포스트를 발행할 수 있는 나만의 Admin 사이트를 제작했다. 백엔드는 완전히 초문이라 제미나이가 시키는 대로 무작정 따라 했는데, 시행착오가 정말 엄청났다. VS Code처럼 알록달록하게 구문 하이라이팅이 들어간 에디터 구현, 비밀번호 로그인, 기존 글/이미지 불러오기, 영문 슬러그 생성, 제목 기반 mdx 저장 등 온 정신을 쏟아부었다.
    </p>

<!-- SYSTEM 3 코드 박스 영역 시작 -->
<div class="sk-code-box-container">
  <style>
    .sk-code-box-container {
      margin: 24px 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .sk-code-header {
      background-color: #252526;
      color: #cccccc;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3e3e42;
    }
    .sk-code-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sk-code-icon {
      width: 16px;
      height: 16px;
      color: #007acc;
      flex-shrink: 0;
    }
    .sk-code-title {
      font-size: 14px;
      font-weight: 500;
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sk-code-copy-btn {
      background: none;
      border: none;
      padding: 6px;
      color: #aaaaaa;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 4px;
      font-size: 13px;
      transition: background-color 0.2s, color 0.2s;
    }
    .sk-code-copy-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    .sk-code-copy-btn.sk-copied {
      color: #4ec9b0;
    }
    .sk-code-copy-icon {
      width: 16px;
      height: 16px;
    }
    .sk-code-body {
      background-color: #1e1e1e;
      display: flex;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      font-size: 14px;
      line-height: 1.6;
      tab-size: 4;
    }
    .sk-code-line-numbers {
      padding: 16px 0;
      background-color: #1e1e1e;
      color: #858585;
      text-align: right;
      user-select: none;
      border-right: 1px solid #3e3e42;
      flex-shrink: 0;
    }
    .sk-code-line-number-item {
      padding: 0 16px;
      display: block;
    }
    .sk-code-content {
      padding: 16px;
      color: #d4d4d4;
      overflow-x: auto;
      flex-grow: 1;
      outline: none;
      white-space: pre;
    }
    .sk-code-content:focus {
      background-color: rgba(255, 255, 255, 0.02);
    }
    .sk-token-comment { color: #6a9955; }
    .sk-token-keyword { color: #569cd6; }
    .sk-token-string { color: #ce9178; }
    .sk-token-function { color: #dcdcaa; }
    .sk-token-variable { color: #9cdcfe; }
    .sk-token-number { color: #b5cea8; }
    .sk-token-operator { color: #d4d4d4; }
    .sk-token-class { color: #4ec9b0; }

    @media (max-width: 600px) {
      .sk-code-header { padding: 8px 12px; }
      .sk-code-title { font-size: 13px; }
      .sk-code-copy-btn { font-size: 12px; padding: 4px; gap: 3px; }
      .sk-code-copy-icon { width: 14px; height: 14px; }
      .sk-code-body { font-size: 13px; line-height: 1.5; }
      .sk-code-line-numbers { padding: 12px 0; }
      .sk-code-line-number-item { padding: 0 12px; }
      .sk-code-content { padding: 12px; }
    }
  </style>

  <!-- 1. 코드 박스 헤더 -->
  <div class="sk-code-header">
    <div class="sk-code-title-group">
      <svg class="sk-code-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      <span class="sk-code-title" contenteditable="true" spellcheck="false">HTML / 본문 작성 공간 (VSCode 코드 하이라이팅 적용)</span>
    </div>
    <button class="sk-code-copy-btn sk-js-copy-btn" title="코드 복사">
      <svg class="sk-code-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="sk-copy-text">복사</span>
    </button>
  </div>

  <!-- 2. 코드 박스 바디 -->
  <div class="sk-code-body">
    <div class="sk-code-line-numbers sk-js-line-numbers"></div>
    <div class="sk-code-content sk-js-code-content" contenteditable="true" spellcheck="false"><span class="sk-token-keyword">const</span> observer = <span class="sk-token-keyword">new</span> <span class="sk-token-function">IntersectionObserver</span>((entries, observer) => {
    entries.<span class="sk-token-function">forEach</span>(entry => {
        <span class="sk-token-keyword">if</span> (entry.isIntersecting) {
            entry.target.classList.<span class="sk-token-function">add</span>(<span class="sk-token-string">'visible'</span>);
            observer.<span class="sk-token-function">unobserve</span>(entry.target);
        }
    });
}, observerOptions);

fadeElements.<span class="sk-token-function">forEach</span>(el => observer.<span class="sk-token-function">observe</span>(el));

<span class="sk-token-comment">// 2. Interactive Quote Click Effect</span>
<span class="sk-token-keyword">const</span> quotes = document.<span class="sk-token-function">querySelectorAll</span>(<span class="sk-token-string">'.blog-post-content .post-quote'</span>);</div>
  </div>
</div>

<!-- 안정적인 전역 실행 스크립트 -->
<script>
  (function initSkCodeBoxes() {
    function setupCodeBoxes() {
      const codeBoxes = document.querySelectorAll('.sk-code-box-container');
      
      codeBoxes.forEach(codeBox => {
        const copyBtn = codeBox.querySelector('.sk-js-copy-btn');
        const codeContent = codeBox.querySelector('.sk-js-code-content');
        const lineNumbersContainer = codeBox.querySelector('.sk-js-line-numbers');
        
        if (!codeContent || !lineNumbersContainer) return;

        const copyTextSpan = copyBtn ? copyBtn.querySelector('.sk-copy-text') : null;

        function updateLineNumbers() {
          const codeText = codeContent.innerText;
          const lines = codeText.split(/\r\n|\r|\n/);
          const lineCount = Math.max(1, lines.length);

          lineNumbersContainer.innerHTML = '';

          for (let i = 1; i <= lineCount; i++) {
            const lineNumberSpan = document.createElement('span');
            lineNumberSpan.className = 'sk-code-line-number-item';
            lineNumberSpan.textContent = i;
            lineNumbersContainer.appendChild(lineNumberSpan);
          }
        }

        function copyCode() {
          const textToCopy = codeContent.innerText;

          navigator.clipboard.writeText(textToCopy).then(() => {
            if (copyBtn && copyTextSpan) {
              copyBtn.classList.add('sk-copied');
              copyTextSpan.textContent = '복사됨';

              setTimeout(() => {
                copyBtn.classList.remove('sk-copied');
                copyTextSpan.textContent = '복사';
              }, 2000);
            }
          }).catch(err => {
            console.error('복사 실패:', err);
            alert('코드 복사에 실패했습니다.');
          });
        }

        // 이미 이벤트가 등록되었는지 확인 후 등록
        if (!codeContent.dataset.initialized) {
          codeContent.addEventListener('input', updateLineNumbers);
          if (copyBtn) copyBtn.addEventListener('click', copyCode);
          codeContent.dataset.initialized = 'true';
        }

        updateLineNumbers();
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupCodeBoxes);
    } else {
      setupCodeBoxes();
    }
  })();
</script>

  <h2 class="post-h2 fade-up">
    제미나이와의 사투, 그리고 아내의 한마디
  </h2>

  <p class="post-p fade-up">
    제미나이가 진짜 똑똑하긴 한데... 가끔 말도 안 되게 멍청해질 때가 있었다. 내 의도를 제대로 이해 못 해서 헛다리를 짚을 때는 답답해서 모니터에 대고 싸우기도 했다. (이래서 사람들이 클로드 코드를 쓰나 싶기도 했다. 하지만 무료로 제미나이 프로를 쓰고 있는 입장이니 뽕을 뽑아야 한다는 집념 하나로 버텼다!)
  </p>

  <p class="post-p fade-up">
    내가 하루 종일 노트북만 붙잡고 제미나이하고만 대화를 나누고 있으니, 어느 날 아내가 참다못해 한마디를 던졌다.
  </p>

  <div class="post-quote fade-up">
    "그만 좀 제미나이랑 얘기해! 나랑은 대체 언제 얘기할 거야?"
  </div>

  <p class="post-p fade-up">
    아내 말이 백번 맞았다. 온통 머릿속이 블로그 시스템 구축 생각으로 가득 차 있었으니 말이다. 미안한 마음이 들면서도 개발의 재미에 푹 빠져 헤어 나오질 못했다.
  </p>

  <p class="post-p fade-up">
    사실 댓글 기능도 추가하고 싶지만, 댓글을 구현하려면 또 백엔드 서버 로직을 대대적으로 건드려야 한다. 지금까지 고생해서 아주 안정적으로 구축해 놓은 시스템이 괜히 고치다가 와르르 무너질까봐 두려워서 선뜻 손을 대지 못하고 있다. 게다가 여기는 내 개인 일상 블로그라 아무래도 수익성은 낮다. 그래서 조만간 수익형으로 운영할 또 다른 블로그를 만들어야 하는데, 이 모든 시스템을 구축하는 데 들어간 시간을 알기에 살짝 두렵기도 하다. 그래도 이렇게 고생해서 만든 백엔드 시스템을 새 블로그에도 그대로 재활용할 수 있으니 꼭 해낼 것이다.
  </p>

  <h2 class="post-h2 fade-up">
    나만의 정갈한 블로그를 마치며
  </h2>

  <p class="post-p fade-up">
    이렇게 1부터 10까지 내가 원하는 모든 요소들을 내 의도대로 반영한 나만의 Astro 블로그 구축이 드디어 일단락되었다. 아직도 구석구석 눈에 거슬리는 디자인 요소들이 남아있지만, 이제는 코드 수정에만 매몰되지 않고 꾸준히 글을 써 내려가면서 천천히 보완해 나가려고 한다.
  </p>

  <p class="post-p fade-up">
    진짜 내 손으로 하나하나 다져 만든 온전한 내 보금자리. 앞으로 이곳에 써 내려갈 나만의 진짜 이야기들이 스스로도 너무나 기대된다. 이번에는 제대로 즐기면서, 블로그로 꼭 멋진 성과까지 만들어보자!
  </p>
</div>

<!-- 인터랙션 및 애니메이션 JS 스크립트 -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Scroll Fade-up Observer (스크롤 감지 및 서서히 나타남 효과)
    const fadeElements = document.querySelectorAll('.blog-post-content .fade-up');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 2. Interactive Quote Click Effect (인용구 클릭 인터랙션)
    const quotes = document.querySelectorAll('.blog-post-content .post-quote');
    quotes.forEach(quote => {
      quote.addEventListener('click', function() {
        this.style.borderLeftColor = '#319795';
        this.style.backgroundColor = '#e6fffa';
        setTimeout(() => {
          this.style.borderLeftColor = '#3182ce';
          this.style.backgroundColor = '#f7fafc';
        }, 400);
      });
    });

    // 3. Link Hover & Click Feedback (링크 인터랙션)
    const links = document.querySelectorAll('.blog-post-content .post-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.opacity = '0.8';
      });
      link.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
      });
    });
  });
</script>
