import React, { useEffect, useState } from "react";
import { useRef } from "react";

function Chat({ socket, courseId,userName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
        author: userName,
      };
      await socket.emit("send_message", { courseId, messageData });
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messageList changes
  }, [messageList]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when component first renders
  }, []);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
      scrollToBottom();
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join_course", courseId);
  }, [socket, courseId]);

  return (
    <div className="flex flex-col h-[300px]">
      {/* <div className="bg-gray-800 p-4 text-white"> */}
        {/* <p className="text-lg font-bold text-center"> {groupName} Community</p> */}
      {/* </div> */}
      <div
        className="flex-1 overflow-y-auto p-4"
        ref={chatContainerRef}
        style={{ scrollBehavior: "smooth",overflow:'overlay' }}
      >
        {messageList.length === 0 && <h1 className="text-white text-center">no message yet</h1>} 
        {messageList.map((messageContent, index) => {
          return (
            <div
              key={index}
              className={`my-2 ${
                messageContent.author === "User" ? "self-end" : "self-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  messageContent.author === userName ? "bg-blue-300" : "bg-white"
                }`}
                style={{background: messageContent.author === userName ? "#9c27b0" : "#d166e3" ,color:'#fff'}}
              >
                <p>{messageContent.message}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-white-500">{messageContent.time}</p>
                  <p className="text-xs font-semibold">
                    {messageContent.author}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-gray-800 p-4" style={{height:'75px'}}>
        <div className="flex">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            className="flex-1 p-2 mr-2 border rounded"
            style={{width:'400px',color:'#000'}}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded"
            style={{background:'#9135db'}}
          >
            &#9658;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
