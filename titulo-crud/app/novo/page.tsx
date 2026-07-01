import { TituloForm } from '@/components/TituloForm';

export default function NovoTituloPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <div className="w-full pt-4">
        <TituloForm initialDescricao="" submitLabel="Salvar título" title="Adicionar novo título" />
      </div>
    </main>
  );
}
