import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function CreateRoom() {
  const {
    setChatRoomName,
    setFindUserNick,
    chatWithUserList,
    createChatRooms,
    setClickedUser,
  } = useContext(ChatContext);

  const handleUserClick = (user) => {
    setClickedUser(user);
  };
  return (
    <div className="create_ChatRoomInfo">
      <form className="chatRoomInfo" onSubmit={createChatRooms}>
        <div className="chatRoomInfoBox">
          <label htmlFor="roomTitle">방 제목</label>
          <input
            type="text"
            id="roomTitle"
            onChange={(e) => {
              setChatRoomName(e.target.value);
            }}
          />
          <label htmlFor="userSearch">유저 찾기</label>
          <input
            type="text"
            id="userSearch"
            onChange={(e) => {
              setFindUserNick(e.target.value);
            }}
          />
        </div>

        <ul className="searchUserBox">
          {chatWithUserList.map((user, index) => (
            <li key={index} onClick={() => handleUserClick(user.id)}>
              <img
                src={
                  user.imgURL
                    ? user.imgURL
                    : process.env.PUBLIC_URL + "/img/main/besicImg.jpg"
                }
                alt="user_img"
              />
              <div className="userInfo">
                <span className="user_Name">{user.nick}</span>
                <span className="user_textBox">{user.textBox}</span>
              </div>
            </li>
          ))}
        </ul>

        <input type="submit" value="방 생성" />
      </form>
    </div>
  );
}

export default CreateRoom;
