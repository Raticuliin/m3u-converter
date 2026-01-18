import { Folder } from 'lucide-react';
import Button from '../shared/Button';

export default function Hero({ handleScan }: { handleScan: (discPattern: string) => void }) {
  return (
    <div
      className="
            w-full max-w-5xl 
            border-2 rounded-3xl
            p-10 md:p-16
            flex flex-col items-center text-center gap-6
            bg-emerald-950/20 border-emerald-500/10
            shadow-2xl shadow-black/50
          "
    >
      <div className="bg-emerald-500/10 p-5 rounded-full mb-2">
        <Folder className="w-16 h-16 text-emerald-400" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        No directory selected
      </h2>

      <p className="text-stone-400 max-w-xl text-lg leading-relaxed">
        Select your game collection folder to begin. We will scan your files and help you organize
        multi-disc games into clean <span className="text-emerald-400 font-bold">.m3u</span>{' '}
        playlists.
      </p>

      <div className="w-full max-w-xs mt-6">
        <Button onClick={handleScan} Icon={Folder} text="Select Folder to Scan" />
      </div>
    </div>
  );
}
