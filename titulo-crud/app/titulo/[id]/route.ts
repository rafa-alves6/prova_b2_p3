import { NextResponse } from 'next/server';
import { deleteTitulo, getTituloById, updateTitulo } from '@/lib/titulo';

function parseId(id: string) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const tituloId = parseId(id);

  if (tituloId === null) {
    return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
  }

  const titulo = await getTituloById(tituloId);

  if (!titulo) {
    return NextResponse.json({ message: 'Título não encontrado.' }, { status: 404 });
  }

  return NextResponse.json(titulo);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const tituloId = parseId(id);

  if (tituloId === null) {
    return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
  }

  try {
    const body = (await request.json()) as { tx_descricao?: string };
    const titulo = await updateTitulo(tituloId, body.tx_descricao ?? '');

    if (!titulo) {
      return NextResponse.json({ message: 'Título não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(titulo);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar título.';
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const tituloId = parseId(id);

  if (tituloId === null) {
    return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
  }

  const titulo = await deleteTitulo(tituloId);

  if (!titulo) {
    return NextResponse.json({ message: 'Título não encontrado.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
