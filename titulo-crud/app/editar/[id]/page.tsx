import { notFound } from 'next/navigation';
import { TituloForm } from '@/components/TituloForm';
import { getTituloById } from '@/lib/titulo';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarTituloPage({ params }: PageProps) {
  const { id } = await params;
  const tituloId = Number(id);

  if (!Number.isInteger(tituloId) || tituloId <= 0) {
    notFound();
  }

  const titulo = await getTituloById(tituloId);

  if (!titulo) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <div className="w-full pt-4">
        <TituloForm tituloId={titulo.id_titulo} initialDescricao={titulo.tx_descricao} submitLabel="Atualizar título" title="Editar título" />
      </div>
    </main>
  );
}
