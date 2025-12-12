import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setBlogs, setError, setStatus } from "./blogsSlice";
import thumbnailFallback from "../../assets/images/project-images/placeholder.png";

const API_URL = import.meta.env.VITE_API_V1_BASE_URL;

const fetchBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs`);
  if (!response.ok) throw new Error("Failed to fetch blogs");
  const json = await response.json();
  return json.data ?? [];
};

const normalizeBlogs = (blogs = []) =>
  blogs.map((blog) => ({
    id: blog._id ?? blog.id ?? blog.slug ?? blog.title,
    title: blog.title ?? "Untitled",
    slug: blog.slug ?? blog.id,
    excerpt: blog.excerpt ?? "",
    content: blog.content ?? "",
    coverImage: blog.coverImage ?? thumbnailFallback,
    gallery: blog.gallery ?? [],
    tags: blog.tags ?? [],
    category: blog.category ?? "General",
    author: blog.author ?? "Anonymous",
    status: blog.status ?? "draft",
    isFeatured: Boolean(blog.isFeatured),
  }));

export default function useBlogsQuery(options = {}) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    select: normalizeBlogs,
    staleTime: 1000 * 60 * 5,
    ...options,
    onSuccess: (data) => {
      dispatch(setBlogs(data));
      dispatch(setError(null));
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      dispatch(setError(error?.message ?? "Failed to load blogs"));
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
