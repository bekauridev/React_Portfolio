import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setGoodies, setStatus, setError } from "./goodiesSlice";

const API_URL = import.meta.env.VITE_API_V1_BASE_URL;

const fetchGoodies = async () => {
  const response = await fetch(`${API_URL}/goodies`);
  if (!response.ok) throw new Error("Failed to fetch goodies");
  const json = await response.json();
  return json.data ?? [];
};

const normalizeGoodies = (goodies = []) =>
  goodies.map((goodie) => ({
    id: goodie._id ?? goodie.id,
    name: goodie.name ?? "Untitled",
    description: goodie.description ?? "",
    logo: goodie.logo,
    url: goodie.url,
    category: goodie.category ?? "Other",
  }));

export default function useGoodiesQuery(options = {}) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["goodies"],
    queryFn: fetchGoodies,
    select: normalizeGoodies,
    staleTime: 1000 * 60 * 5,
    ...options,
    onSuccess: (data) => {
      dispatch(setGoodies(data));
      dispatch(setError(null));
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      dispatch(setError(error?.message ?? "Failed to load goodies"));
      options?.onError?.(error);
    },
  });

  useEffect(() => {
    const statusMap = {
      pending: "loading",
      success: "succeeded",
      error: "failed",
      idle: "idle",
    };
    dispatch(setStatus(statusMap[query.status] || "idle"));
  }, [dispatch, query.status]);

  return query;
}
