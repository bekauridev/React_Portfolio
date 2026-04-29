import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { AdminButton, AdminCard, Field, StatusMessage, TextInput } from "./components/AdminUI";

function AdminLogin() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    document.title = "Admin Login | BekauriDev";
  }, []);

  if (!loading && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!values.email.trim() || !values.password) {
      setError("Email and password are required.");
      return;
    }

    setSaving(true);
    try {
      await login(values.email.trim(), values.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || "Unable to log in.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-900 px-4 py-10 text-gray-100">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(71,85,105,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.22) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 35%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 35%, transparent 90%)",
        }}
      />

      <AdminCard className="relative z-10 w-full max-w-md p-6">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-200/80">
            Private admin
          </p>
          <h1 className="text-3xl font-semibold text-gray-50">Sign in</h1>
          <p className="mt-2 text-sm text-gray-400">
            Use the existing admin account from the backend database.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <StatusMessage type="error">{error}</StatusMessage>}
          <Field label="Email">
            <TextInput
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
              placeholder="admin@example.com"
              required
            />
          </Field>
          <Field label="Password">
            <TextInput
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
              placeholder="Password"
              required
            />
          </Field>
          <AdminButton type="submit" className="w-full" disabled={saving || loading}>
            {saving ? "Signing in..." : "Sign in"}
          </AdminButton>
        </form>
      </AdminCard>
    </div>
  );
}

export default AdminLogin;
