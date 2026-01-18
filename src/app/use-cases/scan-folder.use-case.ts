import type { Game } from '../../domain/entities/types';
import { parseGames } from '../../domain/logic/game-parser';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export type ScanFolderUseCase = (discPattern: string) => Promise<Game[]>;

export const createScanFolder = (fileSystem: IFileSystem): ScanFolderUseCase => {
  return async (discPattern: string) => {
    const entries = await fileSystem.scanDirectory();

    if (entries.length === 0) return [];

    const m3uFolders = entries.filter((name) => name.toLowerCase().endsWith('.m3u'));
    const chdFiles = entries.filter((name) => name.toLowerCase().endsWith('.chd'));

    const convertedGamesSet = new Set(m3uFolders.map((name) => name.replace(/\.m3u$/i, '')));

    const detectedGamesFromChds = parseGames(discPattern, chdFiles);

    const finalGames: Game[] = detectedGamesFromChds.map((game) => {
      const isConverted = convertedGamesSet.has(game.name);
      return {
        ...game,
        format: '.chd',
        isConverted: isConverted,
      };
    });

    for (const folderName of convertedGamesSet) {
      const gameName = folderName.replace(/\.m3u$/i, '');

      const alreadyInList = finalGames.some((g) => g.name === gameName);

      if (!alreadyInList) {
        const discsInside = await fileSystem.getFilesInFolder(folderName);

        finalGames.push({
          name: gameName,
          discs: discsInside,
          isMultiDisc: discsInside.length > 1,
          format: '.m3u',
          isConverted: true,
        });
      }
    }

    return finalGames;
  };
};
