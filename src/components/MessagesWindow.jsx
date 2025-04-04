import useGetAllMessagesByChatId from "@/api/useGetAllMessagesByChatId";
import useSendMessageMutation from "@/api/useSentMessageMutation";
import { socket } from "@/socket/socket";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function MessagesWindow({ style }) {
  const chatId = useSelector((state) => state.chat.chatId);
  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false);

  const getMessages = useGetAllMessagesByChatId({
    id: chatId,
    enabled: !!chatId,
  });

  const getAllMessages = useGetAllMessagesByChatId({
    id: chatId,
    enabled: false,
  });

  const sendMessage = useSendMessageMutation({
    id: chatId,
    onSuccess: (data) => {
      setTyping(true);
      getAllMessages.refetch();
    },
  });

  socket.on("NEW_MESSAGE", () => {
    getAllMessages.refetch();
    setTyping(false);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on initial load and whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [getMessages?.data]);

  const SuggestionButton = ({ suggestion, onClick }) => {
    return (
      <button
        className={`border p-1 rounded-md text-sm cursor-pointer`}
        onClick={onClick}
        style={{
          borderColor: `${style?.primaryColor}`,
          borderWidth: "1px",
          color: `${style?.primaryColor}`,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = style?.primaryColor;
          e.target.style.color = style?.secondaryColor;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = style?.primaryColor;
        }}
      >
        {suggestion}
      </button>
    );
  };

  return (
    <div className="h-full overflow-auto p-4 bg-gray-200 relative">
      {getMessages?.data ? (
        getMessages?.data?.data.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded-md mb-2 w-fit max-w-xs ${
              message.createdByType === "user" ? " self-end ml-auto" : ""
            }`}
            style={{
              backgroundColor:
                message.createdByType === "user"
                  ? style?.primaryColor
                  : style?.secondaryColor,
              alignSelf:
                message.createdByType === "user" ? "flex-end" : "flex-start",
              color:
                message.createdByType === "user"
                  ? style?.secondaryColor
                  : style?.primaryColor,
            }}
          >
            {message.message}
          </div>
        ))
      ) : (
        <></>
      )}
      {typing&&<div
        className="flex items-center justify-start h-4 w-fit px-3 py-4 rounded"
        style={{
          color: style?.primaryColor,
          backgroundColor: style?.secondaryColor,
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full bg-black mr-1 last:mr-0 animate-pulse`}
            style={{
              animationDelay: `${(index - 2) * 0.2}s`,
              animationDuration: "1.5s",
            }}
          ></div>
        ))}
      </div>}
      {getMessages?.data?.data?.length < 2 && (
        <div className="absolute bottom-5 right-5 flex flex-col md:flex-row gap-2">
          {style?.suggestedMessages
            ?.filter((msg) => msg)
            ?.map((msg) => (
              <SuggestionButton
                suggestion={msg}
                onClick={() => sendMessage.mutate({ message: msg })}
              />
            ))}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
