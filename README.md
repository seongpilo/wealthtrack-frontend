# 📊 WealthTrack Pro (웰스트랙 프로)

> **토스증권 실시간 금융망 연동 및 모바일 하이브리드 UX 기반 고성능 자산 관리 대시보드**

본 프로젝트는 토스증권(Toss Invest)의 공식 Open API와 글로벌 외환 Open API를 다중 연동(Multi-API Architecture)하여, 소수점 단위의 오차도 허용하지 않는 실시간 주식 잔고 및 예수금, 실시간 환율 기반 자산 연산 기능을 제공하는 프로페셔널 자산 관리 플랫폼입니다.

---

## ✨ 핵심 핵심 기능 (Key Features)

### 1. 📊 모바일 앱 기반 하이브리드 UX/UI (Dashboard)
- 데스크톱과 모바일 환경을 모두 저격한 **글래스모피즘 상단바 및 모바일 하이브리드 하단 앱 바(Bottom Navigation)** 시스템 탑재.
- 노션 및 토스 감성의 **컴포넌트 카드 피드 레이아웃**으로 가독성 극대화.
- \ramer-motion\을 활용한 미세한 인터랙션 및 부드러운 애니메이션 레이어 구현.

### 2. 📝 Zero-Click 투자 복기 일지 (Journal)
- 촌스러운 테이블(표) 구조를 완전히 탈피한 **노션/트위터 스타일의 타임라인 카드 피드**.
- 수정 버튼 없이 입력 후 바깥을 클릭하면 실시간 초단위 타임스탬프와 함께 적층되는 **댓글형 메모 관리 시스템**.
- 브라우저 로컬 스토리지(\LocalStorage\) 연계형 영구 저장 아키텍처.
- 복기용 차트 캡처본을 즉시 업로드하고 바인딩할 수 있는 **이미지 렌더링 엔진** 장착.

### 3. 🔄 격리된 자산 연동 제어 센터 (Sync)
- 애플리케이션의 핵심 로직과 UI가 뒤엉키지 않도록 아키텍처 독립 분리 완료.
- 토스증권 라이브 엔드포인트 게이트웨이 보안 키 관리 및 실시간 동기화 상태 컨트롤러 배치.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Data Visualization:** Recharts, Lightweight SVG Engine
- **Backend Bridge:** Next.js Route Handlers (Edge Node Fetch Platform)
- **API Architecture:** Hybrid Multi-API Network (Toss OpenAPI OAuth 2.0 + Global Forex API)

---

## 🚀 시작하기 (Getting Started)

\\\ash
# 의존성 라이브러리 설치
npm install

# 로컬 개발 서버 기동
npm run dev
\\\

---
*WealthTrack Pro © 2026 — 스마트한 자산 관리의 시작.*
