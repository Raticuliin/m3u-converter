import DashboardTitle from '../shared/DashboardTitle';
import FilterGroup from '../browser/FilterGroup';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';

export default function SourceBrowser() {
  return (
    <section
      className="
        flex-1 flex flex-col
        border-r border-emerald-500/10"
    >
      {/** Seccion dearriba */}
      <section
        className="
          h-1/5
          p-5 
          flex flex-col justify-between
          border-b border-emerald-500/10"
      >
        <DashboardTitle text="Browser" />
        <FilterGroup />
      </section>
      <MainSection />
      <FooterSection />
    </section>
  );
}
