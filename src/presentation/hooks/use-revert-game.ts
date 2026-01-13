import { useMemo, useState } from 'react';

import type { IFileSystem } from '../../domain/repositories/file-system.interface';
import { createRevertGame } from '../../app/use-cases/revert-game.use-case';
import type { Game } from '../../domain/entities/game-types';

export function useRevertGame(fileSystem: IFileSystem) {
  const [isReverting, setIsReverting] = useState(false);

  const revertGame = useMemo(() => createRevertGame(fileSystem), [fileSystem]);

  const revert = async (game: Game) => {
    setIsReverting(true);

    try {
      await revertGame(game);
    } catch (error) {
      console.error(`Error reverting ${game.name}: `, error);
    } finally {
      setIsReverting(false);
    }
  };

  return {
    revert,
    isReverting,
  };
}
