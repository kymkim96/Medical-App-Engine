# Medical-App-Engine

## 요구사항
* node.js
## 설치
 ### <code>.env</code> 파일 생성
 <code>.env.sample</code> 파일을 복제해 <code>.env</code> 파일을 생성합니다.   
 <code>PORT</code> : API 서버가 동작하는 포트 번호입니다.   
 <code>COOKIE_SECRET</code> : 클라이언트와 주고 받는 쿠키의 서명입니다.   
 <code>username</code> : mysql 데이터베이스 계정입니다. 기본은 root로 지정해주세요.   
  <code>password</code> : mysql 데이터베이스 계정 비밀번호를 입력해주세요.   
  <code>database</code> : mysql 데이터베이스 이름을 입력해주세요.
 ### NPM 패키지 설치
 <pre>npm i</pre>
 ### <code>config.js</code> 설정
 <code>username</code> : mysql 데이터베이스 계정입니다. 기본은 root로 지정해주세요.   
 <code>password</code> : mysql 데이터베이스 계정 비밀번호를 입력해주세요.   
 <code>database</code> : mysql 데이터베이스 이름을 입력해주세요.      
## 데이터베이스 설정
 ### Model 마이그레이션
 <code>npm run migrate</code> : 최신 마이그레이션을 실행합니다. 데이터베이스를 수정하려면 이 커맨드를 먼저 실행합니다.   
 <code>npm run migrate:rollback</code> : 최신 마이그레이션을 롤백합니다. 위 커맨드를 실행한 뒤 
 이 커맨드를 실행하면 모든 테이블을 <code>drop</code> 합니다.   
 마이그레이션은 drop-tables 파일 하나만 사용하도록 합니다.   
 <code>npm run seed</code> : 시드 파일을 실행합니다. DB 테이블에 내용들을 초기화해줍니다.
## 실행
 <code>npm start</code> 명령과 <code>npm run dev</code> 으로 서버를 실행할 수 있습니다.   
 <code>npm start</code> 는 프로덕션 상황에서 사용하고 코드 변경에 반응하지 않습니다.   
 개발중엔 <code>dev</code> 를 사용하는 것이 편리합니다.   
 
