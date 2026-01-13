import { useMemo, useState } from 'react';

import type { Game } from '../../domain/entities/game-types';
import { createOrganizeGame } from '../../app/use-cases/organize-game.use-case';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export function useOrganizeGame(fileSystem: IFileSystem) {
  const [isOrganizing, setIsOrganizing] = useState(false);

  const organizeGame = useMemo(() => createOrganizeGame(fileSystem), [fileSystem]);

  const organize = async (game: Game) => {
    setIsOrganizing(true);

    try {
      await organizeGame(game);
    } catch (error) {
      console.error(`Error organizing ${game.name}: `, error);
    } finally {
      setIsOrganizing(false);
    }
  };

  return {
    organize,
    isOrganizing,
  };
}
