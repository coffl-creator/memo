@AGENTS.md
# 민감 파일 규칙

- `.env`, `.env.*`, 이름에 `credential`/`secret`이 들어간 파일, `*.pem`, `*.key`, `id_rsa*`, `id_ed25519*`는 읽지 않는다.
- 위 파일의 내용은 `cat`, `type`, `Get-Content` 같은 셸 명령, grep, 스크립트로도 열람하거나 출력하지 않는다.
- 이 파일들의 값은 답변, 로그, 커밋, 다른 파일에 옮겨 적지 않는다. 사용자가 직접 입력한 값만 다룬다.
- 이 파일들을 git에 추가하거나 외부로 전송하지 않는다. 필요하면 `.gitignore`에 추가하도록 제안한다.
- 설정 값이 필요하면 값 대신 변수 이름만 확인하고, 값은 사용자가 직접 넣도록 안내한다.
- 위 규칙은 `.claude/settings.json`의 `permissions.deny`와 짝을 이룬다. 한쪽을 바꾸면 다른 쪽도 같이 맞춘다.

# 디자인 토큰

## 색 (Colors)

| 이름 | Light | Dark |
|---|---|---|
| color/primary | #3182F6 | #4D94FF |
| surface/page | #F2F4F6 | #101014 |
| surface/card | #FFFFFF | #1C1C22 |
| text/primary | #191F28 | #F1F3F5 |
| text/secondary | #4E5968 | #B3BAC2 |
| text/muted | #8B95A1 | #6E7783 |
| text/on-primary | #FFFFFF | #FFFFFF |
| border/default | #E5E8EB | #2A2A33 |
| label/blue | #3182F6 | #6AA6FF |
| label/blue-soft | #E8F3FF | #1D2A40 |
| label/green | #12A150 | #3CCB7F |
| label/green-soft | #E3F8EC | #17302A |
| label/orange | #F76808 | #FF9446 |
| label/orange-soft | #FFF1E5 | #3A2817 |
| label/pink | #E5397A | #FF6FA2 |
| label/pink-soft | #FFEAF1 | #3B1D2A |

## 간격 (Spacing)

| 이름 | 값(px) |
|---|---|
| space/4 | 4 |
| space/8 | 8 |
| space/12 | 12 |
| space/16 | 16 |
| space/20 | 20 |
| space/24 | 24 |
| space/34 | 34 |
| space/48 | 48 |
| space/64 | 64 |

## 모서리 (Radius)

| 이름 | 값(px) |
|---|---|
| radius/sm | 12 |
| radius/md | 16 |
| radius/lg | 20 |
| radius/xl | 24 |
| radius/full | 999 |

## 텍스트 스타일 (Noto Sans KR)

| 이름 | 굵기 | 크기(px) | 행간(px) | 자간(px) |
|---|---|---|---|---|
| heading/xl | Bold | 28 | 38 | -0.8 |
| heading/lg | Bold | 26 | 36 | -0.8 |
| title/lg | Bold | 20 | 28 | -0.4 |
| title/md | Bold | 17 | 24 | -0.3 |
| label/md | Bold | 15 | 22 | -0.2 |
| body/md | Regular | 16 | 28 | -0.2 |
| body/sm | Regular | 14 | 20 | -0.1 |
| caption/md | Medium | 15 | 22 | -0.2 |
| caption/sm | Medium | 13 | 18 | 0 |
| button/md | Bold | 17 | 24 | -0.2 |


## 디자인 규칙
- 위 디자인 토큰에 없는 색·간격·모서리 값은 쓰지 않는다. 새 값이 필요하면 먼저 물어본다.
- 같은 모양의 UI는 기존 컴포넌트를 재사용한다.
- 한글은 Noto Sans KR로 쓰고, 단어 중간에서 줄을 바꾸지 않는다.
- 코드에서는 디자인 토큰 이름만 쓰고, 아이콘 색은 글자색을 따른다.

@AGENTS.md
