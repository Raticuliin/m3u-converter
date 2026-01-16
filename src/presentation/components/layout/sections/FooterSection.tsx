import type { Section } from '../../../../domain/entities/types';
import Button from '../../shared/Button';
import { MinusSquare, PlusSquare } from 'lucide-react';

export default function FooterSection({ section }: { section: Section }) {
  return (
    <section className="p-5">
      {section === 'browser' ? (
        <Button Icon={PlusSquare} text="Add all games" variant="secondary" onClick={() => {}} />
      ) : (
        <Button
          Icon={MinusSquare}
          text="Remove all games"
          variant="secondary"
          color="rose"
          onClick={() => {}}
        />
      )}
    </section>
  );
}
