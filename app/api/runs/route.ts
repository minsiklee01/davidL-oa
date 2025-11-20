import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Run, RunRow } from '@/lib/types';

export async function GET() {
  const db = getDb();

  const rows = db.prepare(`
    SELECT id, title, created_at, status
    FROM runs
    ORDER BY created_at DESC
  `).all() as RunRow[];

  const runs: Run[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    createdAt: row.created_at,
    status: row.status,
  }));

  return NextResponse.json({ runs });
}
