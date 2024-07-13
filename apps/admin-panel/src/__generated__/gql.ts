/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getUserProfile {\n    userProfile {\n      id\n      displayName\n      role\n    }\n  }\n": types.GetUserProfileDocument,
    "\n  query getCustomer($id: String!) {\n    customer(id: $id) {\n      id\n      displayName\n      photoUrl\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCustomerDocument,
    "\n  mutation updateCustomer($editCustomerInput: EditCustomerInput!) {\n    editCustomer(editCustomerInput: $editCustomerInput) {\n      id\n    }\n  }\n": types.UpdateCustomerDocument,
    "\n  mutation deleteCategory($id: String!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation addCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n    }\n  }\n": types.AddCategoryDocument,
    "\n  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    editCategory(updateCategoryInput: $updateCategoryInput) {\n      id\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation addProduct($createFoodInput: CreateFoodInput!) {\n    createFood(createFoodInput: $createFoodInput) {\n      __typename\n      id\n      name\n    }\n  }\n": types.AddProductDocument,
    "\n  mutation updateProduct($updateFoodInput: UpdateFoodInput!) {\n    editFood(updateFoodInput: $updateFoodInput) {\n      __typename\n      id\n      name\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation deleteProduct($id: String!) {\n    deleteFood(id: $id) {\n      id\n    }\n  }\n": types.DeleteProductDocument,
    "\n  mutation addMenu($createMenuInput: CreateMenuInput!) {\n    createMenu(createMenuInput: $createMenuInput) {\n      id\n    }\n  }\n": types.AddMenuDocument,
    "\n  mutation updateMenu($updateMenuInput: UpdateMenuInput!) {\n    editMenu(updateMenuInput: $updateMenuInput) {\n      id\n    }\n  }\n": types.UpdateMenuDocument,
    "\n  mutation deleteMenu($id: String!) {\n    deleteMenu(id: $id) {\n      id\n    }\n  }\n": types.DeleteMenuDocument,
    "\n  query getFoods($take: Int!, $skip: Int!, $search: String) {\n    foods(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        photoUrl\n        categoryId\n        description\n        foodType\n        name\n        description\n        createdAt\n        updatedAt\n        status\n        customizations {\n          costPrice\n          sellingPrice\n          name\n          isDefault\n        }\n        category {\n          id\n          name\n        }\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n": types.GetFoodsDocument,
    "\n  query getFood($id: String!) {\n    food(id: $id) {\n      id\n      photoUrl\n      categoryId\n      description\n      foodType\n      name\n      description\n      createdAt\n      updatedAt\n      status\n      customizations {\n        costPrice\n        sellingPrice\n        name\n        isDefault\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetFoodDocument,
    "\n  query getCategories($take: Int!, $skip: Int!, $search: String) {\n    categories(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        name\n        updatedAt\n        createdAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query getCategory($id: String!) {\n    category(id: $id) {\n      id\n      name\n    }\n  }\n": types.GetCategoryDocument,
    "\n  query getAllCategories {\n    allCategories {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  query getMenu($id: String!) {\n    menu(id: $id) {\n      id\n      name\n      active\n      menuCategories {\n        menuOrder\n        category {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetMenuDocument,
    "\n  query getMenus($take: Int!, $skip: Int!, $search: String) {\n    menus(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        name\n        active\n        updatedAt\n        createdAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n": types.GetMenusDocument,
    "\n  mutation addAdminStaff($createUserInput: CreateUserInput!) {\n    createAdminUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n": types.AddAdminStaffDocument,
    "\n  mutation addStaff($createUserInput: CreateUserInput!) {\n    createStaffUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n": types.AddStaffDocument,
    "\n  query getStaff($id: String!) {\n    user(id: $id) {\n      id\n      displayName\n      photoUrl\n      role\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetStaffDocument,
    "\n  mutation deleteStaff($id: String!) {\n    deleteStaffUser(id: $id) {\n      id\n    }\n  }\n": types.DeleteStaffDocument,
    "\n  mutation updateStaff($editUserInput: EditUserInput!) {\n    editStaffUser(editUserInput: $editUserInput) {\n      id\n    }\n  }\n": types.UpdateStaffDocument,
    "\n  query getCustomers($take: Int!, $skip: Int!, $search: String) {\n    customers(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        displayName\n        photoUrl\n        email\n        disabled\n        createdAt\n        updatedAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n": types.GetCustomersDocument,
    "\n  query getStaffs($take: Int!, $skip: Int!, $search: String) {\n    users(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        displayName\n        photoUrl\n        role\n        email\n        disabled\n        createdAt\n        updatedAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n": types.GetStaffsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserProfile {\n    userProfile {\n      id\n      displayName\n      role\n    }\n  }\n"): (typeof documents)["\n  query getUserProfile {\n    userProfile {\n      id\n      displayName\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCustomer($id: String!) {\n    customer(id: $id) {\n      id\n      displayName\n      photoUrl\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getCustomer($id: String!) {\n    customer(id: $id) {\n      id\n      displayName\n      photoUrl\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateCustomer($editCustomerInput: EditCustomerInput!) {\n    editCustomer(editCustomerInput: $editCustomerInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateCustomer($editCustomerInput: EditCustomerInput!) {\n    editCustomer(editCustomerInput: $editCustomerInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteCategory($id: String!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCategory($id: String!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    editCategory(updateCategoryInput: $updateCategoryInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    editCategory(updateCategoryInput: $updateCategoryInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addProduct($createFoodInput: CreateFoodInput!) {\n    createFood(createFoodInput: $createFoodInput) {\n      __typename\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation addProduct($createFoodInput: CreateFoodInput!) {\n    createFood(createFoodInput: $createFoodInput) {\n      __typename\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateProduct($updateFoodInput: UpdateFoodInput!) {\n    editFood(updateFoodInput: $updateFoodInput) {\n      __typename\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation updateProduct($updateFoodInput: UpdateFoodInput!) {\n    editFood(updateFoodInput: $updateFoodInput) {\n      __typename\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteProduct($id: String!) {\n    deleteFood(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteProduct($id: String!) {\n    deleteFood(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addMenu($createMenuInput: CreateMenuInput!) {\n    createMenu(createMenuInput: $createMenuInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addMenu($createMenuInput: CreateMenuInput!) {\n    createMenu(createMenuInput: $createMenuInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateMenu($updateMenuInput: UpdateMenuInput!) {\n    editMenu(updateMenuInput: $updateMenuInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMenu($updateMenuInput: UpdateMenuInput!) {\n    editMenu(updateMenuInput: $updateMenuInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteMenu($id: String!) {\n    deleteMenu(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMenu($id: String!) {\n    deleteMenu(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getFoods($take: Int!, $skip: Int!, $search: String) {\n    foods(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        photoUrl\n        categoryId\n        description\n        foodType\n        name\n        description\n        createdAt\n        updatedAt\n        status\n        customizations {\n          costPrice\n          sellingPrice\n          name\n          isDefault\n        }\n        category {\n          id\n          name\n        }\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getFoods($take: Int!, $skip: Int!, $search: String) {\n    foods(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        photoUrl\n        categoryId\n        description\n        foodType\n        name\n        description\n        createdAt\n        updatedAt\n        status\n        customizations {\n          costPrice\n          sellingPrice\n          name\n          isDefault\n        }\n        category {\n          id\n          name\n        }\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getFood($id: String!) {\n    food(id: $id) {\n      id\n      photoUrl\n      categoryId\n      description\n      foodType\n      name\n      description\n      createdAt\n      updatedAt\n      status\n      customizations {\n        costPrice\n        sellingPrice\n        name\n        isDefault\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFood($id: String!) {\n    food(id: $id) {\n      id\n      photoUrl\n      categoryId\n      description\n      foodType\n      name\n      description\n      createdAt\n      updatedAt\n      status\n      customizations {\n        costPrice\n        sellingPrice\n        name\n        isDefault\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategories($take: Int!, $skip: Int!, $search: String) {\n    categories(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        name\n        updatedAt\n        createdAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getCategories($take: Int!, $skip: Int!, $search: String) {\n    categories(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        name\n        updatedAt\n        createdAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategory($id: String!) {\n    category(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getCategory($id: String!) {\n    category(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllCategories {\n    allCategories {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getAllCategories {\n    allCategories {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMenu($id: String!) {\n    menu(id: $id) {\n      id\n      name\n      active\n      menuCategories {\n        menuOrder\n        category {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMenu($id: String!) {\n    menu(id: $id) {\n      id\n      name\n      active\n      menuCategories {\n        menuOrder\n        category {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMenus($take: Int!, $skip: Int!, $search: String) {\n    menus(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        name\n        active\n        updatedAt\n        createdAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getMenus($take: Int!, $skip: Int!, $search: String) {\n    menus(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        name\n        active\n        updatedAt\n        createdAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addAdminStaff($createUserInput: CreateUserInput!) {\n    createAdminUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addAdminStaff($createUserInput: CreateUserInput!) {\n    createAdminUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addStaff($createUserInput: CreateUserInput!) {\n    createStaffUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addStaff($createUserInput: CreateUserInput!) {\n    createStaffUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getStaff($id: String!) {\n    user(id: $id) {\n      id\n      displayName\n      photoUrl\n      role\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getStaff($id: String!) {\n    user(id: $id) {\n      id\n      displayName\n      photoUrl\n      role\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteStaff($id: String!) {\n    deleteStaffUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteStaff($id: String!) {\n    deleteStaffUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateStaff($editUserInput: EditUserInput!) {\n    editStaffUser(editUserInput: $editUserInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateStaff($editUserInput: EditUserInput!) {\n    editStaffUser(editUserInput: $editUserInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCustomers($take: Int!, $skip: Int!, $search: String) {\n    customers(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        displayName\n        photoUrl\n        email\n        disabled\n        createdAt\n        updatedAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getCustomers($take: Int!, $skip: Int!, $search: String) {\n    customers(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        displayName\n        photoUrl\n        email\n        disabled\n        createdAt\n        updatedAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getStaffs($take: Int!, $skip: Int!, $search: String) {\n    users(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        displayName\n        photoUrl\n        role\n        email\n        disabled\n        createdAt\n        updatedAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getStaffs($take: Int!, $skip: Int!, $search: String) {\n    users(skip: $skip, take: $take, search: $search) {\n      items {\n        id\n        displayName\n        photoUrl\n        role\n        email\n        disabled\n        createdAt\n        updatedAt\n      }\n      totalCount\n      conditionalTotalCount\n      totalPages\n      currentPage\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;