import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { techStackApi } from "../../api/techStackApi";
import {
  AdminButton,
  AdminCard,
  AdminLink,
  ConfirmDialog,
  PageHeader,
  StatusMessage,
} from "../components/AdminUI";
import { getList } from "../utils/forms";

function TechStackList() {
  const [pendingDelete, setPendingDelete] = useState(null);
  const queryClient = useQueryClient();

  const { data = [], isPending, isError, error } = useQuery({
    queryKey: ["admin", "tech-stack"],
    queryFn: () => techStackApi.list(),
    select: getList,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => techStackApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tech-stack"] });
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setPendingDelete(null);
    },
    onError: () => setPendingDelete(null),
  });

  return (
    <section>
      <PageHeader
        eyebrow="Content"
        title="Tech Stack"
        description="Manage the technology items shown on the portfolio. Items are returned by the API in display order."
        action={<AdminLink to="/admin/tech-stack/new">New tech stack item</AdminLink>}
      />

      <AdminCard className="space-y-5">
        {deleteMutation.isError && (
          <StatusMessage type="error">
            {deleteMutation.error?.message || "Failed to delete tech stack item."}
          </StatusMessage>
        )}

        {isPending ? (
          <StatusMessage>Loading tech stack...</StatusMessage>
        ) : isError ? (
          <StatusMessage type="error">
            {error?.message || "Failed to load tech stack."}
          </StatusMessage>
        ) : data.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-400">
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Icon</th>
                  <th className="py-3 pr-4">Order</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {data.map((item) => {
                  const id = item._id ?? item.id;
                  return (
                    <tr key={id} className="align-middle text-gray-300">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-gray-100">{item.name}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800/70 ring-1 ring-white/5">
                            <img
                              src={item.iconUrl}
                              alt={`${item.name} icon`}
                              className="h-8 w-8 object-contain"
                              loading="lazy"
                            />
                          </div>
                          <span className="max-w-xs truncate text-xs text-gray-500">
                            {item.iconUrl}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-gray-400">{item.order}</td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            className="rounded-xl border border-slate-700/60 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-primary-400/50 hover:text-primary-100"
                            to={`/admin/tech-stack/${id}/edit`}
                          >
                            Edit
                          </Link>
                          <AdminButton
                            variant="danger"
                            className="px-3 py-2 text-xs"
                            onClick={() => setPendingDelete(item)}
                          >
                            Delete
                          </AdminButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <StatusMessage>No tech stack items found.</StatusMessage>
        )}
      </AdminCard>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete tech stack item?"
          message={`This will permanently delete "${pendingDelete.name}".`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete._id ?? pendingDelete.id)}
          busy={deleteMutation.isPending}
        />
      )}
    </section>
  );
}

export default TechStackList;
