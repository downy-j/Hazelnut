const chatRoomModel = require("../Models/chatRoomModel");

/**
 * createChat
 * 역활 :새 채팅방 생성
 * 구현 : client로부터 전달된 데이터를 사용. chatRoomModel에 데이터 저장.
 * 이때 방이름과 유저 정보 함께 설정
 * 사용 예시 : 유저가 새 챗방 만들고, 챗방명 참여자 정보 넣은 후, createChat 요청을 보낸다
 */
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const caht = await chatRoomModel.findOne({
      participants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

/**
 * findUserChats
 * 역활 : 특정 유저가 참여한 모든 챗방 검색하는 역할
 * 구현 : 유저의 고유 _id 기반 DB에서 해당 정보 검색 후 반환
 * 사용 예시 : 유저가 특정 챗방 정보를 확인 하려면,
 * server에 findUserChats요청을 보낸다
 */
const findUserChats = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

/**
 * findChat
 * 역활 : 특정 챗방 정보 검색하는 역활
 * 구현 : 챗방 고유 _id 기반 DB에서 해당 챗방 정보 검색 후 반환
 * 사용 예시 : 유저가 특정 챗방 정보 확인하려면,
 * server에 findChat요청을 보내고 해당 챗방 _id값 전달
 */
const findChat = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

/**
 * updateChatRoom
 * 역활 : 챗방 정보 업데이트
 * 구현 : 챗방 _id와 업데이트 정보를 받아 해당 챗방 업데이트함
 * 사용 예시 : 업데이트 할 챗방 _id를 server에 보내는 요청.
 * 챗방명, 참여 유저 추가, 제거 가능
 */

/**
 * deleteCahtRoom
 * 역활 : 챗방 삭제
 * 구현 : 챗방 _id를 받아 해당 챗방을 DB에서 제거
 * 사용 예시 : 삭제할 챗방 _id를 server에 보내는 요청.
 * 해당 챗방 삭제와 모든 관련 데이터 삭제
 * (방 나가는것과 다른 개념이며 방장만 가능 권리 부여를 해야 함)
 */

/**
 * addUserToChatRoom
 * 역활 : 챗방에 새 유저 추가
 * 구현 : 챗방 _id와 추가할 유저 _id를 받아 해당 챗방의 참여 목록에 유저 추가
 * 사용 예시 : 새 유저 _id와 챗방 _id를 server에 보내는 요청.
 */

/**
 * removeUserFromChatRoom
 * 역활 : 챗방에서 특정 유저 제거
 * 구현 : 챗방 _id와 제거할 유저 _id를 받아 해당 챗방 참가자 목록에서 유저를 제거
 * 사용 예시 : 제거할 유저 _id와 챗방 _id를 server에 보내는 요청
 */

/**
 * getChatMessages
 * 역활 : 특정 챗방의 메시지 목록을 불러옴
 * 구현 : 채팅방 _id를 받아 해당 챗방에서 발생한 메시지를 검색해 반환
 * 사용 예시 : 특정 챗방 _id server에 보내는 요청
 */

/**
 * sendMessageToChatRoom
 * 역활 : 특정 챗방에 메시지 보내기
 * 구현 : 챗방 _id와 메시지 내용 받아 챗 메시지를 저장 하고 참가자에게 발송
 * 사용 예시 : 챗방 _id와 메시니 내용을 server에 보내는 요청
 */

/**
 * archiveChatRoom
 * 역활 : 챗방을 아카이브하여 유저의 뷰에서 숨김
 * 구현 : 챗방 _id를 받아 해당 챗방을 아카이브 상태로 변경
 * 사용 예시 : 아카이브할 챗방 _id를 server에 보내는 요청
 */

/**
 * unarchiveChatRoom
 * 역활 : 아카이브된 챗방 재복구
 * 구현 : 아카이브된 챗방 _id를 받아 해당 챗방을 다시 복구 상태로 변경
 * 사용 예시 : 복구할 챗방 _id를 server에 보내는 요청
 * 카이브된 채팅방을 다시 복구하여 유저 뷰에 표시
 */

/**
 * leaveChatRoom
 * 역활 : 유저가 특정 챗방을 나감
 * 구현 : 유저 ID와 나갈 챗방 ID를 받아 유저(나)를 해당 챗방에서 제거
 * 사용 예시 : 나갈 챗방의 ID를 server에 보내는 요청
 */

/**
 * getUnreadMessagesCount
 * 역활 : 유저가 읽지 않은 메시지의 수 갖고오기
 * 구현 : 유저 _id와 챗방 _id를 받아 해당 챗방에서 유저가 읽지 않은 메시지 수 계산해 반환
 * 사용 예시 : 유저 _id와 챗방 _id를 server에 보내는 요청
 * 읽지 않은 메시지 갖고 오는거
 */

/**
 * getChatRoomInfo
 * 역활 : 특정 챗방 정보 갖고오기
 * 구현 : 챗방 _id 받아 해당 챗방 정보를 DB에서 검색해 반환.
 * 정보 안에는 챗방명, 참여자 목록, 숫자 등 있음
 * 사용 예시 : 특정 챗방 _id server에 보내는 요청
 */

/**
 * getChatRoomActivity
 * 역활 : 특정 챗방 활동 가져오기
 * 구현 : 챗방 _id를 받아 해당 챗방의 최근 메시지 또는 활동과 관련한 정보를 반환
 * 이 정보는 챗방 활동을 추적하거나 유저에게 보여주는 용도
 * 사용 예시 : 특정 챗방 _id를 server에 보내는 요청
 */

module.exports = { createChat, findUserChats, findChat };
