import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice"
import "./SingleMessage.css";

function SingleMessage ({ id, sender, message, time}){
  const user = useSelector(selectUser);
  return (
      <div
        className={`message_text ${user.email === sender.email && "message_send"}`}
      >
        <div className="header_send">
          <p>{user.displayName}</p>
          <Avatar src={sender.pic} />
        </div>
        <p>{message}</p>
        <small>{new Date(parseInt(time)).toDateString()}</small>
      </div>
    );
}
export default SingleMessage;
