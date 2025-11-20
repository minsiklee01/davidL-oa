"use client"

import RunList from "@/components/runs/RunsList";
import RunSteps from "@/components/runs/RunSteps";
import StepAssistant from "@/components/assistant/StepAssistant";
import { useState, useEffect } from "react";
import { Run, Step } from "@/lib/types";

export default function Home() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);

  // get runs
  useEffect(() => {
    fetch('/api/runs')
      .then(res => res.json())
      .then(data => {
        setRuns(data.runs);
        if (data.runs.length > 0) {
          setSelectedRunId(data.runs[0].id);
        }
      });
  }, []);

  // get steps of selected run
  useEffect(() => {
    if (selectedRunId === null) return;

    fetch(`/api/runs/${selectedRunId}`)
      .then(async (res) => {
        if (!res.ok) {
          console.error('Failed to fetch run', res.status);
          setSteps([]);
          setSelectedRunId(null);
          return null;
        }
        return res.json();
      })
      .then(data => {
        setSteps(data.steps);
        if (data.steps.length > 0) {
          setSelectedStepId(data.steps[0].id);
        }
      });
  }, [selectedRunId]);

  const selectedStep = steps.find(step => step.id === selectedStepId) ?? null;

  return (
    <div className="flex h-screen">
      <aside className="w-56 p-4 bg-primary">
        <h1 className="font-bold text-white">ProcessCoach Demo</h1>
      </aside>

      <main className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <section className="p-4">
            <RunList 
              runs={runs}
              selectedRunId={selectedRunId}
              onSelectRun={setSelectedRunId}
            />
          </section>

          <section className="p-4">
            <RunSteps
              steps={steps}
              selectedStepId={selectedStepId}
              onSelectStep={setSelectedStepId}
              runId={selectedRunId}
              onStepsUpdated={setSteps}
            />
          </section>
        </div>

        <section className="w-1/3 p-4">
          <StepAssistant step={selectedStep} />
        </section>
      </main>
    </div>
  );
}
