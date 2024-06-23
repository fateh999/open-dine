import {
  DeleteStaffMutation,
  DeleteStaffMutationVariables,
  GetStaffQuery,
  GetStaffQueryVariables,
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
import { gql, useMutation, useQuery } from '@apollo/client';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { useSearchParams } from 'react-router-dom';

type DeleteStaffDialogProps = AlertDialogProps & { refetch: () => void };

const GET_STAFF = gql`
  query getStaff($id: String!) {
    user(id: $id) {
      id
      displayName
      photoUrl
      role
      email
      disabled
      createdAt
      updatedAt
    }
  }
`;

const DELETE_STAFF = gql`
  mutation deleteStaff($id: String!) {
    deleteStaffUser(id: $id) {
      id
    }
  }
`;

function DeleteStaffDialog(props: DeleteStaffDialogProps) {
  const [searchParams] = useSearchParams();
  const deleteId = searchParams.get('delete') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<GetStaffQuery, GetStaffQueryVariables>(
    GET_STAFF,
    { variables: { id: deleteId }, skip: !deleteId },
  );
  const { displayName } = data?.user ?? {};
  const [deleteStaff] = useMutation<
    DeleteStaffMutation,
    DeleteStaffMutationVariables
  >(DELETE_STAFF);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {loading || !data?.user ? (
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
            <AlertDialogTitle>Delete {displayName} account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the {displayName}'s
              account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteStaff({
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

export default DeleteStaffDialog;
