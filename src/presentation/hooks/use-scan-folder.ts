import { useMemo, useState } from 'react';

import type { Game } from '../../domain/entities/game-types';
import { createScanFolder } from '../../app/use-cases/scan-folder.use-case';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export function useScanFolder(fileSystem: IFileSystem) {
  const [games, setGames] = useState<Game[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanFolder = useMemo(() => createScanFolder(fileSystem), [fileSystem]);

  const scan = async (discPattern: string) => {
    setIsScanning(true);

    try {
      const result = await scanFolder(discPattern);
      setGames(result);
    } catch (error) {
      console.error(`Error scanning folder: `, error);
    } finally {
      setIsScanning(false);
    }
  };

  return {
    games,
    setGames,
    isScanning,
    scan,
  };
}
