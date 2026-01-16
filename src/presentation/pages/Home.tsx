import { Folder } from 'lucide-react';
import Button from '../components/shared/Button';
import Header from '../components/shared/Header';

export default function Home({
  scan,
  discPattern,
}: {
  scan: (discPattern: string) => void;
  discPattern: string;
}) {
  const handleScan = () => {
    scan(discPattern);
  };

  return (
    <div
      className="
        min-h-screen
        flex flex-col justify-center items-center
      bg-stone-900 text-emerald-100"
    >
      {/** Header */}
      <Header />

      {/** Card */}
      <div
        className="
            w-full max-w-2xl 
            border-2 rounded-3xl
            px-30 py-15
            flex flex-col items-center text-center gap-4
          bg-emerald-500/1 border-emerald-800/20"
      >
        <h2 className="text-3xl font-bold text-white ">No directory selected</h2>
        <p className="text-stone-400 max-w-md leading-relaxed mb-2">
          Select your game collection folder to begin scanning for{' '}
          <span className="text-emerald-400 font-medium">.chd</span> files and generating for{' '}
          <span className="text-emerald-400 font-medium">.m3u</span> playlists.
        </p>
        <Button onClick={handleScan} Icon={Folder} text="Select Folder" />
      </div>
    </div>
  );
}
