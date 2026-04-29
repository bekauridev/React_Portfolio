import { Link } from "react-router-dom";
import { cn } from "../../utils/helpers";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-200/80">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-gray-50 md:text-4xl">
          {title}
        </h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-700/40 bg-primary-900/50 p-5 shadow-xl backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminButton({ children, variant = "primary", className, ...props }) {
  const variants = {
    primary:
      "border-primary-400/40 bg-primary-400/20 text-primary-50 hover:border-primary-300 hover:bg-primary-400/30",
    secondary:
      "border-slate-700/60 bg-primary-900/40 text-gray-200 hover:border-primary-400/50 hover:text-primary-100",
    danger:
      "border-red-400/40 bg-red-500/10 text-red-200 hover:border-red-300 hover:bg-red-500/20",
    ghost: "border-transparent bg-transparent text-gray-300 hover:text-primary-100",
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminLink({ children, className, ...props }) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-primary-400/40 bg-primary-400/20 px-4 py-2 text-sm font-semibold text-primary-50 transition hover:border-primary-300 hover:bg-primary-400/30",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Field({ label, error, children, hint }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-gray-200">{label}</span>
      {children}
      {hint && !error && <span className="block text-xs text-gray-500">{hint}</span>}
      {error && <span className="block text-xs font-medium text-red-300">{error}</span>}
    </label>
  );
}

export function TextInput({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-slate-700/50 bg-primary-900/60 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40",
        className
      )}
      {...props}
    />
  );
}

export function TextArea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-2xl border border-slate-700/50 bg-primary-900/60 px-4 py-3 text-sm leading-6 text-gray-100 placeholder:text-gray-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40",
        className
      )}
      {...props}
    />
  );
}

export function SelectInput({ children, className, ...props }) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-slate-700/50 bg-primary-900/60 px-4 py-3 text-sm text-gray-100 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-primary-900/40 px-4 py-3 text-sm font-semibold text-gray-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-primary-400"
      />
      {label}
    </label>
  );
}

export function ArrayField({ label, values, onChange, error, placeholder, hint }) {
  const update = (index, value) => {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const remove = (index) => {
    const next = values.filter((_, itemIndex) => itemIndex !== index);
    onChange(next.length ? next : [""]);
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold text-gray-200">{label}</span>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <TextInput
              value={value}
              onChange={(event) => update(index, event.target.value)}
              placeholder={placeholder}
            />
            <AdminButton variant="secondary" onClick={() => remove(index)} aria-label="Remove item">
              Remove
            </AdminButton>
          </div>
        ))}
      </div>
      <AdminButton variant="secondary" onClick={() => onChange([...values, ""])}>
        Add item
      </AdminButton>
      {hint && !error && <span className="block text-xs text-gray-500">{hint}</span>}
      {error && <span className="block text-xs font-medium text-red-300">{error}</span>}
    </div>
  );
}

export function StatusMessage({ type = "info", children }) {
  const styles = {
    info: "border-slate-700/50 bg-primary-900/40 text-gray-300",
    error: "border-red-400/30 bg-red-500/10 text-red-200",
    success: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  };

  return <div className={cn("rounded-2xl border p-4 text-sm", styles[type])}>{children}</div>;
}

export function ConfirmDialog({ title, message, confirmLabel = "Delete", onConfirm, onCancel, busy }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-700/50 bg-primary-900 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-50">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-gray-400">{message}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AdminButton variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting..." : confirmLabel}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
