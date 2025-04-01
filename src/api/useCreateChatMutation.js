import { useMutation } from "@tanstack/react-query";
import { api } from "./apiClient";

export default function useCreateChatMutation(params) {
  const createChat = async (data) => {
    const res = await api({
      method: "post",
      url: "/api/v1/chats",
      data,
    });
    return res.data;
  };

  return useMutation({
    mutationFn: createChat,
    ...params,
  });
}