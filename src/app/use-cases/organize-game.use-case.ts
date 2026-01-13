import type { Game } from '../../domain/entities/game-types';
import { generateM3u } from '../../domain/logic/m3u-generator';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export function createOrganizeGame(fileSystem: IFileSystem) {
  return async (game: Game) => {
    const m3uContent = generateM3u(game);

    await fileSystem.organizeGame(game, m3uContent);
  };
}
