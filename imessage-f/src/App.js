import './App.css';
import Menu from './SideComponents/Menu';
import Messages from './Messages/Messages';
import React, {useEffect} from 'react';
import Login from './Login/Login';
import { selectUser, login, logout } from './redux/userSlice';
import {auth} from './Login/firebase';
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();



  // useEffect(() => {
  //   
  //   const channel = pusher.subscribe('message');
  //   channel.bind('inserted', (newMessage) => {
  //     setMessages([...messages, newMessage]);
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages]);

  //new
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            pic: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      {!user ? (
          <Login />
        ) : (
          <div className="body">
            <Menu />
            <Messages />
      </div>
        )}
    </div>
      
  );
}

export default App;
