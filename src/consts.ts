// src/consts.ts

/**
 * 1. 기본 사이트 메타데이터 (SEO & 배포 환경)
 */
export const SITE_TITLE = '세광로그';
export const SITE_DESCRIPTION = '개인 일상, 에피소드, 여행을 기록하는 일기장입니다.';
export const SITE_URL = 'https://blog.lunasonata.com'; // 실제 사용하는 도메인 주소로 변경
export const AUTHOR_NAME = '세광';

/**
 * 2. 소셜 공유(Open Graph) 기본 옵션
 */
export const DEFAULT_OG_IMAGE = 'https://image.lunasonata.com/2026/08/sekwanglog_card.webp'; // public/og-default.jpg에 위치한 기본 공유 이미지

/**
 * 3. 소셜 미디어 및 외부 링크
 */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/sekwang_hyeon',
  email: 'kwang11235@naver.com',
  github: '', // 필요 시 추후 작성 (예: 'https://github.com/username')
};

/**
 * 4. 내비게이션 메뉴 구성 (선택 사항)
 * Header나 Footer에서 반복문으로 메뉴를 그릴 때 다루기 편함
 */
export const NAV_ITEMS = [
  { text: '홈', href: '/' },
  { text: '블로그', href: '/blog' },
  { text: '소개', href: '/about' },
];