import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonColor = 'emerald' | 'blue' | 'rose' | 'amber';

interface ButtonProps {
  onClick: () => void;
  Icon: LucideIcon;
  text: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

const colorMap: Record<ButtonColor, { primary: string; secondary: string }> = {
  emerald: {
    primary: 'bg-emerald-500 hover:bg-emerald-400 text-stone-950',
    secondary:
      'border-2 bg-emerald-900/5 text-emerald-500/80 border-emerald-500/30 hover:bg-emerald-700/5 active:bg-emerald-500/10',
  },
  blue: {
    primary: 'bg-blue-500 hover:bg-blue-400 text-white',
    secondary:
      'border-2 bg-blue-900/5 text-blue-500/80 border-blue-500/30 hover:bg-blue-700/5 active:bg-blue-500/10',
  },
  rose: {
    // Para danger
    primary: 'bg-rose-500 hover:bg-rose-400 text-white',
    secondary:
      'border-2 bg-rose-900/5 text-rose-400/80 border-rose-400/30 hover:bg-rose-700/5 active:bg-rose-400/10',
  },
  amber: {
    // Para warn
    primary: 'bg-amber-500 hover:bg-amber-400 text-stone-950',
    secondary:
      'border-2 bg-amber-900/5 text-amber-500/80 border-amber-500/30 hover:bg-amber-700/5 active:bg-amber-500/10',
  },
};

export default function Button({
  onClick,
  Icon,
  text,
  variant = 'primary',
  color = 'emerald',
}: ButtonProps) {
  const selectedStyle = colorMap[color][variant === 'primary' ? 'primary' : 'secondary'];

  return (
    <button
      className={`
        flex gap-3 items-center justify-center
        font-bold
        w-full py-4
        rounded-xl 
        active:scale-98
        hover:cursor-pointer 
        transition-all duration-100 ease-in
        ${selectedStyle}
        `}
      onClick={onClick}
    >
      <div>
        <Icon strokeWidth={2} />
      </div>
      <p>{text}</p>
    </button>
  );
}
