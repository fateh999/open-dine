import {
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  GetCategoryQuery,
  GetCategoryQueryVariables,
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
import { GET_CATEGORY } from '../graphql/queries';
import { DELETE_CATEGORY } from '../graphql/mutations';

type DeleteCategoryDialogProps = AlertDialogProps & { refetch: () => void };

function DeleteCategoryDialog(props: DeleteCategoryDialogProps) {
  const [searchParams] = useSearchParams();
  const deleteId = searchParams.get('delete') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >(GET_CATEGORY, { variables: { id: deleteId }, skip: !deleteId });
  const { name } = data?.category ?? {};
  const [deleteCategory] = useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DELETE_CATEGORY);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {loading || !data?.category ? (
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
            <AlertDialogTitle>Delete {name} category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the {name}'s
              category
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteCategory({
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

export default DeleteCategoryDialog;
