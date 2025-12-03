'use client';

import React, { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { Toolbar } from './Toolbar';
import { Element, Leaf } from './Elements';
import { toggleMark } from './helpers';
import { initialValue, MarkFormat } from './types';

const HOTKEYS: Record<string, MarkFormat> = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
  '`': 'code',
};

export const SlateEditor: React.FC = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback(
    (props: React.ComponentProps<typeof Element>) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: React.ComponentProps<typeof Leaf>) => <Leaf {...props} />,
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!event.ctrlKey && !event.metaKey) return;

      const key = event.key.toLowerCase();
      const format = HOTKEYS[key];

      if (format) {
        event.preventDefault();
        toggleMark(editor, format);
      }
    },
    [editor]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Slate editor={editor} initialValue={value} onValueChange={setValue}>
        <div className="rounded-xl shadow-2xl shadow-slate-900/50 border border-slate-700/50 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
          <Toolbar />
          <div className="p-6 min-h-[400px]">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={handleKeyDown}
              placeholder="여기에 텍스트를 입력하세요..."
              className="outline-none min-h-[350px] focus:ring-0"
              spellCheck
              autoFocus
            />
          </div>
        </div>
      </Slate>

      {/* Debug: Show current value */}
      <details className="mt-6">
        <summary className="cursor-pointer text-slate-500 hover:text-slate-400 text-sm font-mono">
          📋 에디터 데이터 (JSON)
        </summary>
        <pre className="mt-2 p-4 bg-slate-900 rounded-lg text-xs text-slate-400 overflow-auto max-h-64 border border-slate-700">
          {JSON.stringify(value, null, 2)}
        </pre>
      </details>
    </div>
  );
};
