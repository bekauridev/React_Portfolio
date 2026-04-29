import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { goodiesApi } from "../../api/goodiesApi";
import SearchBar from "../../ui/SearchBar";
import { AdminButton, AdminCard, AdminLink, ConfirmDialog, PageHeader, StatusMessage } from "../components/AdminUI";
import { createQuery, formatDate, getList } from "../utils/forms";

function GoodiesList() {
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const queryClient = useQueryClient();

  const { data = [], isPending, isError, error } = useQuery({
    queryKey: ["admin", "goodies"],
    queryFn: () => goodiesApi.list(createQuery({ sort: "-createdAt", limit: 100 })),
    select: getList,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => goodiesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "goodies"] });
      queryClient.invalidateQueries({ queryKey: ["goodies"] });
      setPendingDelete(null);
    },
    onError: () => setPendingDelete(null),
  });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;
    return data.filter((goodie) => {
      return (
        (goodie.name || "").toLowerCase().includes(normalized) ||
        (goodie.description || "").toLowerCase().includes(normalized) ||
        (goodie.category || "").toLowerCase().includes(normalized)
      );
    });
  }, [data, query]);

  return (
    <section>
      <PageHeader
        eyebrow="Content"
        title="Goodies"
        description="Manage the curated tools and resources shown on the Goodies page."
        action={<AdminLink to="/admin/goodies/new">New goodie</AdminLink>}
      />

      <AdminCard className="space-y-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search goodies..." />
        {deleteMutation.isError && (
          <StatusMessage type="error">
            {deleteMutation.error?.message || "Failed to delete goodie."}
          </StatusMessage>
        )}

        {isPending ? (
          <StatusMessage>Loading goodies...</StatusMessage>
        ) : isError ? (
          <StatusMessage type="error">{error?.message || "Failed to load goodies."}</StatusMessage>
        ) : filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-400">
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Updated</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {filtered.map((goodie) => {
                  const id = goodie._id ?? goodie.id;
                  return (
                    <tr key={id} className="align-top text-gray-300">
                      <td className="py-4 pr-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-800/70 ring-1 ring-white/5">
                            {goodie.logo ? <img src={goodie.logo} alt="" className="h-7 w-7 object-contain" /> : <span>{goodie.name?.charAt(0)}</span>}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-100">{goodie.name}</p>
                            <p className="mt-1 line-clamp-2 text-xs text-gray-500">{goodie.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-gray-400">{goodie.category}</td>
                      <td className="py-4 pr-4 text-gray-400">{formatDate(goodie.updatedAt || goodie.createdAt)}</td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Link className="rounded-xl border border-slate-700/60 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-primary-400/50 hover:text-primary-100" to={`/admin/goodies/${id}/edit`}>
                            Edit
                          </Link>
                          <AdminButton variant="danger" className="px-3 py-2 text-xs" onClick={() => setPendingDelete(goodie)}>
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
          <StatusMessage>No goodies found.</StatusMessage>
        )}
      </AdminCard>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete goodie?"
          message={`This will permanently delete "${pendingDelete.name}".`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete._id ?? pendingDelete.id)}
          busy={deleteMutation.isPending}
        />
      )}
    </section>
  );
}

export default GoodiesList;
