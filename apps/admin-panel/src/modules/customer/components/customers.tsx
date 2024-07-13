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
import { useSearchParams } from 'react-router-dom';

type CustomersProps = {
  customers: {
    __typename?: 'Customer' | undefined;
    id: string;
    displayName?: string | null | undefined;
    photoUrl?: string | null | undefined;
    email: string;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
};

function Customers(props: CustomersProps) {
  const { customers } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Updated at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="hidden sm:table-cell">
              <Avatar>
                <AvatarImage src={customer.photoUrl ?? ''} />
                <AvatarFallback>
                  {customer.displayName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">
              {customer.displayName}
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Switch
                checked={!customer.disabled}
                onCheckedChange={() => {
                  searchParams.set('status', customer.id);
                  setSearchParams(searchParams);
                }}
              />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(customer.updatedAt, 'MMMM dd, yyyy HH:mm')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Customers;
