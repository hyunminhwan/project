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
<ul>
  <li>Fullpage.js를 사용하여 각 섹션을 전체 화면으로 스크롤할 수 있는 사용자 경험</li>
  <li>상위 5개의 인기 테마(평점 기준)를 Axios를 통해 카드 형식으로 표시</li>
  <li>방탈출 테마 이용 시 유의사항(노약자 제한, 촬영 금지, CCTV 녹화, 스포 금지)을 직관적인 아이콘과 텍스트로 안내</li>
  <li>React-Star-Ratings를 사용하여 난이도와 평점 정보를 별점 형태로 시각화합니다.</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 
#### 과정🛠️ :
#### 해결✅ :
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

### 🚨개발 이슈
#### 발견🔍 : 필터 조건을 변경한 후 "더보기" 버튼을 클릭하면 필터링되지 않은 데이터가 추가로 로드되거나, 새 필터 조건이 적용되지 않은 상태에서 이전 데이터를 계속 로드하는 문제가 발생
#### 과정🛠️ : menuList(전체 데이터)와 filterMenuList(필터링된 데이터)를 각각 별도로 관리하면서 두 상태 간의 동기화가 이루어지지 않아 발생하는 문제를 확인
#### 해결✅ : 필터 조건과 검색어 변경 시 menuCount를 초기화하여 필터링된 데이터만 표시되도록 수정.


### 테마디테일

### ⭐기능구현
<ul>
  <li>AvgRating 컴포넌트를 사용해 테마의 평균 평점을 표시</li>
  <li>Review 컴포넌트를 통해 해당 테마에 대한 리뷰를 렌더링</li>
  <li>Location 컴포넌트를 사용해 테마의 위치(위도, 경도)를 지도에 표시</li>
  <li>선택한 테마의 이미지를 상단에 표시하여 시각적 정보를 제공</li>
  <li>로그인한 사용자만 "예약하기" 버튼을 통해 예약 페이지로 이동</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 초기에는 네이버 지도 API만을 사용하여 주소 기반으로 지도를 표시하려 했으나, 주소 데이터를 정확히 지도에 반영하지 못하거나 잘못된 위치를 표시하는 문제가 발생.
#### 과정🛠️ : 지도 API만으로는 주소를 직접 처리할 수 없어, 추가적으로 네이버 좌표 변환 API와 주소 검색 API를 통합적으로 사용하기로 결정
#### 해결✅ : 주소 검색 API를 통해 사용자가 입력한 주소를 검색하고, 반환된 데이터에서 좌표 변환 API를 호출하여 정확한 위도와 경도를 추출하여 지도에 정확한 위도 경도 입력하여 정확한 지도 표시
---

### 관계자 테마등록 
### ⭐기능구현
<ul>
  <li>사용자는 카페 이름, 테마 이름, 소요 시간, 가격, 테마 설명 등 기본 정보를 입력</li>
  <li>"주소 검색" 버튼 클릭 시 카카오 주소 검색 API를 활용해 사용자가 원하는 주소를 입력</li>
  <li>입력된 주소는 Naver API를 통해 좌표(latitude, longitude)로 변환되며, 이후 서버에 전달</li>
  <li>사용자는 테마 이미지를 업로드할 수 있으며, 이미지 파일은 onChange 이벤트를 통해 상태에 저장</li>
  <li>사용자가 입력한 모든 데이터를 FormData로 구성하여 Axios POST 요청을 통해 서버로 전송</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 이미지 업로드 시 초기에는 내부 서버 디렉토리에 이미지를 저장했으나, 저장된 이미지를 클라이언트에서 바로 로드하지 못해 새로고침 없이 출력이 되지 않는 문제가 발생.
#### 과정🛠️ : 이미지를 외부 스토리지로 업로드하도록 변경
#### 해결✅ : 업로드된 이미지를 클라이언트가 새로고침 없이 즉시 확인 가능하게 되어 사용자 경험이 개선.
---

### 관계자 테마관리 (수정/삭제)
### ⭐기능구현
<ul>
  <li>로그인 타입이 2(관계자) 인 사용자만 접근가능</li>
  <li>로그인한 사용자의 memberId를 기준으로 해당 사용자가 등록한 모든 테마 데이터를 Axios GET 요청을 통해 가져옵니다.</li>
  <li>각 테마에 대해 "수정하기" 버튼을 제공하며, 클릭 시 해당 테마 데이터를 상태로 전달하여 수정 페이지(/Modify)로 이동합니다.</li>
  <li>"삭제하기" 버튼 클릭 시, 해당 테마의 번호(temaNo)와 이미지 URL(imgUrl)을 서버에 전달하여 삭제</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 테마를 삭제할 때 해당 테마와 연결된 리뷰 데이터를 함께 삭제하지 않아, 테마 삭제 후에도 리뷰 데이터가 남아있는 문제가 발생
#### 과정🛠️ : 테마 삭제 요청에서 테마 데이터만 삭제하고, 리뷰 데이터 삭제 로직을 별도로 추가함
#### 해결✅ : 테마 삭제 시 연관된 리뷰 데이터도 함께 삭제되며, 화면에 즉시 반영되어 잘못된 데이터가 표시되지 않음.
---

### 관리자 테마관리 (삭제)
### ⭐기능구현
<ul>
  <li>각 테마의 ID, 번호, 이미지, 카페 이름, 테마 이름, 가격, 소요 시간, 설명, 최대 인원, 난이도, 장르 등의 정보를 테이블 형식으로 표시</li>
  <li>관계자가 등록한 모든 테마 리스트를 전부 보여줍니다</li>
  <li>가져온 테마 데이터를 temaList 상태로 관리하며, 테이블 형식으로 표시</li>
  <li>삭제 버튼 클릭 시, 해당 테마의 번호(temaNo)와 이미지 URL(imgUrl)을 서버에 전달하여 삭제</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 테마 삭제 요청 후, 삭제된 데이터가 화면에 즉시 반영되지 않거나 남아있는 문제가 발생.
#### 과정🛠️ : axios.delete 요청을 통해 테마 데이터만 삭제하였으나, 삭제 요청 성공 후 리스트를 다시 가져오는 과정에서 비동기 처리 타이밍 이슈로 삭제된 데이터가 화면에 남아있는 경우가 발생
#### 해결✅ : 프론트엔드에서 삭제 후 최신 리스트를 다시 가져오고, 사용자에게 명확한 성공 메시지를 표시
---

### 🔔보완할 점
#### 📝 회원가입 시 SMS 인증 기능 추가
<li>사용자 계정의 안전성을 확보하기 위해 SMS 인증 API를 활용한 기능 추가</li>

#### 📝 결제 시스템 강화
<li>예약 시 결제 처리를 위해 결제 API를 추가</li>

#### 📝 실적 조회 기능 구현
<li>테마별 이용 횟수, 월별 결제 금액, 취소 신청 횟수 등의 통계를 확인할 수 있는 기능 추가</li>

#### 📝 리뷰 등록 기능 추가
<li>사용자가 예약을 완료한 후 리뷰를 등록할 수 있는 기능 추가</li>
