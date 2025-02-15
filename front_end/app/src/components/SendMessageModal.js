import React, { useState, useEffect, useContext } from 'react';
import Context from "./globalContext";
const SendMessageModal = ({ isOpen, onClose, receiver }) => {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const {globalcontext, setGlobalContext} = useContext(Context);



    useEffect(() => {
        if (isOpen && receiver) {
            const newSocket = new WebSocket(`ws://localhost/ws/chat/`);

            newSocket.onopen = () => {
                console.log("✅ WebSocket Connected!");
            };
            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(" New Message:", data.sender, data.message);
            };
            newSocket.onclose = () => {
                console.log("❌ WebSocket Disconnected!");
            };
            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [isOpen, receiver]);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const messageData = {
                sender: '1',
                receiver: receiver.id,
                message: message
            };
            console.log("message of all--:", globalcontext)
            socket.send(JSON.stringify(messageData));
            setMessage('');
            // onClose();
        } else {
            console.error("WebSocket is not connected!");
        }
    };

    if (!isOpen || !receiver) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Send Message to {receiver.username}</h3>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SendMessageModal;
