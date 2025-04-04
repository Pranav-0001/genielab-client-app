import ChatHeader from "@/components/ChatHeader";
import Page from "./Page";
import MessagesWindow from "@/components/MessagesWindow";
import MessageBox from "@/components/MessageBox";
import useCreateChatMutation from "@/api/useCreateChatMutation";
import { useEffect } from "react";
import { setChatId, setAssistantId } from "@/redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import useGetAssistantById from "@/api/useGetAssistantById";
import { socket } from "@/socket/socket";
import RainLoader from "@/components/RainLoader";

export default function Chat() {
  const chat = sessionStorage.getItem("chat");
  const assistantId = useSelector((state) => state.chat.assistantId);
  const url = location.host.split(".")?.[0];
  // const url = "customer";
  const dispatch = useDispatch();
  const createChat = useCreateChatMutation({
    enabled: !!assistantId,
    onSuccess: (data) => {
      sessionStorage.setItem("chat", data?.data._id);
      dispatch(setChatId({ chatId: data?.data._id }));
    },
  });
  useEffect(() => {
    if (!chat && assistantId) {
      createChat.mutate({ assistant: assistantId });
    }
  }, [assistantId]);
  socket.emit("join_room", chat);

  const getAssistantById = useGetAssistantById({
    id: url,
    onSuccess: (data) => {},
  });
  useEffect(() => {
    dispatch(
      setAssistantId({ assistantId: getAssistantById?.data?.data?._id })
    );
  }, [getAssistantById?.data]);

  return (
    <Page>
      {assistantId ? (
        <div className="h-screen flex flex-col">
          <ChatHeader
            style={getAssistantById?.data?.data?.style}
            name={getAssistantById?.data?.data?.name}
          />
          <div className="flex-1 overflow-auto">
            <MessagesWindow style={getAssistantById?.data?.data?.style} />
          </div>
          <div className="p-2 md:p-4">
            <MessageBox style={getAssistantById?.data?.data?.style} />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <RainLoader />
        </div>
      )}
    </Page>
  );
}
