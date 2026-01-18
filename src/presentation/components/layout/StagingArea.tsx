import { CircleArrowRight } from 'lucide-react';
import Button from '../shared/Button';
import DashboardTitle from '../shared/DashboardTitle';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';
import type { Game } from '../../../domain/entities/types';

interface Props {
  gameList: Game[];
  removeGameFromQueue: (...args: any) => void;
  removeAllGamesFromQueue: (...args: any) => void;
  convertGames: () => void;
}

export default function StagingArea({
  gameList,
  removeGameFromQueue,
  removeAllGamesFromQueue,
  convertGames,
}: Props) {
  const section = 'queue';
  return (
    <section
      className="
        bg-emerald-950/3
        flex-1 flex flex-col
        border-r border-emerald-500/10"
    >
      <section
        className="

        h-1/6
                p-5 
                flex flex-col justify-between
                border-b border-emerald-500/10"
      >
        <DashboardTitle text="Selection queue" />
        <Button onClick={convertGames} Icon={CircleArrowRight} text="CONVERT" />
      </section>
      <MainSection section={section} gameList={gameList} moveGame={removeGameFromQueue} />
      <FooterSection section={section} gameList={gameList} moveAllGames={removeAllGamesFromQueue} />
    </section>
  );
}
