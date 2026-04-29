import { AdminCard, PageHeader, StatusMessage } from "../components/AdminUI";

function Settings() {
  return (
    <section>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="This area is reserved for future admin configuration."
      />

      <AdminCard className="max-w-2xl">
        <StatusMessage>
          This page is empty for now. Future admin settings will be added here.
        </StatusMessage>
      </AdminCard>
    </section>
  );
}

export default Settings;
