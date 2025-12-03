'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { Alignment, HeadingLevel, TextSize } from './types';

const getTextAlign = (align?: Alignment) => align ?? 'left';
const getFontSizeStyle = (size?: TextSize) => (size ? { fontSize: `${size}px` } : {});
const buildStyle = (element: { align?: Alignment; fontSize?: TextSize }) => ({
  textAlign: getTextAlign(element.align),
  ...getFontSizeStyle(element.fontSize),
});

export const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading':
      const HeadingTag = `h${element.level}` as `h${HeadingLevel}`;
      const headingStyles: Record<HeadingLevel, string> = {
        1: 'text-4xl font-bold text-white mb-5 mt-7',
        2: 'text-3xl font-semibold text-slate-100 mb-4 mt-6',
        3: 'text-2xl font-semibold text-slate-200 mb-3 mt-5',
        4: 'text-xl font-semibold text-slate-300 mb-3 mt-4',
        5: 'text-lg font-medium text-slate-300 mb-2 mt-3',
        6: 'text-base font-medium text-slate-400 mb-2 mt-3',
      };
      return (
        <HeadingTag
          {...attributes}
          className={headingStyles[element.level]}
          style={buildStyle(element)}
        >
          {children}
        </HeadingTag>
      );

    case 'blockquote':
      return (
        <blockquote
          {...attributes}
          className="border-l-4 border-amber-500 pl-4 py-2 my-4 bg-slate-800/50 rounded-r-lg italic text-slate-300"
          style={buildStyle(element)}
        >
          {children}
        </blockquote>
      );

    case 'code-block':
      return (
        <pre
          {...attributes}
          className="bg-slate-900 rounded-lg p-4 my-4 overflow-x-auto font-mono text-sm text-emerald-400 border border-slate-700"
          style={buildStyle(element)}
        >
          <code>{children}</code>
        </pre>
      );

    case 'bulleted-list':
      return (
        <ul
          {...attributes}
          className="list-disc list-inside my-3 space-y-1 text-slate-300 ml-4"
          style={buildStyle(element)}
        >
          {children}
        </ul>
      );

    case 'numbered-list':
      return (
        <ol
          {...attributes}
          className="list-decimal list-inside my-3 space-y-1 text-slate-300 ml-4"
          style={buildStyle(element)}
        >
          {children}
        </ol>
      );

    case 'list-item':
      return (
        <li {...attributes} className="pl-1" style={buildStyle(element)}>
          {children}
        </li>
      );

    case 'image':
      return (
        <div
          {...attributes}
          className="my-6 flex justify-center"
          style={{ textAlign: getTextAlign(element.align) }}
        >
          <div contentEditable={false} className="inline-block max-w-full">
            <figure className="space-y-2">
              <img
                src={element.url}
                alt={element.alt ?? '에디터 이미지'}
                className="max-h-[400px] w-full object-contain rounded-lg border border-slate-700 bg-slate-900"
              />
              {element.caption && (
                <figcaption className="text-xs text-slate-400 text-center">
                  {element.caption}
                </figcaption>
              )}
            </figure>
          </div>
          {children}
        </div>
      );

    case 'video':
      return (
        <div
          {...attributes}
          className="my-8 flex justify-center"
          style={{ textAlign: getTextAlign(element.align) }}
        >
          <div contentEditable={false} className="w-full max-w-3xl">
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-slate-700 bg-black shadow-lg shadow-slate-900/40">
              <iframe
                src={element.url}
                title={element.title ?? 'YouTube video'}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {element.title && (
              <p className="text-xs text-slate-400 text-center mt-2">{element.title}</p>
            )}
          </div>
          {children}
        </div>
      );

    case 'link':
      return (
        <a
          {...attributes}
          href={element.url}
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 underline underline-offset-4 decoration-amber-500 hover:text-amber-300"
        >
          {children}
        </a>
      );

    case 'table':
      return (
        <div
          {...attributes}
          className="my-6 overflow-x-auto"
          style={{ textAlign: getTextAlign(element.align) }}
        >
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <tbody>{children}</tbody>
          </table>
        </div>
      );

    case 'table-row':
      return <tr {...attributes}>{children}</tr>;

    case 'table-cell':
      return (
        <td
          {...attributes}
          className="border border-slate-700/60 px-3 py-2 align-top"
          style={{ textAlign: getTextAlign(element.align), minWidth: 100 }}
        >
          {children}
        </td>
      );

    case 'divider':
      return (
        <div
          {...attributes}
          className="my-8 flex justify-center"
          style={{ textAlign: getTextAlign(element.align) }}
        >
          <div contentEditable={false} className="w-full max-w-2xl">
            <hr className="border-t border-slate-700/70" />
          </div>
          {children}
        </div>
      );

    default:
      return (
        <p
          {...attributes}
          className="my-2 text-slate-300 leading-relaxed"
          style={buildStyle(element)}
        >
          {children}
        </p>
      );
  }
};

export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  let formattedChildren = children;

  if (leaf.bold) {
    formattedChildren = <strong className="font-bold text-white">{formattedChildren}</strong>;
  }

  if (leaf.italic) {
    formattedChildren = <em className="italic text-amber-300">{formattedChildren}</em>;
  }

  if (leaf.underline) {
    formattedChildren = (
      <u className="underline decoration-amber-500 decoration-2 underline-offset-2">
        {formattedChildren}
      </u>
    );
  }

  if (leaf.code) {
    formattedChildren = (
      <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-sm">
        {formattedChildren}
      </code>
    );
  }

  const style = leaf.color ? { color: leaf.color } : undefined;

  return (
    <span {...attributes} style={style}>
      {formattedChildren}
    </span>
  );
};
