import { useMemo } from "react";
import { Filter, Star } from "lucide-react";

export default function Filters({ matches, selectedLeagues, onToggleLeague, onlyLive, onToggleLive }) {
  const leagues = useMemo(() => {
    const set = new Set(matches.map((m) => m.league));
    return Array.from(set).sort();
  }, [matches]);

  return (
    <aside className="hidden w-full max-w-xs flex-shrink-0 flex-col gap-3 border-r border-zinc-800 bg-zinc-950/40 p-4 md:flex">
      <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
        <Filter className="h-4 w-4 text-zinc-400" /> Filters
      </div>

      <label className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-300">
        <div className="flex items-center gap-2">
          <Star className={`h-4 w-4 ${onlyLive ? "text-emerald-400" : "text-zinc-500"}`} />
          Only live
        </div>
        <input type="checkbox" checked={onlyLive} onChange={onToggleLive} className="h-4 w-4 accent-emerald-500" />
      </label>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-zinc-500">Leagues</div>
        <div className="max-h-[50vh] space-y-2 overflow-auto pr-1">
          {leagues.map((lg) => (
            <label
              key={lg}
              className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              <span>{lg}</span>
              <input
                type="checkbox"
                checked={selectedLeagues.has(lg)}
                onChange={() => onToggleLeague(lg)}
                className="h-4 w-4 accent-emerald-500"
              />
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
