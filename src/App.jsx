import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SportTabs from "./components/SportTabs.jsx";
import Filters from "./components/Filters.jsx";
import MatchList from "./components/MatchList.jsx";

function getTodayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const MOCK_MATCHES = [
  {
    id: "m1",
    sport: "football",
    league: "Premier League",
    home: "Manchester City",
    away: "Liverpool",
    score: { home: 2, away: 1 },
    status: "72'",
    isLive: true,
    hasVideo: true,
    location: "England",
  },
  {
    id: "m2",
    sport: "football",
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    score: { home: 0, away: 0 },
    status: "19:00",
    isLive: false,
    hasVideo: false,
    location: "Spain",
  },
  {
    id: "m3",
    sport: "basketball",
    league: "EuroLeague",
    home: "Olympiacos",
    away: "Fenerbahçe",
    score: { home: 78, away: 73 },
    status: "Q4 02:14",
    isLive: true,
    hasVideo: true,
    location: "Europe",
  },
  {
    id: "m4",
    sport: "tennis",
    league: "ATP 500",
    home: "A. Zverev",
    away: "C. Alcaraz",
    score: { home: 1, away: 1 },
    status: "Set 3",
    isLive: true,
    hasVideo: false,
    location: "Germany",
  },
  {
    id: "m5",
    sport: "hockey",
    league: "NHL",
    home: "Rangers",
    away: "Bruins",
    score: { home: 3, away: 3 },
    status: "OT 04:03",
    isLive: true,
    hasVideo: false,
    location: "USA",
  },
  {
    id: "m6",
    sport: "football",
    league: "Serie A",
    home: "Inter",
    away: "Juventus",
    score: { home: 1, away: 2 },
    status: "FT",
    isLive: false,
    hasVideo: false,
    location: "Italy",
  },
];

export default function App() {
  const [date, setDate] = useState(getTodayISO());
  const [sport, setSport] = useState("football");
  const [onlyLive, setOnlyLive] = useState(false);
  const [selectedLeagues, setSelectedLeagues] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const matches = useMemo(
    () => MOCK_MATCHES.filter((m) => m.sport === sport),
    [sport]
  );

  const toggleLeague = (lg) => {
    setSelectedLeagues((prev) => {
      const next = new Set(prev);
      if (next.has(lg)) next.delete(lg);
      else next.add(lg);
      return next;
    });
  };

  const openMatch = (m) => {
    alert(`${m.home} vs ${m.away} • ${m.league}\nStatus: ${m.status} | Score: ${m.score.home}-${m.score.away}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header date={date} onDateChange={setDate} searchTerm={searchTerm} onSearch={setSearchTerm} />
      <SportTabs selected={sport} onSelect={setSport} />

      <main className="mx-auto flex max-w-7xl gap-4">
        <Filters
          matches={matches}
          selectedLeagues={selectedLeagues}
          onToggleLeague={toggleLeague}
          onlyLive={onlyLive}
          onToggleLive={() => setOnlyLive((v) => !v)}
        />

        <div className="flex-1">
          <div className="sticky top-[68px] z-10 border-b border-zinc-800 bg-zinc-950/60 px-4 py-2 backdrop-blur">
            <div className="text-xs text-zinc-400">
              Showing results for <span className="font-medium text-zinc-200">{sport}</span> on
              <span className="font-medium text-zinc-200"> {date}</span>
              {onlyLive && <span className="ml-2 rounded bg-emerald-600/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">Live</span>}
              {selectedLeagues.size > 0 && (
                <span className="ml-2 rounded bg-zinc-700/40 px-1.5 py-0.5 text-[10px] text-zinc-300">
                  {Array.from(selectedLeagues).join(", ")}
                </span>
              )}
              {searchTerm && (
                <span className="ml-2 rounded bg-zinc-700/40 px-1.5 py-0.5 text-[10px] text-zinc-300">"{searchTerm}"</span>
              )}
            </div>
          </div>

          <MatchList
            matches={matches}
            selectedLeagues={selectedLeagues}
            searchTerm={searchTerm}
            onlyLive={onlyLive}
            onOpenMatch={openMatch}
          />
        </div>
      </main>

      <footer className="mt-8 border-t border-zinc-800 bg-zinc-950/60 py-8 text-center text-xs text-zinc-500">
        Built as a live scores experience inspired by Flashscore — demo content for UI only.
      </footer>
    </div>
  );
}
