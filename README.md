# 🧩ECR (공포 방탈출 예약과 정보를 효율적으로 관리할 수 있는 통합 서비스)

## 프로젝트 소개
<ul>
  <li>포털 사이트 구축과 사용자의 편의성 증대</li>
  <li>한 화면에서 다양한 데이터를 볼 수 있도록 통합정보시스템 구축</li>
  <li>오픈소스 및 오픈 API를 활용한 플랫폼 구성</li>
  <li>통합 예약 시스템으로 빠르고 보기 쉽게 예약 가능</li>
</ul>

### ⭐ 팀장: 현민환 | 팀원 : 박혜연 , 김광훈 , 유병수 , 김승욱 |

### 담당 기능
<ul>
  <li>로그인(로그인,아이디찾기,비밀번호찾기)</li>
  <li>테마리스트</li>
  <li>테마디테일(리뷰,지도,이미지)</li>
  <li>관계자 테마관리(등록/수정/삭제)</li>
  <li>관리자 테마관리(삭제)</li>
</ul>

# 🚀 Stacks
<div> 
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle DB">
</div>
<div> 
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java">   <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=jpa&logoColor=white" alt="JPA"> </div>
<div> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap"> 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML"> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"> </div>
<div> 
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
  <img src="https://img.shields.io/badge/SQL%20Developer-4479A1?style=for-the-badge&logo=oracle&logoColor=white" alt="SQL Developer">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"> 
</div>
<div> 
  <img src="https://img.shields.io/badge/Naver%20Maps%20API-03C75A?style=for-the-badge&logo=naver&logoColor=white" alt="Naver Maps API"> 
  <img src="https://img.shields.io/badge/Naver%20Geocoding%20API-03C75A?style=for-the-badge&logo=naver&logoColor=white" alt="Naver Geocoding API"> 
  <img src="https://img.shields.io/badge/kakao address API-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=black"> 
</div>
---

# 기능설명
---
### 메인페이지
<img src="https://github.com/user-attachments/assets/06a4c399-3a5b-4a43-a844-5b9949aecb0b" width="400px" height="300px">

### ⭐기능구현
---

### 로그인/아이디찾기/비밀번호찾기 (login.js , FindPwd.js , FindId.js)
### ⭐기능구현
#### 로그인
<ul>
  <li>일반 사용자(1), 관계자(2), 중 선택 (관리자(3)은 아무것도 선택하지 않을시) 하여 로그인</li>
  <li>사용자 입력(memberId, memberPwd)을 받아 API(/api/memberLogin/{loginType}) 호출</li>
  <li>로그인 성공 시 Redux를 통해 사용자 정보 저장 및 홈 화면으로 이동</li>
  <li>Redux 상태를 localStorage에 저장하여 새로고침 시에도 유지</li>
</ul>

#### 아이디찾기/비밀번호찾기
<ul>
  <li>memberName(이름), memberPhone(폰번호), memberEmail(이메일), loginType(선택))을 받아 찾</li>
  <li>정보가 일치할 경우, 사용자의 아이디를 화면에 표시</li>
  <li>비밀번호 찾기 페이지로 이동 버튼 제공</li>
  <li>정보가 일치할 경우, 새 비밀번호 입력 폼 표시</li>
  <li>성공 시 로그인 페이지로 이동</li>
</ul>

---

### 테마리스트
<img src="https://github.com/user-attachments/assets/bf493f1a-bc63-4cf3-8483-c24829b84d0c"  width="400px" height="300px">

### ⭐기능구현
<ul>
  <li>모든 테마 데이터를 API(/api/menu)를 통해 가져와 화면에 표시</li>
  <li>장르, 지역, 난이도, 인원수 필터와 검색어로 테마 목록을 필터링</li>
  <li>테마 이름을 입력해 검색 가능</li>
  <li>초기에는 9개 테마만 표시, "더보기" 버튼 클릭 시 9개씩 추가 로드</li>
  <li>테마 클릭 시 조회수를 증가시키고, 상세 페이지(/detail)로 이동</li>
</ul>

### 테마디테일

### ⭐기능구현
<ul>
  <li>AvgRating 컴포넌트를 사용해 테마의 평균 평점을 표시</li>
  <li>Review 컴포넌트를 통해 해당 테마에 대한 리뷰를 렌더링</li>
  <li>Location 컴포넌트를 사용해 테마의 위치(위도, 경도)를 지도에 표시</li>
  <li></li>
  <li></li>
</ul>
---

### 관계자 테마관리 (등록/수정/삭제)
### ⭐기능구현
--

### 관리자 테마관리 (삭제)
---
