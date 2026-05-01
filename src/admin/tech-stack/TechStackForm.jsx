import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { techStackApi } from "../../api/techStackApi";
import {
  AdminButton,
  AdminCard,
  Field,
  PageHeader,
  StatusMessage,
  TextInput,
} from "../components/AdminUI";
import { getItem, isHttpsUrl, normalizeTechStack, validateTechStack } from "../utils/forms";

const emptyTechStackItem = {
  name: "",
  iconUrl: "",
  order: 0,
};

function toForm(item) {
  return {
    name: item?.name || "",
    iconUrl: item?.iconUrl || "",
    order: item?.order ?? 0,
  };
}

function TechStackForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState(emptyTechStackItem);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const { data: item, isPending: loadingItem, isError, error } = useQuery({
    queryKey: ["admin", "tech-stack", id],
    queryFn: () => techStackApi.get(id),
    select: getItem,
    enabled: isEdit,
  });

  useEffect(() => {
    if (item) setValues(toForm(item));
  }, [item]);

  useEffect(() => {
    setPreviewLoaded(false);
  }, [values.iconUrl]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? techStackApi.update(id, payload) : techStackApi.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tech-stack"] });
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      navigate("/admin/tech-stack", { replace: true });
    },
    onError: (err) => setServerError(err?.message || "Failed to save tech stack item."),
  });

  const title = useMemo(() => (isEdit ? "Edit tech stack item" : "New tech stack item"), [isEdit]);
  const cleanIconUrl = values.iconUrl.trim();
  const canShowPreview = Boolean(cleanIconUrl) && isHttpsUrl(cleanIconUrl);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validateTechStack(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    mutation.mutate(normalizeTechStack(values));
  };

  if (isEdit && loadingItem) return <StatusMessage>Loading tech stack item...</StatusMessage>;
  if (isEdit && isError) {
    return <StatusMessage type="error">{error?.message || "Tech stack item not found."}</StatusMessage>;
  }

  return (
    <section>
      <PageHeader
        eyebrow="Tech Stack"
        title={title}
        description="Name, HTTPS icon URL, and numeric display order are required. Icons are rendered as external images."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name *" error={errors.name}>
              <TextInput
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="React"
                required
              />
            </Field>
            <Field label="Order *" error={errors.order}>
              <TextInput
                type="number"
                min="0"
                step="1"
                value={values.order}
                onChange={(event) => update("order", event.target.value)}
                required
              />
            </Field>
          </div>

          <Field label="Icon URL *" error={errors.iconUrl}>
            <TextInput
              value={values.iconUrl}
              onChange={(event) => update("iconUrl", event.target.value)}
              placeholder="https://example.com/react-icon.svg"
              required
            />
          </Field>

          {canShowPreview && (
            <img
              src={cleanIconUrl}
              alt=""
              className="hidden"
              onLoad={() => setPreviewLoaded(true)}
              onError={() => setPreviewLoaded(false)}
            />
          )}

          {canShowPreview && previewLoaded && (
            <div className="rounded-2xl border border-slate-700/50 bg-primary-900/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Icon Preview
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-800/70 ring-1 ring-white/5">
                  <img
                    src={cleanIconUrl}
                    alt="Tech stack icon preview"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Preview uses the external image URL exactly as submitted.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
            <AdminButton variant="secondary" onClick={() => navigate("/admin/tech-stack")} disabled={mutation.isPending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save tech stack item"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </section>
  );
}

export default TechStackForm;
