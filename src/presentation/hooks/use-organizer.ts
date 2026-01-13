import { useMemo, useState } from 'react';

import type { Game } from '../../domain/entities/game-types';
import { createBrowserFileSystem } from '../../infrastructure/file-system/browser-file-system';
import { parseGames } from '../../domain/logic/game-parser';
import { generateM3u } from '../../domain/logic/m3u-generator';

export function useOrganizer() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileSystem = useMemo(() => createBrowserFileSystem(), []);

  const scan = async (pattern: string) => {
    setIsLoading(true);

    const fileNames = await fileSystem.scanDirectory();
    const detectedGames = parseGames(pattern, fileNames, 'safe');
    setGames(detectedGames);

    setIsLoading(false);
  };

  const organizeSingle = async (game: Game) => {
    const m3uContent = generateM3u(game);

    await fileSystem.organizeGame(game, m3uContent);

    setGames((prev) => prev.filter((g) => g.name !== game.name));
  };

  const organizeAll = async () => {
    setIsLoading(true);
    for (const game of games) {
      await organizeSingle(game);
    }
    setIsLoading(false);
  };

  return {
    games,
    isLoading,
    scan,
    organizeSingle,
    organizeAll,
  };
}
