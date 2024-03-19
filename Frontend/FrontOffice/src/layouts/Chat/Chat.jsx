/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { userChats } from "../../api/ChatRequests";

import Button from '@material-ui/core/Button';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import "./Chat.css";

function ChatManagement() {
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const userId = window.sessionStorage.getItem('userId');
    if (!userId) {
      // Handle if userId is not available in session storage
      return;
    }

    const getChats = async () => {
      try {
        const { data } = await userChats(userId);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    getChats();

    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect(); // Disconnect socket when component unmounts
    };
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const userId = window.sessionStorage.getItem('userId');
    if (!userId) {
      // Handle if userId is not available in session storage
      return false;
    }
    const chatMember = chat.members.find((member) => member !== userId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <div className="Chat" style={{ marginTop: '20px' }}>
        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={window.sessionStorage.getItem('userId')}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          </div>
          <ChatBox
            chat={currentChat}
            currentUser={window.sessionStorage.getItem('userId')}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>

      <Footer />
    </DashboardLayout>
  );
}

export default ChatManagement;
