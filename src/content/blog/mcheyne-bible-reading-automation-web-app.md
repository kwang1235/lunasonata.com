---
title: "n8n 자동화와 웹 개발로 다시 세운 맥체인 성경읽기 루틴 구축기"
description: "4개월의 공백을 깨고 다시 시작한 맥체인 성경 통독. n8n과 Listmonk 기반 뉴스레터 자동 발송 파이프라인부터 Astro 기반 개역개정·새번역 대조 웹앱 제작까지, 일상 속 말씀 루틴을 회복한 개발기를 전한다"
pubDate: "2026-08-23T23:17:35"
slug: "mcheyne-bible-reading-automation-web-app"
heroImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

categories:
  - "일상"
draft: false
---

<div class="sk-post-container" style="width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif; color: #1e293b; line-height: 1.85; letter-spacing: -0.015em; word-break: normal; box-sizing: border-box;">
  
  <style>
    /* n8n 파이프라인 데이터 흐름 펄스 애니메이션 */
    @keyframes skPulseFlow {
      0% { left: 0%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 100%; opacity: 0; }
    }
    .sk-pulse-dot {
      position: absolute;
      top: 50%;
      width: 8px;
      height: 8px;
      background: #3b82f6;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 8px #2563eb, 0 0 14px #60a5fa;
      animation: skPulseFlow 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    .sk-pulse-1 { animation-delay: 0s; }
    .sk-pulse-2 { animation-delay: 0.8s; }
    .sk-pulse-3 { animation-delay: 1.6s; }

    /* 클릭 인터랙션 햅틱/호버 효과 */
    .sk-interactive-btn {
      transition: all 0.15s ease;
      cursor: pointer;
      user-select: none;
    }
    .sk-interactive-btn:active {
      transform: scale(0.96);
    }
  </style>

  <p class="sk-p sk-fade" style="margin: 0 0 20px; font-size: 1.05rem; color: #1e293b; line-height: 1.85;">
    올해 1월, 매일 아침 6시 정갈하게 성경 본문을 받아보기 위해 <mark style="background: linear-gradient(120deg, rgba(186, 230, 253, 0.5) 0%, rgba(186, 230, 253, 0.85) 100%); padding: 2px 6px; border-radius: 4px; color: inherit; font-weight: 600;">n8n 자동화와 Listmonk 뉴스레터 시스템</mark>을 직접 구축했다. 구약과 신약을 균형 있게 읽어 내려가는 맥체인 성경읽기 플랜을 완벽하게 소화하겠다는 야심 찬 출발이었다.
  </p>

  <!-- 1. n8n 워크플로우 (데이터 흐름 애니메이션 적용) -->
  <div id="sk-n8n-workflow-aligned-container" style="max-width: 100%; margin: 2.5rem auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; box-sizing: border-box; color: #1e293b;">
    <div class="sk-workflow-card" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: clamp(16px, 4vw, 28px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04); box-sizing: border-box;">
      
<div class="sk-header-section" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 18px; margin-bottom: 24px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background-color: #ff6d5a; color: #ffffff; border-radius: 6px;">
              <svg style="width: 16px; height: 16px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <h2 style="margin: 0; font-size: clamp(17px, 3.8vw, 20px); font-weight: 700; color: #0f172a; letter-spacing: -0.02em;">맥체인 성경 자동 발송 워크플로우</h2>
          </div>
          <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">매일 아침 성경 본문을 생성하고 Listmonk로 자동 발송하는 4단계 파이프라인</p>
        </div>

<div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #166534;">
          <span style="position: relative; display: flex; height: 8px; width: 8px;">
            <span style="animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; position: absolute; display: inline-flex; height: 100%; width: 100%; border-radius: 9999px; background-color: #4ade80; opacity: 0.75;"></span>
            <span style="position: relative; display: inline-flex; border-radius: 9999px; height: 8px; width: 8px; background-color: #16a34a;"></span>
          </span>
          <span>Active (Pipeline Live)</span>
        </div>
      </div>

  <div class="sk-canvas-container" style="position: relative; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1.2px, transparent 1.2px); background-size: 18px 18px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px 20px; margin-bottom: 24px; overflow-x: auto; box-sizing: border-box; -webkit-overflow-scrolling: touch;">
        <div class="sk-canvas-inner" style="min-width: 680px; width: 100%; margin: 0 auto; box-sizing: border-box;">
          
  <div class="sk-node-icons-row" style="display: flex; align-items: center; justify-content: space-between; position: relative;">
            
<!-- Node 1 -->
<div style="width: 130px; display: flex; justify-content: center; flex-shrink: 0;">
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 68px; height: 68px; background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 24px 8px 8px 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06); box-sizing: border-box;">
                <span style="position: absolute; left: -16px; color: #ff6d5a; display: flex; align-items: center;">
                  <svg style="width: 14px; height: 14px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
                <svg style="width: 32px; height: 32px; color: #10b981; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style="position: absolute; right: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
              </div>
            </div>

<!-- Connector 1 -->
<div class="sk-line-connector" style="flex: 1; min-width: 30px; display: flex; align-items: center; justify-content: center; position: relative; height: 68px;">
              <div style="width: 100%; height: 2px; background-color: #cbd5e1; position: relative; overflow: visible;">
                <div class="sk-pulse-dot sk-pulse-1"></div>
              </div>
              <span style="width: 6px; height: 6px; border-top: 2px solid #94a3b8; border-right: 2px solid #94a3b8; transform: rotate(45deg); position: absolute; right: 0;"></span>
            </div>

