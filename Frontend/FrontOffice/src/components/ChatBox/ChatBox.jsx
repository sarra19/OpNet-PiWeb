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
import { fr } from 'date-fns/locale';
import API_URLS from "apiUrls";

const isImageUrl = (url) => {
  return /\.(jpeg|jpg|gif|png)$/.test(url);
};

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, onDelete }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reactions, setReactions] = useState({});

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
    formData.append('file', file);

    try {
      const response = await axios.post(API_URLS.upload, formData);
      const avatarPath = response.data;
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

  let lastClickTime = 0;

  const handleDeleteMessage = async (messageId) => {
    const now = new Date().getTime();
    const timeDiff = now - lastClickTime;
    lastClickTime = now;

    if (timeDiff < 300) { // Adjust this value (in milliseconds) as needed for the double-click interval
      try {
        await axios.delete(API_URLS.deleteMessage(messageId));
        setMessages(messages.filter(message => message._id !== messageId));
        alert('Le message a été supprimé avec succès !');
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  
  const handleReact = async (messageId, emoji) => {
    try {
      // Send a POST request to your backend API to add the reaction
      const response = await axios.post(`https://opnet-piweb.onrender.com/messages/${messageId}/reactions`, {
        userId: sessionStorage.getItem("userId"), // Assuming you store userId in sessionStorage
        reaction: emoji
      });
  
      // Check if the response was successful (status code 200)
      if (response.status === 200) {
        // Update reactions state locally to reflect the added reaction
        setReactions(prevReactions => ({
          ...prevReactions,
          [messageId]: emoji
        }));
  
        // Alert user upon successful reaction
        alert("Reaction added successfully!");
      } else {
        // Handle other possible response statuses (e.g., error cases)
        console.error("Error adding reaction: Unexpected response", response);
        alert("Failed to add reaction. Please try again.");
      }
    } catch (error) {
      console.error("Error reacting to message:", error);
      alert("An error occurred while adding reaction. Please try again.");
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

        // Fetch reactions for each message
        const reactionsMap = {};
        for (const message of data) {
          const messageId = message._id;
          const { data: messageReactions } = await axios.get(`https://opnet-piweb.onrender.com/messages/${messageId}/reactions`);
          reactionsMap[messageId] = messageReactions; // Assuming response contains reactions for each message
        }
        setReactions(reactionsMap);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
     // getReactions(receivedMessage._id); // Fetch reactions for new message
    }
  }, [receivedMessage]);

  const handleDelete = async (chatId) => {
    try {
      await axios.delete(API_URLS.deleteChatRoom(chatId));
      onDelete(chatId);
      alert('Le chat a été supprimé avec succès !');

    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getReactions = async (messageId) => {
    try {
      const response = await axios.get(`https://opnet-piweb.onrender.com/messages/${messageId}/reactions`);
      const { reactions } = response.data;
      const updatedReactions = { ...reactions, [messageId]: reactions };
      setReactions(updatedReactions);
    } catch (error) {
      console.error('Error fetching reactions:', error);
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
                    src={userData?.profileImage}
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
  <div key={message._id} className={message.senderId === currentUser ? "message own" : "message"} onClick={() => handleDeleteMessage(message._id)}>
    {isImageUrl(message.text) ? (
      <><img src={message.text} alt="Sent Image" style={{ maxWidth: "100%", maxHeight: "200px" }} /><span>
                    {message.reactions.map((reaction) => (
                      <span key={reaction.userName}>{reaction.userName} a réagi avec {reaction.reaction}</span>
                    ))}
                  </span></>   
    ) : (
      <><span>{message.text}</span>
  <span>
          {message.reactions.map((reaction) => (
            <span key={reaction.userName}>{reaction.userName} a réagi avec {reaction.reaction}</span>
          ))}
        </span>   </>
    )}
     {reactions[message._id] && typeof reactions[message._id] === 'string' ? (
                    <span className="reaction">{reactions[message._id]}</span>
                  ) : null}
    {/* // afficher ici  le reaction de message  avec get(`https://opnet-piweb.onrender.com/messages/${messageId}/reactions`); */}
    <span>{message.createdAt && formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: fr })}</span>
    
    
    <div className="reactions" style={{ display: 'flex', alignItems: 'center' }}>
       
        <>
          <span className="react-emoji" style={{ cursor: 'pointer', fontSize: '20px', marginRight: '5px' }} onClick={() => handleReact(message._id, "👍")}>👍</span>
          <span className="react-emoji" style={{ cursor: 'pointer', fontSize: '20px', marginRight: '5px' }} onClick={() => handleReact(message._id, "❤️")}>❤️</span>
          <span className="react-emoji" style={{ cursor: 'pointer', fontSize: '20px', marginRight: '5px' }} onClick={() => handleReact(message._id, "😂")}>😂</span>
        </>
      
    </div>
  </div>
))}

              <div ref={scroll}></div>
            </div>
            <div className="chat-sender">
              <div onClick={handleImageUpload}>+</div>
              <InputEmoji placeholder="Ecrire un message" value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>Envoyer</div>
              <input type="file" name="file" id="file" style={{ display: "none" }} ref={imageRef} onChange={handleFileChange} />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Appuyez sur une discussion pour commencer la conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;