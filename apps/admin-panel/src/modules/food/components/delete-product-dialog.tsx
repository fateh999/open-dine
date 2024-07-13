import {
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  GetFoodQuery,
  GetFoodQueryVariables,
} from '@/__generated__/graphql';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation, useQuery } from '@apollo/client';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { useSearchParams } from 'react-router-dom';
import { GET_FOOD } from '../graphql/queries';
import { DELETE_PRODUCT } from '../graphql/mutations';

type DeleteProductDialogProps = AlertDialogProps & { refetch: () => void };

function DeleteProductDialog(props: DeleteProductDialogProps) {
  const [searchParams] = useSearchParams();
  const deleteId = searchParams.get('delete') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<GetFoodQuery, GetFoodQueryVariables>(
    GET_FOOD,
    { variables: { id: deleteId }, skip: !deleteId },
  );
  const { name } = data?.food ?? {};
  const [deleteProduct] = useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DELETE_PRODUCT);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {loading || !data?.food ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Skeleton className="w-[200px] h-[28px] rounded-full" />
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Skeleton className="w-full h-[40px] rounded-full" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Skeleton className="w-[100px] h-[40px] rounded-full" />
            <Skeleton className="w-[100px] h-[40px] rounded-full" />
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {name} product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the {name}'s
              product
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteProduct({
                  variables: { id: deleteId },
                  onCompleted: () => {
                    refetch();
                  },
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}

export default DeleteProductDialog;
