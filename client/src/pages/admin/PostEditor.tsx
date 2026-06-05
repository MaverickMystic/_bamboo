import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder } from "@tiptap/extensions";
import ImageResize from "tiptap-extension-resize-image";

import {
  Bold,
  Italic,
  Save,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Video,
  Undo,
  Redo,
  ImageIcon,
  Type,
} from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

type PublishStatus = "idle" | "uploading" | "success" | "error";

type Category = {
  _id: string;
  name: string;
};

const MenuBar = ({ editor }: MenuBarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  if (!editor) return null;

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "bamboo");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dqbhf8bu0/image/upload",
          formData
        );

        const imageUrl = res.data.secure_url;
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (error) {
      console.error(error);
    }

    e.target.value = "";
  };

  const addVideo = () => {
    const url = window.prompt("YouTube URL");
    if (!url) return;

    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const divider = <span className="mx-1 h-5 w-px bg-emerald-200/70" />;

  const btn = (active: boolean, disabled?: boolean) =>
    [
      "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm",
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1",
      disabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
      !disabled &&
        (active
          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
          : "bg-white text-stone-600 border-stone-200 hover:bg-emerald-50 hover:text-stone-900"),
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-stone-50/80 px-3 py-2 backdrop-blur">
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={addImage}
        hidden
      />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btn(editor.isActive("bold"))}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btn(editor.isActive("italic"))}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      {divider}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btn(editor.isActive("heading", { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btn(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      {divider}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editor.isActive("bulletList"))}
        title="Bullet list"
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(editor.isActive("orderedList"))}
        title="Numbered list"
      >
        <ListOrdered size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editor.isActive("blockquote"))}
        title="Quote"
      >
        <Quote size={18} />
      </button>

      {divider}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={btn(false)}
        title="Insert image"
      >
        <ImageIcon size={18} />
      </button>

      <button
        type="button"
        onClick={addVideo}
        className={btn(false)}
        title="Insert YouTube video"
      >
        <Video size={18} />
      </button>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={btn(false, !editor.can().undo())}
          title="Undo"
        >
          <Undo size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={btn(false, !editor.can().redo())}
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
};

const AdminPostPage = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [publishStatus, setPublishStatus] = useState<PublishStatus>("idle");
  const [publishMessage, setPublishMessage] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Youtube,
      ImageResize.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "ProseMirror prose prose-stone max-w-none min-h-[420px] px-4 py-4 focus:outline-none text-[15px] leading-relaxed",
      },
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          categories: Category[];
        }>("http://localhost:3000/categories");

        if (res.data.success) setCategories(res.data.categories || []);
      } catch (e) {
        console.error(e);
      }
    };

    loadCategories();
  }, []);

  const canSave = useMemo(() => {
    const t = title.trim();
    return Boolean(editor && t.length > 0 && categoryId);
  }, [editor, title, categoryId]);

  const isPublishing = publishStatus === "uploading";

  const handleSave = async () => {
    if (!editor) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setPublishStatus("error");
      setPublishMessage("Please enter a title.");
      return;
    }

    if (!categoryId) {
      setPublishStatus("error");
      setPublishMessage("Please choose a category.");
      return;
    }

    setPublishStatus("uploading");
    setPublishMessage("Publishing…");

    try {
      const document = editor.getJSON();
      const html = editor.getHTML();

      await axios.post("http://localhost:3000/publishpost", {
        title: trimmedTitle,
        category:categoryId,
        document,
        html,
      }, {
  withCredentials: true,
});

      setPublishStatus("success");
      setPublishMessage("Published successfully.");

      setTitle("");
      setCategoryId("");
      editor.commands.clearContent(true);
      editor.commands.focus("start");

      window.setTimeout(() => {
        setPublishStatus("idle");
        setPublishMessage("");
      }, 2000);
    } catch (error: any) {
      setPublishStatus("error");
      setPublishMessage(
        error?.response?.data?.message || "Publish failed. Please try again."
      );
    }
  };

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100 py-10">
      <div className="mx-auto max-w-4xl px-4">
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/70 to-stone-50 px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold text-stone-900">
                  Create a new post
                </h1>
                <p className="mt-1 text-sm text-stone-600">
                  Bamboo Japanese Language School • Article editor
                </p>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave || isPublishing}
                className={[
                  "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1",
                  !canSave || isPublishing
                    ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700",
                ].join(" ")}
              >
                {isPublishing ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <Save size={18} />
                )}
                {isPublishing ? "Publishing…" : "Publish"}
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-600">
                  Title
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-300">
                  <Type className="h-4 w-4 text-emerald-700" />
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Hiragana basics: あいうえお"
                    className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-600">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {publishStatus !== "idle" && (
              <div
                className={[
                  "mt-3 rounded-xl border px-3 py-2 text-sm",
                  publishStatus === "uploading" &&
                    "border-sky-200 bg-sky-50 text-sky-800",
                  publishStatus === "success" &&
                    "border-emerald-200 bg-emerald-50 text-emerald-800",
                  publishStatus === "error" &&
                    "border-red-200 bg-red-50 text-red-800",
                ].join(" ")}
              >
                {publishMessage}
              </div>
            )}
          </div>

          <div className="relative flex max-h-[75vh] flex-col">
            <MenuBar editor={editor} />

            <div className="max-h-[62vh] overflow-y-auto bg-white">
              <EditorContent editor={editor} />
            </div>

            <div className="border-t border-emerald-100 bg-emerald-50/40 px-5 py-3 text-xs text-stone-600">
              Tip: Use the image button to upload screenshots and notes for
              students.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostPage;