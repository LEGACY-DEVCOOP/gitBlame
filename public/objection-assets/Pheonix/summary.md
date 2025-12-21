# 프로젝트 요약 (Project Summary)

## 개요 (Overview)

이 프로젝트는 웹 기반의 비주얼 노벨 또는 장면 생성기로 보입니다. 파일 구조와 애셋(`assets.js`)의 내용을 볼 때, 인기 게임 시리즈인 '에이스 변호사'(Phoenix Wright: Ace Attorney)의 팬메이드 게임이거나 이를 모티브로 한 장면을 만드는 웹 애플리케이션일 가능성이 높습니다. `objection.lol`이라는 웹사이트의 독립 실행형(standalone) 플레이어 기능으로 보입니다.

## 주요 파일 및 디렉토리 (Key Files and Directories)

- `play.html`: 프로젝트의 메인 페이지 역할을 하는 HTML 파일입니다. 게임/장면에 필요한 모든 JavaScript 파일들을 불러옵니다.
- `project.js`: 장면에 대한 데이터를 담고 있는 JSON 객체입니다. 캐릭터의 대사, 사용되는 포즈, 배경음악 등의 프레임 정보가 포함되어 있습니다.
- `assets.js`: 게임에 사용되는 캐릭터, 배경, 오디오, 말풍선 등 모든 애셋을 정의하고 해당 미디어 파일의 경로를 지정하는 파일입니다. 'Phoenix Wright'라는 캐릭터 정보가 명시되어 있습니다.
- `title.js`: 프로젝트의 제목을 담는 간단한 스크립트 파일입니다.
- `resources/`: 게임에 필요한 모든 미디어 파일(이미지, 오디오)이 저장된 디렉토리입니다.
- `js/`: 폰트 파일과 `export.js` 같은 실행 스크립트가 포함되어 있습니다.

## 기술 스택 (Technology Stack)

HTML, CSS, 그리고 순수 JavaScript(Vanilla JS)를 사용하여 개발된 것으로 보입니다. 별도의 복잡한 프레임워크는 사용되지 않은 것으로 추정됩니다.

## 실행 방법 (How to Run)

웹 브라우저에서 `play.html` 파일을 직접 열어 실행할 수 있을 것으로 예상됩니다. 그러면 `project.js`와 `assets.js`에 정의된 내용에 따라 장면이 자동으로 재생될 것입니다.
