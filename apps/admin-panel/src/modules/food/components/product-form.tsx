import {
  AddProductMutation,
  AddProductMutationVariables,
  FoodStatus,
  FoodType,
  GetAllCategoriesQuery,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '@/__generated__/graphql';
import UploadImage from '@/components/shared/upload-image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IKImage } from 'imagekitio-react';
import { ChevronLeft, CircleX, PlusCircle } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { GET_ALL_CATEGORIES, GET_FOODS } from '../graphql/queries';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../graphql/mutations';
import { formatEnumValue } from '@/utils/helpers';

const CreateFoodCustomizationInputSchema = z.object({
  costPrice: z.string().min(1, 'Cost price is required'),
  isDefault: z.boolean().optional(),
  name: z.string().min(1, 'Name is required'),
  sellingPrice: z.string().min(1, 'Selling price is required'),
});

type CreateFoodCustomizationInput = z.infer<
  typeof CreateFoodCustomizationInputSchema
>;

const CreateFoodInputSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  customizations: z
    .array(CreateFoodCustomizationInputSchema)
    .min(1, 'At least one food customization is required')
    .optional()
    .refine(
      (customizations) => {
        const defaultCount =
          customizations?.filter((c) => c.isDefault).length || 0;
        return defaultCount <= 1;
      },
      {
        message: 'Only one customization can be marked as default',
      },
    ),
  description: z.string().optional(),
  foodType: z.nativeEnum(FoodType, {
    invalid_type_error: 'Invalid food type',
    required_error: 'Food type is required',
  }),
  status: z.nativeEnum(FoodStatus, {
    required_error: 'Food status is required',
    invalid_type_error: 'Invalid food status',
  }),
  name: z.string().min(1, 'Name is required'),
  photoUrl: z.string().optional(),
});

type CreateFoodInput = z.infer<typeof CreateFoodInputSchema>;

type ProductFormProps = {
  id?: string;
  product?: CreateFoodInput;
};

const newProduct = {
  name: '',
  categoryId: '',
  description: '',
  customizations: [
    { name: '', costPrice: '', sellingPrice: '', isDefault: true },
  ],
  foodType: undefined,
  status: undefined,
  photoUrl: undefined,
};

