import { useMemo, useState, useEffect } from 'react';
// Hooks y Arquitectura
import { useOrganizer } from './presentation/hooks/use-organizer';
import { useFilterGames } from './presentation/hooks/use-filter-games';
import { createBrowserFileSystem } from './infrastructure/file-system/browser-file-system';
import type { Game, Tab } from './domain/entities/types';

import Home from './presentation/pages/Home';
import Dashboard from './presentation/pages/Dashboard';
import StagingArea from './presentation/components/layout/StagingArea';
import SourceBrowser from './presentation/components/layout/SourceBrowser';

// --- ICONOS SVG ---
export default function App() {
  const fileSystem = useMemo(() => createBrowserFileSystem(), []);

  const { scan, hasDirectory, organizeList, revertList, games } = useOrganizer(fileSystem);

  const { filteredGames, filter, updateFilter } = useFilterGames(games);

  const [currentTab, setCurrentTab] = useState<Tab>('convert');
  const [queueGameList, setQueueGameList] = useState<Game[]>([]);

  const DISC_PATTERN = 'Disc';

  useEffect(() => {
    setQueueGameList([]);
  }, [currentTab]);

  const handleScan = () => {
    scan(DISC_PATTERN);
  };

  const browserGameList = useMemo(() => {
    return filteredGames.filter((game) => {
      const isInQueue = queueGameList.some((q) => q.name === game.name);
      if (isInQueue) return false;

      if (currentTab === 'convert') {
        return !game.isConverted;
      }

      if (currentTab === 'revert') {
        return game.isConverted;
      }

      return true;
    });
  }, [filteredGames, queueGameList, currentTab]);

  const addGameToQueue = (game: Game) => {
    setQueueGameList((prev) => {
      if (prev.some((g) => g.name === game.name)) return prev;
      return [...prev, game];
    });
  };

  const addAllGamesToQueue = (browserGames: Game[]) => {
    setQueueGameList((prev) => {
      const existingGames = new Set(prev.map((g) => g.name));
      const newUnique = browserGames.filter((bg) => !existingGames.has(bg.name));
      return [...prev, ...newUnique];
    });
  };

  const removeGameFromQueue = (game: Game) => {
    setQueueGameList((prev) => {
      return prev.filter((g) => g.name !== game.name);
    });
  };

  const removeAllGamesFromQueue = (queueGames?: Game[]) => {
    if (!queueGames || queueGames.length === 0) {
      setQueueGameList([]);
      return;
    }
    setQueueGameList((prev) => {
      const namesToRemove = new Set(queueGames.map((g) => g.name));
      return prev.filter((g) => !namesToRemove.has(g.name));
    });
  };

  const handleGameSuccess = (game: Game) => {
    setQueueGameList((prev) => prev.filter((g) => g.name !== game.name));
  };

  const handleProcessQueue = async () => {
    if (queueGameList.length === 0) return;

    if (currentTab === 'convert') {
      await organizeList(queueGameList, handleGameSuccess);
    } else {
      await revertList(queueGameList, handleGameSuccess);
    }
  };

  if (!hasDirectory) {
    return <Home handleScan={handleScan} />;
  } else {
    return (
      <Dashboard
        handleScan={handleScan}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        browserSlot={
          <SourceBrowser
            gameList={browserGameList}
            addGameToQueue={addGameToQueue}
            addAllGamesToQueue={addAllGamesToQueue}
            filter={filter}
            updateFilter={updateFilter}
          />
        }
        queueSlot={
          <StagingArea
            gameList={queueGameList}
            removeGameFromQueue={removeGameFromQueue}
            removeAllGamesFromQueue={removeAllGamesFromQueue}
            convertGames={handleProcessQueue}
          />
        }
      />
    );
  }
}
