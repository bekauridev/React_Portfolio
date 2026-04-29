import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { projectsApi } from "../../api/projectsApi";
import { AdminButton, AdminCard, ArrayField, Field, PageHeader, StatusMessage, TextArea, TextInput } from "../components/AdminUI";
import { getItem, normalizeProject, validateProject } from "../utils/forms";

const emptyProject = {
  title: "",
  slogan: "",
  description: "",
  technologies: [""],
  gallery: [""],
  thumbnail: "",
  cardImage: "",
  coverImage: "",
  liveDemo: "",
  gitRepo: "",
  database: "",
};

function toForm(project) {
  return {
    ...emptyProject,
    title: project?.title || "",
    slogan: project?.slogan || "",
    description: project?.description || "",
    technologies: project?.technologies?.length ? project.technologies : [""],
    gallery: project?.gallery?.length ? project.gallery : [""],
    thumbnail: project?.thumbnail || "",
    cardImage: project?.cardImage || "",
    coverImage: project?.coverImage || "",
    liveDemo: project?.liveDemo || "",
    gitRepo: project?.gitRepo || "",
    database: project?.database || "",
  };
}

function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState(emptyProject);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const { data: project, isPending: loadingProject, isError, error } = useQuery({
    queryKey: ["admin", "projects", id],
    queryFn: () => projectsApi.get(id),
    select: getItem,
    enabled: isEdit,
  });

  useEffect(() => {
    if (project) setValues(toForm(project));
  }, [project]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? projectsApi.update(id, payload) : projectsApi.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/admin/projects", { replace: true });
    },
    onError: (err) => setServerError(err?.message || "Failed to save project."),
  });

  const title = useMemo(() => (isEdit ? "Edit project" : "New project"), [isEdit]);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validateProject(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    mutation.mutate(normalizeProject(values));
  };

  if (isEdit && loadingProject) return <StatusMessage>Loading project...</StatusMessage>;
  if (isEdit && isError) return <StatusMessage type="error">{error?.message || "Project not found."}</StatusMessage>;

  return (
    <section>
      <PageHeader
        eyebrow="Projects"
        title={title}
        description="Required fields are title, description, and at least one technology. Image/demo URLs must use HTTPS."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title *" error={errors.title}>
              <TextInput value={values.title} onChange={(event) => update("title", event.target.value)} required />
            </Field>
            <Field label="Slogan" error={errors.slogan}>
              <TextInput value={values.slogan} onChange={(event) => update("slogan", event.target.value)} />
            </Field>
          </div>

          <Field label="Description *" error={errors.description}>
            <TextArea value={values.description} onChange={(event) => update("description", event.target.value)} required rows={7} />
          </Field>

          <ArrayField label="Technologies *" values={values.technologies} onChange={(next) => update("technologies", next)} error={errors.technologies} placeholder="React" />
          <ArrayField label="Gallery" values={values.gallery} onChange={(next) => update("gallery", next)} error={errors.gallery} placeholder="https://example.com/image.jpg" hint="Optional HTTPS image URLs." />

          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["thumbnail", "Thumbnail"],
              ["cardImage", "Card Image"],
              ["coverImage", "Cover Image"],
              ["liveDemo", "Live Demo"],
              ["gitRepo", "Git Repo"],
              ["database", "Database preview"],
            ].map(([field, label]) => (
              <Field key={field} label={label} error={errors[field]}>
                <TextInput value={values[field]} onChange={(event) => update(field, event.target.value)} placeholder={field === "gitRepo" ? "https://github.com/user/repo" : "https://example.com"} />
              </Field>
            ))}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
            <AdminButton variant="secondary" onClick={() => navigate("/admin/projects")} disabled={mutation.isPending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save project"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </section>
  );
}

export default ProjectForm;
