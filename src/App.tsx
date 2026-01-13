import { useMemo } from 'react';

// Infraestructura y Hooks
import { createBrowserFileSystem } from './infrastructure/file-system/browser-file-system';
import { useScanFolder } from './presentation/hooks/use-scan-folder';
import { useOrganizeGame } from './presentation/hooks/use-organize-game';
import { useRevertGame } from './presentation/hooks/use-revert-game';

// Tipos
import type { Game } from './domain/entities/game-types';

export default function App() {
  // 1. Instancia persistente del Sistema de Archivos
  const fileSystem = useMemo(() => createBrowserFileSystem(), []);

  // 2. Hooks de lógica y estado
  const { games, isScanning, scan, setGames } = useScanFolder(fileSystem);
  const { organize, isOrganizing } = useOrganizeGame(fileSystem);
  const { revert, isReverting } = useRevertGame(fileSystem);

  const DISC_PATTERN = 'Disc';
  const GROUPING_STRATEGY = 'aggressive';

  // --- HANDLERS DE ACCIÓN ---

  const handleOrganize = async (game: Game) => {
    try {
      await organize(game);
      // En lugar de borrarlo, actualizamos su estado en la lista local
      setGames((prev) =>
        prev.map((g) => (g.name === game.name ? { ...g, status: 'organized' } : g)),
      );
    } catch (error) {
      console.error('Error al organizar:', error);
    }
  };

  const handleRevert = async (game: Game) => {
    try {
      await revert(game);
      // Cambiamos el estado a pendiente para que se pueda volver a organizar
      setGames((prev) => prev.map((g) => (g.name === game.name ? { ...g, status: 'pending' } : g)));
    } catch (error) {
      console.error('Error al revertir:', error);
    }
  };

  // --- RENDERIZADO ---

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header Principal */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
            PSX <span className="text-blue-500">M3U</span> Manager
          </h1>
          <p className="text-slate-400 max-w-md mx-auto">
            Detecta juegos multidisco y organízalos en carpetas .m3u compatibles con emuladores.
          </p>
        </header>

        {/* Panel de Control de Escaneo */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl mb-10">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => scan(DISC_PATTERN)}
              disabled={isScanning || isOrganizing || isReverting}
              className={`group w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3
                ${
                  isScanning
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 active:scale-[0.98]'
                }`}
            >
              {isScanning && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isScanning ? 'Analizando biblioteca...' : 'Seleccionar Carpeta Root'}
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-semibold">
              <span>Patrón de búsqueda:</span>
              <span className="bg-slate-800 text-blue-400 px-2 py-1 rounded border border-slate-700 font-mono">
                {DISC_PATTERN}
              </span>
            </div>
          </div>
        </section>

        {/* Listado de Juegos */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Juegos Identificados ({games.length})
            </h2>
          </div>

          {games.length === 0 && !isScanning && (
            <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl text-slate-600">
              <p className="text-lg">No hay juegos cargados.</p>
              <p className="text-sm">Escanea una carpeta para ver tus archivos .chd</p>
            </div>
          )}

          <div className="grid gap-4">
            {games.map((game) => (
              <article
                key={game.name}
                className={`group p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border transition-all duration-300
                  ${
                    game.status === 'organized'
                      ? 'bg-emerald-500/5 border-emerald-500/20 shadow-inner'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-lg'
                  }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className={`font-bold text-lg transition-colors ${game.status === 'organized' ? 'text-emerald-400' : 'text-slate-100'}`}
                    >
                      {game.name}
                    </h3>
                    {game.status === 'organized' && (
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-tighter">
                        Listo (M3U)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">
                    {game.discs.length > 0
                      ? `${game.discs.length} archivos .chd detectados`
                      : 'Estructura .m3u detectada'}
                  </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  {game.status === 'organized' ? (
                    <button
                      onClick={() => handleRevert(game)}
                      disabled={isReverting || isOrganizing}
                      className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all disabled:opacity-30"
                    >
                      Deshacer
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOrganize(game)}
                      disabled={isOrganizing || isReverting}
                      className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50"
                    >
                      {isOrganizing ? 'Procesando...' : 'Convertir a M3U'}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
