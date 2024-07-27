import React from 'react'
import  WhatsAppLogo  from '../assets/WhatsAppLogo.png';

const ChatBox = () => {
  return (
    <div className="ChatBoxButton">
      <a
        href="https://wa.me/+919441180086">
        <button className="border-0 bg-transparent">
          <img src={WhatsAppLogo} className="chatbox-image" alt="" />
        </button>
      </a>
    </div>
  );
}

export default ChatBox