import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  Icon: LucideIcon;
  text: string;
  isActive: boolean;
  setIsActive: () => void;
}

export default function NavItem({ Icon, text, isActive, setIsActive }: NavItemProps) {
  return (
    <button
      className={`
        flex flex-row items-center gap-3
        text-bold text-lg
        w-full py-3 px-6
        rounded-xl 
        active:scale-98
        hover:cursor-pointer 
        transition-all duration-100 ease-in
        border
        ${
          isActive
            ? 'bg-emerald-900/10 text-white/80 border-emerald-900/20 hover:bg-emerald-900/20'
            : 'border-transparent text-emerald-500/50 hover:bg-emerald-900/5 hover:border-emerald-900/10'
        }
      `}
      onClick={setIsActive}
    >
      <div>
        <Icon strokeWidth={2}></Icon>
      </div>
      <p>{text}</p>
    </button>
  );
}
