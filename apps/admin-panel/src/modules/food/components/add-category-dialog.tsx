import {
  AddCategoryMutation,
  AddCategoryMutationVariables,
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
import { useMutation } from '@apollo/client';
import { DialogProps } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ADD_CATEGORY } from '../graphql/mutations';

const CreateCategoryInputSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
});

type AddCategoryDialogProps = DialogProps & {
  refetch: () => void;
};

function AddCategoryDialog(props: AddCategoryDialogProps) {
  const { refetch, open, onOpenChange } = props;
  const [addCategory, { loading }] = useMutation<
    AddCategoryMutation,
    AddCategoryMutationVariables
  >(ADD_CATEGORY);
  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(CreateCategoryInputSchema),
  });

  const onSubmit = (data: z.infer<typeof CreateCategoryInputSchema>) => {
    addCategory({
      variables: { createCategoryInput: data },
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
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Please fill the form to create category
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryDialog;
