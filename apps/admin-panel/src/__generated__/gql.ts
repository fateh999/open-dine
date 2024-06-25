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
    "\n  mutation addAdminStaff($createUserInput: CreateUserInput!) {\n    createAdminUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n": types.AddAdminStaffDocument,
    "\n  mutation addStaff($createUserInput: CreateUserInput!) {\n    createStaffUser(createUserInput: $createUserInput) {\n      id\n    }\n  }\n": types.AddStaffDocument,
    "\n  query getStaff($id: String!) {\n    user(id: $id) {\n      id\n      displayName\n      photoUrl\n      role\n      email\n      disabled\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetStaffDocument,
    "\n  mutation deleteStaff($id: String!) {\n    deleteStaffUser(id: $id) {\n      id\n    }\n  }\n": types.DeleteStaffDocument,
    "\n  mutation updateStaff($editUserInput: EditUserInput!) {\n    editUser(editUserInput: $editUserInput) {\n      id\n    }\n  }\n": types.UpdateStaffDocument,
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
export function gql(source: "\n  mutation updateStaff($editUserInput: EditUserInput!) {\n    editUser(editUserInput: $editUserInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateStaff($editUserInput: EditUserInput!) {\n    editUser(editUserInput: $editUserInput) {\n      id\n    }\n  }\n"];
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