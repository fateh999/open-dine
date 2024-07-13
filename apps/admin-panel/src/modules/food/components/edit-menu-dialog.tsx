import {
  GetMenuQuery,
  GetMenuQueryVariables,
  UpdateMenuMutation,
  UpdateMenuMutationVariables,
  GetAllCategoriesQuery,
} from '@/__generated__/graphql';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation, useQuery } from '@apollo/client';
import { DialogProps } from '@radix-ui/react-dialog';
import MenuForm, { CreateMenuInput } from './menu-form';
import { GET_MENU, GET_ALL_CATEGORIES } from '../graphql/queries';
import { UPDATE_MENU } from '../graphql/mutations';
import { useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/spinner';

type EditMenuDialogProps = DialogProps & {
  refetch: () => void;
};

function EditMenuDialog(props: EditMenuDialogProps) {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit') ?? '';
  const { children, open = false, onOpenChange, refetch } = props;
  const { data, refetch: reFetchMenu } = useQuery<
    GetMenuQuery,
    GetMenuQueryVariables
  >(GET_MENU, {
    variables: { id: editId },
    skip: !editId,
  });
  const menu = data?.menu;
  const { data: categoriesData } =
    useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);
  const categories = categoriesData?.allCategories ?? [];

  const [updateMenu, { loading }] = useMutation<
    UpdateMenuMutation,
    UpdateMenuMutationVariables
  >(UPDATE_MENU);

  const handleSubmit = (data: CreateMenuInput) => {
    updateMenu({
      variables: {
        updateMenuInput: {
          ...data,
          menuCategories: (data?.menuCategories ?? []).map(
            (menuCategory, index) => ({
              menuOrder: index,
              categoryId: menuCategory.categoryId,
            }),
          ),
          active: data.active ?? false,
          id: editId,
        },
      },
      onCompleted: () => {
        onOpenChange?.(false);
        refetch();
        reFetchMenu();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Please fill the form to update the menu
          </DialogDescription>
        </DialogHeader>
        {menu ? (
          <MenuForm
            onSubmit={handleSubmit}
            categories={categories}
            open={open}
            loading={loading}
            menu={
              {
                name: menu?.name ?? '',
                active: menu?.active,
                menuCategories: (menu?.menuCategories ?? [])
                  .map((menuCategory) => ({
                    menuOrder: menuCategory.menuOrder,
                    categoryId: menuCategory.category.id,
                  }))
                  .sort((a, b) => a.menuOrder - b.menuOrder),
              } as CreateMenuInput
            }
          />
        ) : (
          <div className="h-min-[100px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditMenuDialog;
