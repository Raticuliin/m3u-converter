import { Folder } from 'lucide-react';
import Button from '../shared/Button';

export default function Hero({ handleScan }: { handleScan: (discPattern: string) => void }) {
  return (
    <div
      className="
            w-full max-w-5xl 
            border-2 rounded-3xl
            p-10 md:p-16
            flex flex-col items-center text-center gap-8
            bg-emerald-950/20 border-emerald-500/10
            shadow-2xl shadow-black/50
          "
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-emerald-400 text-2xl md:text-3xl font-bold">
          Clean up your Multi-Disc Library
        </h2>
        <p className="text-stone-400 max-w-xl text-lg leading-relaxed mx-auto">
          Select your game collection folder to begin. We will scan your files and help you organize
          multi-disc games into clean <span className="text-emerald-400 font-bold">.m3u</span>{' '}
          playlists.
        </p>
      </div>

      {/* Process Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full py-6 border-y border-emerald-500/10">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
          <p className="text-stone-300 text-sm font-medium">Select folder with loose .chd files</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
          <p className="text-stone-300 text-sm font-medium">Select specific games or add all to queue</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
          <p className="text-stone-300 text-sm font-medium">Convert the queue to create the .m3u folder</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
          <p className="text-stone-300 text-sm font-medium">Revert changes instantly if needed</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div className="w-full max-w-xs">
          <Button onClick={handleScan} Icon={Folder} text="Select Folder to Scan" />
        </div>

        {/* Requirements / Troubleshooting */}
        <ul className="text-stone-500 text-xs md:text-sm space-y-1 text-left max-w-lg list-disc">
          <li>Files must follow the <span className="text-stone-400 font-mono text-xs">Game (Disc X).chd</span> naming pattern</li>
          <li>Chrome or Edge is required for File System Access API</li>
          <li>Your files never leave your computer (100% local processing)</li>
        </ul>
      </div>
    </div>
  );
}