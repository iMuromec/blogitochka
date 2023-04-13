import Code from "@editorjs/code";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";
import NestedList from "@editorjs/nested-list";
import Underline from "@editorjs/underline";
import RawTool from "@editorjs/raw";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";

import { uploadFile } from "@/lib/file/client";

export function editorTools(postSlug: string) {
  return {
    code: Code,
    paragraph: {
      class: Paragraph,
      toolbox: {
        // icon: '<svg>my icon code</svg>',
        title: "Текст",
      },
      inlineToolbar: true,
      tunes: ["anyTuneName"],
      config: {
        preserveBlank: true,
      },
    },
    header: {
      class: Header,
      tunes: ["anyTuneName"],
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      tunes: ["anyTuneName"],
      config: {
        quotePlaceholder: "Цитата",
      },
    },
    anyTuneName: {
      class: AlignmentTuneTool,
      config: {
        default: "left",
        // blocks: {
        //   header: "left",
        //   list: "left",
        // },
      },
    },
    simpleImage: SimpleImage,
    table: Table,
    embed: Embed,
    underline: Underline,
    raw: {
      class: RawTool,
      toolbox: {
        title: "HTML",
      },
    },

    checklist: {
      class: Checklist,
      inlineToolbar: true,
      tunes: ["anyTuneName"],
    },

    list: {
      class: NestedList,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
      tunes: ["anyTuneName"],
    },
    image: {
      tunes: ["anyTuneName"],
      class: ImageTool,
      config: {
        /**
         * Custom uploader
         */
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          async uploadByFile(file: any) {
            const res = await uploadFile({ file, postSlug });

            if (!res.error) {
              return {
                success: 1,
                file: {
                  url: res.fileUrl,
                },
              };
            } else {
              return {
                success: 0,
              };
            }
          },
        },
      },
    },
  };
}
