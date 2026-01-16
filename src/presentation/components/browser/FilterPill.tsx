export function FilterPill({ isActive }: { isActive: boolean }) {
  return (
    <button
      className={`
          text-xs text-
          px-4 py-1
          rounded-full
          border-2
          hover:cursor-pointer
          active:scale-95
          transition-all duration-100 ease-in
          ${isActive ? 'border-emerald-500/20 bg-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/20' : 'border-emerald-100/20 bg-emerald-100/10 hover:border-emerald-100/30 hover:bg-emerald-100/20'}
      `}
    >
      <p>Filter</p>
    </button>
  );
}
