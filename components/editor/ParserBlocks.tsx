import Image from "next/image";
import { createElement } from "react";
import { cn, cleanHtml } from "@/lib/utils";

import * as Types from "@/types";

export const HeaderBlock = ({
  level,
  text,
  alignment,
}: Types.HeaderBlockProps) => {
  return createElement(`h${level}`, { className: `text-${alignment}` }, text);
};

export const ParagraphBlock = ({
  text,
  alignment,
}: Types.ParagraphBlockProps) => {
  text =
    text?.replace("<a href=", '<a target="_blank" rel="noopener" href=') ||
    "&nbsp;";
  return (
    <p
      className={`text-${alignment}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml(text ?? "") }}
    ></p>
  );
};

export const ListItem = ({
  item,
  level,
  style,
  alignment,
  className,
  nestedNumbers,
}: Types.ListItemProps) => {
  const classes = cn(
    "ml-4",
    level === 1 && style === "ordered" && "ml-0",
    className
  );

  const itemNumber = nestedNumbers?.length ? `${nestedNumbers.join(".")}.` : "";

  return (
    <li className={classes}>
      <div className={alignment}>
        {style === "ordered" && <span className="mr-2">{itemNumber}</span>}
        <span
          dangerouslySetInnerHTML={{ __html: cleanHtml(item?.content ?? "") }}
        ></span>
      </div>
      {item?.items && item?.items?.length > 0 && (
        <ListBlock
          className=""
          alignment={alignment}
          items={item?.items}
          style={style}
          level={level + 1}
          nestedNumbers={[...nestedNumbers]}
        />
      )}
    </li>
  );
};

export const ListBlock = ({
  items,
  style,
  level = 1,
  className,
  nestedNumbers = [],
  alignment,
}: Types.ListBlockProps) => {
  const ListTag = style === "ordered" ? "ol" : "ul";
  const classes = cn(`${style !== "ordered" ? "list-disc" : ""}`, className);

  return (
    <ListTag className={classes}>
      {items?.map((item, index) => (
        <ListItem
          className=""
          key={index}
          item={item}
          level={level}
          style={style}
          alignment={alignment}
          nestedNumbers={[...nestedNumbers, index + 1]}
        />
      ))}
    </ListTag>
  );
};

export const EmbedBlock = ({
  service,
  embed,
  alignment = "left",
}: Types.EmbedBlockProps) => {
  return (
    <div className={`relative aspect-w-16 aspect-h-9 text-${alignment}`}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        title="Embedded content"
        src={`${service}${embed}`}
      ></iframe>
    </div>
  );
};

export const QuoteBlock = ({
  text,
  caption,
  alignment,
}: Types.QuoteBlockProps) => {
  return (
    <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic">
      <p
        className={`leading-7 [&:not(:first-child)]:mt-6 text-${alignment}`}
        dangerouslySetInnerHTML={{ __html: text ?? "" }}
      ></p>
    </blockquote>
  );
};

export const CodeBlock = ({
  code,
  language = "notranslate",
  alignment = "left",
}: Types.CodeBlockProps) => {
  return (
    <pre
      className={`bg-gray-100 !p-4 rounded-md overflow-auto text-${alignment}`}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export const ImageBlock = ({
  url,
  caption,
  alignment,
  stretched,
  withBorder,
  withBackground,
}: Types.ImageBlockProps) => {
  return (
    <div
      className={cn(
        "image-block flex",
        `img-${alignment}`,
        withBackground ? "bg-gray-200 " : ""
      )}
    >
      <Image
        src={url ?? ""}
        width={3000}
        height={3000}
        className={cn(
          alignment,
          withBorder && "with-border",
          stretched && "w-full",
          withBackground && "max-w-[60%]"
        )}
        alt={caption ?? ""}
      />
    </div>
  );
};

export const TableBlock = ({
  data,
  alignment,
  className,
}: Types.TableBlockProps) => {
  const classes = cn("border-collapse", className);

  const hasHeadings = data?.withHeadings;
  const tBody = hasHeadings ? data?.content?.slice(1) : data.content;
  const content = data?.content?.length ? data.content[0] : [];

  return (
    <table className={cn(classes, `text-${alignment}`)}>
      {hasHeadings && content?.length && (
        <thead>
          <tr>
            {content.map((headerItem: string, index: number) => (
              <th
                key={index}
                className="border border-slate-200 px-1 md:px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tBody?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell: string, cellIndex: number) => (
              <td
                key={cellIndex}
                className="border border-slate-200 px-1 md:px-4 py-2 text-gray-700 [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const ChecklistBlock = ({
  items,
  alignment,
}: Types.ChecklistBlockProps) => {
  return (
    <ul className={`text-${alignment}`}>
      {items?.map((item, index) => (
        <li key={index}>
          <label className="inline-flex items-center checkbox">
            <input
              type="checkbox"
              className="w-6 h-6 rounded-full"
              defaultChecked={item.checked}
            />
            <span className="ml-2">{item.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export const UnderlineBlock = ({
  text,
  alignment,
}: Types.UnderlineBlockProps) => {
  return <u className={`text-${alignment}`}>{text}</u>;
};

export const RawBlock = ({ html, alignment }: Types.RawBlockProps) => {
  return (
    <div
      className={`text-${alignment}`}
      dangerouslySetInnerHTML={{ __html: html ?? "" }}
    ></div>
  );
};

export const UnsupportedBlock = ({
  data,
  tunes,
}: Types.UnsupportedBlockProps) => {
  return (
    <div>
      <pre>{JSON.stringify({ data, tunes }, null, 2)}</pre>
    </div>
  );
};
