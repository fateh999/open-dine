import {
  DeleteMenuMutation,
  DeleteMenuMutationVariables,
  GetMenuQuery,
  GetMenuQueryVariables,
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
import { GET_MENU } from '../graphql/queries';
import { DELETE_MENU } from '../graphql/mutations';

type DeleteMenuDialogProps = AlertDialogProps & { refetch: () => void };

function DeleteMenuDialog(props: DeleteMenuDialogProps) {
  const [searchParams] = useSearchParams();
  const deleteId = searchParams.get('delete') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<GetMenuQuery, GetMenuQueryVariables>(
    GET_MENU,
    { variables: { id: deleteId }, skip: !deleteId },
  );
  const { name } = data?.menu ?? {};
  const [deleteMenu] = useMutation<
    DeleteMenuMutation,
    DeleteMenuMutationVariables
  >(DELETE_MENU);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {loading || !data?.menu ? (
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
            <AlertDialogTitle>Delete {name} menu?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the {name}'s menu
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteMenu({
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

export default DeleteMenuDialog;
