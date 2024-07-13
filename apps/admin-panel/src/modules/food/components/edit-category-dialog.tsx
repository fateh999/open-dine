import {
  GetCategoryQuery,
  GetCategoryQueryVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
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
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { GET_CATEGORY } from '../graphql/queries';
import { UPDATE_CATEGORY } from '../graphql/mutations';

const EditCategoryInputSchema = z.object({
  name: z.string().min(1, 'Display name is required.'),
});

type EditCategoryDialogProps = DialogProps & {
  refetch: () => void;
};

function EditCategoryDialog(props: EditCategoryDialogProps) {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit') ?? '';
  const { children, open, onOpenChange, refetch } = props;
  const { data, loading } = useQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >(GET_CATEGORY, { variables: { id: editId }, skip: !editId });
  const category = data?.category;
  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(EditCategoryInputSchema),
  });
  const [updateStaff] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY);

  const onSubmit = (data: z.infer<typeof EditCategoryInputSchema>) => {
    updateStaff({
      variables: { updateCategoryInput: { ...data, id: editId } },
      onCompleted: () => {
        onOpenChange?.(false);
        refetch();
      },
    });
  };

  useEffect(() => {
    if (!open) {
      form.reset({
        name: '',
      });
    } else {
      if (category) {
        form.reset({
          name: category.name,
        });
      }
    }
  }, [open, form, category]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Please fill the form to update category
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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

export default EditCategoryDialog;
