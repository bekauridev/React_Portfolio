import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { blogsApi } from "../../api/blogsApi";
import SearchBar from "../../ui/SearchBar";
import { AdminButton, AdminCard, AdminLink, ConfirmDialog, PageHeader, StatusMessage } from "../components/AdminUI";
import { createQuery, formatDate, getList } from "../utils/forms";

function BlogsList() {
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const queryClient = useQueryClient();

  const { data = [], isPending, isError, error } = useQuery({
    queryKey: ["admin", "blogs"],
    queryFn: () => blogsApi.list(createQuery({ sort: "-createdAt", limit: 100 })),
    select: getList,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => blogsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setPendingDelete(null);
    },
    onError: () => setPendingDelete(null),
  });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;
    return data.filter((blog) => {
      return (
        (blog.title || "").toLowerCase().includes(normalized) ||
        (blog.excerpt || "").toLowerCase().includes(normalized) ||
        (blog.tags || []).some((tag) => tag.toLowerCase().includes(normalized)) ||
        (blog.category || "").toLowerCase().includes(normalized)
      );
    });
  }, [data, query]);

  return (
    <section>
      <PageHeader
        eyebrow="Content"
        title="Blogs"
        description="Manage articles, draft status, tags, and featured posts. Read time is calculated by the backend on create."
        action={<AdminLink to="/admin/blogs/new">New blog</AdminLink>}
      />

      <AdminCard className="space-y-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search blogs..." />
        {deleteMutation.isError && (
          <StatusMessage type="error">
            {deleteMutation.error?.message || "Failed to delete blog."}
          </StatusMessage>
        )}

        {isPending ? (
          <StatusMessage>Loading blogs...</StatusMessage>
        ) : isError ? (
          <StatusMessage type="error">{error?.message || "Failed to load blogs."}</StatusMessage>
        ) : filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-400">
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Updated</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {filtered.map((blog) => {
                  const id = blog._id ?? blog.id;
                  return (
                    <tr key={id} className="align-top text-gray-300">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-gray-100">{blog.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">{blog.excerpt || blog.content}</p>
                      </td>
                      <td className="py-4 pr-4 text-gray-400">{blog.category || "General"}</td>
                      <td className="py-4 pr-4">
                        <span className="rounded-full bg-primary-800/70 px-2.5 py-1 text-xs font-semibold capitalize text-primary-100">
                          {blog.status || "draft"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-gray-400">{formatDate(blog.updatedAt || blog.createdAt)}</td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Link className="rounded-xl border border-slate-700/60 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-primary-400/50 hover:text-primary-100" to={`/admin/blogs/${id}/edit`}>
                            Edit
                          </Link>
                          <AdminButton variant="danger" className="px-3 py-2 text-xs" onClick={() => setPendingDelete(blog)}>
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
          <StatusMessage>No blogs found.</StatusMessage>
        )}
      </AdminCard>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete blog?"
          message={`This will permanently delete "${pendingDelete.title}".`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete._id ?? pendingDelete.id)}
          busy={deleteMutation.isPending}
        />
      )}
    </section>
  );
}

export default BlogsList;
