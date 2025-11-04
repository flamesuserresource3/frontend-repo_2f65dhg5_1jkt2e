import { Search, Calendar, Bell } from "lucide-react";
import { useState } from "react";

export default function Header({ date, onDateChange, searchTerm, onSearch }) {
  const [input, setInput] = useState(searchTerm || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-emerald-500" />
            <span className="font-semibold tracking-tight text-white">LiveScores</span>
          </div>

          <form onSubmit={handleSubmit} className="ml-4 hidden flex-1 items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 shadow-sm focus-within:border-zinc-700 sm:flex">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search teams, leagues..."
              className="w-full bg-transparent outline-none placeholder:text-zinc-500"
            />
          </form>

          <button className="ml-auto inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
            <Bell className="h-4 w-4" />
            Alerts
          </button>

          <label className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
            <Calendar className="h-4 w-4" />
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-transparent outline-none [color-scheme:dark]"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 shadow-sm sm:hidden">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search teams, leagues..."
            className="w-full bg-transparent outline-none placeholder:text-zinc-500"
          />
        </form>
      </div>
    </header>
  );
}
