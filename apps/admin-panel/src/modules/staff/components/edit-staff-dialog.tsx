import {
  GetStaffQuery,
  GetStaffQueryVariables,
  UpdateStaffMutation,
  UpdateStaffMutationVariables,
} from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { gql, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const EditStaffInputSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be a valid email address.'),
});

type EditStaffDialogProps = DialogProps & {
  refetch: () => void;
};

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

function EditStaffDialog(props: EditStaffDialogProps) {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<GetStaffQuery, GetStaffQueryVariables>(
    GET_STAFF,
    { variables: { id: editId }, skip: !editId },
  );
  const user = data?.user;
  const form = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(EditStaffInputSchema),
  });
  const [updateStaff] = useMutation<
    UpdateStaffMutation,
    UpdateStaffMutationVariables
  >(UPDATE_STAFF);

  const onSubmit = (data: z.infer<typeof EditStaffInputSchema>) => {
    updateStaff({
      variables: { editUserInput: { ...data, id: editId } },
      onCompleted: () => {
        onOpenChange?.(false);
        refetch();
      },
    });
  };

  useEffect(() => {
    if (!open) {
      form.reset({
        displayName: '',
        email: '',
        password: '',
      });
    } else {
      if (user) {
        form.reset({
          displayName: user?.displayName ?? '',
          email: user?.email ?? '',
        });
      }
    }
  }, [open, form, user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>
            Please fill the form to update staff details
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditStaffDialog;
