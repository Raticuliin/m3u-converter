import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
        <Search />
      </div>
      <input
        className="
        w-full 
        py-2 pl-10 pr-4 text-sm 
        rounded-lg 
        bg-black/20 
        border-2 border-white/20 
        focus:outline-none focus:border-emerald-500/50 
        transition-colors
          "
        type="text"
        placeholder="Search for a game"
      />
    </div>
  );
}
