# Next World

### 실무에서 많이 사용하는 기술 스택을 학습하기 위해 기존에 경험하지 못한 기술을 사용하여 블로그를 구현했습니다.

## 프로젝트 목표

### Next.js 13 App Router의 사용법을 익히고 SSR 이해하기

### Vanilla Extract의 사용법을 익히고 제로 런타임 이해하기

### React Query의 사용법을 익히고 효율적인 데이터 패칭을 구현하기

### Zustand의 사용법을 익히고 Flux 패턴 이해하기

## Stacks

### Environment

<div style="display: flex">
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
</div>

### Config

<img src="https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Development

<div style="display: flex">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Next-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Vanilla Extract-DB7093?style=for-the-badge&logo=vanilla extract&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-3578E5?style=for-the-badge&logo=Zustand&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
</div>

## 페이지 구성

### 메인 페이지 (Article 목록)

### Article 상세 페이지

### 로그인 페이지

### 회원가입 페이지

### 설정 페이지

### 글쓰기 페이지

### 프로필 페이지

## What I Did

- Real World에서 지원하는 API를 사용해 블로그 구현
- 컴포넌트 단위 Skeleton UI를 사용해 Streaming 구현
- Optimistic Updates 활용한 좋아요 & 팔로우 버튼 구현
- 전역 상태 관리로 효율적인 Modal 컴포넌트 구현
- Route Handler를 Proxy처럼 사용해 보안 강화

## Will Update

- Route Handler Response 일관성 있게 통일하기
- Error Message에 따라 알맞은 에러 처리
- 반응형 UI 적용
- 테스트 코드 작성
- 아토믹 디자인 시스템 구현

## Trouble Shooting

로그인을 하고 데이터를 저장하는 부분에서 XSS, CSRF, MITM 등 다양한 보안적인 위험이 있다는 것을 확인했습니다. Next
World는 Server Engineer가 없는 개인 프로젝트였기 때문에 현재 상황에서 적용할 수 있는 조치를 하고자 했습니다.

- 로그인 했을 때 반환 받은 유저 정보는 localStorage에 token은 cookies에 저장했습니다.
- MITM를 방지하기 위해 Secure 속성을 사용했습니다.
- XSS 공격을 방지하기 위해 HttpOnly 속성을 사용했습니다.
- CSRF 공격을 방지하기 위해 SameSite 속성을 사용했습니다.
- 하지만 HttpOnly 속성으로 인해 cookies를 클라이언트에서 접근할 수 없는 문제가 생겼습니다.
- 이러한 문제를 해결하고자 route.ts 파일을 proxy처럼 사용해 api를 호출할 때 token 값을 넣어주는 방식을 사용했습니다.
