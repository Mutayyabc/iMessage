import React, {useState, useEffect} from "react";
import "./Menu.css";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import MenuChat from "./MenuChat";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import CancelIcon from "@material-ui/icons/Cancel";
import  { auth, provider } from "../Login/firebase";
import Pusher from 'pusher-js';
import axios from '../axios';



function Menu() {
  const pusher = new Pusher('93990f0577676c3cf663', {
      cluster: 'us2'
    });
  const signOut = () => {
    auth.signOut(provider).catch((error) => alert(error.message));
  };
  const user = useSelector(selectUser);
  const [rooms, setRooms] = useState([]);

  const getRooms = () => {
    axios.get('/messages/messageList').then((res) =>{
      setRooms(res.data);
        })
    }
  const creatingRoom = (e) => {
    e.preventDefault()
    const roomName = prompt('Enter a Groupchat name')
    const firstMessage = prompt('Send your first message to the Groupchat')
    if (roomName && firstMessage) {
      let messageId = ''
      axios.post('/messages/room', {
        roomName: roomName
      }).then((res) => {
        messageId = res.data._id
      }).then(() => {
        axios.post(`/messages/new?id=${messageId}`, {
          message: firstMessage,
          time: Date.now(),
          user: user
        })
      })
    }
  }
   
    useEffect(()=>{
        getRooms()
        const channel = pusher.subscribe('rooms');
        channel.bind('newRoom', function (data) {
          getRooms()
    });
        } , []);

  return (
        <div className="menu">
            <div className="menu_header">
                <IconButton>
                <CancelIcon
                onClick={() => signOut()}
                className = "sign_out"/>
                </IconButton>
                <div className="menu_input">
                    <SearchIcon className = "search" />
                    <input className = "searchbar"  placeholder='Search' />
                </div>
                <IconButton variant = 'first' className = 'new_message_button'>
                    <RateReviewOutlinedIcon onClick = {creatingRoom}
                    />
                </IconButton>
            </div>
                <div className="menu_chats">
                    {rooms.map(({id, name}) =>(
                    <MenuChat key = {id} id = {id}  roomName = {name}  />
                    ))}
                </div>
        </div>
        
    ) 
}

export default Menu;
