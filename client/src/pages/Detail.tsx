import axios from "axios";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { ImageResize } from "../utils/imageResize";
import { CalendarDays, BookOpen, Leaf } from "lucide-react";
import { useParams } from "react-router";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
       if (!id) {
      setError("Missing post id");
      return;
    }
    const loadPost = async () => {
      try {
         const res = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(res.data.post);
      } catch (error) {
           console.error(error);
        setError("Could not load this post.");
        setPost(null);
      }
    };

    loadPost();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Youtube,
      ImageResize.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: post?.document || "<p></p>",
    editable: false,
    editorProps: {
      attributes: {
        class:
          "ProseMirror prose prose-stone max-w-none focus:outline-none " +
          "prose-headings:text-emerald-900 prose-p:text-stone-700 prose-strong:text-emerald-800 " +
          "prose-blockquote:border-l-emerald-300 prose-blockquote:text-stone-600 " +
          "prose-a:text-emerald-700 hover:prose-a:text-emerald-800 " +
          "prose-img:rounded-lg prose-img:shadow-sm",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && post?.document) {
      editor.commands.setContent(post.document);
    }
  }, [editor, post]);

    if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100 px-4 py-16 text-center text-stone-600">
        Invalid link.
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100 px-4 py-16 text-center text-red-700">
        {error}
      </div>
    );
  }
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-emerald-50/30">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="animate-pulse rounded-2xl border border-emerald-100 bg-white/80 p-8 shadow-sm">
            <div className="h-7 w-2/3 rounded bg-stone-200" />
            <div className="mt-6 h-4 w-1/3 rounded bg-stone-200" />
            <div className="mt-10 space-y-3">
              <div className="h-4 w-full rounded bg-stone-100" />
              <div className="h-4 w-11/12 rounded bg-stone-100" />
              <div className="h-4 w-10/12 rounded bg-stone-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const created = post?.createdAt ? new Date(post.createdAt) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Top label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Leaf className="h-3.5 w-3.5" />
          Bamboo Japanese Language School
        </div>

        <article className="overflow-hidden rounded-2xl border border-emerald-100 bg-white/95 shadow-[0_12px_40px_rgba(16,24,40,0.08)] backdrop-blur">
          {/* Header */}
          <header className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/70 to-stone-50 px-6 py-6 md:px-10 md:py-8">
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 ring-1 ring-stone-200">
                <BookOpen className="h-4 w-4 text-emerald-700" />
                Japanese Learning Article
              </span>

              {created && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 ring-1 ring-stone-200">
                  <CalendarDays className="h-4 w-4 text-emerald-700" />
                  {created.toLocaleDateString()}
                </span>
              )}
            </div>
          </header>

          {/* Content */}
          <section className="px-6 py-7 md:px-10 md:py-10">
            <div className="mx-auto max-w-3xl">
              {editor ? <EditorContent editor={editor} /> : null}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}