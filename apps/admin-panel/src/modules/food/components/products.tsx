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
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'react-router-dom';
import { FoodType } from '@/__generated__/graphql';

type ProductsProps = {
  products: {
    __typename?: 'Food' | undefined;
    id: string;
    photoUrl?: string | null | undefined;
    categoryId: string;
    description?: string | null | undefined;
    foodType: FoodType;
    name: string;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    customizations: {
      name: string;
    }[];
    category: {
      name: string;
    };
  }[];
};

function Products(props: ProductsProps) {
  const { products } = props;
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
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="hidden sm:table-cell">
              <Avatar>
                <AvatarImage src={product.photoUrl ?? ''} />
                <AvatarFallback>{product.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{product.category.name}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">{product.foodType}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Switch
                checked={product.inStock}
                onCheckedChange={() => {
                  searchParams.set('status', product.id);
                  setSearchParams(searchParams);
                }}
              />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(product.updatedAt, 'MMMM dd, yyyy HH:mm')}
            </TableCell>
            <TableCell>
              <ActionDropdown
                label="Actions"
                actions={[
                  {
                    label: 'Edit',
                    onClick: () => {
                      // searchParams.set('edit', staff.id);
                      // setSearchParams(searchParams);
                    },
                  },
                  {
                    label: 'Delete',
                    onClick: () => {
                      searchParams.set('delete', product.id);
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

export default Products;
