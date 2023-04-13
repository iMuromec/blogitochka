import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Undo from "editorjs-undo";

import { i18n } from "@/lib/editor/i18n";
import { editorTools } from "@/lib/editor/tools";

interface CustomEditor {
  data: any;
  postSlug: string;
  holder: string;
  onChange: (data: any) => void;
}

const CustomEditor = ({ data, onChange, postSlug, holder }: CustomEditor) => {
  const ref = useRef<EditorJS>();

  const tools = editorTools(postSlug);

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        onReady: () => {
          const undo = new Undo({ editor });
          data && undo.initialize(data);
        },
        holder,
        tools,
        i18n,
        data,
        minHeight: 1,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        placeholder: "Начните печатать...",
        inlineToolbar: true,
        hideToolbar: false,
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} className="min-h-[500px]" />;
};

export default memo(CustomEditor);
