import type { Game } from '../../domain/entities/types';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export const createBrowserFileSystem = (): IFileSystem => {
  let rootHandle: FileSystemDirectoryHandle | null = null;
  const fileHandles: Map<string, FileSystemFileHandle> = new Map();

  return {
    async selectDirectory(): Promise<void> {
      rootHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
      });
    },

    async scanDirectory(): Promise<string[]> {
      rootHandle = await window.showDirectoryPicker({ mode: 'readwrite' });

      try {
        fileHandles.clear();
        const fileNames: string[] = [];

        for await (const entry of rootHandle.values()) {
          const nameLower = entry.name.toLowerCase();
          if (entry.kind === 'file') {
            if (nameLower.endsWith('.chd')) {
              fileHandles.set(entry.name, entry as FileSystemFileHandle);
              fileNames.push(entry.name);
            }
          } else if (entry.kind === 'directory') {
            if (nameLower.endsWith('.m3u')) {
              fileNames.push(entry.name);
            }
          }
        }

        return fileNames;
      } catch (error) {
        console.error('Error on scanDirectory: ', error);
        return [];
      }
    },

    async getFilesInFolder(folderName: string): Promise<string[]> {
      if (!rootHandle) {
        rootHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      }

      try {
        const folderHandle = await rootHandle.getDirectoryHandle(folderName);
        const files: string[] = [];

        for await (const entry of folderHandle.values()) {
          if (entry.kind === 'file' && entry.name.toLowerCase().endsWith('.chd')) {
            files.push(entry.name);
          }
        }
        return files;
      } catch (error) {
        return [];
      }
    },

    async organizeGame(game: Game, m3uContent: string): Promise<void> {
      if (!rootHandle) {
        rootHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      }

      try {
        const gameFolderHandle = await rootHandle.getDirectoryHandle(`${game.name}.m3u`, {
          create: true,
        });

        const m3uFileHandle = await gameFolderHandle.getFileHandle(`${game.name}.m3u`, {
          create: true,
        });

        const writable = await m3uFileHandle.createWritable();
        await writable.write(m3uContent);
        await writable.close();

        for (const fileName of game.discs) {
          const fileHandle = fileHandles.get(fileName);

          if (fileHandle) {
            await (fileHandle as any).move(gameFolderHandle);
          }
        }
      } catch (error) {
        console.error(`Error while organizing game ${game.name}: `, error);
        throw error;
      }
    },

    async revertGame(game: Game): Promise<void> {
      if (!rootHandle) {
        throw new Error('Select a folder first.');
      }

      try {
        const folderName = `${game.name}.m3u`;

        const folderHandle = await rootHandle.getDirectoryHandle(folderName);

        for (const discName of game.discs) {
          try {
            const discHandle = await folderHandle.getFileHandle(discName);

            await (discHandle as any).move(rootHandle);

            fileHandles.set(discName, discHandle);
          } catch (error) {
            console.warn(`Couldnt find or move disc ${discName}`);
          }
        }

        try {
          await folderHandle.removeEntry(`${game.name}.m3u`);
        } catch (error) {
          console.warn(`Couldnt find or remove file ${game.name}.m3u`);
        }

        await rootHandle.removeEntry(folderName, { recursive: true });
      } catch (error) {
        console.error(`Error revirtiendo juego ${game.name}`);
      }
    },
  };
};
