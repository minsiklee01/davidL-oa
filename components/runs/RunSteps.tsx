import { Step, StepStatus } from '@/lib/types';

interface Props {
  runId: number | null;
  steps: Step[];
  selectedStepId: number | null;
  onSelectStep: (id: number) => void;
  onStepsUpdated: (steps: Step[]) => void;
}

export default function RunSteps({
  runId,
  steps,
  selectedStepId,
  onSelectStep,
  onStepsUpdated,
}: Props) {
  if (!runId) {
    return <div>Select a run to see its steps.</div>;
  }

  async function updateStatus(stepId: number, status: StepStatus) {
    const res = await fetch(`/api/runs/${runId}/steps/${stepId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    const updated = data.step;

    onStepsUpdated(
      steps.map(s => (s.id === stepId ? { ...s, status: updated.status } : s))
    );
  }

  return (
    <div>
      <h2 className="font-semibold mb-3">Steps</h2>
      <ul className="space-y-2">
        {steps.map(step => (
          <li
            key={step.id}
            className={`rounded px-3 py-2 cursor-pointer ${
              step.id === selectedStepId ? 'bg-gray-300' : 'bg-light'
            }`}
            onClick={() => onSelectStep(step.id)}
          >
            <div className="flex items-center">
              <span className="font-medium text-sm mr-2">
                {step.title}
              </span>
              <span
                className={`text-xs uppercase px-2 py-1 rounded ${
                  step.status === 'completed'
                    ? 'bg-green-800 text-amber-50'
                    : step.status === 'assigned'
                    ? 'bg-orange-100 text-amber-50'
                    : 'bg-yellow-500 text-amber-50'
                }`}
              >
                {step.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {step.description}
            </p>
            {step.status !== 'completed' && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  updateStatus(step.id, 'completed');
                }}
                className="mt-2 text-xs underline"
              >
                Mark as completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}