import {
  GetCustomerQuery,
  GetCustomerQueryVariables,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
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

type UpdateCustomerStatusDialogProps = AlertDialogProps & {
  refetch: () => void;
};

const GET_CUSTOMER = gql`
  query getCustomer($id: String!) {
    customer(id: $id) {
      id
      displayName
      photoUrl
      email
      disabled
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($editCustomerInput: EditCustomerInput!) {
    editCustomer(editCustomerInput: $editCustomerInput) {
      id
    }
  }
`;

function UpdateCustomerStatusDialog(props: UpdateCustomerStatusDialogProps) {
  const [searchParams] = useSearchParams();
  const statusId = searchParams.get('status') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<
    GetCustomerQuery,
    GetCustomerQueryVariables
  >(GET_CUSTOMER, { variables: { id: statusId }, skip: !statusId });
  const { displayName, disabled } = data?.customer ?? {};
  const [updateCustomer] = useMutation<
    UpdateCustomerMutation,
    UpdateCustomerMutationVariables
  >(UPDATE_CUSTOMER);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {loading || !data?.customer ? (
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
                updateCustomer({
                  variables: {
                    editCustomerInput: {
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

export default UpdateCustomerStatusDialog;
