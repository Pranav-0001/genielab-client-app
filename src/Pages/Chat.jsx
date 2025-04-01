import ChatHeader from "@/components/ChatHeader";
import Page from "./Page";
import MessagesWindow from "@/components/MessagesWindow";
import MessageBox from "@/components/MessageBox";
import useCreateChatMutation from "@/api/useCreateChatMutation";
import { useEffect } from "react";
import { setChatId } from "@/redux/chatSlice";
import { useDispatch } from "react-redux";
import useGetAssistantById from "@/api/useGetAssistantById";

export default function Chat() {
  const chat = sessionStorage.getItem("chat");
  const dispatch = useDispatch();
  const createChat = useCreateChatMutation({
    onSuccess: (data) => {
      console.log(data);
      sessionStorage.setItem("chat", data?.data._id);
      dispatch(setChatId({ chatId: data?.data._id }));
    },
  });
  useEffect(() => {
    if (!chat) {
      createChat.mutate({ assistant: "67e7f654e58fcc7f014fc5c2" });
    }
  }, [chat]);

  const getAssistantById = useGetAssistantById({
    id: "67e7f654e58fcc7f014fc5c2",
  });

  return (
    <Page>
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
    </Page>
  );
}
