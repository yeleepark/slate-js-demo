import { Editor, Element as SlateElement, Range, Transforms } from 'slate';
import {
  Alignment,
  BlockFormat,
  CustomElement,
  DividerElement,
  ImageElement,
  LinkElement,
  MarkFormat,
  TableCellElement,
  TableElement,
  TableRowElement,
} from './types';

export const isMarkActive = (editor: Editor, format: MarkFormat): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: MarkFormat): void => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const ALIGNABLE_TYPES = new Set<string>([
  'paragraph',
  'heading',
  'code-block',
  'blockquote',
  'bulleted-list',
  'numbered-list',
  'list-item',
  'image',
  'table',
  'table-row',
  'table-cell',
  'divider',
]);

export const isBlockActive = (editor: Editor, format: BlockFormat): boolean => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor: Editor, format: BlockFormat): void => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type as string),
    split: true,
  });

  let newProperties: Partial<CustomElement>;

  if (isActive) {
    newProperties = { type: 'paragraph' };
  } else if (isList) {
    newProperties = { type: 'list-item' };
  } else {
    newProperties = { type: format } as Partial<CustomElement>;
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] } as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
};

const isAlignableElement = (
  element: SlateElement
): element is SlateElement & { align?: Alignment } => {
  return ALIGNABLE_TYPES.has(element.type as string);
};

export const isAlignmentActive = (editor: Editor, align: Alignment): boolean => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        isAlignableElement(n) &&
        n.align === align,
    })
  );

  return !!match;
};

export const setAlignment = (editor: Editor, align: Alignment): void => {
  Transforms.setNodes(
    editor,
    { align },
    {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && isAlignableElement(n),
    }
  );
};

export const insertImage = (editor: Editor, url: string, alt?: string, caption?: string): void => {
  if (!url) return;

  const image: ImageElement = {
    type: 'image',
    url,
    alt,
    caption,
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, image);
};

const unwrapLink = (editor: Editor): void => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor: Editor, url: string): void => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const normalizeUrl = (url: string): string => {
  if (!url) return url;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) {
    return url;
  }
  return `https://${url}`;
};

export const isLinkActive = (editor: Editor): boolean => {
  const [link] = Array.from(
    Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  );
  return !!link;
};

export const insertLink = (editor: Editor, url: string): void => {
  const normalized = normalizeUrl(url);
  if (!normalized) return;
  wrapLink(editor, normalized);
};

export const removeLink = (editor: Editor): void => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }
};

export const insertDivider = (editor: Editor): void => {
  const divider: DividerElement = {
    type: 'divider',
    align: 'center',
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, divider);
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  });
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const createTable = (rows: number, cols: number): TableElement => {
  const safeRows = clamp(Math.round(rows), 1, 10);
  const safeCols = clamp(Math.round(cols), 1, 6);

  const rowChildren: TableRowElement[] = Array.from({ length: safeRows }).map(() => ({
    type: 'table-row',
    children: Array.from({ length: safeCols }).map(() => ({
      type: 'table-cell',
      children: [{ text: '' }],
    })) as TableCellElement[],
  }));

  return {
    type: 'table',
    align: 'left',
    children: rowChildren,
  };
};

export const insertTable = (editor: Editor, rows: number, cols: number): void => {
  const table = createTable(rows, cols);
  Transforms.insertNodes(editor, table);
};
