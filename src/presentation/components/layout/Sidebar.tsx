import { Coffee, Folder, IterationCcw, SquareLibrary } from 'lucide-react';
import Header from '../shared/Header';
import NavItem from './NavItem';
import { useState } from 'react';
import Button from '../shared/Button';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<'convert' | 'revert'>('convert');

  return (
    <aside
      className="
        p-5
        relative
        flex flex-col justify-between
        border-r border-r-emerald-500/10 
      "
    >
      <div>
        <Header />

        <nav className="flex flex-col gap-2">
          <NavItem
            Icon={SquareLibrary}
            text="Convert games"
            isActive={activeTab === 'convert'}
            setIsActive={() => setActiveTab('convert')}
          />
          <NavItem
            Icon={IterationCcw}
            text="Revert games"
            isActive={activeTab === 'revert'}
            setIsActive={() => setActiveTab('revert')}
          />
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          Icon={Coffee}
          text="Buy me a coffee"
          variant="secondary"
          color="amber"
          onClick={() => {}}
        />
        <Button
          Icon={Folder}
          text="Select folder"
          variant="secondary"
          color="blue"
          onClick={() => {}}
        />
      </div>
    </aside>
  );
}
