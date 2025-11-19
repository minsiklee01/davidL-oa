export type RunStatus = 'pending' | 'in_progress' | 'completed';
export type StepStatus = 'pending' | 'assigned' | 'completed';

export type Run = {
  id: number;
  title: string;
  createdAt: string;
  status: RunStatus;
};

export type Step = {
  id: number;
  runId: number;
  title: string;
  description: string;
  status: StepStatus;
};