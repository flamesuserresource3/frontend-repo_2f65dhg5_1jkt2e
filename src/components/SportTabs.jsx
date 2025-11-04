import { Trophy, Globe } from "lucide-react";

const SPORTS = [
  { id: "football", label: "Football" },
  { id: "basketball", label: "Basketball" },
  { id: "tennis", label: "Tennis" },
  { id: "hockey", label: "Hockey" },
];

export default function SportTabs({ selected, onSelect }) {
  return (
    <div className="w-full border-b border-zinc-800 bg-zinc-950/40">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
        <div className="mr-2 inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-300">
          <Globe className="h-4 w-4 text-zinc-400" />
          All Sports
        </div>
        {SPORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm transition ${
              selected === s.id
                ? "bg-emerald-500 text-emerald-50 shadow"
                : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {s.label}
          </button>
        ))}
        <div className="ml-auto inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-300">
          <Trophy className="h-4 w-4 text-amber-400" />
          Top Competitions
        </div>
      </div>
    </div>
  );
}
