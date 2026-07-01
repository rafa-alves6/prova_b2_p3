import { TituloList } from '@/components/TituloList';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <div className="w-full pt-4">
        <TituloList />
      </div>
    </main>
  );
}
