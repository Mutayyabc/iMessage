import React, { useState, useEffect } from "react";
import "./MenuChat.css";
import { Avatar } from "@material-ui/core";
import { setRooms } from "../redux/messageSlice";
import { useDispatch } from "react-redux";
//import * as timeago from "timeago.js";
import Pusher from 'pusher-js';
import axios from '../axios';

function MenuChat({ id, roomName }) {
    const pusher = new Pusher('93990f0577676c3cf663', {
      cluster: 'us2'
    });
    const dispatch = useDispatch();
    const [lastMessage, setLastMessage] = useState('')
    const [lastPic, setLastPic] = useState('')



    const getLastInfo = () => {
    axios.get(`/messages/menuData?id=${id}`).then((res) => {
      setLastMessage(res.data.message)
      setLastPic(res.data.user.pic)
    })
  }
    useEffect(()=>{
        getLastInfo();
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getLastInfo();
        });
    } , [id]);

  return (
        <div onClick = {() => dispatch(
            setRooms({
                messageId: id,
                roomName: roomName,
            })
        )} 
        className = "menuChat">
            <Avatar src = {lastPic}/>
            <div className="chat_section">
                <h2>{roomName}</h2>
                <p>{lastMessage}</p>

            </div>
        </div>
    );
}

export default MenuChat;
