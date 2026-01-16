import BrowserGameItem from '../../browser/BrowserGameItem';
export default function MainSection() {
  return (
    <section
      className="
          p-5
          overflow-y-auto
          flex-1 flex flex-col gap-2
          border-b border-emerald-500/10"
    >
      <BrowserGameItem />
    </section>
  );
}
