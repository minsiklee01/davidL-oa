import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { StepStatus } from '@/lib/types';

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string, stepId: string }> }
) {
  const { id, stepId } = await params;
  const runId = Number(id);
  const stepIdNum = Number(stepId);

  const db = getDb();

  const body = await req.json();
  const status: StepStatus = body.status;

  const existing = db.prepare(
    `SELECT id FROM steps WHERE id = ? AND run_id = ?`
  ).get(stepIdNum, runId);

  if (!existing) {
    return NextResponse.json({ error: 'Step not found' }, { status: 404 });
  }

  db.prepare(
    `UPDATE steps SET status = ? WHERE id = ?`
  ).run(status, stepIdNum);

  const updated = db.prepare(
    `SELECT id, run_id, title, description, status
     FROM steps WHERE id = ?`
  ).get(stepIdNum);

  return NextResponse.json({ step: updated });
}