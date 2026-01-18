import type { IFileSystem } from '../../domain/repositories/file-system.interface';
import type { Game } from '../../domain/entities/types';
import { useState } from 'react';

import { useScanFolder } from './use-scan-folder';
import { useOrganizeGame } from './use-organize-game';
import { useRevertGame } from './use-revert-game';

export function useOrganizer(fileSystem: IFileSystem) {
  const { games, hasDirectory, isScanning, scan, setGames } = useScanFolder(fileSystem);

  const { isOrganizing, organize } = useOrganizeGame(fileSystem);
  const [isOrganizingList, setIsOrganizingList] = useState(false);

  const { isReverting, revert } = useRevertGame(fileSystem);
  const [isRevertingList, setIsRevertingList] = useState(false);

  const organizeList = async (gameList: Game[], onGameSuccess?: (game: Game) => void) => {
    setIsOrganizingList(true);

    for (const game of [...gameList]) {
      try {
        await organize(game);

        setGames((prevGames) =>
          prevGames.map((g) => (g.name === game.name ? { ...g, isConverted: true } : g)),
        );

        if (onGameSuccess) {
          onGameSuccess(game);
        }
      } catch (error) {
        console.error(`Error organizing game ${game.name}`, error);
      }
    }

    setIsOrganizingList(false);
  };

  const revertList = async (gameList: Game[], onGameSuccess?: (game: Game) => void) => {
    setIsRevertingList(true);

    for (const game of [...gameList]) {
      try {
        await revert(game);

        setGames((prevGames) =>
          prevGames.map((g) => (g.name === game.name ? { ...g, isConverted: false } : g)),
        );

        if (onGameSuccess) {
          onGameSuccess(game);
        }
      } catch (error) {
        console.error(`Error reverting game ${game.name}`, error);
      }
    }

    setIsRevertingList(false);
  };

  return {
    scan,
    hasDirectory,
    organizeList,
    revertList,
    status: {
      isScanning,
      isOrganizing,
      isReverting,
      isOrganizingList,
      isRevertingList,
      isBusy: isScanning || isOrganizing || isReverting || isOrganizingList || isRevertingList,
    },
    games,
    setGames,
  };
}
