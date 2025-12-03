'use client';

import { SlateEditor } from '@/components/editor';
import { HomeHeader } from '@/components/home';

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern">
      <HomeHeader />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <SlateEditor />
      </div>
    </main>
  );
}
