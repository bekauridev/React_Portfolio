import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { goodiesApi } from "../../api/goodiesApi";
import { AdminButton, AdminCard, Field, PageHeader, StatusMessage, TextArea, TextInput } from "../components/AdminUI";
import { getItem, normalizeGoodie, validateGoodie } from "../utils/forms";

const emptyGoodie = {
  name: "",
  description: "",
  logo: "",
  url: "",
  category: "",
};

function toForm(goodie) {
  return {
    name: goodie?.name || "",
    description: goodie?.description || "",
    logo: goodie?.logo || "",
    url: goodie?.url || "",
    category: goodie?.category || "",
  };
}

function GoodieForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState(emptyGoodie);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const { data: goodie, isPending: loadingGoodie, isError, error } = useQuery({
    queryKey: ["admin", "goodies", id],
    queryFn: () => goodiesApi.get(id),
    select: getItem,
    enabled: isEdit,
  });

  useEffect(() => {
    if (goodie) setValues(toForm(goodie));
  }, [goodie]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? goodiesApi.update(id, payload) : goodiesApi.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "goodies"] });
      queryClient.invalidateQueries({ queryKey: ["goodies"] });
      navigate("/admin/goodies", { replace: true });
    },
    onError: (err) => setServerError(err?.message || "Failed to save goodie."),
  });

  const title = useMemo(() => (isEdit ? "Edit goodie" : "New goodie"), [isEdit]);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validateGoodie(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    mutation.mutate(normalizeGoodie(values));
  };

  if (isEdit && loadingGoodie) return <StatusMessage>Loading goodie...</StatusMessage>;
  if (isEdit && isError) return <StatusMessage type="error">{error?.message || "Goodie not found."}</StatusMessage>;

  return (
    <section>
      <PageHeader
        eyebrow="Goodies"
        title={title}
        description="All fields are required. Logo and destination URL must use HTTPS."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name *" error={errors.name}>
              <TextInput value={values.name} onChange={(event) => update("name", event.target.value)} required />
            </Field>
            <Field label="Category *" error={errors.category}>
              <TextInput value={values.category} onChange={(event) => update("category", event.target.value)} required />
            </Field>
            <Field label="Logo *" error={errors.logo}>
              <TextInput value={values.logo} onChange={(event) => update("logo", event.target.value)} placeholder="https://example.com/logo.svg" required />
            </Field>
            <Field label="URL *" error={errors.url}>
              <TextInput value={values.url} onChange={(event) => update("url", event.target.value)} placeholder="https://example.com" required />
            </Field>
          </div>

          <Field label="Description *" error={errors.description}>
            <TextArea value={values.description} onChange={(event) => update("description", event.target.value)} required rows={6} />
          </Field>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
            <AdminButton variant="secondary" onClick={() => navigate("/admin/goodies")} disabled={mutation.isPending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save goodie"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </section>
  );
}

export default GoodieForm;
