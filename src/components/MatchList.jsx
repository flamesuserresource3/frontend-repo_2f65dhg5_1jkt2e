import { useMemo } from "react";
import { Clock, ChevronRight, Play } from "lucide-react";

function MatchCard({ match, onClick }) {
  return (
    <button
      onClick={() => onClick && onClick(match)}
      className="group flex w-full items-center justify-between gap-3 rounded-md border border-zinc-800 bg-zinc-900 p-3 text-left text-sm text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="inline-flex items-center gap-1 text-xs">
            <Clock className="h-3.5 w-3.5" /> {match.status}
          </span>
          {match.isLive && (
            <span className="ml-2 inline-flex items-center gap-1 rounded bg-emerald-600/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
              Live
            </span>
          )}
          {match.hasVideo && (
            <span className="ml-2 inline-flex items-center gap-1 rounded bg-sky-600/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-400">
              <Play className="h-3 w-3" /> Video
            </span>
          )}
        </div>
        <div className="mt-1 truncate text-zinc-300">
          <span className="font-medium text-white">{match.home}</span> vs {match.away}
        </div>
        <div className="mt-0.5 text-xs text-zinc-400">{match.league} • {match.location}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded bg-zinc-950 px-2 py-1 text-base font-semibold text-white">
          {match.score.home} - {match.score.away}
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-500 opacity-0 transition group-hover:opacity-100" />
      </div>
    </button>
  );
}

export default function MatchList({ matches, selectedLeagues, searchTerm, onlyLive, onOpenMatch }) {
  const filtered = useMemo(() => {
    const q = (searchTerm || "").toLowerCase();
    return matches
      .filter((m) => (onlyLive ? m.isLive : true))
      .filter((m) => (selectedLeagues.size > 0 ? selectedLeagues.has(m.league) : true))
      .filter((m) =>
        q
          ? [m.home, m.away, m.league, m.location].some((s) => s.toLowerCase().includes(q))
          : true
      );
  }, [matches, selectedLeagues, searchTerm, onlyLive]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const m of filtered) {
      if (!map.has(m.league)) map.set(m.league, []);
      map.get(m.league).push(m);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="flex-1 space-y-6 p-4">
      {grouped.length === 0 ? (
        <div className="mt-20 text-center text-sm text-zinc-400">No matches found for the selected filters.</div>
      ) : (
        grouped.map(([league, items]) => (
          <section key={league}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-zinc-300">{league}</h3>
              <span className="text-xs text-zinc-500">{items.length} matches</span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {items.map((m) => (
                <MatchCard key={m.id} match={m} onClick={onOpenMatch} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
