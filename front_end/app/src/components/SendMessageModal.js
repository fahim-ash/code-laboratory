import React, { useState } from 'react';
import axios from 'axios';

const SendMessageModal = ({ isOpen, onClose, receiver }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            await axios.post('/chat/api/messages/', {
                sender: 'current_user',
                receiver: receiver.username,
                content: message
            });

            alert('Message Sent!');
            setMessage('');
            onClose();
        } catch (error) {
            console.error('Message sending failed', error);
        }
    };

    if (!isOpen) return null;

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
