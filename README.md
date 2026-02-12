# NaviK Frontend

> AI 기반 커리어 성장 추적 플랫폼 'NaviK'의 프론트엔드 레포지토리입니다!

# ✨ 프로젝트 소개

**NaviK**은 주니어 개발자가 자신의 성장을 체계적으로 기록하고, AI를 활용해 역량을 분석받으며, 맞춤형 채용 공고와 스터디를 추천받을 수 있는 커리어 성장 플랫폼입니다.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ca0c0d6c-2fd0-4bed-bb96-85fbb1d3ee0c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/464a4abd-89f3-41d8-9279-ddcc164492b2" />


<p align="center">
  <a href="https://www.navik.kr">
    🚀 서비스 바로가기
  </a>
</p>

## 🧭 이런 분에게 NaviK을 추천해요!

- "기록은 많은데 저의 역량이 무엇인지 모르겠어요!"
- "나에게 어울리는 채용공고를 찾고싶어요!"
- "나의 위치를 객관적으로 확인하고 싶어요!"
- "커리어의 나침반이 필요해요!"

## 🔍 Why?

- 성장 기록이 파편화되어 있어 본인의 역량 변화를 파악하기 어렵습니다.
- 직무별 핵심 역량(KPI)과 내 현재 수준의 갭을 객관적으로 파악할 수 없는 어려움이 있습니다.
- 채용 공고·스터디를 직접 찾아야 해서 시간이 많이 듭니다.

## 🔍 What?

- 성장 로그를 작성하면 AI가 직무 KPI 기준으로 평가해 점수를 매겨 객관적인 나의 위치를 확인할 수 있습니다.
- 포트폴리오를 업로드하면 AI 분석을 통해 내가 가진 강점·약점을 확인할 수 있습니다.
- 벡터 의미 유사도 기반으로 내 역량에 맞는 채용 공고·스터디를 자동 추천해드립니다.

# 📚 목차

