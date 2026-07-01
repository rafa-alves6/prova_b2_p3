import { NextResponse } from 'next/server';
import { createTitulo, listTitulos } from '@/lib/titulo';

export async function GET() {
  try {
    const titulos = await listTitulos();
    return NextResponse.json(titulos);
  } catch {
    return NextResponse.json({ message: 'Erro ao carregar títulos.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { tx_descricao?: string };
    const titulo = await createTitulo(body.tx_descricao ?? '');
    return NextResponse.json(titulo, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar título.';
    return NextResponse.json({ message }, { status: 400 });
  }
}
