import { Run } from "@/lib/types"

interface Props {
  runs: Run[];
  selectedRunId: number | null;
  onSelectRun: (id: number) => void;
}

export default function RunList({ runs, selectedRunId, onSelectRun }: Props) {
  return (
    <div>
      <h2 className="font-semibold mb-3">Runs</h2>
      <ul className="space-y-2">
        {runs.map(run => (
          <li
            key={run.id}
            className={`cursor-pointer rounded px-3 py-2 text-sm  ${
              run.id === selectedRunId ? 'bg-gray-300' : 'bg-light'
            }`}
            onClick={()=>onSelectRun(run.id)}
          >
            <div>{run.title}</div>
            <div className="text-xs text-gray-500">Status: {run.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}