- [프로젝트 구조](#-프로젝트-구조)
- [기술 스택 및 도입 이유](#-기술-스택-및-도입-이유)
- [주요 기능 소개](#-주요-기능-소개)
- [배포 과정](#-배포-과정)
- [팀원 구성](#-팀원-구성)

## 📊 프로젝트 구조
```
📦src
 ┣ 📂apis               # API 통신 레이어
 ┣ 📂assets             # 정적 리소스
 ┣ 📂components         # 재사용 가능한 컴포넌트
 ┣ 📂constants          # 상수 및 설정값
 ┣ 📂hooks              # 커스텀 훅
 ┣ 📂layouts            # 페이지 레이아웃
 ┣ 📂pages              # 페이지 컴포넌트
 ┣ 📂routes             # 라우팅 설정
 ┣ 📂stores             # 상태 관리 (Zustand)
 ┣ 📂types              # TypeScript 타입 정의
 ┣ 📂utils              # 유틸리티 함수
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts
```

## 📍 라우팅 구조

```
📦 Routes
 ┣ 📂 /home                          # 홈 화면
 ┣ 📂 /notice                        # 알림 목록
 ┃
 ┣ 📂 /setup                         # 초기 설정 (1회)
 ┃  ┣ 📄 /job                        # 직무 선택
 ┃  ┣ 📄 /category                   # 관심 카테고리 선택
 ┃  ┗ 📄 /category/:id               # 카테고리 세부 설정
 ┃
 ┣ 📂 /job
 ┃  ┗ 📄 /result                     # 맞춤 채용 공고 결과
 ┃
 ┣ 📂 /report                        # 역량 리포트 메인
 ┃  ┣ 📄 /mycard                     # 내 카드 (보유 역량)
 ┃  ┣ 📂 /core                       # 핵심 KPI (강점)
 ┃  ┃  ┗ 📄 /detail                  # 강점 상세 + 추천 공고
 ┃  ┣ 📂 /overcoming                 # 보완 KPI (약점)
 ┃  ┃  ┗ 📄 /detail                  # 약점 상세 + 학습 가이드
 ┃  ┗ 📂 /growth                     # 성장 로그
 ┃     ┣ 📄 /write                   # 성장 기록 작성
 ┃     ┗ 📄 /timeline                # 성장 타임라인
 ┃
 ┣ 📂 /goals                         # 목표 관리
 ┃  ┣ 📄 /modify                     # 목표 수정
 ┃  ┗ 📄 /add                        # 목표 추가
 ┃
 ┣ 📂 /social                        # 소셜 메인
 ┃  ┣ 📂 /study                      # 스터디
 ┃  ┃  ┣ 📄 /recommend               # 추천 스터디
 ┃  ┃  ┣ 📄 /new                     # 스터디 생성
 ┃  ┃  ┣ 📄 /:studyId/evaluation     # 스터디 평가
 ┃  ┃  ┗ 📂 /my                      # 내 스터디
 ┃  ┃     ┣ 📄 /participate          # 참여 중인 스터디
 ┃  ┃     ┗ 📄 /operate              # 운영 중인 스터디
 ┃  ┣ 📂 /board                      # 커뮤니티 게시판
 ┃  ┃  ┣ 📄 /new                     # 게시글 작성
 ┃  ┃  ┣ 📄 /:boardId                # 게시글 상세
 ┃  ┃  ┗ 📄 /:boardId/edit           # 게시글 수정
 ┃  ┗ 📂 /evaluation                 # 동료 평가
 ┃     ┗ 📄 /my                      # 받은 평가
 ┃
 ┗ 📂 /mypage                        # 마이페이지
    ┣ 📄 /edit                       # 프로필 수정
    ┣ 📄 /setting                    # 설정
    ┗ 📄 /recommend                  # 추천 공고 목록
```


## 🛠 기술 스택 및 도입 이유

### Core Framework

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| Language | TypeScript | 타입 안정성을 통한 런타임 오류 사전 방지 및 개발 생산성 향상 |
| Framework | React 19 | 컴포넌트 기반 아키텍처로 재사용성 확보, 최신 기능 활용한 성능 최적화 |
| Build Tool | Vite 7 | esbuild 기반 빠른 개발 서버 구동, 네이티브 ESM 지원으로 빌드 성능 향상 |
| Compiler | SWC | Babel 대비 20배 빠른 컴파일 속도로 개발 경험 개선 |

### State Management

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| Client State | Zustand 5 | Redux 대비 보일러플레이트 최소화, 복잡한 워크플로우(포트폴리오 제출, 인증) 상태 관리에 적합 |
| Server State | TanStack Query 5 | 서버/클라이언트 상태 분리, 자동 캐싱·재검증으로 UX 개선, Polling을 통한 AI 분석 진행 상태 실시간 추적 |

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| Router | React Router 7 | SPA 환경 선언적 라우팅, 중첩 라우팅으로 복잡한 페이지 구조 관리, Lazy Loading 코드 스플리팅 지원 |

### Styling & Animation

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| CSS Framework | Tailwind CSS 4 | 유틸리티 우선 접근으로 빠른 스타일링, 모바일 우선 반응형 디자인, Purge CSS로 번들 크기 최소화 |
| Animation | Framer Motion 12 | GPU 가속 transform 애니메이션으로 60fps 유지, 복잡한 애니메이션 시퀀스 구현(스플래시, 3D 플립 카드) |
| Lottie | Lottie React 2 | 벡터 기반 애니메이션으로 해상도 독립적, JSON 형식으로 파일 크기 최소화 |
| Charts | Recharts 3 | React 기반으로 컴포넌트 통합 용이, KPI 분석 결과 시각화(레이더 차트, 바 차트) |

### UI Components

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| Carousel | Swiper 12 | 모바일 터치 제스처 최적화, 강점/약점 카드 탐색 UI 구현 |
| Calendar | React Day Picker 9 | 가벼운 번들 크기, 접근성 지원, 날짜 선택 UI 커스터마이징 용이 |

### HTTP Client

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| HTTP Client | Axios 1 | 인터셉터를 통한 JWT 토큰 자동 주입 및 갱신, 요청/응답 에러 핸들링 중앙화 |

| Category | Stack | 도입 이유 |
|----------|-------|----------|
| Package Manager | pnpm | npm/yarn 대비 디스크 공간 절약, 설치 속도 향상, 엄격한 의존성 관리로 유령 의존성 방지 |
| Code Quality | ESLint + Prettier | 일관된 코드 스타일 유지, React Hooks 규칙 자동 검증, 팀 협업 시 코드 리뷰 부담 경감 |
| Icons | Iconify | 단일 패키지로 다양한 아이콘 세트 사용, 온디맨드 로딩으로 번들 크기 최소화 |


## ✨ 주요 기능 소개

| 기능           | 설명                                                                                   |
|--------------|--------------------------------------------------------------------------------------|
| **성장 로그**    | 활동·학습·성과를 기록하고 AI 평가(비동기 Worker)를 받아 KPI 점수에 반영 (Text, PDF, Notion, Github PR 분석 지원) |
| **포트폴리오 분석** | PDF/텍스트 포트폴리오 업로드 → AI 분석 → 강점·약점 리포트                                                |
| **KPI 카드**   | 직무별 핵심 역량 카드와 레이더 차트로 내 역량 시각화                                                       |
| **채용 공고 추천** | pgvector 기반 의미 유사도로 내 역량에 맞는 채용 공고 자동 매칭                                             |
| **스터디**      | 스터디 생성·참여·동료 평가, KPI 유사도 기반 스터디 추천                                                   |
| **커뮤니티**     | 직무별 게시판, 댓글, 좋아요, 인기글 랭킹                                                             |
| **소셜 로그인**   | Google · Kakao · Naver OAuth2 지원                                                     |



## 🚀 배포 과정

GitHub Actions를 통해 자동 배포됩니다.

| 워크플로 | 트리거 | 동작 |
|---------|--------|------|
| `deploy-check.yml` | `develop` 브랜치 PR | 테스트 실행 + 빌드 검증 |
| `auto-merge-main.yml` | `develop` 브랜치 PR 머지 | `main` 브랜치 자동 병합 → Vercel 배포 |

`develop` 브랜치에 PR이 머지되면 자동으로 `main` 브랜치로 병합되고, Vercel을 통해 프로덕션 환경에 배포됩니다.

## 👥 팀원 구성

| <img src="https://avatars.githubusercontent.com/u/105573067?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/126754457?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/165000505?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/202471958?v=4" width="150" height="150"/> |
|:-------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|
|                    @sunhwaaRj<br/>[GitHub](https://github.com/sunhwaaRj)                    |                   @qkrdmsthff<br/>[GitHub](https://github.com/qkrdmsthff)                    |                    @chxxwn04<br/>[GitHub](https://github.com/chxxwn04)                     |                   @dongyeol02<br/>[GitHub](https://github.com/dongyeol02)                   |
|          <small>• 로그인 및 인증 처리<br/>• 온보딩 플로우 구현<br/>• 홈 화면 구현</small>          |      <small>• 리포트 메인 페이지<br/>• 성장 로그 페이지<br/>• 목표 설정 페이지 구현</small>       |                    <small>• 커뮤니티 게시판<br/>• 스터디 관리<br/>• 동료 평가 기능</small>                    |      <small>• 추천공고 및 맞춤공고<br/>• 마이페이지 화면<br/>• 스터디원 평가 페이지</small>       ||
## Support

- Issues: [GitHub Issues](https://github.com/UMC9th-NaviK/NaviK-FE/issues)
- Organization: [UMC 9th - NaviK Team](https://github.com/UMC9th-NaviK)

