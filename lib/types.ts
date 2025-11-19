type RunStatus = 'pending' | 'in_progress' | 'completed';
type StepStatus = 'pending' | 'assigned' | 'completed';

type Run = {
  id: number;
  title: string;
  createdAt: string;
  status: RunStatus;
};

type Step = {
  id: number;
  runId: number;
  title: string;
  description: string;
  status: StepStatus;
};