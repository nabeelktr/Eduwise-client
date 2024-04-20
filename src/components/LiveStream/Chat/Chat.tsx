import { socketId } from "@/utils/socket";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  callId: string;
  isUser?:boolean;
};

const Chat = ({ callId }: Props) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<any>([]);
  const { user } = useSelector((state: any) => state.auth);
  const [msg, setMsg] = useState("");
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length) {
      socketId.emit("sendMessage", {
        callId,
        content: { name: user.name, message: msg },
      });
    }
    setMsg("");
  };
  // useEffect(() => {
  //   socketId.on("recieveMessage", (data) => {
  //     if (data.callId === callId) {
  //       setChats((prev: any) => [...prev, data.content]);
  //       if (chatContainerRef.current) {
  //           setTimeout(() => {
  //               chatContainerRef.current?.scrollTo({
  //                 top: chatContainerRef.current.scrollHeight,
  //                 behavior: 'smooth'
  //               });
  //             }, 30);
  //       }
  //     }
  //   });
  // }, [callId]);

  const handleReceiveMessage = (data: any) => {
    if (data.callId === callId) {
      setChats((prev: any) => [...prev, data.content]);
      if (chatContainerRef.current) {
        setTimeout(() => {
          chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 30);
      }
    }
  };

  useEffect(() => {
  
    socketId.on("recieveMessage", handleReceiveMessage);

    return () => {
      socketId.off("recieveMessage", handleReceiveMessage);
  }; 

  }, [callId]);

  return (
    <section
      className=" absolute  right-0 top-0 w-full max-w-xs overflow-y-auto border-l border-gray-700 bg-gray-900 text-sm pb-20"
      style={{ height: "calc(100vh - 80px)" }}
      ref={chatContainerRef}
    >
      <div className="w-full   overflow-y-auto">
        {chats.map((item: any, index: number) => (
          <div className="m-4 flex gap-4" key={index}>
            <div className="w-auto max-w-[900px] rounded-lg bg-gray-800 p-2 ">
              <strong className="mr-2 font-[600] text-green-500">
                {item.name}
              </strong>
              <p className="m-0"> {item.message}</p>
            </div>
          </div>
        ))}
      </div>

      <form
        className="fixed bottom-0 w-full bg-gray-900 p-4"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          name="message"
          placeholder="Send a message...."
          className="rounded-md border-none bg-gray-800 px-16 py-3 text-sm text-white "
        />
      </form>
    </section>
  );
};

export default Chat;
