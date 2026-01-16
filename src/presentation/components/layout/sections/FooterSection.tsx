import Button from '../../shared/Button';
import { PlusSquare } from 'lucide-react';

export default function FooterSection() {
  return (
    <section className="p-5">
      <Button Icon={PlusSquare} text="Add all games" variant="secondary" onClick={() => {}} />
    </section>
  );
}
