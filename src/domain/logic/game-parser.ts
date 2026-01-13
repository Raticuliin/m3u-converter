import type { Game, GroupingStrategy } from '../entities/game-types';

export function parseGames(
  discPattern: string,
  files: string[],
  strategy: GroupingStrategy = 'safe',
): Game[] {
  const gamesMap = new Map<string, Game>();
  const discTagRegex = new RegExp(`\\s*\\(${discPattern}\\s+\\d+\\)`, 'i');

  files.forEach((filename) => {
    const nameWithoutExt = filename.replace(/\.chd$/i, '').trim();

    const match = nameWithoutExt.match(discTagRegex);
    const isMulti = match !== null;

    let baseName: string;

    if (isMulti) {
      if (strategy === 'aggressive') {
        const index = match.index!;
        baseName = nameWithoutExt.substring(0, index).trim();
      } else {
        baseName = nameWithoutExt.replace(discTagRegex, '').trim();
        baseName = baseName.replace(/\s\s+/g, ' ');
      }
    } else {
      baseName = nameWithoutExt;
    }

    if (!gamesMap.has(baseName)) {
      gamesMap.set(baseName, {
        name: baseName,
        isMultidisc: isMulti,
        discs: [],
        status: 'pending',
      });
    }

    const game = gamesMap.get(baseName)!;
    if (isMulti) game.isMultidisc = true;
    game.discs.push(filename);
  });

  return Array.from(gamesMap.values());
}
