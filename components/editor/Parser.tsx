import * as Parser from "./ParserBlocks";

import { EditJsParserProps } from "@/types";

export default function EditJsParser({ block }: EditJsParserProps) {
  switch (block.type) {
    case "header":
      return (
        <Parser.HeaderBlock
          level={block.data.level}
          text={block.data.text}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "paragraph":
      return (
        <Parser.ParagraphBlock
          text={block.data.text}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "list":
      return (
        <Parser.ListBlock
          className=""
          items={block.data.items}
          style={block.data.style}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "embed":
      return <Parser.EmbedBlock service={block.service} embed={block.embed} />;
    case "quote":
      return (
        <Parser.QuoteBlock
          text={block.data.text}
          caption={block.data.caption}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "code":
      return (
        <Parser.CodeBlock code={block.data.code} language={block.language} />
      );
    case "image":
      return (
        <Parser.ImageBlock
          url={block?.data?.file?.url}
          caption={block.data.caption}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
          stretched={block.data.stretched}
          withBorder={block.data.withBorder}
          withBackground={block.data.withBackground}
        />
      );
    case "table":
      return (
        <Parser.TableBlock
          className=""
          data={block.data}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "checklist":
      return (
        <Parser.ChecklistBlock
          items={block.data.items}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "underline":
      return (
        <Parser.UnderlineBlock
          text={block.data.text}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    case "raw":
      return (
        <Parser.RawBlock
          html={block.data.html}
          alignment={block.tunes?.anyTuneName?.alignment ?? "left"}
        />
      );
    default:
      return <Parser.UnsupportedBlock data={block.data} tunes={block.tunes} />;
  }
}
