import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type Alignment = 'left' | 'center' | 'right';

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

type AlignableElement = {
  align?: Alignment;
};

export type LinkElement = {
  type: 'link';
  url: string;
  children: CustomText[];
};

export type InlineElement = LinkElement;

export type RichText = CustomText | InlineElement;

export type ParagraphElement = AlignableElement & {
  type: 'paragraph';
  children: RichText[];
};

export type HeadingElement = AlignableElement & {
  type: 'heading';
  level: 1 | 2 | 3;
  children: RichText[];
};

export type CodeBlockElement = AlignableElement & {
  type: 'code-block';
  children: CustomText[];
};

export type BlockquoteElement = AlignableElement & {
  type: 'blockquote';
  children: RichText[];
};

export type BulletedListElement = AlignableElement & {
  type: 'bulleted-list';
  children: ListItemElement[];
};

export type NumberedListElement = AlignableElement & {
  type: 'numbered-list';
  children: ListItemElement[];
};

export type ListItemElement = AlignableElement & {
  type: 'list-item';
  children: RichText[];
};

export type ImageElement = AlignableElement & {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
  children: CustomText[];
};

export type DividerElement = AlignableElement & {
  type: 'divider';
  children: CustomText[];
};

export type TableCellElement = AlignableElement & {
  type: 'table-cell';
  children: RichText[];
};

export type TableRowElement = AlignableElement & {
  type: 'table-row';
  children: TableCellElement[];
};

export type TableElement = AlignableElement & {
  type: 'table';
  children: TableRowElement[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | CodeBlockElement
  | BlockquoteElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | ImageElement
  | LinkElement
  | DividerElement
  | TableElement
  | TableRowElement
  | TableCellElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type MarkFormat = 'bold' | 'italic' | 'underline' | 'code';
export type BlockFormat =
  | ParagraphElement['type']
  | HeadingElement['type']
  | CodeBlockElement['type']
  | BlockquoteElement['type']
  | BulletedListElement['type']
  | NumberedListElement['type']
  | ListItemElement['type'];

export const initialValue: Descendant[] = [
  {
    type: 'heading',
    level: 1,
    children: [{ text: 'Slate.js 텍스트 에디터 데모' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: '이것은 ' },
      { text: 'Slate.js', bold: true },
      { text: '로 구현된 리치 텍스트 에디터입니다. ' },
      { text: 'Next.js 14', italic: true },
      { text: ' 환경에서 실행됩니다.' },
    ],
  },
  {
    type: 'heading',
    level: 2,
    children: [{ text: '지원하는 기능들' }],
  },
  {
    type: 'bulleted-list',
    children: [
      { type: 'list-item', children: [{ text: '굵게 (Ctrl+B)' }] },
      { type: 'list-item', children: [{ text: '기울임 (Ctrl+I)' }] },
      { type: 'list-item', children: [{ text: '밑줄 (Ctrl+U)' }] },
      { type: 'list-item', children: [{ text: '코드 (Ctrl+`)' }] },
    ],
  },
  {
    type: 'blockquote',
    children: [{ text: '인용문 블록도 지원합니다. 텍스트를 강조할 때 사용하세요.' }],
  },
  {
    type: 'code-block',
    children: [{ text: 'const greeting = "Hello, Slate!";\nconsole.log(greeting);' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      { text: '자세한 가이드는 ' },
      {
        type: 'link',
        url: 'https://docs.slatejs.org',
        children: [{ text: 'Slate 공식 문서' }],
      },
      { text: '를 참고하세요.' },
    ],
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Unsplash 제공 예시 이미지',
    align: 'center',
    children: [{ text: '' }],
  },
  {
    type: 'divider',
    align: 'center',
    children: [{ text: '' }],
  },
  {
    type: 'table',
    align: 'center',
    children: [
      {
        type: 'table-row',
        children: [
          { type: 'table-cell', children: [{ text: '기능' }] },
          { type: 'table-cell', children: [{ text: '설명' }] },
        ],
      },
      {
        type: 'table-row',
        children: [
          { type: 'table-cell', children: [{ text: '정렬' }] },
          { type: 'table-cell', children: [{ text: '좌/중앙/우측 정렬을 제공합니다.' }] },
        ],
      },
      {
        type: 'table-row',
        children: [
          { type: 'table-cell', children: [{ text: '이미지' }] },
          { type: 'table-cell', children: [{ text: 'URL 입력으로 이미지를 삽입합니다.' }] },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: '위의 도구 모음을 사용하여 텍스트 서식을 변경해보세요!' }],
  },
];
