'use client';

export function HomeHeader() {
  return (
    <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Slate Editor</h1>
              <p className="text-xs text-slate-500">Next.js 14 + Slate.js</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://docs.slatejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/ianstormtaylor/slate"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
