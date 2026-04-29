import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { blogsApi } from "../../api/blogsApi";
import { AdminButton, AdminCard, ArrayField, CheckboxField, Field, PageHeader, SelectInput, StatusMessage, TextArea, TextInput } from "../components/AdminUI";
import { BLOG_STATUSES, getItem, normalizeBlog, validateBlog } from "../utils/forms";

const emptyBlog = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  gallery: [""],
  tags: [""],
  category: "General",
  author: "",
  status: "draft",
  isFeatured: false,
};

function toForm(blog) {
  return {
    ...emptyBlog,
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    coverImage: blog?.coverImage || "",
    gallery: blog?.gallery?.length ? blog.gallery : [""],
    tags: blog?.tags?.length ? blog.tags : [""],
    category: blog?.category || "General",
    author: blog?.author || "",
    status: blog?.status || "draft",
    isFeatured: Boolean(blog?.isFeatured),
  };
}

function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState(emptyBlog);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const { data: blog, isPending: loadingBlog, isError, error } = useQuery({
    queryKey: ["admin", "blogs", id],
    queryFn: () => blogsApi.get(id),
    select: getItem,
    enabled: isEdit,
  });

  useEffect(() => {
    if (blog) setValues(toForm(blog));
  }, [blog]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? blogsApi.update(id, payload) : blogsApi.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/admin/blogs", { replace: true });
    },
    onError: (err) => setServerError(err?.message || "Failed to save blog."),
  });

  const title = useMemo(() => (isEdit ? "Edit blog" : "New blog"), [isEdit]);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validateBlog(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    mutation.mutate(normalizeBlog(values));
  };

  if (isEdit && loadingBlog) return <StatusMessage>Loading blog...</StatusMessage>;
  if (isEdit && isError) return <StatusMessage type="error">{error?.message || "Blog not found."}</StatusMessage>;

  return (
    <section>
      <PageHeader
        eyebrow="Blogs"
        title={title}
        description="Required fields are title, content, and author. Excerpt is limited to 300 characters."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title *" error={errors.title}>
              <TextInput value={values.title} onChange={(event) => update("title", event.target.value)} required />
            </Field>
            <Field label="Author *" error={errors.author}>
              <TextInput value={values.author} onChange={(event) => update("author", event.target.value)} required />
            </Field>
            <Field label="Category" error={errors.category}>
              <TextInput value={values.category} onChange={(event) => update("category", event.target.value)} placeholder="General" />
            </Field>
            <Field label="Status" error={errors.status}>
              <SelectInput value={values.status} onChange={(event) => update("status", event.target.value)}>
                {BLOG_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <Field label={`Excerpt (${values.excerpt.length}/300)`} error={errors.excerpt}>
            <TextArea value={values.excerpt} onChange={(event) => update("excerpt", event.target.value)} rows={3} maxLength={300} />
          </Field>

          <Field label="Content *" error={errors.content}>
            <TextArea value={values.content} onChange={(event) => update("content", event.target.value)} required rows={12} />
          </Field>

          <Field label="Cover Image" error={errors.coverImage}>
            <TextInput value={values.coverImage} onChange={(event) => update("coverImage", event.target.value)} placeholder="https://example.com/cover.jpg" />
          </Field>

          <ArrayField label="Gallery" values={values.gallery} onChange={(next) => update("gallery", next)} error={errors.gallery} placeholder="https://example.com/image.jpg" />
          <ArrayField label="Tags" values={values.tags} onChange={(next) => update("tags", next)} placeholder="Node.js" />
          <CheckboxField label="Feature this blog" checked={values.isFeatured} onChange={(checked) => update("isFeatured", checked)} />

          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
            <AdminButton variant="secondary" onClick={() => navigate("/admin/blogs")} disabled={mutation.isPending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save blog"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </section>
  );
}

export default BlogForm;
