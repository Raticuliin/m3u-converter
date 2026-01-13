import type { Game } from '../../domain/entities/game-types';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export const createBrowserFileSystem = (): IFileSystem => {
  let rootHandle: FileSystemDirectoryHandle | null = null;
  const fileHandles: Map<string, FileSystemFileHandle> = new Map();

  return {
    async scanDirectory(): Promise<string[]> {
      try {
        rootHandle = await window.showDirectoryPicker({
          mode: 'readwrite',
        });

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
      if (!rootHandle) return [];
      try {
        // Accedemos a la subcarpeta que ya existe
        const folderHandle = await rootHandle.getDirectoryHandle(folderName);
        const files: string[] = [];

        // Recorremos sus archivos internos
        for await (const entry of folderHandle.values()) {
          if (entry.kind === 'file' && entry.name.toLowerCase().endsWith('.chd')) {
            files.push(entry.name);
          }
        }
        return files;
      } catch (error) {
        // Si la carpeta está vacía o no se puede leer, devolvemos array vacío
        return [];
      }
    },

    async organizeGame(game: Game, m3uContent: string): Promise<void> {
      if (!rootHandle) {
        throw new Error('Select a folder first.');
      }

      try {
        // 1. Crear subcarpeta
        const gameFolderHandle = await rootHandle.getDirectoryHandle(`${game.name}.m3u`, {
          create: true,
        });

        // 2. Crear el archivo .m3u dentro de la carpeta
        const m3uFileHandle = await gameFolderHandle.getFileHandle(`${game.name}.m3u`, {
          create: true,
        });

        // 3. Escribir contenido del .m3u
        const writable = await m3uFileHandle.createWritable();
        await writable.write(m3uContent);
        await writable.close();

        // 4. Mover los archivos .chd
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

        // 1. Mover los discos fuera de la carpeta
        for (const discName of game.discs) {
          try {
            const discHandle = await folderHandle.getFileHandle(discName);

            await (discHandle as any).move(rootHandle);

            fileHandles.set(discName, discHandle);
          } catch (error) {
            console.warn(`Couldnt find or move disc ${discName}`);
          }
        }

        // 2. Eliminar archivo dentro de la carpeta
        try {
          await folderHandle.removeEntry(`${game.name}.m3u`);
        } catch (error) {
          console.warn(`Couldnt find or remove file ${game.name}.m3u`);
        }

        // 3. Eliminar carpeta
        await rootHandle.removeEntry(folderName, { recursive: true });
      } catch (error) {
        console.error(`Error revirtiendo juego ${game.name}`);
      }
    },
  };
};
