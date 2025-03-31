import ChatHeader from "@/components/ChatHeader";
import Page from "./Page";
import MessagesWindow from "@/components/MessagesWindow";
import MessageBox from "@/components/MessageBox";

export default function Chat() {
    return (
      <Page>
        <div className="h-screen flex flex-col">
          <ChatHeader />
          <div className="flex-1 overflow-auto">
            <MessagesWindow />
          </div>
          <div className="p-2 md:p-4">
            <MessageBox />
          </div>
        </div>
      </Page>
    );
  }
  