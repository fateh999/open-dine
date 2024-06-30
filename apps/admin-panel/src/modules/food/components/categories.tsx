import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionDropdown from '@/modules/auth/components/action-dropdown';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

type CategoriesProps = {
  categories: {
    __typename?: 'Category' | undefined;
    id: string;
    name: string | null | undefined;
    createdAt: string;
    updatedAt: string;
  }[];
};

function Categories(props: CategoriesProps) {
  const { categories } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Updated at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {format(category.updatedAt, 'MMMM dd, yyyy HH:mm')}
            </TableCell>
            <TableCell>
              <ActionDropdown
                label="Actions"
                actions={[
                  {
                    label: 'Edit',
                    onClick: () => {
                      searchParams.set('edit', category.id);
                      setSearchParams(searchParams);
                    },
                  },
                  {
                    label: 'Delete',
                    onClick: () => {
                      searchParams.set('delete', category.id);
                      setSearchParams(searchParams);
                    },
                  },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Categories;
