# Calyful Shop
a product for the onboarding process

### TODO
- [x] 최상단 메뉴
- [x] 홈 + 상품 목록 페이지
- [x] 고객 가입 페이지
- [x] 고객 로그인 페이지
- [x] 상품 상세 페이지
- [x] 장바구니 페이지 
- [x] 체크아웃 페이지
- [x] 마이 페이지
- [x] 주문 상세 페이지


## 사용 언어 및 스택

- **React / TypeScript**
- **Next.js** 동적 라우팅, 배포, 서버 사이드 렌더링
- **Emotion** inline CSS in React Component

## 빌드 절차


```sh
$ npm i
$ npm run build
$ npm start
```


## 배포 절차


`main` 브랜치에 merge 되면 자동 배포


## 디렉토리 구조 및 파일 설명

### 디렉터리 구조 트리
```
src
│   logger.ts
│   constant.ts
│   auth.ts
│
└───components
│   │   BaseButton
│   │   ...
│   │
│   
└───context
│   │   UserInfoContext.tsx
│   │
│   
└───hooks
│   │   useFormFields.ts
│   │
│   
└───pages
│   │   
│   │   _app.tsx
│   │   _document.tsx
│   │   index.tsx
│   │   cart.tsx
│   │   ...
│   │
│   └───orders
│   │
│   └───products
│   │
│   └───api
│       │   checkout.ts
│       │   ...
│       │
│       └───cart
│           └─── ...
│       │
│       └───customers
│           └─── ...
│       │
│       └───orders
│           └─── ...
│       │
│       └───product
│           └─── ...
│      
└───public
│       
└───screen
│       
└───types
│       
└───utils
```

### 폴더 및 파일 상세설명

- `screen` 라우팅되는 각 페이지별로 보여줘야할 화면 컴포넌트
- `components` 화면(screen)을 구성하는 UI 요소들의 집합
- `context` props drilling을 방지하기 위해 만드는 context들의 집합
- `hooks` 커스텀 훅들의 집합
- `pages` Next.js에서 제공하는 file system 기반의 라우팅
  - `api` 폴더 구조에 따라 path에 따른 API 라우팅을 처리해줌 
  e.g., `/api/orders/{orderId}`로 통신할 경우 `/api/orders/[id].ts`에 있는 handler로 라우팅
  - `orders` `products` 등의 폴더 역시 file system 기반으로 라우팅됨
  e.g., `/orders/{orderId}`로 화면으로 진입할 경우 `/orders/[id].tsx` 컴포넌트 매핑
  - `_documents.tsx`의 `Main` 컴포넌트와 `_app.tsx`가 매핑되어 렌더링
- `public` 거의 사용하지 않았지만 정적 파일을 보관하기 위해 생성
- `types` 컴포넌트에서 사용할 타입들을 정의 (거의 clayful-api의 response 데이터 interface를 정의해주는 용도로 많이 사용했음)
- `utils` 환경변수 및 각종 유틸 함수 작성
  - `clayful.ts` clayful api를 함수 형태로 사용할 수 있도록 추상화함
  - `cookies.ts` 서버에서 쿠키를 사용하기 위한 유틸 함수들
- `auth.ts` 서버 사용하는 인증 관련 함수들의 집합
- `constant.ts` 소스 코드에서 사용하는 상수들의 집합
- `logger.ts` API 레벨에서 사용하려고 만든 로깅 함수

그 외로
- `.env.example` 환경 변수 파일(`.env`)에서 사용할 변수들 리스트
- `babel.config.js` 바벨 컴파일러에 대한 설정
- `tsconfig.json` 타입스크립트 설정 파일

## 페이지 및 API 구성 (Router)

- `/` 메인 페이지
- `/products` 상품 목록 페이지
- `/products/{productId}` 상품 상세 페이지
- `/orders` 체크 아웃 페이지
- `/orders/{orderId}` 주문 상세 페이지
- `/orders/thanks` 주문 완료 페이지
- `/cart` 장바구니 페이지
- `/login` 로그인 페이지
- `/signup` 회원가입 페이지
- `/me` 마이 페이지
