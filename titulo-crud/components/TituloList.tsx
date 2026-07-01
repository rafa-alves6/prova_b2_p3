'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Titulo } from '@/lib/titulo';

function EditIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M13.586 3a2 2 0 0 1 2.828 2.828l-8.5 8.5L4 15l.672-3.914 8.914-8.086ZM3 17h14v1H3v-1Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M7 2a1 1 0 0 0-1 1v1H3v2h14V4h-3V3a1 1 0 0 0-1-1H7Zm1 2V4h4V4H8Zm-4 5h12l-.8 8.1A2 2 0 0 1 12.21 19H7.79a2 2 0 0 1-1.99-1.9L5 9Z" />
    </svg>
  );
}

export function TituloList() {
  const [titulos, setTitulos] = useState<Titulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadTitulos() {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/titulo', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Falha ao carregar os títulos.');
      }
      const data = (await response.json()) as Titulo[];
      setTitulos(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar os títulos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTitulos();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm('Confirma a exclusão deste título?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/titulo/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? 'Não foi possível excluir o título.');
      }
      await loadTitulos();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Não foi possível excluir o título.');
    }
  }

  return (
    <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Títulos acadêmicos</h1>
      </div>

      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-600">
          Carregando...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      ) : titulos.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-600">
          Nenhum título cadastrado.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {titulos.map((titulo) => (
                <tr key={titulo.id_titulo} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{titulo.id_titulo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{titulo.tx_descricao}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/editar/${titulo.id_titulo}`}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium !text-white hover:bg-blue-700"
                      >
                        <EditIcon />
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => void handleDelete(titulo.id_titulo)}
                        className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        <TrashIcon />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-1">
        <Link
          href="/novo"
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <span aria-hidden="true">+</span>
          Adicionar novo título
        </Link>
      </div>
    </section>
  );
}
