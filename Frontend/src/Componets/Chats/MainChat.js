import React from "react";
import io from "socket.io-client";
import Chat from "./Chats";

function MainChat() {
    let socket = io.connect("http://localhost:3002");
    let courseId = sessionStorage.getItem('CourseID');
    let userName = sessionStorage.getItem('userName');
    return (
        <>
            <div className="mt-8 px-4 sm:px-10">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full h-98 border p-4 bg-transparent rounded-md shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-white text-center">Chat</h3>
                            <Chat
                                socket={socket}
                                courseId={courseId}
                                userName={userName}
                            />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainChat;
