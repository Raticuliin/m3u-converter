import { GamepadDirectional } from 'lucide-react';

export default function Header() {
  return (
    <header
      className="
         mb-10"
    >
      <div
        className="
          flex items-center gap-3
          "
      >
        <div
          className="
            p-1 rounded
          bg-emerald-500"
        >
          <GamepadDirectional className="w-5 h-5 text-black" />
        </div>
        <h1
          className="
            text-white font-bold tracking-wide text-xl"
        >
          M3UConverter
        </h1>
      </div>
      <p
        className="
          text-white/50
          text-center
      "
      >
        version
      </p>
    </header>
  );
}
