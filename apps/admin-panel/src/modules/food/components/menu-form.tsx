import { useEffect } from 'react';
import {
  useForm,
  useFieldArray,
  Control,
  FieldArrayWithId,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CircleX } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DialogFooter } from '@/components/ui/dialog';

const ItemType = 'MENU_CATEGORY';

const CreateMenuCategoryInputSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required.'),
  menuOrder: z
    .number()
    .int()
    .nonnegative('Order must be a non-negative integer.'),
});

const CreateMenuInputSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  active: z.boolean().optional(),
  menuCategories: z
    .array(CreateMenuCategoryInputSchema)
    .nonempty('At least one category is required.'),
});

export type CreateMenuInput = z.infer<typeof CreateMenuInputSchema>;

type MenuFormProps = {
  onSubmit: (data: CreateMenuInput) => void;
  categories: { id: string; name: string }[];
  open: boolean;
  loading: boolean;
  menu?: CreateMenuInput;
};

type DraggableMenuCategoryProps = {
  category: { id: string; name: string };
  index: number;
  moveCategory: (from: number, to: number) => void;
  remove: (index: number) => void;
  control: Control<{
    name: string;
    menuCategories: [
      {
        categoryId: string;
        menuOrder: number;
      },
      ...{
        categoryId: string;
        menuOrder: number;
      }[],
    ];
    active?: boolean | undefined;
  }>;
  fields: FieldArrayWithId<
    {
      name: string;
      menuCategories: [
        {
          categoryId: string;
          menuOrder: number;
        },
        ...{
          categoryId: string;
          menuOrder: number;
        }[],
      ];
      active?: boolean | undefined;
    },
    'menuCategories',
    'id'
  >[];
};

function DraggableMenuCategory({
  category,
  index,
  moveCategory,
  remove,
  control,
  fields,
}: DraggableMenuCategoryProps) {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveCategory(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`flex gap-4 rounded border pl-2 items-center ${
        index < fields.length - 1 ? 'mb-4' : ''
      }`}
    >
      <FormField
        control={control}
        name={`menuCategories.${index}.categoryId`}
        render={() => (
          <>
            <FormLabel className="w-full">{category?.name}</FormLabel>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="gap-1"
              onClick={() => remove(index)}
            >
              <CircleX className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      />
    </div>
  );
}

function MenuForm({
  onSubmit,
  categories,
  open,
  loading,
  menu,
}: MenuFormProps) {
  console.log({ menu });
  const form = useForm<CreateMenuInput>({
    defaultValues: {
      name: '',
      menuCategories: [],
      active: false,
      ...menu,
    },
    resolver: zodResolver(CreateMenuInputSchema),
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'menuCategories',
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        name: '',
        menuCategories: [],
        active: false,
      });
    }
  }, [open, form]);

  return (
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
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
              <div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="menuCategories"
          render={() => {
            const selectedCategoryIds = fields.map((c) => c.categoryId);
            const filteredCategories = categories.filter(
              (category) => !selectedCategoryIds.includes(category.id),
            );

            return (
              <FormItem>
                <FormLabel>Menu Categories</FormLabel>

                <DndProvider backend={HTML5Backend}>
                  {fields.map((fieldItem, index) => (
                    <DraggableMenuCategory
                      key={fieldItem.id}
                      index={index}
                      category={
                        categories.find(
                          (category) => category.id === fieldItem.categoryId,
                        )!
                      }
                      moveCategory={(from, to) => move(from, to)}
                      remove={remove}
                      control={form.control}
                      fields={fields}
                    />
                  ))}
                </DndProvider>
                {fields.length > 0 && <div className="h-1" />}
                <Select
                  value={''}
                  onValueChange={(categoryId) => {
                    append({
                      categoryId,
                      menuOrder: fields.length,
                    });
                  }}
                  disabled={filteredCategories.length === 0}
                >
                  <SelectTrigger aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((category) => {
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <DialogFooter>
          <Button disabled={loading} type="submit">
            {menu ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default MenuForm;
