import {
  AddMenuMutation,
  AddMenuMutationVariables,
  GetAllCategoriesQuery,
} from '@/__generated__/graphql';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQuery } from '@apollo/client';
import { DialogProps } from '@radix-ui/react-dialog';
import MenuForm, { CreateMenuInput } from './menu-form';
import { ADD_MENU } from '../graphql/mutations';
import { GET_ALL_CATEGORIES } from '../graphql/queries';

type AddMenuDialogProps = DialogProps & {
  refetch: () => void;
};

function AddMenuDialog(props: AddMenuDialogProps) {
  const { refetch, open = false, onOpenChange } = props;
  const [addMenu, { loading }] = useMutation<
    AddMenuMutation,
    AddMenuMutationVariables
  >(ADD_MENU);
  const { data } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);
  const categories = data?.allCategories ?? [];

  function handleSubmit(data: CreateMenuInput) {
    addMenu({
      variables: { createMenuInput: data },
      onCompleted: () => {
        onOpenChange?.(false);
        refetch();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
          <DialogDescription>
            Please fill the form to create menu
          </DialogDescription>
        </DialogHeader>
        <MenuForm
          onSubmit={handleSubmit}
          categories={categories}
          open={open}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddMenuDialog;
