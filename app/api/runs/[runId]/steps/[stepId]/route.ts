import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { StepStatus } from '@/lib/types';

interface Params {
  params: { runId: string; stepId: string };
}

export async function PATCH(req: Request, { params }: Params) {
  const db = getDb();
  const runId = Number(params.runId);
  const stepId = Number(params.stepId);

  const body = await req.json();
  const status: StepStatus = body.status;

  const existing = db.prepare(
    `SELECT id FROM steps WHERE id = ? AND run_id = ?`
  ).get(stepId, runId);

  if (!existing) {
    return NextResponse.json({ error: 'Step not found' }, { status: 404 });
  }

  db.prepare(
    `UPDATE steps SET status = ? WHERE id = ?`
  ).run(status, stepId);

  const updated = db.prepare(
    `SELECT id, run_id, title, description, status
     FROM steps WHERE id = ?`
  ).get(stepId);

  return NextResponse.json({ step: updated });
}