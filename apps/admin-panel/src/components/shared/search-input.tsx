import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useSearchParams } from 'react-router-dom';

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('search') ?? '';

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Staffs"
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        defaultValue={searchString}
        onChange={(event) => {
          searchParams.set('search', event.target.value);
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}

export default SearchInput;
