import React, { useEffect, useState } from "react";
import "./Messages.css";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useSelector } from "react-redux";
import { selectMessageId, selectRoomName } from "../redux/messageSlice";
import SingleMessage from "./SingleMessage";
import { selectUser } from "../redux/userSlice";
import Pusher from 'pusher-js';
import axios from '../axios';



function Messages() {
    const pusher = new Pusher('93990f0577676c3cf663', {
      cluster: 'us2'
    });

    const messageId = useSelector(selectMessageId);
    const roomName = useSelector(selectRoomName);
    const user = useSelector(selectUser);
    const [input,setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const getConvo = (messageId) => {
        if (messageId) {
            axios.get(`/messages/chat?id=${messageId}`).then((res) => {
                setMessages(res.data[0].message_content)
      })
    }
  }
    const sendMessage = (e) => {
        e.preventDefault();

        axios.post(`/messages/new?id=${messageId}`, {
            message: input,
            time: Date.now(),
            user: user
    })

    setInput("");

    };

  useEffect(() => {
      pusher.unsubscribe('messages');
      getConvo(messageId);
      const channel = pusher.subscribe('messages');
      channel.bind('newMessage', function (data) {
          getConvo(messageId)
    });
  }, [messageId]);

  return (
        <div className = "messages">
            <div className="messages_header">
                <h4>
                    To:<span className="messages_title">{roomName}</span>
                </h4>
                <div className="details_icon">
                    <p> Details</p>
                </div>
            </div>
            <div className="messages_body">
                {messages.map(({ user, _id, message, time }) => (
            <SingleMessage key={_id} id={_id} sender={user} message={message} time={time} />
          ))}
            </div>
            <div className="message_input">
                <form>
                    <input
                    value = {input}
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder='iMessage'
                    type="text" />
                <button onClick = {sendMessage} type="submit">
                        ↑
                </button>
                </form>
                <EmojiEmotionsIcon className = "emoji" />
                <MicIcon className = "mic"/>
            </div>
        </div>
    )
}

export default Messages;
