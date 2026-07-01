'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type TituloFormProps = {
  tituloId?: number;
  initialDescricao: string;
  submitLabel: string;
  title: string;
};

export function TituloForm({ tituloId, initialDescricao, submitLabel, title }: TituloFormProps) {
  const router = useRouter();
  const [descricao, setDescricao] = useState(initialDescricao);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(tituloId ? `/titulo/${tituloId}` : '/titulo', {
        method: tituloId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tx_descricao: descricao }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? 'Não foi possível salvar o título.');
      }

      router.push('/');
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o título.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-5">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-gray-700">Descrição</span>
          <input
            type="text"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-500"
            placeholder="Ex.: Doutor, Mestre, Especialista"
          />
        </label>

        {error ? <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Salvando...' : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Voltar
          </button>
        </div>
      </form>
    </section>
  );
}
