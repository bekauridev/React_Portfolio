import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { educationApi } from "../../api/educationApi";
import {
  AdminButton,
  AdminCard,
  Field,
  PageHeader,
  StatusMessage,
  TextArea,
  TextInput,
} from "../components/AdminUI";
import { getItem, normalizeEducation, validateEducation } from "../utils/forms";

const emptyEducationItem = {
  date: "",
  title: "",
  description: "",
  learningPlace: "",
  learningPlaceLink: "",
  order: 0,
};

function toForm(item) {
  return {
    date: item?.date || "",
    title: item?.title || "",
    description: item?.description || "",
    learningPlace: item?.learningPlace || "",
    learningPlaceLink: item?.learningPlaceLink || "",
    order: item?.order ?? 0,
  };
}

function EducationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState(emptyEducationItem);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const { data: item, isPending: loadingItem, isError, error } = useQuery({
    queryKey: ["admin", "education", id],
    queryFn: () => educationApi.get(id),
    select: getItem,
    enabled: isEdit,
  });

  useEffect(() => {
    if (item) setValues(toForm(item));
  }, [item]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? educationApi.update(id, payload) : educationApi.create(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "education"] });
      queryClient.invalidateQueries({ queryKey: ["education"] });
      navigate("/admin/education", { replace: true });
    },
    onError: (err) => setServerError(err?.message || "Failed to save education item."),
  });

  const title = useMemo(() => (isEdit ? "Edit education item" : "New education item"), [isEdit]);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    const nextErrors = validateEducation(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    mutation.mutate(normalizeEducation(values, { includeClearedOptional: isEdit }));
  };

  if (isEdit && loadingItem) return <StatusMessage>Loading education item...</StatusMessage>;
  if (isEdit && isError) {
    return <StatusMessage type="error">{error?.message || "Education item not found."}</StatusMessage>;
  }

  return (
    <section>
      <PageHeader
        eyebrow="Education"
        title={title}
        description="Date, title, description, learning place, and numeric display order are required. Learning place link is optional HTTPS only."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Date *" error={errors.date}>
              <TextInput
                value={values.date}
                onChange={(event) => update("date", event.target.value)}
                placeholder="2020-2023"
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
            <Field label="Title *" error={errors.title}>
              <TextInput
                value={values.title}
                onChange={(event) => update("title", event.target.value)}
                placeholder="Diploma in Web Technology"
                required
              />
            </Field>
            <Field label="Learning Place *" error={errors.learningPlace}>
              <TextInput
                value={values.learningPlace}
                onChange={(event) => update("learningPlace", event.target.value)}
                placeholder="LEPL - College Gldani"
                required
              />
            </Field>
          </div>

          <Field label="Description *" error={errors.description}>
            <TextArea
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
              required
              rows={6}
            />
          </Field>

          <Field label="Learning Place Link" error={errors.learningPlaceLink}>
            <TextInput
              value={values.learningPlaceLink}
              onChange={(event) => update("learningPlaceLink", event.target.value)}
              placeholder="https://example.com"
            />
          </Field>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
            <AdminButton variant="secondary" onClick={() => navigate("/admin/education")} disabled={mutation.isPending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save education item"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </section>
  );
}

export default EducationForm;
