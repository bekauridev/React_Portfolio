import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import thumbnailFallback from "../../assets/images/project-images/placeholder.png";
import { setError, setProjects, setStatus } from "./projectsSlice";

const API_URL = import.meta.env.VITE_API_V1_BASE_URL;

const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const json = await response.json();
  return json.data ?? [];
};

const normalizeProjects = (projects = []) =>
  projects.map((project) => ({
    id: project._id ?? project.id,
    slug: project.slug,
    name: project.title ?? project.name ?? "Untitled project",
    slogan: project.slogan ?? "",
    description: project.description ?? "",
    technologies: project.technologies ?? [],
    gallery: project.gallery ?? [],
    thumbnail: project.thumbnail ?? project.cardImage ?? thumbnailFallback,
    cardImage: project.cardImage ?? project.thumbnail ?? thumbnailFallback,
    coverImage:
      project.coverImage ?? project.cardImage ?? project.thumbnail ?? thumbnailFallback,
    liveDemo: project.liveDemo,
    gitRepo: project.gitRepo,
    database: project.database,
  }));

export default function useProjectsQuery(options = {}) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    select: (data) => normalizeProjects(data),
    staleTime: 1000 * 60 * 5,
    ...options,
    onSuccess: (data) => {
      dispatch(setProjects(data));
      dispatch(setError(null));
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      dispatch(setError(error?.message ?? "Failed to load projects"));
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
