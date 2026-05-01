import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { educationApi } from "../../api/educationApi";
import {
  AdminButton,
  AdminCard,
  AdminLink,
  ConfirmDialog,
  PageHeader,
  StatusMessage,
} from "../components/AdminUI";
import { getList } from "../utils/forms";

function EducationList() {
  const [pendingDelete, setPendingDelete] = useState(null);
  const queryClient = useQueryClient();

  const { data = [], isPending, isError, error } = useQuery({
    queryKey: ["admin", "education"],
    queryFn: () => educationApi.list(),
    select: getList,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => educationApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "education"] });
      queryClient.invalidateQueries({ queryKey: ["education"] });
      setPendingDelete(null);
    },
    onError: () => setPendingDelete(null),
  });

  return (
    <section>
      <PageHeader
        eyebrow="Content"
        title="Education"
        description="Manage the learning history shown on the portfolio. Items are returned by the API in display order."
        action={<AdminLink to="/admin/education/new">New education item</AdminLink>}
      />

      <AdminCard className="space-y-5">
        {deleteMutation.isError && (
          <StatusMessage type="error">
            {deleteMutation.error?.message || "Failed to delete education item."}
          </StatusMessage>
        )}

        {isPending ? (
          <StatusMessage>Loading education...</StatusMessage>
        ) : isError ? (
          <StatusMessage type="error">
            {error?.message || "Failed to load education."}
          </StatusMessage>
        ) : data.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-400">
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Learning Place</th>
                  <th className="py-3 pr-4">Order</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {data.map((item) => {
                  const id = item._id ?? item.id;
                  return (
                    <tr key={id} className="align-top text-gray-300">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-gray-100">{item.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {item.description}
                        </p>
                      </td>
                      <td className="py-4 pr-4 text-gray-400">{item.date}</td>
                      <td className="py-4 pr-4 text-gray-400">
                        {item.learningPlaceLink ? (
                          <a
                            href={item.learningPlaceLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-200 transition hover:text-primary-100 hover:underline"
                          >
                            {item.learningPlace}
                          </a>
                        ) : (
                          item.learningPlace
                        )}
                      </td>
                      <td className="py-4 pr-4 text-gray-400">{item.order}</td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            className="rounded-xl border border-slate-700/60 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-primary-400/50 hover:text-primary-100"
                            to={`/admin/education/${id}/edit`}
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
          <StatusMessage>No education items found.</StatusMessage>
        )}
      </AdminCard>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete education item?"
          message={`This will permanently delete "${pendingDelete.title}".`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete._id ?? pendingDelete.id)}
          busy={deleteMutation.isPending}
        />
      )}
    </section>
  );
}

export default EducationList;
