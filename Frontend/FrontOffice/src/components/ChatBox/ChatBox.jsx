/* eslint-disable */
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios"; // Import d'axios
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import InputEmoji from 'react-input-emoji';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete'; // Import de l'icône de suppression
import { format, formatDistanceToNow } from 'date-fns';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, onDelete }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last message
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // Send message to socket server
    setSendMessage({ ...message, receiverId });
    // Send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Receive message from parent component
  useEffect(() => {
    console.log("Received Message: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  // Function to delete the chat
  const handleDelete = async (chatId) => {
    try {
      await axios.delete(`http://localhost:5000/chat/deleteChatRoom/${chatId}`);
      onDelete(chatId); // Update the state after deletion
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const imageRef = useRef();

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* Chat header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <Avatar
                    src={
                      userData?.profileImage
                        ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profileImage
                        : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                    {/* Delete button */}
                    <button className="delete-button" onClick={() => handleDelete(chat._id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* Chat body */}
            <div className="chat-body">
              {messages.map((message) => (
                <div key={message._id} ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                  <span>{message.text}</span>
                  <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                </div>
              ))}
            </div>
            {/* Chat sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>Send</div>
              <input type="file" name="" id="" style={{ display: "none" }} ref={imageRef} />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;