<!-- Node 2 -->
  <div style="width: 130px; display: flex; justify-content: center; flex-shrink: 0;">
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 68px; height: 68px; background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06); box-sizing: border-box;">
                <span style="position: absolute; left: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
                <svg style="width: 32px; height: 32px; color: #ea580c; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                <span style="position: absolute; right: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
              </div>
            </div>

  <!-- Connector 2 -->
  <div class="sk-line-connector" style="flex: 1; min-width: 30px; display: flex; align-items: center; justify-content: center; position: relative; height: 68px;">
              <div style="width: 100%; height: 2px; background-color: #cbd5e1; position: relative; overflow: visible;">
                <div class="sk-pulse-dot sk-pulse-2"></div>
              </div>
              <span style="width: 6px; height: 6px; border-top: 2px solid #94a3b8; border-right: 2px solid #94a3b8; transform: rotate(45deg); position: absolute; right: 0;"></span>
            </div>

  <!-- Node 3 -->
  <div style="width: 140px; display: flex; justify-content: center; flex-shrink: 0;">
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 68px; height: 68px; background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06); box-sizing: border-box;">
                <span style="position: absolute; left: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
                <svg style="width: 32px; height: 32px; color: #2563eb; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3a14.5 14.5 0 000 18 14.5 14.5 0 000-18z" />
                </svg>
                <span style="position: absolute; right: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
              </div>
            </div>

  <!-- Connector 3 -->
  <div class="sk-line-connector" style="flex: 1; min-width: 30px; display: flex; align-items: center; justify-content: center; position: relative; height: 68px;">
              <div style="width: 100%; height: 2px; background-color: #cbd5e1; position: relative; overflow: visible;">
                <div class="sk-pulse-dot sk-pulse-3"></div>
              </div>
              <span style="width: 6px; height: 6px; border-top: 2px solid #94a3b8; border-right: 2px solid #94a3b8; transform: rotate(45deg); position: absolute; right: 0;"></span>
            </div>

  <!-- Node 4 -->
  <div style="width: 130px; display: flex; justify-content: center; flex-shrink: 0;">
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 68px; height: 68px; background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06); box-sizing: border-box;">
                <span style="position: absolute; left: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
                <svg style="width: 32px; height: 32px; color: #2563eb; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3a14.5 14.5 0 000 18 14.5 14.5 0 000-18z" />
                </svg>
                <span style="position: absolute; right: -7px; width: 12px; height: 12px; background-color: #ffffff; border: 2px solid #94a3b8; border-radius: 50%; box-sizing: border-box;"></span>
              </div>
            </div>

  <!-- Plus -->
  <div class="sk-line-connector" style="width: 18px; height: 2px; background-color: #cbd5e1; flex-shrink: 0;"></div>
            <div style="display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background-color: #e2e8f0; border-radius: 4px; color: #64748b; font-size: 14px; font-weight: 700; flex-shrink: 0;">+</div>

  </div>

  <div class="sk-node-labels-row" style="display: flex; justify-content: space-between; margin-top: 10px;">
            <div style="width: 130px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; text-align: center;">
              <span style="font-size: 13px; font-weight: 700; color: #334155; white-space: nowrap;">매일 아침 6시</span>
              <span style="font-size: 11px; color: #64748b; margin-top: 2px;">Schedule</span>
            </div>
            <div style="flex: 1; min-width: 30px;"></div>
            <div style="width: 130px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; text-align: center;">
              <span style="font-size: 13px; font-weight: 700; color: #334155; white-space: nowrap;">Code in JavaScript</span>
              <span style="font-size: 11px; color: #64748b; margin-top: 2px;">HTML Build</span>
            </div>
            <div style="flex: 1; min-width: 30px;"></div>
            <div style="width: 140px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; text-align: center;">
              <span style="font-size: 13px; font-weight: 700; color: #334155; white-space: nowrap;">Listmonk 캠페인 생성</span>
              <span style="font-size: 10px; color: #94a3b8; margin-top: 2px; white-space: nowrap;">POST:/api/campaigns</span>
            </div>
            <div style="flex: 1; min-width: 30px;"></div>
            <div style="width: 130px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; text-align: center;">
              <span style="font-size: 13px; font-weight: 700; color: #334155; white-space: nowrap;">HTTP Request</span>
              <span style="font-size: 10px; color: #94a3b8; margin-top: 2px; white-space: nowrap;">PUT:/status (running)</span>
            </div>
            <div style="width: 40px; flex-shrink: 0;"></div>
          </div>

  </div>
      </div>

  <!-- 쉬운 해설 그리드 -->
  <div class="sk-step-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
        <div class="sk-step-card" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-sizing: border-box;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #10b981; background-color: #d1fae5; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">1</span>
            <span style="font-size: 13px; font-weight: 700; color: #1e293b;">정기 스케줄 트리거</span>
          </div>
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">매일 오전 6시(KST) 정각이 되면 n8n 스케줄러가 파이프라인을 자동으로 시작합니다.</p>
        </div>
        <div class="sk-step-card" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-sizing: border-box;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #ea580c; background-color: #ffedd5; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">2</span>
            <span style="font-size: 13px; font-weight: 700; color: #1e293b;">데이터 파싱 및 HTML 조립</span>
          </div>
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">JSON 읽기표에서 오늘 날짜의 성경 본문을 찾아 깔끔한 뉴스레터 HTML 템플릿으로 렌더링합니다.</p>
        </div>
        <div class="sk-step-card" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-sizing: border-box;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #2563eb; background-color: #dbeafe; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">3</span>
            <span style="font-size: 13px; font-weight: 700; color: #1e293b;">캠페인 초안 생성</span>
          </div>
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">생성된 제목과 본문을 자체 구축한 Listmonk API로 전송하여 발송 대기 캠페인을 생성합니다.</p>
        </div>
        <div class="sk-step-card" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-sizing: border-box;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #2563eb; background-color: #dbeafe; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">4</span>
            <span style="font-size: 13px; font-weight: 700; color: #1e293b;">즉시 발송 상태 변경</span>
          </div>
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">캠페인의 상태를 <code style="background-color: #e2e8f0; padding: 1px 4px; border-radius: 3px; font-size: 11px; color: #0f172a;">running</code>으로 PUT 요청하여 구독자들에게 즉시 전송합니다.</p>
        </div>
      </div>

  <!-- 아코디언 -->
  <div class="sk-accordion" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; background-color: #fafafa;">
        <button type="button" class="sk-accordion-toggle" style="width: 100%; min-height: 44px; padding: 12px 16px; background-color: #f8fafc; border: none; text-align: left; display: flex; align-items: center; justify-content: space-between; cursor: pointer; color: #334155; font-size: 13px; font-weight: 600; box-sizing: border-box;" onclick="(function(btn){var b=btn.nextElementSibling;var i=btn.querySelector('.sk-toggle-icon');if(b.style.display==='none'||b.style.display===''){b.style.display='block';i.style.transform='rotate(180deg)';}else{b.style.display='none';i.style.transform='rotate(0deg)';}})(this)">
          <span style="display: flex; align-items: center; gap: 6px;">
            <svg style="width: 16px; height: 16px; stroke-width: 1.8; color: #64748b;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            파이프라인 세부 설정 및 기술 정보 보기
          </span>
          <svg class="sk-toggle-icon" style="width: 16px; height: 16px; stroke-width: 1.8; transition: transform 0.2s ease; color: #64748b;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        <div class="sk-accordion-content" style="display: none; padding: 16px; font-size: 13px; color: #475569; line-height: 1.6; border-top: 1px solid #e2e8f0; background-color: #ffffff;">
          <ul style="margin: 0; padding-left: 18px;">
            <li style="margin-bottom: 6px;"><strong style="color: #0f172a;">로컬 파일 읽기:</strong> Synology NAS 내부 볼륨 경로의 성경 본문과 연간 맥체인 플랜 JSON을 로드합니다.</li>
            <li style="margin-bottom: 6px;"><strong style="color: #0f172a;">시간대 및 텍스트 파싱:</strong> KST 기준 당일 날짜를 계산하고 정규식으로 반응형 HTML 템플릿을 생성합니다.</li>
            <li><strong style="color: #0f172a;">2단계 Listmonk 발송:</strong> 캠페인을 생성한 후 반환된 캠페인 ID를 이어받아 상태를 running으로 전환합니다.</li>
          </ul>
        </div>
      </div>

  </div>
  </div>

  <p class="sk-p sk-fade" style="margin: 0 0 20px; font-size: 1.05rem; color: #1e293b; line-height: 1.85;">
    그러나 지난 4월, 두 달간 이어진 병가로 인해 루틴은 서서히 균열을 보였고 성경 통독도 멈춰 섰다. 공백은 어느덧 4개월이라는 시간으로 불어났다. 습관을 들이는 데는 수많은 결단과 노력이 필요하지만, 무너지는 것은 순식간이었다.
  </p>
  
  <div class="sk-fade" style="position: relative; overflow: hidden; margin: 28px 4px; padding: 24px 26px; border: 1px solid #bae6fd; border-radius: 16px; background: #f0f9ff; box-shadow: 0 2px 12px rgba(2, 132, 199, 0.05);">
    <svg style="position: absolute; right: 12px; top: 8px; width: 64px; height: 64px; fill: #0284c7; opacity: 0.12; pointer-events: none;" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
    <div style="position: relative; z-index: 1;">
      <p style="margin: 0; font-size: 1rem; color: #0369a1; line-height: 1.8; font-style: italic; font-weight: 500;">
        "루틴이 멈춘 자리에 다시 말씀을 채워 넣는 가장 확실한 방법은, 접근하기 가장 편한 환경을 직접 설계하는 것이었다."
      </p>
    </div>
  </div>

  <!-- 2. 맥체인 연간 통독 실시간 진행률 프로그레스 바 위젯 -->
  <div class="sk-fade" style="margin: 28px 4px; padding: 20px 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 14px; font-weight: 800; color: #0f172a;">2026 맥체인 통독 달성도</span>
        <span style="font-size: 11px; font-weight: 600; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 9999px;">오늘 8월 23일 기준</span>
      </div>
      <span id="sk-progress-percent" style="font-size: 16px; font-weight: 800; color: #0284c7;">0%</span>
    </div>
    <div style="width: 100%; height: 10px; background-color: #f1f5f9; border-radius: 9999px; overflow: hidden; position: relative;">
      <div id="sk-progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #38bdf8, #0284c7); border-radius: 9999px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);"></div>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b; margin-top: 8px;">
      <span>Day 1 (창 1, 마 1)</span>
      <span id="sk-progress-days">365일 중 235일차 완주 중</span>
      <span>Day 365 (말 4, 행 28)</span>
    </div>
  </div>

  <p class="sk-p sk-fade" style="margin: 0 0 20px; font-size: 1.05rem; color: #1e293b; line-height: 1.85;">
    전환점은 옥정 사귐의교회에 정착하면서 찾아왔다. 새가족 양육 과정을 밟으며 성경을 깊이 있게 읽어야 할 당위성을 되찾았고, 풍성한 삶의 첫걸음(풍삶첫) 과정을 통해 매일 '10-10-10(텐텐텐)' 훈련을 병행하게 되었다. 연초의 감각을 되살려 다시금 맥체인 성경읽기에 도전하기로 마음먹었다.
  </p>

  <h2 class="sk-h2" style="font-size: clamp(1.2rem, 4vw, 1.45rem); font-weight: 700; color: #0f172a; margin: 44px 0 18px; padding-bottom: 8px; border-bottom: 2px solid #bae6fd; letter-spacing: -0.02em;">
    메일함 너머 실시간 웹 환경으로 확장한 통독 시스템
  </h2>

  <p class="sk-p sk-fade" style="margin: 0 0 20px; font-size: 1.05rem; color: #1e293b; line-height: 1.85;">
    기존에 운용하던 n8n 스케줄러는 매일 오전 6시 정각에 메일을 쏘아주는 훌륭한 파이프라인이었지만, 매번 메일함을 열어 확인해야 하는 한계가 있었다. 최근 몰두하고 있는 웹 개발 취미를 살려 접속자의 현지 시간을 자동으로 감지해 당일 읽기 분량을 즉시 띄워주는 <mark style="background: linear-gradient(120deg, rgba(186, 230, 253, 0.5) 0%, rgba(186, 230, 253, 0.85) 100%); padding: 2px 6px; border-radius: 4px; color: inherit; font-weight: 600;">전용 성경 리더 웹 애플리케이션</mark>을 구현하기로 했다.
  </p>

  <div class="sk-fade" style="margin: 36px 0 20px; text-align: center;">
    <a href="https://sekwang.lunasonata.com/bible" target="_blank" rel="noopener noreferrer" class="sk-interactive-btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; background: #0284c7; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 0.98rem; border-radius: 30px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);">
      <span>매일 맥체인 성경 웹페이지 방문하기</span>
      <svg style="width: 16px; height: 16px; fill: none; stroke: #ffffff; stroke-width: 2.5;" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </a>
  </div>
  
  <p class="sk-p sk-fade" style="margin: 0 0 10px; font-size: 0.98rem; color: #64748b; text-align: center; line-height: 1.7;">
    구축한 웹페이지는 지속적으로 다듬어가며 나만의 말씀 아카이브로 완성해 나갈 계획이다.
  </p>
