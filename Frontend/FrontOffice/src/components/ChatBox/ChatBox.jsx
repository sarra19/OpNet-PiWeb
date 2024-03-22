/* eslint-disable */
 /* eslint-disable */
 import React, { useEffect, useState, useRef } from "react";
 import axios from "axios";
 import { addMessage, getMessages } from "../../api/MessageRequests";
 import { getUser } from "../../api/UserRequests";
 import "./ChatBox.css";
 import InputEmoji from 'react-input-emoji';
 import Avatar from '@material-ui/core/Avatar';
 import DeleteIcon from '@material-ui/icons/Delete';
 import { formatDistanceToNow } from 'date-fns';
 
 const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, onDelete }) => {
   const [userData, setUserData] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState("");
 
   const handleChange = (newMessage) => {
     setNewMessage(newMessage);
   };
 
   const imageRef = useRef();
 
   const handleImageUpload = () => {
     imageRef.current.click();
   };
 
   const handleFileChange = async (e) => {
     const file = e.target.files[0];
     const formData = new FormData();
     formData.append('avatar', file);
 
     try {
       const response = await axios.put("http://localhost:5000/user/upload", formData);
       const avatarPath = response.data.avatarPath;
       setNewMessage(avatarPath);
     } catch (error) {
       console.error("Error uploading image:", error);
     }
   };
 
   const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: currentUser,
      chatId: chat._id,
    };

    // Check if the newMessage is an image URL or text
    if (newMessage.startsWith("http://") || newMessage.startsWith("https://")) {
      message.image = newMessage;
    } else {
      message.text = newMessage;
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log("Error:", error);
    }
  };


 
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
   
 
   const scroll = useRef();
   useEffect(() => {
     scroll.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);
 
   useEffect(() => {
     if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
       setMessages([...messages, receivedMessage]);
     }
   }, [receivedMessage]);
 
   const handleDelete = async (chatId) => {
     try {
       await axios.delete(`http://localhost:5000/chat/deleteChatRoom/${chatId}`);
       onDelete(chatId);
     } catch (error) {
       console.log("Error:", error);
     }
   };
 
   return (
     <>
       <div className="ChatBox-container">
         {chat ? (
           <>
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
             <div className="chat-body">
             {messages.map((message) => (
   <div key={message._id} ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
     {message.text.startsWith("http://") || message.text.startsWith("https://") ? (
       <img src={message.text} alt="Sent Image" style={{ maxWidth: "100%", maxHeight: "200px" }} />
     ) : (
       <img src={`${message.text}`} alt="Sent Image" style={{ maxWidth: "100%", maxHeight: "200px" }} />
     )}
     <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
   </div>
 ))}
 {messages.map((message) => (
   <div key={message._id} ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
     {!message.text.startsWith("http://") && !message.text.startsWith("https://") ? (
       <span>{message.text}</span>
     ) : (
       <img src={message.text} alt="Sent Image" style={{ maxWidth: "100%", maxHeight: "200px" }} />
     )}
     <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
   </div>
 ))}

 
 
             </div>
             <div className="chat-sender">
               <div onClick={handleImageUpload}>+</div>
               <InputEmoji value={newMessage} onChange={handleChange} />
               <div className="send-button button" onClick={handleSend}>Send</div>
               <input type="file" name="avatar" id="avatar" style={{ display: "none" }} ref={imageRef} onChange={handleFileChange} />
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