import { Badge } from '@/components/ui/badge';
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

type MenusProps = {
  menus: {
    __typename?: 'Menu' | undefined;
    id: string;
    name: string | null | undefined;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
};

function Menus(props: MenusProps) {
  const { menus } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Active</TableHead>
          <TableHead className="hidden md:table-cell">Updated at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menus.map((menu) => (
          <TableRow key={menu.id}>
            <TableCell className="font-medium">{menu.name}</TableCell>
            <TableCell className="font-medium">
              <Badge variant="outline">
                {menu.active ? 'Active' : 'In Active'}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(menu.updatedAt, 'MMMM dd, yyyy HH:mm')}
            </TableCell>
            <TableCell>
              <ActionDropdown
                label="Actions"
                actions={[
                  {
                    label: 'Edit',
                    onClick: () => {
                      searchParams.set('edit', menu.id);
                      setSearchParams(searchParams);
                    },
                  },
                  {
                    label: 'Delete',
                    onClick: () => {
                      searchParams.set('delete', menu.id);
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

export default Menus;
