import React, { useEffect, useState } from 'react';
import { useChannel } from "./hooks/useAblyReactEffect";

const AblyWs = () => {
  let inputBox: any = null;
  let messageEnd: any = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<string[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably]: any = useChannel("chat-demo", (message: string) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  }

  const handleFormSubmission = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    sendChatMessage(messageText);
  }

  const messages = receivedMessages.map((message: any, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return <span key={index} className='text-5xl font-mono' data-author={author}>{message.data}</span>;
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col'>
            {messages}
            <div ref={(element) => { messageEnd = element; }}></div>
        </div>
        <div className='flex flex-col'>
            <textarea
                ref={(element) => { inputBox = element; }}
                value={messageText}
                placeholder="Type a message..."
                onChange={e => setMessageText(e.target.value)}
                className='p-5 text-gray'
            ></textarea>
            <button type="submit" className='myBtn' onClick={handleFormSubmission} disabled={messageTextIsEmpty}>Send</button>
        </div>
    </div>
        // <div ref={(element) => { messageEnd = element; }}></div>
    
  )
}

export default AblyWs