</div>

  <!-- 3. 실시간 인터랙티브 모바일 목업 리더기 -->
  <div id="sk-floating-phone-preview-container" style="max-width: 100%; margin: 2.5rem auto; font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', Roboto, 'Noto Sans KR', sans-serif; box-sizing: border-box; color: #1e293b;">
    <div class="sk-preview-card" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: clamp(16px, 4vw, 28px); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); box-sizing: border-box;">
      
  <div class="sk-preview-header" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 32px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background-color: #2563eb; color: #ffffff; border-radius: 10px;">
            <svg style="width: 20px; height: 20px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </span>
          <div>
            <h3 style="margin: 0; font-size: clamp(16px, 3.5vw, 18px); font-weight: 700; color: #0f172a; line-height: 1.3;">모바일 웹 리더 인터페이스</h3>
            <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">버튼을 직접 클릭하여 장 전환 및 설정을 테스트해보세요</p>
          </div>
        </div>

  <div style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #1d4ed8;">
          <span style="display: inline-block; width: 6px; height: 6px; background-color: #2563eb; border-radius: 50%;"></span>
          <span>Live Interactive View</span>
        </div>
      </div>

  <div class="sk-floating-wrapper" style="display: flex; justify-content: center; width: 100%; box-sizing: border-box; padding: 20px 0 36px 0;">
        <div id="sk-phone-frame" class="sk-floating-phone" style="width: 100%; max-width: 360px; background-color: #f8fafc; border-radius: 36px; overflow: hidden; box-shadow: 0 24px 48px -12px rgba(15, 23, 42, 0.18), 0 12px 24px -8px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8); display: flex; flex-direction: column; box-sizing: border-box; transition: background-color 0.3s ease;">
          
  <!-- 상태바 -->
  <div id="sk-phone-status" class="sk-phone-statusbar" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px 6px 20px; font-size: 11px; font-weight: 600; color: #0f172a; background-color: #f8fafc;">
            <span>09:41</span>
            <div style="width: 38px; height: 4px; background-color: #cbd5e1; border-radius: 9999px;"></div>
            <div style="display: flex; align-items: center; gap: 5px;">
              <svg style="width: 13px; height: 13px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>
              <svg style="width: 13px; height: 13px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-6a3 3 0 00-3-3H3.75zm18 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-.75v-3h.75z" clip-rule="evenodd" /></svg>
            </div>
          </div>

  <!-- 앱 콘텐츠 -->
  <div class="sk-app-content" style="padding: 14px 16px 20px 16px; box-sizing: border-box; max-height: 560px; overflow-y: auto;">
            
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <svg style="width: 18px; height: 18px; color: #2563eb; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                <h4 id="sk-app-title" style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a;">매일 맥체인 성경</h4>
              </div>
              <span id="sk-dark-toggle" class="sk-interactive-btn" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: #475569; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 20px; padding: 3px 8px;">
                <svg style="width: 12px; height: 12px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                다크 모드
              </span>
            </div>

  <!-- 2x2 장 선택기 -->
  <div id="sk-reader-card-top" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 10px;">
                <span class="sk-interactive-btn" style="padding: 5px 8px; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; font-weight: 600; color: #334155;">◀ 이전</span>
                <span class="sk-interactive-btn" style="padding: 5px 8px; background-color: #2563eb; color: #ffffff; border-radius: 6px; font-size: 11px; font-weight: 600;">오늘</span>
                <span style="flex: 1; text-align: center; font-size: 12px; font-weight: 700; color: #1e293b; background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 4px 6px; border-radius: 6px;">2026-08-23</span>
                <span class="sk-interactive-btn" style="padding: 5px 8px; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; font-weight: 600; color: #334155;">다음 ▶</span>
              </div>

  <div id="sk-chapter-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <div class="sk-chap-btn sk-interactive-btn" data-chap="gen" style="background-color: #2563eb; color: #ffffff; font-size: 12px; font-weight: 700; text-align: center; padding: 8px 4px; border-radius: 8px; box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);">
                  창세기 24장
                </div>
                <div class="sk-chap-btn sk-interactive-btn" data-chap="ezr" style="background-color: #f8fafc; color: #334155; border: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; text-align: center; padding: 8px 4px; border-radius: 8px;">
                  에스라 4장
                </div>
                <div class="sk-chap-btn sk-interactive-btn" data-chap="mat" style="background-color: #f8fafc; color: #334155; border: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; text-align: center; padding: 8px 4px; border-radius: 8px;">
                  마태복음 23장
                </div>
                <div class="sk-chap-btn sk-interactive-btn" data-chap="act" style="background-color: #f8fafc; color: #334155; border: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; text-align: center; padding: 8px 4px; border-radius: 8px;">
                  사도행전 23장
                </div>
              </div>
            </div>

  <!-- 본문 카드 -->
  <div id="sk-reader-card-body" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);">
              
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <h5 id="sk-current-chapter-title" style="margin: 0; font-size: 14px; font-weight: 800; color: #0f172a;">창세기 24장</h5>
                  <div id="sk-version-container" style="display: inline-flex; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px;">
                    <span class="sk-ver-btn sk-interactive-btn" data-ver="gae" style="background-color: #2563eb; color: #ffffff; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 4px;">개역개정</span>
                    <span class="sk-ver-btn sk-interactive-btn" data-ver="sae" style="color: #64748b; font-size: 10px; font-weight: 600; padding: 2px 5px;">새번역</span>
                    <span class="sk-ver-btn sk-interactive-btn" data-ver="dual" style="color: #64748b; font-size: 10px; font-weight: 600; padding: 2px 5px;">대조</span>
                  </div>
                </div>

  <div style="display: inline-flex; gap: 3px;">
                  <span id="sk-font-family-btn" class="sk-interactive-btn" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 5px; font-size: 10px; font-weight: 600; color: #334155;">명조체</span>
                  <span id="sk-font-dec-btn" class="sk-interactive-btn" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 5px; font-size: 10px; font-weight: 600; color: #334155;">가-</span>
                  <span id="sk-font-inc-btn" class="sk-interactive-btn" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 5px; font-size: 10px; font-weight: 600; color: #334155;">가+</span>
                </div>
              </div>

  <!-- 동적 본문 컨테이너 -->
  <div id="sk-verse-body" style="font-family: 'Noto Serif KR', 'Nanum Myeongjo', 'Batang', serif; font-size: 13.5px; line-height: 1.85; color: #1e293b; text-align: justify; min-height: 180px;">
                <!-- JS 렌더링 영역 -->
              </div>

  <!-- 내비게이션 -->
  <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                <div style="display: flex; gap: 6px; margin-bottom: 8px;">
                  <span id="sk-nav-prev-btn" class="sk-interactive-btn" style="flex: 1; text-align: center; padding: 6px 4px; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11px; font-weight: 600; color: #334155;">◀ 이전 장</span>
                  <span id="sk-nav-next-btn" class="sk-interactive-btn" style="flex: 1; text-align: center; padding: 6px 4px; background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; font-weight: 700; color: #2563eb;">다음 장 ▶</span>
                </div>

  <div id="sk-quick-chips" style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 2px;">
                  <span class="sk-quick-chip sk-interactive-btn" data-chap="gen" style="flex-shrink: 0; padding: 3px 8px; font-size: 10px; font-weight: 700; border-radius: 12px; background-color: #2563eb; color: #ffffff;">창 24</span>
                  <span class="sk-quick-chip sk-interactive-btn" data-chap="ezr" style="flex-shrink: 0; padding: 3px 8px; font-size: 10px; font-weight: 600; border-radius: 12px; background-color: #f1f5f9; border: 1px solid #e2e8f0; color: #475569;">스 4</span>
                  <span class="sk-quick-chip sk-interactive-btn" data-chap="mat" style="flex-shrink: 0; padding: 3px 8px; font-size: 10px; font-weight: 600; border-radius: 12px; background-color: #f1f5f9; border: 1px solid #e2e8f0; color: #475569;">마 23</span>
                  <span class="sk-quick-chip sk-interactive-btn" data-chap="act" style="flex-shrink: 0; padding: 3px 8px; font-size: 10px; font-weight: 600; border-radius: 12px; background-color: #f1f5f9; border: 1px solid #e2e8f0; color: #475569;">행 23</span>
                </div>
              </div>

  </div>

  </div>

  <div id="sk-phone-bar" style="display: flex; justify-content: center; align-items: center; padding: 8px 0 10px 0; background-color: #f8fafc;">
            <div style="width: 100px; height: 3.5px; background-color: #cbd5e1; border-radius: 9999px;"></div>
          </div>

  </div>
      </div>

  <!-- 아코디언 -->
  <div class="sk-accordion" style="margin-top: 10px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #fafafa;">
        <button type="button" class="sk-accordion-toggle" style="width: 100%; min-height: 44px; padding: 12px 16px; background-color: #f8fafc; border: none; text-align: left; display: flex; align-items: center; justify-content: space-between; cursor: pointer; color: #334155; font-size: 13px; font-weight: 600; box-sizing: border-box;" onclick="(function(btn){var b=btn.nextElementSibling;var i=btn.querySelector('.sk-toggle-icon');if(b.style.display==='none'||b.style.display===''){b.style.display='block';i.style.transform='rotate(180deg)';}else{b.style.display='none';i.style.transform='rotate(0deg)';}})(this)">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            <svg style="width: 16px; height: 16px; stroke-width: 1.8; color: #64748b;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            모바일 웹 리더 핵심 UX/UI 구성 특징
          </span>
          <svg class="sk-toggle-icon" style="width: 16px; height: 16px; stroke-width: 1.8; transition: transform 0.2s ease; color: #64748b;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        <div class="sk-accordion-content" style="display: none; padding: 16px; font-size: 13px; color: #475569; line-height: 1.6; border-top: 1px solid #e2e8f0; background-color: #ffffff;">
          <ul style="margin: 0; padding-left: 18px;">
            <li style="margin-bottom: 6px;"><strong style="color: #0f172a;">컴팩트 2x2 장 선택 칩:</strong> 하루 4개 장을 한눈에 파악하고 터치 한 번으로 빠르게 전환합니다.</li>
            <li style="margin-bottom: 6px;"><strong style="color: #0f172a;">다중 번역본 및 가독성:</strong> 개역개정, 새번역, 대조 모드를 즉시 변경하며 글꼴과 크기를 조절할 수 있습니다.</li>
            <li><strong style="color: #0f172a;">한 손 조작 내비게이션:</strong> 하단 이전/다음 버튼과 퀵 칩으로 부드럽게 통독을 이어갑니다.</li>
          </ul>
        </div>
      </div>

  </div>
  </div>

  <h2 class="sk-h2" style="font-size: clamp(1.2rem, 4vw, 1.45rem); font-weight: 700; color: #0f172a; margin: 44px 0 18px; padding-bottom: 8px; border-bottom: 2px solid #bae6fd; letter-spacing: -0.02em;">
    각자의 리듬으로 완주하는 1년 말씀 여정
  </h2>

  <p class="sk-p sk-fade" style="margin: 0 0 20px; font-size: 1.05rem; color: #1e293b; line-height: 1.85;">
    아이폰 홈 화면에 웹앱을 등록해 두고 터치 한 번으로 본문에 진입하니, 묵상을 시작하는 데 들던 심리적 저항감이 크게 줄었다. 특히 사귐의교회에서 개역개정과 새번역을 병행하는 만큼 대조 모드를 활용했을 때 말씀의 의미가 한층 입체적으로 와닿는다.
  </p>

  <div class="sk-fade" style="margin: 32px 0 16px; text-align: center;">
    <img src="https://image.lunasonata.com/2026/08/IMG_8763.webp" alt="이번에 사게된 메시지 성경" style="width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);">
    <div style="font-size: 0.86rem; color: #64748b; margin-top: 8px; text-align: center;">아내가 읽을 메시지성경 전권</div>
  </div>

  <!-- 쿠팡 카드 -->
  <div id="sk-coupang-product-card-wrapper" style="max-width: 100%; margin: 2.5rem auto; font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', Roboto, 'Noto Sans KR', sans-serif; box-sizing: border-box; color: #1e293b;">
    <div class="sk-product-card" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: clamp(16px, 4vw, 24px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04); box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
      <div class="sk-card-top-bar" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="sk-badge" style="display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 9999px; font-size: 12px; font-weight: 700; color: #dc2626;">
            <svg style="width: 13px; height: 13px; stroke-width: 1.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>
            <span>추천 통독 성경</span>
          </span>
          <span style="font-size: 12px; color: #64748b; font-weight: 500;">도서/음반 &gt; 신학/성경</span>
        </div>
        <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">쿠팡 파트너스 추천 상품</span>
      </div>

  <div class="sk-product-body" style="display: flex; flex-wrap: wrap; align-items: center; gap: clamp(16px, 3.5vw, 28px); box-sizing: border-box;">
        <div class="decoration" style="flex: 0 0 auto; margin: 0 auto; display: flex; align-items: center; justify-content: center; pointer-events: none; user-select: none;">
          <div style="width: clamp(160px, 32vw, 200px); height: clamp(200px, 40vw, 250px); border-radius: 14px; overflow: hidden; border: 1px solid #f1f5f9; background-color: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); box-sizing: border-box; padding: 8px;">
            <img src="https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2025/11/19/10/3/085b1268-78a6-4131-99a9-233e05d87a5a.jpg" alt="메시지 365 통독성경 세트 전 12권" style="display: block; width: 100%; height: 100%; object-fit: contain; pointer-events: none;" />
          </div>
        </div>

  <div class="sk-product-info" style="flex: 1 1 280px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px; box-sizing: border-box;">
          <div>
            <h3 style="margin: 0 0 6px 0; font-size: clamp(17px, 3.8vw, 21px); font-weight: 800; color: #0f172a; line-height: 1.4; word-break: keep-all;">메시지 365 통독성경 세트 (전 12권)</h3>
            <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #64748b;">유진 피터슨 지음 <span style="display: inline-block; margin: 0 4px; color: #cbd5e1;">|</span> 복있는사람</p>
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 12px;">
              <div style="display: flex; color: #f59e0b;">
                <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <span style="font-size: 12px; color: #2563eb; font-weight: 600;">12개 상품평</span>
            </div>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; margin-bottom: 14px;">
              <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 2px;">
                <span style="font-size: 14px; font-weight: 700; color: #dc2626;">10%</span>
                <span style="font-size: 13px; color: #94a3b8; text-decoration: line-through;">110,000원</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-size: clamp(20px, 4.5vw, 24px); font-weight: 900; color: #b91c1c; letter-spacing: -0.02em;">99,000<span style="font-size: 16px; font-weight: 700;">원</span></span>
                <span style="display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; background-color: #0074e9; color: #ffffff; border-radius: 4px; font-size: 11px; font-weight: 800; font-style: italic;">로켓배송</span>
                <span style="font-size: 11px; color: #059669; font-weight: 700; background-color: #ecfdf5; padding: 2px 6px; border-radius: 4px;">무료배송</span>
              </div>
            </div>
          </div>
          <a href="https://link.coupang.com/a/gr750Admiy" target="_blank" rel="noopener noreferrer" class="sk-cta-btn sk-interactive-btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; min-height: 48px; padding: 12px 20px; background-color: #0074e9; color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 800; box-shadow: 0 4px 14px rgba(0, 116, 233, 0.3); box-sizing: border-box;">
            <span>쿠팡에서 최저가로 구매하기</span>
            <svg style="width: 18px; height: 18px; stroke-width: 1.8; vertical-align: -2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </div>
      </div>

  <div class="sk-notice-area" style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
        <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
      </div>
    </div>
  </div>

  <p class="sk-p sk-fade" style="margin: 0 0 20px; font-size: 1.05rem; color: #1e293b; line-height: 1.85;">
    한편 아내는 현대어의 감각을 살린 <mark style="background: linear-gradient(120deg, rgba(186, 230, 253, 0.5) 0%, rgba(186, 230, 253, 0.85) 100%); padding: 2px 6px; border-radius: 4px; color: inherit; font-weight: 600;">메시지 성경 1년 통독 분량본</mark>을 선택했다. 맥체인 방식의 입체적인 분할 읽기 대신 메시지 성경의 유려한 문맥을 따라가는 방식을 선호하여 책을 구매해 함께 통독을 시작했다. 서로 사용하는 번역본과 시스템은 다르지만 매일의 성경 완독을 향해 같은 걸음을 걷고 있다.
  </p>



