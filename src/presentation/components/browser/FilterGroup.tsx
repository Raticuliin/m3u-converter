import { FilterPill } from './FilterPill';
import { SearchBar } from './SearchBar';

export default function FilterGroup() {
  return (
    <section>
      <SearchBar />
      <ul
        className="
        pt-2
        flex gap-2"
      >
        <FilterPill isActive={true} />
        <FilterPill isActive={false} />
        <FilterPill isActive={true} />
      </ul>
    </section>
  );
}
