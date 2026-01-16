import Sidebar from '../components/layout/Sidebar';
import SourceBrowser from '../components/layout/SourceBrowser';
import StagingArea from '../components/layout/StagingArea';

export default function Dashboard() {
  return (
    <div
      className="
        h-screen w-full overflow-hidden
        flex 
      bg-stone-900 text-white"
    >
      <Sidebar />
      <main className="flex flex-1 overflow-hidden">
        <SourceBrowser />
        <StagingArea />
      </main>
    </div>
  );
}
