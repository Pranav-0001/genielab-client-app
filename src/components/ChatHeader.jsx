import useCreateChatMutation from "@/api/useCreateChatMutation";
import useGetAssistantById from "@/api/useGetAssistantById";
import { setChatId } from "@/redux/chatSlice";
import { socket } from "@/socket/socket";
import { RotateCw, X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatHeader({ style, name }) {
  const chat = sessionStorage.getItem("chat");
  const assistantId = useSelector((state) => state.chat.assistantId);
  const dispatch = useDispatch();
  const createChat = useCreateChatMutation({
    onSuccess: (data) => {
      sessionStorage.setItem("chat", data?.data._id);
      dispatch(setChatId({ chatId: data?.data._id }));
      socket.emit("join_room", data?.data._id);
    },
  });

  return (
    <div
      className={`px-2 md:px-8  md:h-16 h-12 flex justify-between items-center`}
      style={{
        color: style?.secondaryColor,
        backgroundColor: style?.primaryColor,
      }}
    >
      <div className="flex items-center gap-2">
        <img
          src={
            style?.logo ||
            "https://static-00.iconduck.com/assets.00/user-avatar-robot-icon-2048x2048-ehqvhi4d.png"
          }
          alt=""
          className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow"
        />
        <div>
          <h1
            className={`font-semibold text-l  ${
              style?.secondaryColor
                ? `text-[${style?.secondaryColor}]`
                : "text-black"
            }`}
          >
            {name || style?.name}
          </h1>
          <p
            className="text-xs opacity-50"
            style={{ color: style?.secondaryColor }}
          >
            <span className={`h-1 w-1 font-bold`}></span>
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer "
          onClick={() => createChat.mutate({ assistant: assistantId })}
        >
          <RotateCw color={style?.secondaryColor} />
        </button>
        {/* <button className="cursor-pointer ">
          <X color={style?.secondaryColor} />
        </button> */}
      </div>
    </div>
  );
}
