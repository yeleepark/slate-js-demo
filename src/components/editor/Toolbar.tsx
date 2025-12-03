'use client';

import React from 'react';
import { useSlate } from 'slate-react';
import {
  insertImage,
  insertLink,
  insertDivider,
  insertTable,
  isAlignmentActive,
  isBlockActive,
  isLinkActive,
  isMarkActive,
  removeLink,
  setAlignment,
  toggleBlock,
  toggleMark,
} from './helpers';
import { Alignment, BlockFormat, MarkFormat } from './types';

interface ToolbarButtonProps {
  format: MarkFormat | BlockFormat;
  icon: string;
  isBlock?: boolean;
  title: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ format, icon, isBlock = false, title }) => {
  const editor = useSlate();
  const isActive = isBlock
    ? isBlockActive(editor, format as BlockFormat)
    : isMarkActive(editor, format as MarkFormat);

  return (
    <button
      title={title}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${
          isActive
            ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white'
        }
      `}
      onMouseDown={event => {
        event.preventDefault();
        if (isBlock) {
          toggleBlock(editor, format as BlockFormat);
        } else {
          toggleMark(editor, format as MarkFormat);
        }
      }}
    >
      {icon}
    </button>
  );
};

const Divider: React.FC = () => <div className="w-px h-6 bg-slate-600 mx-1" aria-hidden="true" />;

interface AlignmentButtonProps {
  align: Alignment;
  icon: string;
  title: string;
}

const AlignmentButton: React.FC<AlignmentButtonProps> = ({ align, icon, title }) => {
  const editor = useSlate();
  const isActive = isAlignmentActive(editor, align);
  return (
    <button
      title={title}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${
          isActive
            ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white'
        }
      `}
      onMouseDown={event => {
        event.preventDefault();
        setAlignment(editor, align);
      }}
    >
      {icon}
    </button>
  );
};

interface ActionButtonProps {
  icon: string;
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, title, onClick, isActive = false }) => (
  <button
    title={title}
    className={`
      px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
      ${
        isActive
          ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white'
      }
    `}
    onMouseDown={event => {
      event.preventDefault();
      onClick();
    }}
  >
    {icon}
  </button>
);

export const Toolbar: React.FC = () => {
  const editor = useSlate();
  const linkActive = isLinkActive(editor);

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 rounded-t-xl">
      {/* Mark Buttons */}
      <ToolbarButton format="bold" icon="B" title="굵게 (Ctrl+B)" />
      <ToolbarButton format="italic" icon="I" title="기울임 (Ctrl+I)" />
      <ToolbarButton format="underline" icon="U" title="밑줄 (Ctrl+U)" />
      <ToolbarButton format="code" icon="<>" title="코드 (Ctrl+`)" />

      <Divider />

      {/* Block Buttons */}
      <ToolbarButton format="heading" icon="H1" isBlock title="제목" />
      <ToolbarButton format="blockquote" icon="❝" isBlock title="인용문" />
      <ToolbarButton format="code-block" icon="{ }" isBlock title="코드 블록" />

      <Divider />

      {/* List Buttons */}
      <ToolbarButton format="bulleted-list" icon="•" isBlock title="글머리 기호 목록" />
      <ToolbarButton format="numbered-list" icon="1." isBlock title="번호 매기기 목록" />

      <Divider />

      {/* Alignment Buttons */}
      <AlignmentButton align="left" icon="⇤" title="좌측 정렬" />
      <AlignmentButton align="center" icon="↔" title="가운데 정렬" />
      <AlignmentButton align="right" icon="⇥" title="우측 정렬" />

      <Divider />

      {/* Media / Link Buttons */}
      <ActionButton
        icon="🖼"
        title="이미지 추가"
        onClick={() => {
          const url = window.prompt('추가할 이미지 URL을 입력하세요');
          if (!url) return;
          const alt = window.prompt('이미지 설명(선택 사항)을 입력하세요') ?? undefined;
          const caption = window.prompt('이미지 캡션(선택 사항)을 입력하세요') ?? undefined;
          insertImage(editor, url.trim(), alt?.trim() || undefined, caption?.trim() || undefined);
        }}
      />
      <ActionButton
        icon="🔗"
        title={linkActive ? '링크 제거' : '링크 추가'}
        isActive={linkActive}
        onClick={() => {
          if (linkActive) {
            removeLink(editor);
            return;
          }
          const url = window.prompt('추가할 링크 URL을 입력하세요');
          if (!url) return;
          insertLink(editor, url.trim());
        }}
      />
      <ActionButton
        icon="━"
        title="구분선 추가"
        onClick={() => {
          insertDivider(editor);
        }}
      />
      <ActionButton
        icon="▦"
        title="표 삽입"
        onClick={() => {
          const rowsInput = window.prompt('행 개수를 입력하세요 (1-10, 기본 2)', '2');
          if (rowsInput === null) return;
          const colsInput = window.prompt('열 개수를 입력하세요 (1-6, 기본 2)', '2');
          if (colsInput === null) return;

          const rows = Number(rowsInput);
          const cols = Number(colsInput);

          if (Number.isNaN(rows) || Number.isNaN(cols)) {
            alert('숫자를 입력해주세요.');
            return;
          }

          insertTable(editor, rows, cols);
        }}
      />
    </div>
  );
};
