import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2, Plus, RefreshCw } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  createdAt?: string;
};

const API = "http://localhost:3000/categories";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  ); 

  const load = async () => {
    try {
      setLoading(true);
      setMessage(null);
      const res = await axios.get<{ success: boolean; categories: Category[] }>(API);
      if (!res.data.success) throw new Error("Failed to load");
      setCategories(res.data.categories);
    } catch (e: any) {
      setMessage({ type: "err", text: e?.message || "Load failed" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      setSaving(true);
      setMessage(null);
      await axios.post(
        API,
        { name: trimmed },
        { withCredentials: true } // if you use cookie auth
      );
      setName("");
      await load();
      setMessage({ type: "ok", text: "Category added." });
    } catch (e: any) {
      setMessage({
        type: "err",
        text: e?.response?.data?.message || e?.message || "Create failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!window.confirm(`Delete category "${label}"?`)) return;

    try {
      setMessage(null);
      await axios.delete(`${API}/${id}`, { withCredentials: true });
      setCategories((prev) => prev.filter((c) => c._id !== id));
      setMessage({ type: "ok", text: "Category deleted." });
    } catch (e: any) {
      setMessage({
        type: "err",
        text: e?.response?.data?.message || e?.message || "Delete failed",
      });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Categories</h2>
          <p className="text-sm text-stone-500">Add or remove blog categories.</p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-xl border px-3 py-2 text-sm ${
            message.type === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        className="mb-8 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-stone-600">
            New category name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. JLPT N5"
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>
        <button
          type="submit"
          disabled={saving || !name.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {saving ? "Saving…" : "Add"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-stone-500">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-stone-500">No categories yet.</p>
      ) : (
        <ul className="divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          {categories.map((c) => (
            <li
              key={c._id}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-stone-50"
            >
              <div>
                <p className="font-medium text-stone-900">{c.name}</p>
           
              </div>
              <button
                type="button"
                onClick={() => handleDelete(c._id, c.name)}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}