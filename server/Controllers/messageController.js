/**
 * createMessage
 * 역활 : 채팅방에 새 메시지를 작성하고 전송
 * 구현 : client로 부터 전달된 메시지 내용과 송신자 정보를 사용해 새 메시지를 작성하고 채팅방에 전송
 * 사용 예시 : 유저가 특정 채팅방에서 메시지 작성 후 전송하려 할 때, server에 "createMessage" 요청
 */
const createMessage = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getMessages
 * 역활 : 특정 채팅방에 저장된 메시지를 검색 후 client에 반환
 * 구현 : client로 부터 전달된 채팅방 _id를 사용해
 * 해당 채팅방에 저장된 메시지를 검색하고 client에 반환
 * 사용 예시 : 유저가 특정 채팅방에서 이전 메시지 목록을 확인하려 할 때, server에 "getMessages" 요청
 */
const getMessages = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * updateMessage
 * 역활 : 특정 메시지 내용 업데이트
 * 구현 : client로 부터 전달된 메시지 _id와 수정된 메시지 내용을 사용해 특정 메시지의 내용을 업데이트
 * 사용 예시 : 유저가 특정 메시지 내용을 수정하려 할 때, server에 "updateMessage" 요청
 */
const updateMessage = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * deleteMessage
 * 역활 : 특정 메시지를 삭제
 * 구현 : client로 부터 전달된 메시지 _id를 사용해 특정 메시지 삭제
 * 사용 예시 : 유저가 특정 메시지를 삭제하려 할 때, server에 "deleteMessage" 요청
 */
const deleteMessage = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getMessageDetails
 * 역활 : 특정 메시지의 세부 정보를 검색하고 client에 반환
 * 구현 : client로 부터 전달된 메시지 _id를 사용해 해당 메시지의 세부 정보를 검색하고 client에 반환
 * 사용 예시 : 유저가 특정 메시지의 세부 정보를 확인하려 할 때, server에 "getMessageDetails" 요청
 */
const getMessageDetails = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * markMessageAsRead
 * 역활 : 특정 메시지를 "읽음" 상태로 표시
 * 구현 : client로 부터 전달된 메시지 _id를 사용해 해당 메시지를 "읽음" 상태로 표시
 * 사용 예시 : 유저가 특정 메시지를 읽었을 때, server에 "markMessageAsRead" 요청을 보내고 해당 메시지 "읽음"으로 표시
 */
const markMessageAsRead = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getUnreadMessages
 * 역활 : 유저의 "읽지 않은" 메시지 목록을 가져옴
 * 구현 : client로 부터 전달된 유저 _id를 사용해 해당  유저의 "읽지 않은" 메시지 목록을 검색하고 client에 반환
 * 사용 예시 : 유저가 자신에게 온 "읽지 않은" 메시지 목록을 확인하려 할 때, server에 "getUnreadMessages" 요청을 보냄
 */
const getUnreadMessages = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getMessageActivity
 * 역활 : 특정 메시지의 활동 정보를 가져옴
 * 구현 : client로 부터 전달된 메시지 _id를 사용해 해당 메시지의 활동 정보를 검색하고 client에 반환
 * 사용 예시 : 유저가 특정 메시지의 활동 정보를 확인하려 할 때, server에 "getMessageActivity" 요청
 */
const getMessageActivity = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * archiveMessage
 * 역활 : 특정 메시지를 아카이빙하여 보관
 * 구현 : client로 부터 전달된 메시지 식별자를 사용하여 해당 메시지를 아카이빙 처리하고 보관
 * 사용 예시 : 유저가 특정 메시지를 아카이빙해 나중에 참고하려 할 때, server에 "archiveMessage" 요청을 보냄
 */
const archiveMessage = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * unarchiveMessage
 * 역활 : 아카이빙된 메시지를 다시 보관함으로써 복구
 * 구현 : client로 부터 전달된 메시지 _id를 사용해 해당 메시지를 아카이빙에서 복구 처리
 * 사용 예시 : 유저가 이전에 아카이빙한 메시지를 다시 복구하고자 할 때, server에 "unarchiveMessage" 요청을 보냄
 */
const unarchiveMessage = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {};
