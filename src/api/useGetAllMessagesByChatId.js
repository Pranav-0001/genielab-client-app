import { useQuery } from "@tanstack/react-query";
import { api } from "./apiClient";

export default function useGetAllMessagesByChatId(params) {
  const userId = params.userId;
  async function getAllMessagesByChatId() {
    const response = await api({
      url: `/api/v1/chats/${params?.id}/messages`,
      method: "GET",
    });
    return response.data;
  }
  return useQuery({
    queryKey: ["getAllMessagesByChatId", params?.id], // Ensures cache is properly scoped
    queryFn: getAllMessagesByChatId,
    ...params, // Spreading params for additional options like `enabled`, `staleTime`, etc.
  });
}
