export const findFirstImage = (
  node: any
): { type: "image" | "youtube"; src: string } | null => {
  if (!node) return null;

  // image node
  if ((node.type === "image" || node.type === "imageResize") && node.attrs?.src) {
    return { type: "image", src: node.attrs.src };
  }

  // youtube node (if your youtube extension stores src in attrs)
  if (node.type === "youtube" && node.attrs?.src) {
    const src: string = node.attrs.src;
    const match =
      src.match(/youtube\.com\/watch\?v=([^&]+)/) ||
      src.match(/youtube\.com\/embed\/([^?&]+)/) ||
      src.match(/youtu\.be\/([^?&]+)/);

    const videoId = match?.[1];
    if (videoId) {
      return {
        type: "youtube",
        src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };
    }
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      const found = findFirstImage(child);
      if (found) return found;
    }
  }

  return null;
};
export const extractTextPreview = (node: any, maxLength = 180): string => {
  const chunks: string[] = [];
  const walk = (current: any) => {
    if (!current) return;
    // skip image-like nodes entirely
    if (current.type === "image" || current.type === "imageResize") return;
    if (current.type === "text" && typeof current.text === "string") {
      chunks.push(current.text);
    }
    if (Array.isArray(current.content)) {
      for (const child of current.content) walk(child);
    }
  };
  walk(node);
  const text = chunks
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
};

// utils/helpers.ts
export const extractCloudinaryPublicIds = (doc: any): string[] => {
  const ids: string[] = [];

  const walk = (node: any) => {
    if (!node) return;

    if (  (node.type === "image" || node.type === "imageResize") && 
      typeof node.attrs?.src === "string") {
      const src:any= node.attrs.src;
     
      if (src.includes("res.cloudinary.com/dqbhf8bu0")) {
        const match = src.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
        if (match) ids.push(match[1]); 
      }
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(walk);
    }
  };

  walk(doc);
  return ids;
};