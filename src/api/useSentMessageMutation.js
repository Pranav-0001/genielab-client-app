import { useMutation } from "@tanstack/react-query";
import { api } from "./apiClient";

export default function useSendMessageMutation(params) {
  const sendMessage = async (data) => {
    const res = await api({
      method: "post",
      url: `/api/v1/chats/${params?.id}/messages`,
      data,
    });
    return res.data;
  };

  return useMutation({
    mutationFn: sendMessage,
    ...params,
  });
}
