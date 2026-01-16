import { Gamepad2, PlusCircle } from 'lucide-react';

export default function BrowserGameItem() {
  return (
    <div
      className="
            py-3 px-3
            rounded-xl
            border-2 border-emerald-500/20
            bg-emerald-500/2
            flex gap-2 justify-between items-center"
    >
      <div className="flex gap-3 items-center">
        <div
          className="
            rounded-full
            text-emerald-500/50"
        >
          <Gamepad2
            strokeWidth={1.5}
            className="
              w-10 h-10
              "
          />
        </div>
        <div>
          <p
            className="
              font-bold
            "
          >
            Nombre juego
          </p>
          <p
            className="
              text-emerald-100/50
            "
          >
            n discos
          </p>
        </div>
      </div>
      <button
        className="
          p-2
          rounded-full 
          text-white/60 
          bg-emerald-500/30
          hover:text-white/80 hover:bg-emerald-500/40 hover:cursor-pointer
          active:scale-95
          transition-all duration-100 ease-in"
      >
        <PlusCircle
          className="
            w-6 h-6
            "
        />
      </button>
    </div>
  );
}
