# Hazelnut

## 개발 기간

- 23.09.01 ~
- 23.10.01 ~ 리액트 공부와 함께 진행중. .

## 개발 환경

- `Node v20.3.1`
- `React ^18.2.0`
- `IDE Visual Studio Code`
- `Framework: Express ^4.18.2`
- `Datebase: MongoDB ^7.5.2`

## 구성

1. client 폴더에는 React로 구현한 UI가 위치.
2. server 폴더에는 Express로 구현한 server가 위치.
3. 계속해서 업그래이드 해나갈 예정.

## 뭘 하고 싶은가

블로그(CRUD)기능, 채팅(Socket 통신)을 구현이 목적

## DataBase

Nosql인 mongoDB를 사용
(mysql은 추후 사용할 의향 있음.)

# 주요 기능( Controller )

## User

- findUser : 유저 찾기 (✔️)\_10.16
- getUsers : 유저들 찾기 (✔️)\_10.16
- updateUser : 유저 업데이트(✔️)\_10.16
- follow : 유저 팔로우 ( )
- unfollow : 유저 언팔로잉 ( )

## Auth

- createToken : 유저 토근화 (✔️)\_10.16
- registerUser : 유저 등록 (✔️)\_10.16
- loginUser : 유저 로그인 (✔️)\_10.16
- logoutUser : 유저 로그아웃 (✔️)\_10.16

## Post

- createPost : 새 포스트 생성(✔️..)\_10.18
- getPosts : 전체 포스트 가져오기 (✔️)\_10.17
- getPost : 특정 포스트 가져오기 (✔️)\_10.17
- updatePost : 특정 포스트 수정 (✔️)\_10.17
- deletePost : 특성 포스트 삭제 (✔️)\_10.17
- likePost : 좋아요(✔️..)\_10.18

## Comment

- addComment : 댓글 달기 (✔️..)\_10.19
- getComments : 특정 포스트의 댓글 가져오기 (✔️)\_10.19
- deleteComment : 댓글 삭제 (✔️)\_10.19

## Category

- createCategory : 새 카테고리 만들기 (✔️..) \_10.19
- getCategories : 전 카테고리 가져오기. 특정 카테고리만 가져오기 (✔️)\_10.19

## Search

- searchPosts : 키워드 혹은 필터를 사용해 포스트 검색

## ChatRoom

- createChat : 채팅방 생성
- findUserChats : 유저 참여 모든 채팅방 찾기
- findChat : 채팅방 찾기
- updateChatRoom : 채팅방 정보 업데이트
- deleteChatRoom : 채팅방 삭제
- addUserToChatRoom : 채팅방 새 유저 추가
- removeUserFromChatRoom : 채팅방 유저 제거
- getChatMessages : 채팅방 메시지 목록 불러오기(to message..?)
- sendMessageToChatRoom : 채팅방 메세지 보내기 (to message..?)
- archiveChatRoom : 채팅방 아카이빙 (need for why..?)
- unarchiveChatRoom : 아카이빙한 챗방 복구 (need for why..?)
- leaveChatRoom : 채팅방 나가기
- getUnreadMessagesCount : 안읽은 메시지 수 가져오기 (to message..?)
- getChatRoomInfo : 특정 채팅방 정보 가져오기 (overlapping..?)
- getChatRoomActivity : 특정 채팅방 활동 가져오기

## Message

- createMessage : 새 채팅 메세지 생성. 채팅방에 메세지를 추가.
- getMessages : 특정 채팅방의 모든 메시지 가져오기.
- updateMessage : 메시지 업데이트. 보낸 메시지를 수정, 추가 정보를 포함 시킬때 사용
- deleteMessage : 메시지 삭제. 메시지 수명이 만료시에도 사용
- getMessageDetails : 특정 메시지의 상세 정보를 가져오기
- markMessageAsRead : 안읽은 메시지 읽음으로 표시
- getUnreadMessages : 특정 유저에 대한 안읽은 메시지 목록을 반환
- getMessageActivity : 메시지와 관련된 활동 가져오기. 좋아요, 공유, 반응등 추척 후 반환
- archiveMessage : 특정 메시지를 아카이빙해 보관.
- unarchiveMessage : 아카이빙된 메시지 복구
