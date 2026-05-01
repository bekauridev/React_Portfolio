import { useQuery } from "@tanstack/react-query";
import { educationApi } from "../../api/educationApi";

const normalizeEducation = (items = []) =>
  items.map((item) => ({
    id: item._id ?? item.id ?? `${item.title}-${item.date}`,
    date: item.date ?? "",
    title: item.title ?? "",
    description: item.description ?? "",
    learningPlace: item.learningPlace ?? "",
    learningPlaceLink: item.learningPlaceLink ?? "",
  }));

export default function useEducationQuery() {
  return useQuery({
    queryKey: ["education"],
    queryFn: () => educationApi.list(),
    select: (response) =>
      normalizeEducation(Array.isArray(response?.data) ? response.data : []),
    staleTime: 1000 * 60 * 5,
  });
}