function ProductForm(props: ProductFormProps) {
  const { product, id } = props;
  const EDIT_MODE = !!product && !!id;
  const navigate = useNavigate();
  const [addProduct, { loading: adding }] = useMutation<
    AddProductMutation,
    AddProductMutationVariables
  >(ADD_PRODUCT);
  const [updateProduct, { loading: updating }] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UPDATE_PRODUCT);
  const loading = adding || updating;
  const form = useForm<CreateFoodInput>({
    defaultValues: product ? product : newProduct,
    resolver: zodResolver(CreateFoodInputSchema),
  });
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'customizations',
  });
  const { data } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);
  const categories = data?.allCategories ?? [];
  const client = useApolloClient();

  const onSubmit = (data: CreateFoodInput) => {
    console.log({ data });
    if (EDIT_MODE) {
      updateProduct({
        variables: {
          updateFoodInput: {
            ...data,
            customizations: (data.customizations ?? []).map(
              (customization) => ({
                ...customization,
                costPrice: parseInt(customization.costPrice),
                sellingPrice: parseInt(customization.sellingPrice),
              }),
            ),
            id,
          },
        },
        onCompleted: () => {
          client.refetchQueries({
            include: [GET_FOODS],
          });
          navigate(-1);
        },
      });
    } else {
      addProduct({
        variables: {
          createFoodInput: {
            ...data,
            customizations: (data.customizations ?? []).map(
              (customization) => ({
                ...customization,
                costPrice: parseInt(customization.costPrice),
                sellingPrice: parseInt(customization.sellingPrice),
              }),
            ),
          },
        },
        onCompleted: () => {
          client.refetchQueries({
            include: [GET_FOODS],
          });
          navigate(-1);
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto grid flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="icon"
              className="h-7 w-7"
              type="button"
              disabled={loading}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {EDIT_MODE ? 'Edit' : 'Add'} Product
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={form.reset as () => void}
                disabled={loading}
              >
                Discard
              </Button>
              <Button disabled={loading} size="sm">
                {EDIT_MODE ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Basic Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Variants</CardTitle>
                </CardHeader>
                <FormField
                  name="customizations"
                  render={({ field: customizationsField }) => {
                    const handleToggleDefault = (index: number) => {
                      customizationsField.value.forEach(
                        (value: CreateFoodCustomizationInput, idx: number) => {
                          if (idx === index) {
                            update(idx, {
                              name: value.name,
                              costPrice: value.costPrice,
                              sellingPrice: value.sellingPrice,
                              isDefault: true,
                            });
                          } else {
                            update(idx, {
                              name: value.name,
                              costPrice: value.costPrice,
                              sellingPrice: value.sellingPrice,
                              isDefault: false,
                            });
                          }
                        },
                      );
                    };

                    return (
                      <CardContent>
                        {fields.map((fieldItem, index) => {
                          return (
                            <div
                              key={fieldItem.id}
                              className={`grid gap-4 grid-cols-2 ${index < fields.length - 1 ? 'mb-10' : ''}`}
                            >
                              <CardTitle className="col-span-full">
                                # {index + 1}
                              </CardTitle>

                              <div>
                                <FormLabel>Name</FormLabel>
                                <FormField
                                  control={form.control}
                                  name={`customizations.${index}.name`}
                                  render={({ field }) => (
                                    <Input placeholder="Name" {...field} />
                                  )}
                                />
                              </div>

                              <div>
                                <FormLabel>Cost Price</FormLabel>
                                <FormField
                                  control={form.control}
                                  name={`customizations.${index}.costPrice`}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      placeholder="Cost Price"
                                      {...field}
                                    />
                                  )}
                                />
                              </div>

                              <div>
                                <FormLabel>Selling Price</FormLabel>
                                <FormField
                                  control={form.control}
                                  name={`customizations.${index}.sellingPrice`}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      placeholder="Selling Price"
                                      {...field}
                                    />
                                  )}
                                />
                              </div>

                              <div>
                                <FormLabel>Default</FormLabel>
                                <div className="h-[40px] flex flex-1 items-center">
                                  <FormField
                                    control={form.control}
                                    name={`customizations.${index}.isDefault`}
                                    render={({ field }) => (
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={() => {
                                          handleToggleDefault(index);
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              {index > 0 && (
                                <div className="grid col-span-full justify-center">
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    className="gap-1"
                                    onClick={() => {
                                      if (fields[index].isDefault) {
                                        handleToggleDefault(0);
                                      }
                                      remove(index);
                                    }}
                                  >
                                    <CircleX className="h-3.5 w-3.5" />
                                    Remove Variant
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </CardContent>
                    );
                  }}
                />
                <CardFooter className="justify-center border-t p-4">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                    onClick={append as () => void}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <div className="grid gap-3">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-label="Select status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(FoodStatus).map((item) => (
                                <SelectItem key={item} value={item}>
                                  {formatEnumValue(item)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="foodType"
                      render={({ field }) => (
                        <div className="grid gap-3">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-label="Select type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={FoodType.Veg}>Veg</SelectItem>
                              <SelectItem value={FoodType.NonVeg}>
                                Non Veg
                              </SelectItem>
                              <SelectItem value={FoodType.Vegan}>
                                Vegan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <div className="grid gap-3">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-label="Select category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => {
                                return (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Image</CardTitle>
                  <CardDescription>
                    Upload image by clicking / dragging on upload button
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="photoUrl"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-2">
                        {field.value ? (
                          <IKImage
                            transformation={[
                              { height: '200px', width: '200px' },
                            ]}
                            path={field.value}
                            className="aspect-square w-full rounded-md object-cover"
                            loading="lazy"
                            lqip={{ active: true, quality: 10, blur: 10 }}
                          />
                        ) : (
                          <></>
                        )}
                        <div className="grid grid-cols-1">
                          <UploadImage
                            onSuccess={(res) => {
                              field.onChange(res.filePath);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={form.reset as () => void}
            >
              Discard
            </Button>
            <Button size="sm" disabled={loading}>
              {EDIT_MODE ? 'Update' : 'Add'} Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
