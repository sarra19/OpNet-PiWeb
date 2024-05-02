/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import { IoSend } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";


const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    const userMessage = message.trim();
    if (!userMessage) {
      alert("Please enter a message");
      return;
    }
    setConversations(prevConversations => [
      ...prevConversations,
      { role: "user", content: userMessage },
    ]);
    setIsTyping(true);
    try {
      const response = await axios.post('http://localhost:5000/ask', { message: userMessage });
      const botMessage = response.data.message;
      setConversations(prevConversations => [
        ...prevConversations,
        { role: "assistant", content: botMessage },
      ]);
    } catch (error) {
      console.error("Error sending message to server: ", error);
      alert("Error sending message to server");
    }
    setIsTyping(false);
    setMessage("");
  };

  const styles = {
    chatbotContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    conversation: {
      flex: "1",
      marginBottom: "20px",
      overflowY: "auto",
    },
    message: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      maxWidth: "80%",
    },
    userMessage: {
      justifyContent: "flex-end",
    },
    assistantMessage: {
      justifyContent: "flex-start",
    },
    typingMessage: {
      marginLeft: "8px",
    },
    avatar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "50%",
      marginRight: "8px",
    },
    content: {
      backgroundColor: "#fff",
      padding: "8px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    inputArea: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: "1",
      marginRight: "8px",
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
    },
    sendButton: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      cursor: "pointer",
    },
  };

  return (
    <DashboardLayout>
      <card>
       <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={1}
          mt={1}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            Bienvenue !
          </MDTypography>
        </MDBox>
    <div style={styles.chatbotContainer}>
      <div style={styles.conversation}>
        {conversations.map((entry, index) => (
          <div
            style={{
              ...styles.message,
              ...(entry.role === 'user' ? styles.userMessage : styles.assistantMessage),
            }}
            key={index}
          >
            <div style={styles.avatar}>{entry.role === 'user' ? 'You' : <FaRobot />}</div>
            <div style={styles.content}>{entry.content}</div>
          </div>
        ))}
        {isTyping && (
          <div style={{ ...styles.message, ...styles.typingMessage }}>
            <div style={styles.avatar}><FaRobot /></div>
            <div style={styles.content}><strong>AI is typing...</strong></div>
          </div>
        )}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          <IoSend />
        </button>
      </div>
    </div>
    </card>
    </DashboardLayout>
  );
};

export default ChatBot;