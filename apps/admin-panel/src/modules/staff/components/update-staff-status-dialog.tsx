import {
  GetStaffQuery,
  GetStaffQueryVariables,
  UpdateStaffMutation,
  UpdateStaffMutationVariables,
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

type UpdateStaffStatusDialogProps = AlertDialogProps & { refetch: () => void };

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

const UPDATE_STAFF = gql`
  mutation updateStaff($editUserInput: EditUserInput!) {
    editUser(editUserInput: $editUserInput) {
      id
    }
  }
`;

function UpdateStaffStatusDialog(props: UpdateStaffStatusDialogProps) {
  const [searchParams] = useSearchParams();
  const statusId = searchParams.get('status') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<GetStaffQuery, GetStaffQueryVariables>(
    GET_STAFF,
    { variables: { id: statusId }, skip: !statusId },
  );
  const { displayName, disabled } = data?.user ?? {};
  const [updateStaff] = useMutation<
    UpdateStaffMutation,
    UpdateStaffMutationVariables
  >(UPDATE_STAFF);

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
            <AlertDialogTitle>
              {disabled ? 'Enable' : 'Disable'} {displayName} account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will {disabled ? 'enable' : 'disable'} the {displayName}'s
              account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                updateStaff({
                  variables: {
                    editUserInput: {
                      id: statusId,
                      disabled: !disabled,
                    },
                  },
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

export default UpdateStaffStatusDialog;
