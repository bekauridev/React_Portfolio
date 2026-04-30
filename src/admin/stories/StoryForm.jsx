import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { storiesApi } from "../../api/storiesApi";
import {
  AdminButton,
  AdminCard,
  Field,
  PageHeader,
  StatusMessage,
  TextArea,
  TextInput,
} from "../components/AdminUI";
import { getItem, normalizeStory, validateStory } from "../utils/forms";

const emptyStory = {
  title: "",
  description: "",
  image: "",
};

function toForm(story) {
  return {
    title: story?.title || "",
    description: story?.description || "",
    image: story?.image || "",
  };
}

function StoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState(emptyStory);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const { data: story, isPending: loadingStory, isError, error } = useQuery({
    queryKey: ["admin", "stories", id],
    queryFn: () => storiesApi.get(id),
    select: getItem,
    enabled: isEdit,
  });

  useEffect(() => {
    if (story) setValues(toForm(story));
  }, [story]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? storiesApi.update(id, payload) : storiesApi.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "stories"] });
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      navigate("/admin/stories", { replace: true });
    },
    onError: (err) => setServerError(err?.message || "Failed to save story."),
  });

  const title = useMemo(() => (isEdit ? "Edit story" : "New story"), [isEdit]);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validateStory(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    mutation.mutate(normalizeStory(values, { includeClearedOptional: isEdit }));
  };

  if (isEdit && loadingStory) return <StatusMessage>Loading story...</StatusMessage>;
  if (isEdit && isError) {
    return <StatusMessage type="error">{error?.message || "Story not found."}</StatusMessage>;
  }

  return (
    <section>
      <PageHeader
        eyebrow="Stories"
        title={title}
        description="Story image is required and must be an HTTPS URL. Title and description are optional."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title" error={errors.title}>
              <TextInput value={values.title} onChange={(event) => update("title", event.target.value)} />
            </Field>
            <Field label="Image *" error={errors.image}>
              <TextInput
                value={values.image}
                onChange={(event) => update("image", event.target.value)}
                placeholder="https://example.com/story.jpg"
                required
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <TextArea value={values.description} onChange={(event) => update("description", event.target.value)} rows={5} />
          </Field>

          {values.image && !errors.image && (
            <div className="max-w-xs overflow-hidden rounded-2xl border border-slate-700/50 bg-primary-800/50">
              <img src={values.image} alt="Story preview" className="h-64 w-full object-cover" />
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
            <AdminButton variant="secondary" onClick={() => navigate("/admin/stories")} disabled={mutation.isPending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save story"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </section>
  );
}

export default StoryForm;
