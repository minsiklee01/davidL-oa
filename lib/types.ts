export type RunStatus = 'pending' | 'in_progress' | 'completed';
export type StepStatus = 'pending' | 'assigned' | 'completed';

export type Run = {
  id: number;
  title: string;
  createdAt: string;
  status: RunStatus;
};

export type RunRow = {
  id: number;
  title: string;
  created_at: string;
  status: RunStatus;
}

export type Step = {
  id: number;
  runId: number;
  title: string;
  description: string;
  status: StepStatus;
};

export type StepRow = {
  id: number;
  run_id: number;
  title: string;
  description: string;
  status: StepStatus;
}
