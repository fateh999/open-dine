import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import ActionDropdown from '@/modules/auth/components/action-dropdown';
import { UserRole } from '@/__generated__/graphql';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'react-router-dom';

type StaffsProps = {
  staffs: {
    __typename?: 'User' | undefined;
    id: string;
    displayName?: string | null | undefined;
    photoUrl?: string | null | undefined;
    role: UserRole;
    email: string;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
};

function Staffs(props: StaffsProps) {
  const { staffs } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Updated at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.map((staff) => (
          <TableRow key={staff.id}>
            <TableCell className="hidden sm:table-cell">
              <Avatar>
                <AvatarImage src={staff.photoUrl ?? ''} />
                <AvatarFallback>{staff.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{staff.displayName}</TableCell>
            <TableCell>
              <Badge variant="outline">{staff.role}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {staff.email}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Switch
                checked={!staff.disabled}
                onCheckedChange={() => {
                  searchParams.set('status', staff.id);
                  setSearchParams(searchParams);
                }}
              />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(staff.updatedAt, 'MMMM dd, yyyy HH:mm')}
            </TableCell>
            <TableCell>
              <ActionDropdown
                label="Actions"
                actions={[
                  {
                    label: 'Edit',
                    onClick: () => {
                      searchParams.set('edit', staff.id);
                      setSearchParams(searchParams);
                    },
                  },
                  {
                    label: 'Delete',
                    onClick: () => {
                      searchParams.set('delete', staff.id);
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

export default Staffs;
