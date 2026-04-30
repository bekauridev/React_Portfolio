import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { storiesApi } from "../../api/storiesApi";
import SearchBar from "../../ui/SearchBar";
import {
  AdminButton,
  AdminCard,
  AdminLink,
  ConfirmDialog,
  PageHeader,
  StatusMessage,
} from "../components/AdminUI";
import { createQuery, formatDate, getList } from "../utils/forms";

function StoriesList() {
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const queryClient = useQueryClient();

  const { data = [], isPending, isError, error } = useQuery({
    queryKey: ["admin", "stories"],
    queryFn: () => storiesApi.list(createQuery({ sort: "-createdAt", limit: 100 })),
    select: getList,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => storiesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "stories"] });
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      setPendingDelete(null);
    },
    onError: () => setPendingDelete(null),
  });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;
    return data.filter((story) => {
      return (
        (story.title || "").toLowerCase().includes(normalized) ||
        (story.description || "").toLowerCase().includes(normalized) ||
        (story.image || "").toLowerCase().includes(normalized)
      );
    });
  }, [data, query]);

  return (
    <section>
      <PageHeader
        eyebrow="Content"
        title="Stories"
        description="Manage the portfolio story images shown from the profile avatar."
        action={<AdminLink to="/admin/stories/new">New story</AdminLink>}
      />

      <AdminCard className="space-y-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search stories..." />
        {deleteMutation.isError && (
          <StatusMessage type="error">
            {deleteMutation.error?.message || "Failed to delete story."}
          </StatusMessage>
        )}

        {isPending ? (
          <StatusMessage>Loading stories...</StatusMessage>
        ) : isError ? (
          <StatusMessage type="error">{error?.message || "Failed to load stories."}</StatusMessage>
        ) : filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-400">
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 pr-4">Story</th>
                  <th className="py-3 pr-4">Image</th>
                  <th className="py-3 pr-4">Updated</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {filtered.map((story) => {
                  const id = story._id ?? story.id;
                  return (
                    <tr key={id} className="align-top text-gray-300">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-gray-100">{story.title || "Untitled story"}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {story.description || "No description"}
                        </p>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-10 overflow-hidden rounded-xl border border-slate-700/50 bg-primary-800/60">
                            <img src={story.image} alt="" className="h-full w-full object-cover" />
                          </div>
                          <span className="max-w-xs truncate text-xs text-gray-500">{story.image}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-gray-400">
                        {formatDate(story.updatedAt || story.createdAt)}
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            className="rounded-xl border border-slate-700/60 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-primary-400/50 hover:text-primary-100"
                            to={`/admin/stories/${id}/edit`}
                          >
                            Edit
                          </Link>
                          <AdminButton
                            variant="danger"
                            className="px-3 py-2 text-xs"
                            onClick={() => setPendingDelete(story)}
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
          <StatusMessage>No stories found.</StatusMessage>
        )}
      </AdminCard>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete story?"
          message={`This will permanently delete "${pendingDelete.title || "this story"}".`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete._id ?? pendingDelete.id)}
          busy={deleteMutation.isPending}
        />
      )}
    </section>
  );
}

export default StoriesList;
