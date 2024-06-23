import {
  AddAdminStaffMutation,
  AddAdminStaffMutationVariables,
  AddStaffMutation,
  AddStaffMutationVariables,
  UserRole,
} from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gql, useMutation } from '@apollo/client';
import { DialogProps } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RoleBasedWrapper from '@/components/shared/role-based-wrapper';

const CreateStaffInputSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be a valid email address.'),
  password: z
    .string()
    .min(1, 'Password should not be empty.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
    ),
});

type AddStaffDialogProps = DialogProps & {
  refetch: () => void;
};

const ADD_ADMIN_STAFF = gql`
  mutation addAdminStaff($createUserInput: CreateUserInput!) {
    createAdminUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

const ADD_STAFF = gql`
  mutation addStaff($createUserInput: CreateUserInput!) {
    createStaffUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

function AddStaffDialog(props: AddStaffDialogProps) {
  const { refetch, open, onOpenChange } = props;
  const [addStaff, { loading: addStaffLoading }] = useMutation<
    AddStaffMutation,
    AddStaffMutationVariables
  >(ADD_STAFF);
  const [addAdminStaff, { loading: addAdminLoading }] = useMutation<
    AddAdminStaffMutation,
    AddAdminStaffMutationVariables
  >(ADD_ADMIN_STAFF);
  const loading = addAdminLoading || addStaffLoading;
  const [userRole, setUserRole] = useState('STAFF');
  const form = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(CreateStaffInputSchema),
  });

  const onSubmit = (data: z.infer<typeof CreateStaffInputSchema>) => {
    if (userRole === 'ADMIN') {
      addAdminStaff({
        variables: { createUserInput: data },
        onCompleted: () => {
          onOpenChange?.(false);
          refetch();
        },
      });
    } else {
      addStaff({
        variables: { createUserInput: data },
        onCompleted: () => {
          onOpenChange?.(false);
          refetch();
        },
      });
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset({
        displayName: '',
        email: '',
        password: '',
      });
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Staff</DialogTitle>
          <DialogDescription>
            Please fill the form to create staff
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RoleBasedWrapper allowedRoles={[UserRole.SuperAdmin]}>
              <Label htmlFor="name" className="text-right">
                User Role
              </Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="STAFF">Staff</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </RoleBasedWrapper>
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
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffDialog;
