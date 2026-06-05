import { Node, mergeAttributes } from "@tiptap/core";

export interface ImageResizeOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageResize: {
      setImage: (options: {
        src: string;
        alt?: string | null;
        title?: string | null;
        width?: string | null;
        height?: string | null;
        wrapperStyle?: string | null;
        containerStyle?: string | null;
      }) => ReturnType;
    };
  }
}

export const ImageResize = Node.create<ImageResizeOptions>({
  name: "imageResize",
  group() {
    return this.options.inline ? "inline" : "block";
  },
  inline() {
    return this.options.inline;
  },
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      inline: true,
      allowBase64: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: null },
      height: { default: null },
      wrapperStyle: { default: null },
      containerStyle: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-type='image-resize']",
        getAttrs: (node) => {
          const el = node as HTMLElement;
          const img = el.querySelector("img");
          if (!img) return false;

          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            title: img.getAttribute("title"),
            width: img.getAttribute("width"),
            height: img.getAttribute("height"),
            wrapperStyle: el.getAttribute("style"),
            containerStyle: img.getAttribute("style"),
          };
        },
      },
      {
        tag: "img[src]",
        getAttrs: (node) => {
          const el = node as HTMLElement;
          return {
            src: el.getAttribute("src"),
            alt: el.getAttribute("alt"),
            title: el.getAttribute("title"),
            width: el.getAttribute("width"),
            height: el.getAttribute("height"),
            containerStyle: el.getAttribute("style"),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const {
      src,
      alt,
      title,
      width,
      height,
      wrapperStyle,
      containerStyle,
      ...rest
    } = HTMLAttributes;

    const imgAttrs: Record<string, any> = mergeAttributes(this.options.HTMLAttributes, rest, {
      src,
      alt,
      title,
    });

    if (width) imgAttrs.width = width;
    if (height) imgAttrs.height = height;
    if (containerStyle) imgAttrs.style = containerStyle;

    // real wrapper with real style attribute
    const wrapperAttrs: Record<string, any> = {
      "data-type": "image-resize",
    };
    if (wrapperStyle) wrapperAttrs.style = wrapperStyle;

    return ["span", wrapperAttrs, ["img", imgAttrs]];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});