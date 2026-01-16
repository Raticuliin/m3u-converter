import { useMemo, useState, useEffect } from 'react';
// Hooks y Arquitectura
import { useOrganizer } from './presentation/hooks/use-organizer';
import { useFilterGames } from './presentation/hooks/use-filter-games';
import { createBrowserFileSystem } from './infrastructure/file-system/browser-file-system';
import type { Game } from './domain/entities/types';

import Home from './presentation/pages/Home';
import Dashboard from './presentation/pages/Dashboard';
import { CircleMinus, CirclePlus, Folder, Gamepad, Search, SquarePlus, Trash } from 'lucide-react';

// --- ICONOS SVG ---
export default function App() {
  const fileSystem = useMemo(() => createBrowserFileSystem(), []);

  const { scan, hasDirectory, organizeList, revertList, status, games, setGames } =
    useOrganizer(fileSystem);

  const { filterGameList: filteredGames, filter, updateFilter } = useFilterGames(games);

  const [activeTab, setActiveTab] = useState<'convert' | 'revert'>('convert');

  const [queue, setQueue] = useState<Game[]>([]);

  const DISC_PATTERN = 'Disc';

  // Sincronización automática de filtros
  useEffect(() => {
    updateFilter({ status: activeTab });
    setQueue([]);
  }, [activeTab]);

  // --- LOGICA DE COLA ---
  const addToQueue = (game: Game) => {
    if (!queue.find((g) => g.name === game.name)) setQueue([...queue, game]);
  };

  const removeFromQueue = (name: string) => {
    setQueue((prev) => prev.filter((g) => g.name !== name));
  };

  const addAllToQueue = () => {
    // Filtramos los que ya están en la cola para no duplicar
    const gamesToAdd = filteredGames.filter((g) => !queue.find((q) => q.name === g.name));
    setQueue([...queue, ...gamesToAdd]);
  };

  const handleProcessQueue = async () => {
    for (const game of queue) {
      if (activeTab === 'pending') {
        await organizeList([game]);
        setGames((prev) =>
          prev.map((g) => (g.name === game.name ? { ...g, status: 'organized' } : g)),
        );
      } else {
        await revertList([game]);
        setGames((prev) =>
          prev.map((g) => (g.name === game.name ? { ...g, status: 'pending' } : g)),
        );
      }
    }
    setQueue([]);
  };

  if (!hasDirectory) return <Home scan={scan} discPattern={DISC_PATTERN} />;
  else return <Dashboard />;
  /*
    return (
      <div className="flex h-screen bg-[#0a0f12] text-slate-400 font-sans overflow-hidden">
        <aside className="w-64 bg-[#0d1317] border-r border-slate-800 flex flex-col p-6 flex-shrink-0 shadow-2xl">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <Gamepad />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EmuStack</span>
          </div>

          <nav className="flex-1 space-y-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'pending' ? 'bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'hover:bg-slate-800/50'}`}
            >
              Games to Convert
            </button>
            <button
              onClick={() => setActiveTab('organized')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'organized' ? 'bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'hover:bg-slate-800/50'}`}
            >
              Converted Games
            </button>
          </nav>

          <button
            onClick={() => scan(DISC_PATTERN)}
            className="mt-auto flex items-center justify-center gap-3 w-full py-3 border border-emerald-500/30 text-emerald-500 rounded-xl hover:bg-emerald-500/10 transition-all font-bold text-xs uppercase tracking-widest"
          >
            <Folder /> Select Folder
          </button>
        </aside>

        <main className="flex-1 flex overflow-hidden">
          <section className="flex-1 flex flex-col border-r border-slate-800/50 overflow-hidden">
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Library</h2>
                  <span className="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase">
                    {filteredGames.length} Available
                  </span>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search />
                </div>
                <input
                  type="text"
                  placeholder="Search unselected games..."
                  className="w-full bg-[#121a1f] border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-emerald-500/50 text-white placeholder:text-slate-600 transition-all"
                  value={filter.search}
                  onChange={(e) => updateFilter({ search: e.target.value })}
                />
              </div>

              <div className="space-y-3 pb-4">
                {filteredGames
                  .filter((g) => !queue.find((q) => q.name === g.name))
                  .map((game) => (
                    <div
                      key={game.name}
                      className="flex items-center justify-between p-4 bg-[#0d1317] border border-slate-800/50 rounded-2xl group hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#121a1f] rounded-xl text-emerald-500 shadow-inner">
                          <Gamepad />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">{game.name}</h3>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">
                            {game.discs.length} Discs (.chd)
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToQueue(game)}
                        className="p-2.5 bg-[#121a1f] border border-slate-800 rounded-xl hover:bg-emerald-500 hover:text-[#0a0f12] transition-all transform active:scale-90 shadow-lg"
                      >
                        <CirclePlus />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-6 bg-[#0d1317]/50 border-t border-slate-800/50">
              <button
                onClick={addAllToQueue}
                disabled={filteredGames.length === 0}
                className="w-full py-4 bg-[#121a1f] border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <SquarePlus /> Add all filtered games
              </button>
            </div>
          </section>

          <section className="w-[480px] bg-[#0a0f12] flex flex-col overflow-hidden">
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white tracking-tight">Selection Queue</h2>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase ${activeTab === 'pending' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}
                >
                  {queue.length} Selected
                </span>
              </div>

              <button
                disabled={queue.length === 0 || status.isBusy}
                onClick={handleProcessQueue}
                className={`w-full py-4 font-black rounded-xl mb-12 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] ${activeTab === 'pending' ? 'bg-emerald-500 hover:bg-emerald-400 text-[#0a0f12] shadow-emerald-500/10' : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/10'} disabled:bg-slate-800 disabled:text-slate-600 disabled:shadow-none`}
              >
                {status.isBusy
                  ? 'PROCESSING...'
                  : activeTab === 'pending'
                    ? 'CONVERT'
                    : 'DESCONVERTIR'}{' '}
                ({queue.length} GAMES)
              </button>

              <div className="space-y-4">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">
                  Queue Process
                </p>
                {queue.map((game) => (
                  <div
                    key={game.name}
                    className={`flex items-center justify-between p-4 bg-[#0d1317] border rounded-2xl transition-all animate-in slide-in-from-right-4 duration-300 ${activeTab === 'pending' ? 'border-emerald-500/10' : 'border-rose-500/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl ${activeTab === 'pending' ? 'bg-emerald-500/5 text-emerald-500' : 'bg-rose-500/5 text-rose-500'}`}
                      >
                        <Gamepad />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-xs">{game.name}</h3>
                        <p
                          className={`text-[9px] font-mono mt-0.5 ${activeTab === 'pending' ? 'text-emerald-500/60' : 'text-rose-500/60'}`}
                        >
                          {activeTab === 'pending'
                            ? `OUTPUT: ${game.name}.m3u`
                            : 'STATUS: REVERTING TO ROOT'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromQueue(game.name)}
                      className="p-2 text-slate-700 hover:text-rose-500 transition-colors"
                    >
                      <CircleMinus />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#0a0f12] border-t border-slate-800/50">
              <button
                onClick={() => setQueue([])}
                disabled={queue.length === 0}
                className="w-full py-4 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-0"
              >
                <Trash /> Clear all selected
              </button>
            </div>
          </section>
        </main>
      </div>
    );
    */
}
