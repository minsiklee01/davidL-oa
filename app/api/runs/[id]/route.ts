import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Run, RunRow, Step, StepRow } from '@/lib/types';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const db = getDb();
  const id = Number(params.id);

  const runRow = db.prepare(`
    SELECT id, title, created_at, status
    FROM runs
    WHERE id = ?
  `).get(id) as RunRow;

  if (!runRow) {
    return NextResponse.json({ error: 'Run not found' }, { status: 404 });
  }

  const stepRows = db.prepare(`
    SELECT id, run_id, title, description, status, step_order, prerequisite_step_id
    FROM steps
    WHERE run_id = ?
    ORDER BY step_order ASC
  `).all(id) as StepRow[];

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