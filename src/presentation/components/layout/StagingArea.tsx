import { CircleArrowRight } from 'lucide-react';
import Button from '../shared/Button';
import DashboardTitle from '../shared/DashboardTitle';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';

export default function StagingArea() {
  const section = 'queue';
  return (
    <section
      className="
        bg-emerald-950/3
        flex-1 flex flex-col
        border-r border-emerald-500/10"
    >
      <section
        className="
                h-1/5
                p-5 
                flex flex-col justify-between
                border-b border-emerald-500/10"
      >
        <DashboardTitle text="Selection queue" />
        <Button onClick={() => {}} Icon={CircleArrowRight} text="CONVERT" />
      </section>
      <MainSection section={section} />
      <FooterSection section={section} />
    </section>
  );
}
