import EmojiPicker from "emoji-picker-react";
import { useState, useEffect, use } from "react";
import { Laugh, Send } from "lucide-react";
import useSendMessageMutation from "@/api/useSentMessageMutation";
import { useSelector } from "react-redux";
import useGetAllMessagesByChatId from "@/api/useGetAllMessagesByChatId";

export default function MessageBox({
  handleChange = () => {},
  handleSend = () => {},
  style,
}) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Update parent component when message changes
  useEffect(() => {
    handleChange(message);
  }, [message, handleChange]);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };
  const chatId = useSelector((state) => state.chat.chatId);
  const getAllMessages = useGetAllMessagesByChatId({
    id: chatId,
    enabled: false,
  });
  const sendMessage = useSendMessageMutation({
    id: chatId,
    onSuccess: (data) => {
      getAllMessages.refetch();
    },
  });

  const onSendMessage = () => {
    if (message.trim()) {
      handleSend(message);
      sendMessage.mutate({ message });
      setMessage(""); // Clear message after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <>
      <div className="relative w-full px-4">
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-10">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              searchDisabled={false}
              previewConfig={{ showPreview: false }}
              style={{maxWidth: "300px"}}
              skinTonesDisabled
              searchPlaceHolder="Search emojis..."
            />
          </div>
        )}

        <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
          <button
            type="button"
            className="text-gray-500 mr-2 focus:outline-none hover:text-gray-700 cursor-pointer"
            onClick={toggleEmojiPicker}
          >
            <Laugh color={showEmojiPicker ? "black" : "gray"} />
          </button>

          <input
            type="text"
            value={message}
            onChange={onMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter message"
            className="flex-grow bg-transparent outline-none h-8"
          />

          <button
            type="button"
            className="text-gray-500 ml-2 focus:outline-none hover:text-gray-700"
            onClick={onSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
