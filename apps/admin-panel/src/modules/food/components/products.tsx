import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import ActionDropdown from '@/modules/auth/components/action-dropdown';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FoodStatus, FoodType } from '@/__generated__/graphql';
import { IKImage } from 'imagekitio-react';
import { formatEnumValue } from '@/utils/helpers';

type ProductsProps = {
  products: {
    __typename?: 'Food' | undefined;
    id: string;
    photoUrl?: string | null | undefined;
    categoryId: string;
    description?: string | null | undefined;
    foodType: FoodType;
    name: string;
    status: FoodStatus;
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
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Type</TableHead>
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
              {product.photoUrl ? (
                <IKImage
                  transformation={[{ height: '40px', width: '40px' }]}
                  path={product.photoUrl}
                  className="aspect-square w-[40px] h-[40px] rounded-full object-cover"
                  loading="lazy"
                  lqip={{ active: true, quality: 10, blur: 10 }}
                />
              ) : (
                <Avatar>
                  <AvatarFallback>{product.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{product.category.name}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">
                {formatEnumValue(product.foodType)}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">{formatEnumValue(product.status)}</Badge>
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
                      navigate(`./${product.id}/edit`);
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
