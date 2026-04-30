import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workStatusApi } from "../../api/workStatusApi";
import {
  AdminButton,
  AdminCard,
  CheckboxField,
  ConfirmDialog,
  Field,
  PageHeader,
  StatusMessage,
  TextInput,
} from "../components/AdminUI";
import { getSingleton, normalizeWorkStatus, validateWorkStatus } from "../utils/forms";

const defaultStatus = {
  isOpenToWork: true,
  label: "Open to new projects",
};

function toForm(status) {
  return {
    isOpenToWork:
      typeof status?.isOpenToWork === "boolean"
        ? status.isOpenToWork
        : defaultStatus.isOpenToWork,
    label: status?.label || defaultStatus.label,
  };
}

function WorkStatus() {
  const queryClient = useQueryClient();
  const [values, setValues] = useState(defaultStatus);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: currentStatus, isPending, isError, error } = useQuery({
    queryKey: ["admin", "work-status"],
    queryFn: () => workStatusApi.list(),
    select: getSingleton,
  });

  useEffect(() => {
    if (currentStatus) setValues(toForm(currentStatus));
  }, [currentStatus]);

  const saveMutation = useMutation({
    mutationFn: (payload) => workStatusApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "work-status"] });
      queryClient.invalidateQueries({ queryKey: ["work-status"] });
      setSuccess("Work status saved.");
    },
    onError: (err) => setServerError(err?.message || "Failed to save work status."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => workStatusApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "work-status"] });
      queryClient.invalidateQueries({ queryKey: ["work-status"] });
      setValues(defaultStatus);
      setConfirmDelete(false);
      setSuccess("Work status removed. Defaults are shown until you save again.");
    },
    onError: (err) => {
      setConfirmDelete(false);
      setServerError(err?.message || "Failed to remove work status.");
    },
  });

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError(null);
    setSuccess(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError(null);
    setSuccess(null);
    const nextErrors = validateWorkStatus(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    saveMutation.mutate(normalizeWorkStatus(values));
  };

  const handleDelete = () => {
    const id = currentStatus?._id ?? currentStatus?.id;
    if (!id) return;
    deleteMutation.mutate(id);
  };

  const hasSavedStatus = Boolean(currentStatus?._id ?? currentStatus?.id);

  return (
    <section>
      <PageHeader
        eyebrow="Availability"
        title="Work Status"
        description="Manage the availability label shown beside the profile avatar."
      />

      <AdminCard className="max-w-2xl space-y-5">
        {isPending ? (
          <StatusMessage>Loading work status...</StatusMessage>
        ) : isError ? (
          <StatusMessage type="error">{error?.message || "Failed to load work status."}</StatusMessage>
        ) : (
          <>
            {!hasSavedStatus && (
              <StatusMessage>
                No saved work status exists yet. Save this form to create the global status.
              </StatusMessage>
            )}
            {serverError && <StatusMessage type="error">{serverError}</StatusMessage>}
            {success && <StatusMessage type="success">{success}</StatusMessage>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <CheckboxField
                label="Open to work *"
                checked={values.isOpenToWork}
                onChange={(checked) => update("isOpenToWork", checked)}
              />
              {errors.isOpenToWork && (
                <span className="block text-xs font-medium text-red-300">{errors.isOpenToWork}</span>
              )}

              <Field label="Label *" error={errors.label}>
                <TextInput
                  value={values.label}
                  onChange={(event) => update("label", event.target.value)}
                  placeholder={values.isOpenToWork ? "Open to new projects" : "Focused on current work"}
                  required
                />
              </Field>

              <div className="rounded-2xl border border-slate-700/50 bg-primary-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Preview
                </p>
                <div className="mt-3 flex items-center gap-3 text-sm font-semibold">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      values.isOpenToWork ? "bg-green-500" : "bg-gray-500"
                    }`}
                  />
                  <span className={values.isOpenToWork ? "text-green-400" : "text-gray-300"}>
                    {values.label || "Work status label"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-700/40 pt-5 sm:flex-row sm:justify-end">
                {hasSavedStatus && (
                  <AdminButton
                    variant="danger"
                    onClick={() => setConfirmDelete(true)}
                    disabled={saveMutation.isPending || deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Removing..." : "Remove status"}
                  </AdminButton>
                )}
                <AdminButton type="submit" disabled={saveMutation.isPending || deleteMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : hasSavedStatus ? "Save status" : "Create status"}
                </AdminButton>
              </div>
            </form>
          </>
        )}
      </AdminCard>

      {confirmDelete && (
        <ConfirmDialog
          title="Remove work status?"
          message="This will remove the saved global work status. The public card will use its fallback until you save a new status."
          confirmLabel="Remove status"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={handleDelete}
          busy={deleteMutation.isPending}
        />
      )}
    </section>
  );
}

export default WorkStatus;
