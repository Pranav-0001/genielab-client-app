import { useQuery } from "@tanstack/react-query";
import { api } from "./apiClient";

export default function useGetAssistantById(params) {
  async function getAssistantById() {
    const response = await api({
      url: `/api/v1/assistant/${params?.id}/info`,
      method: "GET",
    });
    return response.data;
  }
  return useQuery({
    queryKey: ["getAssistantById", params?.id], // Ensures cache is properly scoped
    queryFn: getAssistantById,
    ...params, // Spreading params for additional options like `enabled`, `staleTime`, etc.
  });
}
