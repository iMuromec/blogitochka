export interface HeaderBlockProps {
  level?: number;
  text?: string;
  alignment?: string;
}

export interface ParagraphBlockProps {
  text?: string;
  alignment?: string;
}

export interface ListItemProps {
  item?: { items?: []; content?: string };
  level: number;
  style?: string;
  alignment?: string;
  className?: string;
  nestedNumbers?: [number];
}

export interface ChecklistBlockProps {
  items?: [{ checked: boolean; text: string }];
  alignment?: string;
}

export interface QuoteBlockProps {
  text?: string;
  caption?: string;
  alignment?: string;
}

export interface ListBlockProps {
  items?: [{ checked: boolean; text: string; item?: ListItemProps }];
  style?: string;
  level?: number;
  className?: string;
  nestedNumbers?: [];
  alignment?: string;
}

export interface EmbedBlockProps {
  service: string;
  embed: string;
  alignment?: string;
}

export interface CodeBlockProps {
  code?: string;
  language?: string;
  alignment?: string;
}

export interface ImageBlockProps {
  url?: string;
  caption?: string;
  alignment?: string;
  stretched?: boolean;
  withBorder?: boolean;
  withBackground?: boolean;
}

export interface TableBlockProps {
  data: { withHeadings?: boolean; content?: [any] };
  alignment?: string;
  className?: string;
}

export interface EditJsParserPropsProps {
  items: [{ checked: boolean; text: string }];
  alignment: string;
}

export interface UnderlineBlockProps {
  text?: string;
  alignment?: string;
}

export interface RawBlockProps {
  html?: string;
  alignment?: string;
}

export interface UnsupportedBlockProps {
  data: {};
  tunes: {};
}

export interface EditJsParserProps {
  block: {
    data: {
      text?: string;
      level?: number;
      items?: [{ checked: boolean; text: string }];
      style?: string;
      withHeadings?: boolean;
      content?: [any];
      file?: { url?: string };
      caption?: string;
      stretched?: boolean;
      withBorder?: boolean;
      withBackground?: boolean;
      html?: string;
      code?: string;
    };
    tunes: { anyTuneName: { alignment: string } };
    type: string;
    service: string;
    embed: string;
    language: string;
  };
}
