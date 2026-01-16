import type { Section } from '../../../../domain/entities/types';
import GameItem from '../../shared/GameItem';
export default function MainSection({ section }: { section: Section }) {
  return (
    <section
      className="
          p-5
          overflow-y-auto
          flex-1 flex flex-col gap-2
          border-b border-emerald-500/10"
    >
      <GameItem variant={section} />
    </section>
  );
}
