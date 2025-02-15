import React, { useState, useEffect, useRef, useContext } from 'react';
import Context from "./globalContext";

const ChatModal = ({ isOpen, onClose, receiver }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageEndRef = useRef(null);
  const { globalcontext } = useContext(Context);

  useEffect(() => {
    if (isOpen && receiver) {
      const roomName = globalcontext.id < receiver.id
          ? `${globalcontext.id}_${receiver.id}`
          : `${receiver.id}_${globalcontext.id}`;


      fetch(`/chat/api/messages/${roomName}`)
        .then(response => response.json())
        .then(data => {
          setMessages(
            data.map(msg => ({
              sender: msg.sender,
              message: msg.message,
              alignment: parseInt(msg.sender) === globalcontext.id ? 'right' : 'left'
            }))
          );
        })
        .catch(error => console.error("Error fetching messages:", error));

      const newSocket = new WebSocket(`ws://localhost/ws/chat/${roomName}/`);

      newSocket.onopen = () => {
        console.log("WebSocket Connected!");
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("New Message Received:", data);
        if (data.room === roomName) {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    sender: data.sender,
                    message: data.message,
                    alignment: (parseInt(data.sender) === globalcontext.id) ? 'right' : 'left'
                }
            ]);
        }
      };

      newSocket.onclose = () => {
        console.log("WebSocket Disconnected!");
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isOpen, receiver, globalcontext.id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && message.trim() !== '') {
      const messageData = {
        sender: `${globalcontext.id}`,
        receiver: receiver.id,
        message: message
      };
      console.log("global context --", globalcontext)
      console.log("Sending Message:", messageData);
      socket.send(JSON.stringify(messageData));
      setMessage('');
    } else {
      console.error("WebSocket is not connected or message is empty!");
    }
  };

  if (!isOpen || !receiver) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.header}>
          <h3>Chat with {receiver.username}</h3>
          <button onClick={onClose} style={styles.closeButton}>X</button>
        </div>
        <div style={styles.chatContainer}>
          <div style={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageBubble,
                  alignSelf: msg.alignment === 'right' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.alignment === 'right' ? '#DCF8C6' : '#FFF'
                }}
              >
                {msg.message}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Fixed input box styling */}
          <div style={styles.inputContainer}>
            <textarea
              style={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} style={styles.sendButton}>Send</button>
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: '90%',
    maxWidth: '500px',
    height: '80vh', // ✅ Fixed height
    backgroundColor: '#fefefe',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  header: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // ✅ Makes the chat box flexible
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1, // ✅ Allows messages to grow but not push modal height
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto', // ✅ Enables scrolling for messages
    maxHeight: '65vh', // ✅ Keeps modal height fixed
    gap: '10px',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
    wordWrap: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textarea: {
    flex: 1,
    resize: 'none',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '40px',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    padding: '10px 15px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};


export default ChatModal;