<script>
(() => {
  // 성경 데이터 목업
  const bibleData = {
    gen: {
      title: "창세기 24장",
      shortTitle: "창 24",
      verses: [
        { no: 1, gae: "아브라함이 나이가 많아 늙었고 여호와께서 그에게 범사에 복을 주셨더라", sae: "아브라함은 이제 나이가 많은 노인이 되었습니다. 주님께서는 아브라함이 하는 일마다 복을 주셨습니다." },
        { no: 2, gae: "아브라함이 자기 집 모든 소유를 맡은 늙은 종에게 이르되 청하건대 내 허벅지 밑에 네 손을 넣으라", sae: "아브라함이 자기 집안의 모든 재산을 관리하는 늙은 종에게 말했습니다. \"너의 손을 내 허벅지 사이에 넣어라.\"" },
        { no: 3, gae: "내가 너에게 하늘의 하나님, 땅의 하나님이신 여호와를 가리켜 맹세하게 하노니 너는 내가 거주하는 이 지방 가나안 족속의 딸 중에서 내 아들을 위하여 아내를 택하지 말고", sae: "\"하늘의 하나님이시며 땅의 하나님이신 주님의 이름으로 맹세하여라. 내가 살고 있는 이곳 가나안 사람의 딸들 가운데서 내 아들의 아내를 찾지 마라.\"" }
      ]
    },
    ezr: {
      title: "에스라 4장",
      shortTitle: "스 4",
      verses: [
        { no: 1, gae: "사로잡혔던 자들의 자손이 이스라엘의 하나님 여호와의 성전을 건축한다 함을 유다와 베냐민의 대적이 듣고", sae: "포로 생활에서 돌아온 사람들이 이스라엘의 하나님이신 주님의 성전을 짓는다는 소식이 유다와 베냐민의 원수들에게 들어갔습니다." },
        { no: 2, gae: "스룹바벨과 족장들에게 나아와 이르되 우리도 너희와 함께 건축하게 하라", sae: "그들이 스룹바벨과 족장들에게 와서 말했습니다. \"우리도 함께 성전을 짓게 해주십시오.\"" }
      ]
    },
    mat: {
      title: "마태복음 23장",
      shortTitle: "마 23",
      verses: [
        { no: 1, gae: "이에 예수께서 무리와 제자들에게 말씀하여 이르시되", sae: "그 때에 예수께서 무리와 제자들에게 말씀하셨습니다." },
        { no: 2, gae: "서기관들과 바리새인들이 모세의 자리에 앉았으니", sae: "\"율법학자들과 바리새파 사람들은 모세의 자리에 앉아 있다.\"" },
        { no: 3, gae: "그러므로 무엇이든지 그들이 말하는 바는 행하고 지키되 그들이 하는 행위는 본받지 말라 그들은 말만 하고 행하지 아니하며", sae: "\"그러므로 그들이 너희에게 말하는 것은 무엇이든 다 행하고 지켜라. 그러나 그들의 행동은 본받지 마라. 그들은 말만 하고 행하지는 않는다.\"" }
      ]
    },
    act: {
      title: "사도행전 23장",
      shortTitle: "행 23",
      verses: [
        { no: 1, gae: "바울이 공회를 주목하여 이르되 여러분 형제들아 오늘까지 나는 범사에 양심을 따라 하나님을 섬겼노라 하거늘", sae: "바울이 공회원들을 똑바로 쳐다보고 말했습니다. \"형제 여러분, 나는 오늘까지 하나님 앞에서 온전한 양심으로 살아왔습니다.\"" },
        { no: 2, gae: "대제사장 아나니아가 바울 곁에 서 있는 사람들에게 그 입을 치라 명하니", sae: "그러자 대제사장 아나니아가 바울 곁에 서 있던 사람들에게 그의 입을 치라고 명령했습니다." }
      ]
    }
  };

  const chapterKeys = ["gen", "ezr", "mat", "act"];
  let currentKey = "gen";
  let currentVer = "gae";
  let currentFont = "myeongjo";
  let currentFontSize = 13.5;
  let isDarkMode = false;

  const initInteractive = () => {
    // 1. 스크롤 페이드 인터랙션
    const elements = document.querySelectorAll('.sk-fade');
    if (elements.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
      });
    }

    // 2. 연간 통독 진행률 프로그레스 바 애니메이션
    const fillEl = document.getElementById('sk-progress-fill');
    const percentEl = document.getElementById('sk-progress-percent');
    if (fillEl && percentEl) {
      const targetPercent = 64.4;
      setTimeout(() => {
        fillEl.style.width = targetPercent + '%';
        let count = 0;
        const interval = setInterval(() => {
          count += 1;
          if (count >= targetPercent) {
            percentEl.innerText = targetPercent + '%';
            clearInterval(interval);
          } else {
            percentEl.innerText = count + '%';
          }
        }, 15);
      }, 300);
    }

    // 3. 모바일 리더기 본문 렌더 함수
    const renderVerseContent = () => {
      const container = document.getElementById('sk-verse-body');
      const titleEl = document.getElementById('sk-current-chapter-title');
      if (!container || !bibleData[currentKey]) return;

      const data = bibleData[currentKey];
      if (titleEl) titleEl.innerText = data.title;

      let html = '';
      data.verses.forEach((v) => {
        if (currentVer === 'gae') {
          html += `
            <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 8px;">
              <span style="font-weight: 800; color: #2563eb; font-size: 12px; width: 18px; min-width: 18px; text-align: right; flex-shrink: 0; padding-top: 1px;">${v.no}</span>
              <span style="flex: 1; letter-spacing: -0.02em;">${v.gae}</span>
            </div>`;
        } else if (currentVer === 'sae') {
          html += `
            <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 8px;">
              <span style="font-weight: 800; color: #0284c7; font-size: 12px; width: 18px; min-width: 18px; text-align: right; flex-shrink: 0; padding-top: 1px;">${v.no}</span>
              <span style="flex: 1; letter-spacing: -0.02em;">${v.sae}</span>
            </div>`;
        } else {
          html += `
            <div style="margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px dashed ${isDarkMode ? '#334155' : '#f1f5f9'};">
              <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 3px;">
                <span style="font-weight: 800; color: #2563eb; font-size: 12px; width: 18px; min-width: 18px; text-align: right; flex-shrink: 0;">${v.no}</span>
                <span style="flex: 1; letter-spacing: -0.02em;">${v.gae}</span>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 6px; padding-left: 24px; font-size: 0.9em; opacity: 0.85; color: ${isDarkMode ? '#94a3b8' : '#475569'};">
                <span style="flex: 1; letter-spacing: -0.02em;">${v.sae}</span>
              </div>
            </div>`;
        }
      });
      container.innerHTML = html;
      container.style.fontSize = currentFontSize + 'px';
      container.style.fontFamily = currentFont === 'myeongjo' 
        ? "'Noto Serif KR', 'Nanum Myeongjo', 'Batang', serif" 
        : "-apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', sans-serif";
    };

    // 4. 장 전환 업데이트
    const updateActiveChapterUI = (key) => {
      currentKey = key;
      // 2x2 장 버튼 활성화 상태 변경
      document.querySelectorAll('.sk-chap-btn').forEach(btn => {
        const k = btn.getAttribute('data-chap');
        if (k === key) {
          btn.style.backgroundColor = '#2563eb';
          btn.style.color = '#ffffff';
          btn.style.border = 'none';
          btn.style.boxShadow = '0 2px 6px rgba(37, 99, 235, 0.25)';
        } else {
          btn.style.backgroundColor = isDarkMode ? '#1e293b' : '#f8fafc';
          btn.style.color = isDarkMode ? '#cbd5e1' : '#334155';
          btn.style.border = isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0';
          btn.style.boxShadow = 'none';
        }
      });

      // 하단 퀵 칩 상태 변경
      document.querySelectorAll('.sk-quick-chip').forEach(chip => {
        const k = chip.getAttribute('data-chap');
        if (k === key) {
          chip.style.backgroundColor = '#2563eb';
          chip.style.color = '#ffffff';
          chip.style.border = 'none';
        } else {
          chip.style.backgroundColor = isDarkMode ? '#1e293b' : '#f1f5f9';
          chip.style.color = isDarkMode ? '#94a3b8' : '#475569';
          chip.style.border = isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0';
        }
      });

      renderVerseContent();
    };

    // 장 클릭 이벤트 바인딩
    document.querySelectorAll('.sk-chap-btn, .sk-quick-chip').forEach(btn => {
      btn.onclick = () => updateActiveChapterUI(btn.getAttribute('data-chap'));
    });

    // 이전/다음 장 내비게이션
    const navPrevBtn = document.getElementById('sk-nav-prev-btn');
    const navNextBtn = document.getElementById('sk-nav-next-btn');
    if (navPrevBtn) {
      navPrevBtn.onclick = () => {
        const idx = chapterKeys.indexOf(currentKey);
        const nextIdx = (idx - 1 + chapterKeys.length) % chapterKeys.length;
        updateActiveChapterUI(chapterKeys[nextIdx]);
      };
    }
    if (navNextBtn) {
      navNextBtn.onclick = () => {
        const idx = chapterKeys.indexOf(currentKey);
        const nextIdx = (idx + 1) % chapterKeys.length;
        updateActiveChapterUI(chapterKeys[nextIdx]);
      };
    }

    // 번역본 토글 이벤트
    document.querySelectorAll('.sk-ver-btn').forEach(btn => {
      btn.onclick = () => {
        currentVer = btn.getAttribute('data-ver');
        document.querySelectorAll('.sk-ver-btn').forEach(b => {
          if (b === btn) {
            b.style.backgroundColor = '#2563eb';
            b.style.color = '#ffffff';
            b.style.fontWeight = '700';
          } else {
            b.style.backgroundColor = 'transparent';
            b.style.color = isDarkMode ? '#94a3b8' : '#64748b';
            b.style.fontWeight = '600';
          }
        });
        renderVerseContent();
      };
    });

    // 폰트 설정 버튼
    const fontFamBtn = document.getElementById('sk-font-family-btn');
    if (fontFamBtn) {
      fontFamBtn.onclick = () => {
        currentFont = currentFont === 'myeongjo' ? 'gothic' : 'myeongjo';
        fontFamBtn.innerText = currentFont === 'myeongjo' ? '명조체' : '고딕체';
        renderVerseContent();
      };
    }

    const fontIncBtn = document.getElementById('sk-font-inc-btn');
    if (fontIncBtn) {
      fontIncBtn.onclick = () => {
        if (currentFontSize < 18) currentFontSize += 1;
        renderVerseContent();
      };
    }

    const fontDecBtn = document.getElementById('sk-font-dec-btn');
    if (fontDecBtn) {
      fontDecBtn.onclick = () => {
        if (currentFontSize > 11) currentFontSize -= 1;
        renderVerseContent();
      };
    }

    // 다크모드 토글
    const darkToggleBtn = document.getElementById('sk-dark-toggle');
    if (darkToggleBtn) {
      darkToggleBtn.onclick = () => {
        isDarkMode = !isDarkMode;
        const frame = document.getElementById('sk-phone-frame');
        const status = document.getElementById('sk-phone-status');
        const bar = document.getElementById('sk-phone-bar');
        const cardTop = document.getElementById('sk-reader-card-top');
        const cardBody = document.getElementById('sk-reader-card-body');
        const appTitle = document.getElementById('sk-app-title');
        const verseBody = document.getElementById('sk-verse-body');
        const chapTitle = document.getElementById('sk-current-chapter-title');

        if (isDarkMode) {
          frame.style.backgroundColor = '#0f172a';
          status.style.backgroundColor = '#0f172a';
          status.style.color = '#f8fafc';
          bar.style.backgroundColor = '#0f172a';
          cardTop.style.backgroundColor = '#1e293b';
          cardTop.style.borderColor = '#334155';
          cardBody.style.backgroundColor = '#1e293b';
          cardBody.style.borderColor = '#334155';
          appTitle.style.color = '#f8fafc';
          chapTitle.style.color = '#f8fafc';
          verseBody.style.color = '#e2e8f0';
          darkToggleBtn.style.backgroundColor = '#334155';
          darkToggleBtn.style.color = '#f8fafc';
          darkToggleBtn.style.borderColor = '#475569';
        } else {
          frame.style.backgroundColor = '#f8fafc';
          status.style.backgroundColor = '#f8fafc';
          status.style.color = '#0f172a';
          bar.style.backgroundColor = '#f8fafc';
          cardTop.style.backgroundColor = '#ffffff';
          cardTop.style.borderColor = '#e2e8f0';
          cardBody.style.backgroundColor = '#ffffff';
          cardBody.style.borderColor = '#e2e8f0';
          appTitle.style.color = '#0f172a';
          chapTitle.style.color = '#0f172a';
          verseBody.style.color = '#1e293b';
          darkToggleBtn.style.backgroundColor = '#ffffff';
          darkToggleBtn.style.color = '#475569';
          darkToggleBtn.style.borderColor = '#cbd5e1';
        }
        updateActiveChapterUI(currentKey);
      };
    }

    // 초기 렌더링 실행
    renderVerseContent();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractive);
  } else {
    initInteractive();
  }
  document.addEventListener('astro:page-load', initInteractive);
})();
</script>