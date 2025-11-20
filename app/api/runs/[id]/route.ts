import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Run, RunRow, Step, StepRow } from '@/lib/types';

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  const db = getDb();
  const runId = Number(id);

  const runRow = db.prepare(`
    SELECT id, title, created_at, status
    FROM runs
    WHERE id = ?
  `).get(runId) as RunRow;

  if (!runRow) {
    return NextResponse.json({ error: 'Run not found' }, { status: 404 });
  }

  const stepRows = db.prepare(`
    SELECT id, run_id, title, description, status
    FROM steps
    WHERE run_id = ?
  `).all(runId) as StepRow[];

  const run: Run = {
    id: runRow.id,
    title: runRow.title,
    createdAt: runRow.created_at,
    status: runRow.status,
  };

  const steps: Step[] = stepRows.map((row) => ({
    id: row.id,
    runId: row.run_id,
    title: row.title,
    description: row.description,
    status: row.status,
  }));

  return NextResponse.json({ run, steps });
}