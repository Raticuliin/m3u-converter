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

      <div className="flex flex-col gap-4">
        <p className="text-stone-400 max-w-xl text-lg leading-relaxed">
          Select your game collection folder to begin. We will scan your files and help you organize
          multi-disc games into clean <span className="text-emerald-400 font-bold">.m3u</span>{' '}
          playlists.
        </p>

        {/* Lista de requisitos simple */}
        <ul className="text-stone-500 text-sm md:text-base space-y-1">
          <li>• All discs must be loose in the same folder (no subfolders)</li>
          <li>
            • Only <span className="text-stone-400">.chd</span> format is currently supported
          </li>
          <li>• If folder selection fails, your browser may not be valid (Chrome recommended)</li>
        </ul>
      </div>

      <div className="w-full max-w-xs mt-6">
        <Button onClick={handleScan} Icon={Folder} text="Select Folder to Scan" />
      </div>
    </div>
  );
}
